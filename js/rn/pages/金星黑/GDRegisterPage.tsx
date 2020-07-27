import { View, Text, ScrollView, TextInput, TouchableOpacity, TextInputProps, Image, Alert } from "react-native"
import React, { useEffect, useState, useRef, useMemo, memo } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { PageName } from "../../public/navigation/Navigation"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import { Icon } from "react-native-elements"
import { navigate, popToRoot, pop } from "../../public/navigation/RootNavigation"
import { Controller, useForm, Control } from "react-hook-form"
import APIRouter from "../../public/network/APIRouter"
import { IGlobalState, UGStore } from "../../redux/store/UGStore"
import WebView, { WebViewMessageEvent } from "react-native-webview"
import AppDefine from "../../public/define/AppDefine"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { EventRegister } from 'react-native-event-listeners'
import FastImage from "react-native-fast-image"
import { useDimensions } from "@react-native-community/hooks"
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
const GDRegisterPage = () => {
  const { control, register, getValues, errors, triggerValidation, handleSubmit } = useForm()
  const [regType, setRegType] = useState<'user' | 'agent'>("user")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [repwdSecureTextEntry, setRepwdSecureTextEntry] = useState(true)
  const SystemStore = UGStore.globalProps.sysConf
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
          console.log('退出旧账号');
          console.log(user);
          const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
          await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
          await OCHelper.call('UGUserModel.setCurrentUser:');
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
          UGStore.dispatch({ type: 'reset', userInfo: {} })
        }
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.usr], 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.pwd], 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        const { data: UserInfo, } = await APIRouter.user_info()

        UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });

        UGStore.save();
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
        popToRoot();
      }
      if (data?.data?.autoLogin == false) {
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
        popToRoot();
        navigate(PageName.GDLoginPage, { usr: requestData[FormName.usr], pwd: requestData[FormName.pwd] })
      }
    } catch (error) {
      EventRegister.emit('reload')
      reRenderCode()
      if (error.message.includes("推荐人")) {
        Alert.alert(error?.message, "")
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
      } else {
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '注册失败']);
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
            document.getElementById('app').style.background = 'black'
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
      return (() => EventRegister.removeEventListener(listener))
    }, [])
    return (
      <WebView
        ref={webViewRef}
        style={{ flex: 1, minHeight: webviewHeight, backgroundColor: 'black' }}
        containerStyle={{ backgroundColor: 'black' }}
        javaScriptEnabled
        injectedJavaScript={webViewScript}

        startInLoadingState
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
  const { width, height } = useDimensions().screen
  return (
    <FastImage source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }} style={{ width, height }}>
      <Header />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'left', color: 'white', fontSize: 30, marginTop: 35, marginBottom: 10, fontWeight: "bold", }}>欢迎注冊</Text>
        <Text style={{ textAlign: 'left', color: 'white', fontSize: 12, marginBottom: 20, }}>我已有帐号，立即<Text onPress={() => {
          navigate(PageName.GDLoginPage, {})
        }} style={{ color: "#cfa461" }}> 登录</Text> </Text>
        <ZLRegInput iconName={"user"} message={"请输入推荐人ID"} placeholder={"请输入推荐人ID"} regConfig={hide_reco} control={control} name={FormName.inviter} />
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#252526', borderRadius: 4, marginBottom: 10, paddingHorizontal: 10 }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="user" type="font-awesome" color="#cfa461" size={24} />
          </View>

          <Controller
            maxLength={15}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1, color: 'white' }}
            placeholderTextColor={"#555555"}
            as={TextInput}
            rules={{
              required: {
                value: true, message
                  : "请输入帐号"
              },
              maxLength: {
                value: 15,
                message: "6-15位英文或数字的组合"
              },
              minLength: {
                value: 6,
                message: "6-15位英文或数字的组合"
              },

            }}
            name={FormName.usr}
            control={control}
            defaultValue=""
            placeholder={'帐号'}
          />
        </View>
        <Text style={{ color: '#ef5958', fontSize: 12, marginBottom: 10 }}>*请使用6-15位英文或数字的组合</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#252526', borderRadius: 4, borderColor: 'white', marginBottom: 10, paddingHorizontal: 10 }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="lock" type="font-awesome" color="#cfa461" size={24} />
          </View>

          <Controller
            maxLength={15}
            placeholderTextColor={"#555555"}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1, color: 'white' }}
            as={TextInput}
            secureTextEntry={secureTextEntry}
            rules={{
              required: {
                value: true, message
                  : "请输入密码"
              },
              maxLength: {
                value: pass_length_max,
                message: "最多" + pass_length_max + "位英文或数字的组合"
              },
              minLength: {
                value: pass_length_min,
                message: "最少" + pass_length_min + "位英文或数字的组合"
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
            placeholder={'密码'}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setSecureTextEntry(secureTextEntry => !secureTextEntry)
            }}>
            <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color="#cfa461" containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>
        {pass_length_min && !pass_length_max ? <Text style={{ color: '#ef5958', fontSize: 12, marginBottom: 10 }}>*请使用至少{pass_length_min}位字符</Text> : null}
        {pass_length_min && !pass_length_max ? <Text style={{ color: '#ef5958', fontSize: 12, marginBottom: 10 }}>*请使用{pass_length_min}-{pass_length_max}位英文或数字的组合</Text> : null}
        {!pass_length_min && pass_length_max ? <Text style={{ color: '#ef5958', fontSize: 12, marginBottom: 10 }}>*请使用最多{pass_length_min}位字符</Text> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#252526', borderRadius: 4, marginBottom: 10, paddingHorizontal: 10 }}>
          <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="lock" type="font-awesome" color="#cfa461" size={24} />
          </View>

          <Controller
            secureTextEntry={repwdSecureTextEntry}
            placeholderTextColor={"#555555"}
            onChange={args => {
              triggerValidation(FormName.repwd)
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1, color: 'white' }}
            as={TextInput}
            maxLength={15}
            rules={{
              required: {
                value: true,
                message: "请重新输入密码"
              },
              validate: (value) => {
                const passwordValue = getValues("pwd");
                return value === passwordValue || "密码不一致"
              }
            }}
            onBlur={() => {
              triggerValidation("repwd")
            }}
            name={FormName.repwd}
            control={control}
            defaultValue=""
            placeholder={'确认密码'}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setRepwdSecureTextEntry(secureTextEntry => !secureTextEntry)
            }}>
            <Icon name={repwdSecureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color="#cfa461" containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>
        <ZLRegInput iconName={"user"} message={"请输入真实姓名"} placeholder={"请输入真实姓名"} regConfig={reg_name} control={control} name={FormName.fullName} />
        {/* <ZLRegInput iconName={"user"} message={"请输入银行户口"} placeholder={"必须与提款银行户口相同否则无法提款"} regConfig={2} control={control} name={FormName.account} /> */}
        <ZLRegInput iconName={"lock"} isPassword={true} message={"请输入取款密码"} placeholder={"请输入4数字取款密码"} regConfig={reg_fundpwd} control={control} name={FormName.fundPwd} />
        <ZLRegInput iconName={"qq"} message={"请输入QQ帐号"} placeholder={"请输入QQ帐号"} regConfig={reg_qq} control={control} name={FormName.qq} />
        <ZLRegInput iconName={"wechat"} message={"请输入微信号"} placeholder={"请输入微信号"} regConfig={reg_wx} control={control} name={FormName.wx} />
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} message={"请输入手机号码"} placeholder={"请输入手机号码"} regConfig={reg_phone} control={control} name={FormName.phone} />
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} message={"请输入手机短信验证码"} placeholder={"请输入手机短信验证码"} regConfig={smsVerify} control={control} name={FormName.smsCode} />
        <ZLRegInput iconName={"mail"} iconType={'entypo'} message={"请输入邮箱地址"} placeholder={"请输入邮箱地址"} regConfig={reg_email} control={control} name={FormName.email} />
        {getVcode}

        {agentRegbutton == "1" ? <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            setRegType('user')
          }} style={{ backgroundColor: regType == 'user' ? 'blue' : 'black', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <Text style={{ color: 'white' }}>普通用户</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setRegType('agent')
          }} style={{ backgroundColor: regType == 'agent' ? 'blue' : 'black', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <Text style={{ color: 'white' }}>注册代理</Text>
          </TouchableOpacity>
        </View> : null}


        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={{
            flex: 1,
            height: 50, backgroundColor: "#b67866",
            borderRadius: 8,
            marginTop: 20, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>注册</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </FastImage>
  )
}

const Header = () => {
  const { top } = useSafeArea()
  return (
    <View style={{ height: 44 + top, paddingTop: top, backgroundColor: "#1a1a1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
      <TouchableWithoutFeedback onPress={() => {
        pop();
        OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
      }}>
        <Icon name="keyboard-arrow-left" type="materialIcon" color="rgba(142, 142, 147,1)" size={30} />
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback onPress={() => {
        navigate(PageName.GDLoginPage, {})
      }}>
        <Text style={{ color: "#68abf9", fontSize: 18, fontWeight: "bold" }}>登录</Text>
      </TouchableWithoutFeedback> */}

    </View>
  )
}
const ZLRegInput = ({ regConfig, name, control, placeholder, message = "", isPassword, iconType = "font-awesome", iconName = "" }:
  {
    regConfig: number | string | boolean, name: FormName, control: Control<Record<string, any>>,
    placeholder: string, message: string,
    isPassword?: boolean,
    iconType?: string,
    iconName: string
  }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
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
    return <View style={{
      flexDirection: 'row', alignItems: 'center', height: 50,
      backgroundColor: '#252526', borderRadius: 4, marginBottom: 10, paddingHorizontal: 10
    }}>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={iconName} type={iconType} color="#cfa461" size={24} />
      </View>

      <Controller
        placeholderTextColor={"#555555"}
        onChange={args => {
          return args[0].nativeEvent.text
        }}
        secureTextEntry={isPassword ? secureTextEntry : false}
        style={{ flex: 1, color: 'white' }}
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
        placeholder={placeholder + (regConfig == 1 || regConfig == '1' ? "(选填)" : "")}
      />
      {name == FormName.smsCode ? <TouchableOpacity onPress={requestSms}>
        <Text>获取验证码</Text>
      </TouchableOpacity> : null}
      {isPassword ? <TouchableOpacity
        style={{}}
        onPress={() => {
          setSecureTextEntry(secureTextEntry => !secureTextEntry)
        }}>
        <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
      </TouchableOpacity> : null}

    </View>
  }
}
const LetterVerificationCode = ({ control, code, onPress, reg_vcode }: { code: string, control: any, onPress: () => {}, reg_vcode: 1 | 3 }) => {
  const [hide, setHide] = useState(reg_vcode == 1 ? false : true)
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', height: 50,
      backgroundColor: '#252526', borderRadius: 4, marginBottom: 10, paddingHorizontal: 10
    }}>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={"Safety"} type={"antdesign"} color="#cfa461" size={24} />
      </View>

      <Controller
        placeholderTextColor={"#555555"}
        onChange={args => {
          return args[0].nativeEvent.text
        }}
        secureTextEntry={false}
        style={{ flex: 1, color: 'white' }}
        as={TextInput}
        rules={{
          required: {
            value: true, message
              : "请输入验证码"
          }
        }}
        name={FormName.imgCode}
        control={control}
        defaultValue=""
        placeholder={"验证码"}
      />
      {!hide ? <TouchableWithoutFeedback onPress={onPress}>
        <Image resizeMode={'contain'} style={{ height: "100%", aspectRatio: 2 }} source={{ uri: code }} />
      </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
        setHide(false)
        onPress()
      }}>
          <Text>点击显示验证码</Text>
        </TouchableWithoutFeedback>}

    </View>


  )
}
export default GDRegisterPage