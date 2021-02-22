import { View, Text, ScrollView, TextInput, TouchableOpacity, TextInputProps, Image, Alert, Platform } from "react-native"
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
import { ANHelper } from "../../public/define/ANHelper/ANHelper";
import { Toast } from "../../public/tools/ToastUtils";
import { ugLog } from "../../public/tools/UgLog";
import { hideLoading, showLoading, UGLoadingType } from "../../public/widget/UGLoadingCP";
import { NA_DATA } from "../../public/define/ANHelper/hp/DataDefine";
import { CMD } from "../../public/define/ANHelper/hp/CmdDefine";
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'
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
const ZLRegisterPage = () => {
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
        smsVerify, // 手机短信验证,
        allowreg,
        closeregreason
    } = SystemStore

    const onSubmit = async (requestData) => {
        try {
            const password = requestData?.pwd?.md5()
            const fundPwd = requestData?.fundPwd?.md5()
            delete requestData?.repwd;

            showLoading('正在注册...');

            // switch (Platform.OS) {
            //   case 'ios':
            //       OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);
            //     break;
            //   case 'android':
            //         //TODO
            //     break;
            // }

            if (requestData.slideCode) {
                requestData.smsCode = ""
                requestData.imgCode = ""
                requestData["slideCode[nc_sid]"] = requestData.slideCode["nc_csessionid"]
                requestData["slideCode[nc_token]"] = requestData.slideCode["nc_token"]
                requestData["slideCode[nc_sig]"] = requestData.slideCode["nc_sig"]
                delete requestData.slideCode
            }
          // console.log('requestData.requestData: ', requestData)
            const { data, status } = await APIRouter.user_reg({ ...requestData, pwd: password, regType: regType, fundPwd: fundPwd })
            reRenderCode()

            if (data?.data == null) {
                throw { message: data?.msg }
            }

            ugLog('data?.data?.autoLogin=', data?.data?.autoLogin)
            if (data?.data?.autoLogin) {
                let user;

                switch (Platform.OS) {
                    case 'ios':
                        user = await OCHelper.call('UGUserModel.currentUser');
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                        break;
                    case 'android':
                        user = await ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.USER_INFO });
                        Toast('注册成功')
                        break;
                }

                const { data: loginData, status } = await APIRouter.user_login(data.data.usr, password)
                ugLog('log info=', loginData)

                if (user) {
                    console.log('退出旧账号');
                    console.log(user);
                    switch (Platform.OS) {
                        case 'ios':
                            const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                            await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
                            await OCHelper.call('UGUserModel.setCurrentUser:');
                            break;
                        case 'android':
                            await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.LOGIN_INFO });
                            await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.USER_INFO });
                            break;
                    }

                    UGStore.dispatch({ type: 'reset', userInfo: {} })
                }

                switch (Platform.OS) {
                    case 'ios':
                        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.usr], 'userName']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.pwd], 'userPsw']);
                        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                        break;
                    case 'android':
                        await ANHelper.callAsync(CMD.SAVE_DATA,
                            {
                                key: NA_DATA.LOGIN_INFO,
                                ...loginData?.data
                            });
                        break;
                }

                const { data: UserInfo, } = await APIRouter.user_info()
              ugLog('log UserInfo=', UserInfo)

                switch (Platform.OS) {
                    case 'ios':
                        await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo.data, ...UGUserModel.getYS(loginData?.data) }]);
                        break;
                    case 'android':
                        await ANHelper.callAsync(CMD.SAVE_DATA,
                            {
                                key: NA_DATA.USER_INFO,
                                ...UserInfo?.data
                            })
                        break;
                }

                UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });

                UGStore.save();
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                        break;
                    case 'android':
                        Toast('登录成功');
                        break;
                }

                hideLoading();
                popToRoot();
            } else if (data?.data?.autoLogin == false) {
              switch (Platform.OS) {
                case 'ios':
                  OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
                  break;
                case 'android':
                  Toast(data.msg);
                  break;
              }

              hideLoading();
              popToRoot();
              navigate(PageName.ZLLoginPage, { usr: requestData[FormName.usr], pwd: requestData[FormName.pwd] })
            }
        } catch (error) {
          hideLoading();

          ugLog(error)
            EventRegister.emit('reload')
            reRenderCode()
            if (error.message.includes("推荐人")) {
                Alert.alert(error?.message, "")

                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
                        break;
                    case 'android':
                        Toast(error?.message ?? '注册失败');
                        break;
                }
            } else {
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '注册失败']);
                        break;
                    case 'android':
                        Toast(error?.message ?? '注册失败');
                        break;
                }
            }

        }

    }
    useEffect(() => {
        if (allowreg == false) {
            Alert.alert(closeregreason, "", [{
                text: "确定",
                onPress: () => {
                    popToRoot()
                }
            }])
        }
    }, [allowreg])
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
            let eData = e?.nativeEvent?.data;
            console.log("sliding response: " + eData)

            if (eData?.startsWith('{')
              && eData?.endsWith('}')) {
                onChange(JSON.parse(eData))
            } else if (typeof eData == 'string') {
                setWebViewHeight(parseInt(eData) * 1.5)
            } else {
                onChange(eData)
            }
        }
        const webViewRef = useRef<WebView>()
        useEffect(() => {
            const listener = EventRegister.addEventListener('reload', (data) => {
                webViewRef?.current?.reload()
            })
            return (() => EventRegister.removeEventListener(this.listener))
        }, [])

        let slidingUrl = `${AppDefine.host}/dist/index.html#/swiperverify?platform=native`;
        ugLog('slidingUrl=' + slidingUrl)

        return (
            <WebView
                ref={webViewRef}
                style={{ flex: 1, minHeight: webviewHeight, backgroundColor: 'black' }}
                containerStyle={{ backgroundColor: 'black' }}
                javaScriptEnabled
                injectedJavaScript={webViewScript}

                startInLoadingState
                source={{ uri: slidingUrl }}
                onMessage={hadnleMessage}
            />
        );
    }
    const getVcode = useMemo(() => {
        ugLog('sliding reg_vcode=', reg_vcode)
        if (reg_vcode == 0) {
            return null
        } else if (reg_vcode == 3 || reg_vcode == 1) {
            return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} control={control} code={code} />
        } else {
            return <Controller control={control} onChange={args => {
                ugLog('sliding code=', args)
                return args[0]
            }} as={SlidingVerification} name={"slideCode"} />
        }
    }, [reg_vcode, code])
    useEffect(() => {
        console.log(errors)
        Object.keys(errors).map((res) => {
            switch (Platform.OS) {
                case 'ios':
                    OCHelper.call('SVProgressHUD.showErrorWithStatus:', [errors?.[res]?.message]);
                    break;
                case 'android':
                    Toast(errors?.[res]?.message);
                    break;
            }
            return
        })
    }, [errors])

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 10 }}>
                <UGText style={{ textAlign: 'center', color: 'white', fontSize: 20, marginTop: 15, marginBottom: 20, fontWeight: "bold" }}>账户注册</UGText>
                <UGText style={{ textAlign: 'left', color: 'white', fontSize: 14, marginTop: 15, marginBottom: 20, fontWeight: "bold" }}>为了您的资金安全，请使用真实资料!</UGText>
                <ZLRegInput iconName={"user"} message={"请输入推荐人ID"} placeholder={"请输入推荐人ID"} regConfig={hide_reco} control={control} name={FormName.inviter} />
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}>
                    <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="user" type="font-awesome" color="black" size={24} />
                    </View>
                    <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
                    <Controller
                        maxLength={15}
                        onChange={args => {
                            ugLog('sliding view args=', args)
                            return args[0].nativeEvent.text
                        }}
                        style={{ flex: 1 }}
                        placeholderTextColor={'black'}
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
                        placeholder={'6-15位英文或数字的组合'}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}>
                    <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="lock" type="font-awesome" color="black" size={24} />
                    </View>
                    <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
                    <Controller
                        maxLength={15}
                        placeholderTextColor={'black'}
                        onChange={args => {
                            return args[0].nativeEvent.text
                        }}
                        style={{ flex: 1 }}
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
                                    console.log(regex.test(value))

                                    return regex.test(value) || '密码须有数字及字母'
                                } else if (pass_limit == 2) {
                                    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/
                                    console.log(regex.test(value))

                                    return regex.test(value) || '密码须有数字及字母及字符'
                                }

                            }
                        }}
                        name={FormName.pwd}
                        control={control}
                        defaultValue=""
                        placeholder={pass_length_min + '-' + pass_length_max + '位英文或数字的组合'}
                    />
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            setSecureTextEntry(secureTextEntry => !secureTextEntry)
                        }}>
                        <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}>
                    <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="lock" type="font-awesome" color="black" size={24} />
                    </View>
                    <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
                    <Controller
                        secureTextEntry={repwdSecureTextEntry}
                        placeholderTextColor={'black'}
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
                        placeholder={'请再次确认密码'}
                    />
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            setRepwdSecureTextEntry(secureTextEntry => !secureTextEntry)
                        }}>
                        <Icon name={repwdSecureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
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
                        <UGText style={{ color: 'white' }}>普通用户</UGText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setRegType('agent')
                    }} style={{ backgroundColor: regType == 'agent' ? 'blue' : 'black', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
                        <UGText style={{ color: 'white' }}>注册代理</UGText>
                    </TouchableOpacity>
                </View> : null}


                <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
                    <View style={{
                        flex: 1,
                        height: 50, backgroundColor: "#b67866",
                        borderRadius: 8,
                        marginTop: 20, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <UGText style={{ color: "white", fontSize: 20 }}>注册</UGText>
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
        <View style={{ height: 68 + top, paddingTop: top, backgroundColor: "#1a1a1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
            <TouchableWithoutFeedback onPress={() => {
                pop();
                switch (Platform.OS) {
                    case "ios":
                        OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                        break;
                }
            }}>
                <Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
                navigate(PageName.ZLLoginPage, {})
            }}>
                <UGText style={{ color: "#68abf9", fontSize: 18, fontWeight: "bold" }}>登录</UGText>
            </TouchableWithoutFeedback>

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
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data?.msg]);
                        break;
                    case 'android':
                        Toast(data?.msg);
                        break;
                }
            }

        } catch (error) {
            ugLog(error)
            switch (Platform.OS) {
                case 'ios':
                    OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error.message]);
                    break;
                case 'android':
                    Toast(error.message);
                    break;
            }
        }

    }
    if (regConfig == 0 || regConfig == "0" || regConfig == false) {
        return null
    } else {
        return <View style={{
            flexDirection: 'row', alignItems: 'center', height: 50,
            backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10
        }}>
            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={iconName} type={iconType} color="black" size={24} />
            </View>
            <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
            <Controller
                placeholderTextColor={'black'}
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
                placeholder={placeholder + (regConfig == 1 || regConfig == '1' ? "(选填)" : "")}
            />
            {name == FormName.smsCode ? <TouchableOpacity onPress={requestSms}>
                <UGText>获取验证码</UGText>
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
            backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10
        }}>
            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={"Safety"} type={"antdesign"} color="black" size={24} />
            </View>
            <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
            <Controller
                placeholderTextColor={'black'}
                onChange={args => {
                    return args[0].nativeEvent.text
                }}
                secureTextEntry={false}
                style={{ flex: 1 }}
                as={TextInput}
                rules={{
                    required: {
                        value: true,
                        message: "请输入验证码"
                    }
                }}
                name={FormName.imgCode}
                control={control}
                defaultValue=""
                placeholder={"请输入验证码"}
            />
            {!hide ? <TouchableWithoutFeedback onPress={onPress}>
                <Image resizeMode={'contain'} style={{ height: "100%", aspectRatio: 2 }} source={{ uri: code }} />
            </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
                setHide(false)
                onPress()
            }}>
                    <UGText>点击显示验证码</UGText>
                </TouchableWithoutFeedback>}

        </View>


    )
}
export default ZLRegisterPage
