import { View, Text, ScrollView, TextInput, TouchableOpacity, TextInputProps, Image, Alert } from "react-native"
import React, { useEffect, useState, useRef, useMemo, memo } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

import { Icon } from "react-native-elements"

import { Controller, useForm, Control } from "react-hook-form"


import WebView, { WebViewMessageEvent } from "react-native-webview"

import { EventRegister } from 'react-native-event-listeners'
import { IGlobalState, UGStore } from "../../../redux/store/UGStore"
import APIRouter from "../../../public/network/APIRouter"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
import UGUserModel from "../../../redux/model/全局/UGUserModel"
import { popToRoot, navigate, pop, push } from "../../../public/navigation/RootNavigation"
import { PageName } from "../../../public/navigation/Navigation"
import AppDefine from "../../../public/define/AppDefine"
import FastImage from "react-native-fast-image"
import { useLanguageContext } from "../../../public/context/LanguageContextProvider"
enum FormName {
  inviter = "inviter",
  usr = "usr",
  pwd = "pwd",
  repwd = "repwd",
  account = "account",
  fundPwd = "fundPwd",
  fullName = "fullName",
  qq = "qq", // QQ号
  wx = "wx", // 微信号
  phone = "phone", // 手机号
  smsCode = "smsCode", // 短信验证码
  imgCode = "imgCode", // 字母验证码
  slideCode = "slideCode", // 滑动验证码,
  email = "email",
}
const VietnamRegister = () => {
  const { control, register, getValues, errors, triggerValidation, handleSubmit } = useForm()
  const [regType, setRegType] = useState<'user' | 'agent'>("user")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [repwdSecureTextEntry, setRepwdSecureTextEntry] = useState(true)
  const SystemStore = UGStore.globalProps.sysConf;
  const [code, setCode] = useState("")
  const {
    hide_reco, // 代理人 0不填，1选填，2必填
    reg_name, // 真实姓名 0不填，1选填，2必填
    reg_fundpwd, // 取款密码 0不填，1选填，2必填
    reg_qq, // QQ 0不填，1选填，2必填
    reg_wx, // 微信 0不填，1选填，2必填
    reg_phone, // 手机 0不填，1选填，2必填
    reg_email, // 邮箱 0不填，1选填，2必填
    reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
    agentRegbutton,// 是否开启代理注册，0=关闭；1=开启
    smsVerify // 手机短信验证
  } = SystemStore

  const onSubmit = async (requestData) => {
    try {
      const password = requestData?.pwd?.md5()
      const fundPwd = requestData?.fundPwd?.md5()
      delete requestData?.repwd;
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);
      console.log(requestData)

      if (requestData.slideCode) {
        console.log(requestData.slideCode)
        requestData.smsCode = ""
        requestData.imgCode = ""
        requestData["slideCode[nc_sid]"] = requestData.slideCode["nc_csessionid"]
        requestData["slideCode[nc_token]"] = requestData.slideCode["nc_token"]
        requestData["slideCode[nc_sig]"] = requestData.slideCode["nc_sig"]
        delete requestData.slideCode
      }
      const { data, status } = await APIRouter.user_reg({ ...requestData, pwd: password, regType: regType, fundPwd: fundPwd })
      reRenderCode()
      if (data?.data == null)
        throw { message: data?.msg }
      if (data?.data?.autoLogin) {
        const user = await OCHelper.call('UGUserModel.currentUser');

        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
        const { data: loginData, status } = await APIRouter.user_login(data.data.usr, password)
        if (user) {
          const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
          await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
          await OCHelper.call('UGUserModel.setCurrentUser:');
          UGStore.dispatch({ type: 'reset', userInfo: {} });
        }
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.usr], 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.pwd], 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        const { data: UserInfo, } = await APIRouter.user_info()
        await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo.data, ...UGUserModel.getYS(loginData?.data) }]);
        UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });

        UGStore.save();
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
        popToRoot();
      }
      if (data?.data?.autoLogin == false) {
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
        popToRoot();
        navigate(PageName.ZLLoginPage, { usr: requestData[FormName.usr], pwd: requestData[FormName.pwd] })
      }
    } catch (error) {
      EventRegister.emit('reload')
      reRenderCode()
      if (error.message.includes("推荐人")) {
        Alert.alert(error?.message, "")
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
      } else {
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '']);
      }

    }
  }

  useEffect(() => {
    if (reg_vcode == 1) {
      reRenderCode()
    }
  }, [reg_vcode])

  const reRenderCode = async () => {
    try {
      const { data, status } = await APIRouter.secure_imgCaptcha()
      setCode(data)
    } catch (error) {
    }
  }
  const SlidingVerification = ({ onChange }: { onChange: (data: any) => void }) => {
    const webViewScript = `setTimeout(function() { 
            document.getElementById('app').style.background = 'white'
            window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); 
          }, 500);
          true;`;
    const [webviewHeight, setWebViewHeight] = useState(0)
    const hadnleMessage = (e: WebViewMessageEvent) => {
      if (typeof e?.nativeEvent?.data == 'string') {
        setWebViewHeight(parseInt(e?.nativeEvent?.data) * 1.5)
      } else {
        console.log("response" + JSON.stringify(e.nativeEvent.data))
        onChange(e?.nativeEvent?.data)
      }
    }
    const webViewRef = useRef<WebView>()
    useEffect(() => {
      const listener = EventRegister.addEventListener('reload', (data) => {
        webViewRef?.current?.reload()
      })
      return (() => listener ? EventRegister.removeEventListener(listener) : null)
    }, [])
    return (
      <WebView
        ref={webViewRef}
        style={{ flex: 1, minHeight: webviewHeight, backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white' }}
        javaScriptEnabled
        injectedJavaScript={webViewScript}
        source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
        onMessage={hadnleMessage}
      />
    );
  }
  const getVcode = useMemo(() => {
    if (reg_vcode == 0) {
      return null
    } else if (reg_vcode == 3 || reg_vcode == 1) {
      return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} control={control} code={code} />
    } else {
      return <Controller control={control} onChange={args => {
        return args[0]
      }} as={SlidingVerification} name={"slideCode"} />
    }
  }, [reg_vcode, code])
  useEffect(() => {
    console.log(errors)
    Object.keys(errors).map((res) => {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [errors?.[res]?.message]);
      return
    })
  }, [errors])
  const { currcentLanguagePackage } = useLanguageContext()
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
        {/* <Text style={{ textAlign: 'center', color: '#3c3c3c', fontSize: 20, marginTop: 15, marginBottom: 20, fontWeight: "bold" }}>账户注册</Text> */}
        <Text style={{ textAlign: 'left', color: '#3c3c3c', fontSize: 14, marginTop: 15, marginBottom: 10, marginLeft: 15 }}>{currcentLanguagePackage?.["app.for.safety.your.funds"]}!</Text>
        <ZLRegInput tip={"请输入推荐人ID"} iconImage={"http://test24.6yc.com/images/icon-reco-24.png"} iconName={"user"} message={currcentLanguagePackage?.["app.please.enter.referrerid"]} placeholder={currcentLanguagePackage?.["app.please.enter.referrerid"]} regConfig={hide_reco} control={control} name={FormName.inviter} />
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, marginBottom: 10, marginHorizontal: 10 }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-user-24.png" }} />
          </View>
          <Controller
            maxLength={15}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1 }}
            placeholderTextColor={'#3c3c3c'}
            as={TextInput}
            rules={{
              required: {
                value: true, message
                  : "请输入"
              },
              maxLength: {
                value: 15,
                message: "6-1" + currcentLanguagePackage?.["app.english.or.numbers"]
              },
              minLength: {
                value: 6,
                message: "6-1" + currcentLanguagePackage?.["app.english.or.numbers"]
              },

            }}
            name={FormName.usr}
            control={control}
            defaultValue=""
            placeholder={'帐号'}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, marginBottom: 10, borderBottomWidth: 1, marginHorizontal: 10, borderBottomColor: '#f2f2f2', }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-pwd-24.png" }} />
          </View>
          <Controller
            maxLength={15}
            placeholderTextColor={'#3c3c3c'}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1 }}
            as={TextInput}
            secureTextEntry={secureTextEntry}
            rules={{
              required: {
                value: true, message
                  : currcentLanguagePackage?.["app.input.new.pwd"]
              },
              maxLength: {
                value: pass_length_max,
                message: currcentLanguagePackage?.["app.most"] + pass_length_max + currcentLanguagePackage?.["app.english.or.numbers"]
              },
              minLength: {
                value: pass_length_min,
                message: currcentLanguagePackage?.["app.least"] + pass_length_min + currcentLanguagePackage?.["app.english.or.numbers"]
              },
              validate: (value) => {
                console.log(pass_limit)
                if (pass_limit == 0) {
                  return true
                } else if (pass_limit == 1) {

                  const regex = /^(?=.*\d)(?=.*[a-zA-Z])/
                  return regex.test(value) || '密码须有数字及字母'
                } else if (pass_limit == 2) {
                  const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/
                  return regex.test(value) || '密码须有数字及字母及字符'
                }

              }
            }}
            name={FormName.pwd}
            control={control}
            defaultValue=""
            placeholder={pass_length_min + '-' + pass_length_max + currcentLanguagePackage?.["app.english.or.numbers"]}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setSecureTextEntry(secureTextEntry => !secureTextEntry)
            }}>
            <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, marginBottom: 10, borderBottomWidth: 1, marginHorizontal: 10, borderBottomColor: '#f2f2f2', }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-pwd-24.png" }} />
          </View>
          <Controller
            secureTextEntry={repwdSecureTextEntry}
            placeholderTextColor={'#3c3c3c'}
            onChange={args => {
              triggerValidation(FormName.repwd)
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1 }}
            as={TextInput}
            maxLength={15}
            rules={{
              required: {
                value: true,
                message: currcentLanguagePackage?.["app.password.incorrect.reenter"]
              },
              validate: (value) => {
                const passwordValue = getValues("pwd");
                return value === passwordValue || currcentLanguagePackage?.["app.password.incorrect.reenter"]
              }
            }}
            onBlur={() => {
              triggerValidation("repwd")
            }}
            name={FormName.repwd}
            control={control}
            defaultValue=""
            placeholder={"匹配密码"}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setRepwdSecureTextEntry(secureTextEntry => !secureTextEntry)
            }}>
            <Icon name={repwdSecureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>
        <ZLRegInput tip={"必须与您的银行帐户名称相同，否则不能出款!"} iconImage={"http://test24.6yc.com/images/icon-user-24.png"} iconName={"user"} message={"请输入账号"} placeholder={"请输入账号"} regConfig={reg_name} control={control} name={FormName.fullName} />
        {/* <ZLRegInput iconName={"user"} message={"请输入银行户口"} placeholder={"必须与提款银行户口相同否则无法提款"} regConfig={2} control={control} name={FormName.account} /> */}
        <ZLRegInput tip={"请先设置取款密码"} iconName={"lock"} iconImage={"http://test24.6yc.com/images/icon-pwd-24.png"} isPassword={true} message={"请先设置取款密码"} placeholder={"请先设置取款密码"} regConfig={reg_fundpwd} control={control} name={FormName.fundPwd} />
        <ZLRegInput tip={"请填写正确的QQ号"} iconName={"qq"} iconImage={"http://test24.6yc.com/images/icon-qq-24.png"} message={"请填写正确的QQ号"} placeholder={"请填写正确的QQ号"} regConfig={reg_qq} control={control} name={FormName.qq} />
        <ZLRegInput tip={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.wechat"]} iconName={"wechat"} iconImage={"http://test24.6yc.com/images/icon-wx-24.png"} message={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.wechat"]} placeholder={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.wechat"]} regConfig={reg_wx} control={control} name={FormName.wx} />
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} iconImage={"http://test24.6yc.com/images/icon-phone-24.png"} message={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.wechat"]} placeholder={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.phone.number"]} regConfig={reg_phone} control={control} name={FormName.phone} />
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} iconImage={"http://test24.6yc.com/images/icon-pwd-24.png"} message={currcentLanguagePackage?.["app.sms.verification.code"]} placeholder={currcentLanguagePackage?.["app.sms.verification.code"]} regConfig={smsVerify} control={control} name={FormName.smsCode} />
        <ZLRegInput iconName={"mail"} iconType={'entypo'} iconImage={"http://test24.6yc.com/images/icon-email-24.png"} message={currcentLanguagePackage?.["app.input.your.email"]} placeholder={currcentLanguagePackage?.["app.input.your.email"]} regConfig={reg_email} control={control} name={FormName.email} />
        {getVcode}

        {agentRegbutton == "1" ? <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            setRegType('user')
          }} style={{ backgroundColor: regType == 'user' ? 'blue' : '#3c3c3c', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <Text style={{ color: 'white' }}>普通用户</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setRegType('agent')
          }} style={{ backgroundColor: regType == 'agent' ? 'blue' : '#3c3c3c', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <Text style={{ color: 'white' }}>注册代理</Text>
          </TouchableOpacity>
        </View> : null}


        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={{
            flex: 1,
            height: 50, backgroundColor: "#298dff",
            borderRadius: 8,
            marginTop: 20, justifyContent: 'center', alignItems: 'center',
            marginHorizontal: 20
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>{currcentLanguagePackage?.["app.registered"]}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          push(PageName.VietnamLogin)
        }}>
          <View style={{
            flex: 1,
            height: 40, borderColor: "#298dff",
            borderWidth: 1,
            borderRadius: 16,
            marginTop: 20, justifyContent: 'center', alignItems: 'center',
            marginHorizontal: 20
          }}>
            <Text style={{ color: "#298dff", fontSize: 15 }}>{currcentLanguagePackage?.["app.log.in"]}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

const Header = () => {
  const { top } = useSafeArea()
  return (
    <View>
      <View style={{ height: top }}></View>
      <View style={{ height: 68, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => {
          pop();
          OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
        }}>
          <Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", }}>{"注册"}</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => {
          navigate(PageName.VietnamHome, {})
        }}>
          <Text style={{ color: "#4290ff", fontSize: 15, fontWeight: "bold" }}>{"返回首页"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const ZLRegInput = ({ regConfig, name, control, placeholder, message = "", isPassword, iconType = "font-awesome", iconName = "", tip = "", iconImage }:
  {
    regConfig: number | string | boolean, name: FormName, control: Control<Record<string, any>>,
    placeholder: string, message: string,
    isPassword?: boolean,
    iconType?: string,
    iconName: string,
    tip?: string,
    iconImage?: string
  }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { currcentLanguagePackage } = useLanguageContext()
  const requestSms = async () => {
    try {
      const phone = control.getValues(FormName.phone)
      const { data, status } = await APIRouter.secure_smsCaptcha(phone)
      if (data?.code != 0) {
        throw { message: data.msg }
      } else {
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data?.msg]);
      }

    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error.message]);
    }

  }
  if (regConfig == 0 || regConfig == "0" || regConfig == false) {
    return null
  } else {
    return <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', height: 50,
        backgroundColor: 'white', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 5,
        borderBottomColor: "#f2f2f2", borderBottomWidth: 1
      }}>
        <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
          {iconImage ? <FastImage style={{ width: 24, height: 24 }} source={{ uri: iconImage }} /> : <Icon name={iconName} type={iconType} color="#3c3c3c" size={24} />}

        </View>
        <Controller
          placeholderTextColor={'#3c3c3c'}
          onChange={args => {
            return args[0].nativeEvent.text
          }}
          secureTextEntry={isPassword ? secureTextEntry : false}
          style={{ flex: 1 }}
          as={TextInput}
          rules={{
            required: {
              value: regConfig == 2 || regConfig == '2', message
                : message
            }
          }}
          name={name}
          control={control}
          defaultValue=""
          placeholder={placeholder + (regConfig == 1 || regConfig == '1' ? "(" + currcentLanguagePackage?.["app.options"] + ")" : "")}
        />
        {name == FormName.smsCode ? <TouchableOpacity onPress={requestSms}>
          <Text>{"获取验证码"}</Text>
        </TouchableOpacity> : null}
        {isPassword ? <TouchableOpacity
          style={{}}
          onPress={() => {
            setSecureTextEntry(secureTextEntry => !secureTextEntry)
          }}>
          <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
        </TouchableOpacity> : null}

      </View>
      <Text style={{ color: "#000000", fontSize: 12, marginLeft: 10 }}>{((regConfig == 1 || regConfig == '1') && tip != "" ? "*" : "") + tip ?? ""}</Text>
    </View>
  }
}
const LetterVerificationCode = ({ control, code, onPress, reg_vcode }: { code: string, control: any, onPress: () => {}, reg_vcode: 1 | 3 }) => {
  const [hide, setHide] = useState(reg_vcode == 1 ? false : true)
  const { currcentLanguagePackage } = useLanguageContext()
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', height: 50,
      backgroundColor: 'white', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10
    }}>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={"Safety"} type={"antdesign"} color="#3c3c3c" size={24} />
      </View>
      <Controller
        placeholderTextColor={'#3c3c3c'}
        onChange={args => {
          return args[0].nativeEvent.text
        }}
        secureTextEntry={false}
        style={{ flex: 1 }}
        as={TextInput}
        rules={{
          required: {
            value: true, message
              : currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.captcha"]
          }
        }}
        name={FormName.imgCode}
        control={control}
        defaultValue=""
        placeholder={currcentLanguagePackage?.["app.please.enter"] + currcentLanguagePackage?.["app.captcha"]}
      />
      {!hide ? <TouchableWithoutFeedback onPress={onPress}>
        <Image resizeMode={'contain'} style={{ height: "100%", aspectRatio: 2 }} source={{ uri: code }} />
      </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
        setHide(false)
        onPress()
      }}>
          <Text>{"获取验证码"}</Text>
        </TouchableWithoutFeedback>}

    </View>


  )
}
export default VietnamRegister