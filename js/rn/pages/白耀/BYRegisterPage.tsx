import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import {
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {BaseScreen} from "../乐橙/component/BaseScreen";
import AppDefine from "../../public/define/AppDefine";
import {navigate, popToRoot} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import {UGStore} from "../../redux/store/UGStore";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {EventRegister} from "react-native-event-listeners";
// @ts-ignore
import md5 from 'blueimp-md5';
import {Toast} from "../../public/tools/ToastUtils";
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../public/define/ANHelper/hp/DataDefine";
import WebView, {WebViewMessageEvent} from "react-native-webview";
import {ugLog} from "../../public/tools/UgLog";
import {Icon} from "react-native-elements";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {BYRegisterInput} from "./component/registerPage/BYRegisterInput";
import {httpClient} from "../../public/network/httpClient";

export const BYRegisterPage = () => {
    const [acc, setAcc] = useState("")
    const [pwd, setPwd] = useState("")
    const [code, setCode] = useState("")
    const [smsCode, setSmsCode] = useState("")
    const [imgCode, setImgCode] = useState("")
    const [email, setEmail] = useState("")
    const [inviter, setInviter] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [regType, setRegType] = useState<'user' | 'agent'>("user")
    const regex = RegExp("^[A-Za-z0-9]{6,15}$")
    const SystemStore = UGStore.globalProps.sysConf
    const [slideCode, setSlideCode] = useState()
    const {
        mobile_logo = "",
        rankingListSwitch,
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
        smsVerify, // 手机短信验证
        allowreg,
        closeregreason
    } = SystemStore

    useEffect(() => {
        if (reg_vcode == 1) {
            reRenderCode()
        }
    }, [reg_vcode])

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

    const reRenderCode = async () => {
        try {
            const {data, status} = await APIRouter.secure_imgCaptcha()
            setCode(data)
        } catch (error) {
        }
    }

    const getVcode = useMemo(() => {
        ugLog('sliding reg_vcode=', reg_vcode)
        if (reg_vcode == 0) {
            return null
        } else if (reg_vcode == 3 || reg_vcode == 1) {
            return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} code={code}/>
        } else {
            return <SlidingVerification onChange={args => {
                ugLog('sliding code=', args)
                setSlideCode(args)
            }}/>
        }
    }, [reg_vcode, code])

    const onSubmit = async () => {
        try {
            const password = md5(pwd)
            const fundPwd = ""
            let smsCode_ = smsCode
            let imgCode_ = imgCode
            showLoading({type: UGLoadingType.Loading, text: '正在注册...'});

            if (slideCode) {
                smsCode_ = ""
                imgCode_ = ""
                console.log(slideCode)
            }

            const {data, status} =
                await APIRouter.user_reg({
                    usr: acc,
                    pwd: password,
                    fundPwd,
                    regType: regType,
                    "slideCode[nc_sid]": slideCode ? slideCode["nc_csessionid"] : "",
                    "slideCode[nc_token]": slideCode ? slideCode["nc_token"] : "",
                    "slideCode[nc_sig]": slideCode ? slideCode["nc_sig"] : "",
                    smsCode: smsCode_,
                    imgCode: imgCode_,
                    email,
                    inviter
                })

            reRenderCode()

            if (data?.data == null)
                throw {message: data?.msg}

            ugLog('data?.data?.autoLogin=', data?.data?.autoLogin)

            if (data?.data?.autoLogin) {
                let user
                switch (Platform.OS) {
                    case 'ios':
                        user = await OCHelper.call('UGUserModel.currentUser');
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                        break;
                    case 'android':
                        user = await ANHelper.callAsync(CMD.LOAD_DATA, {key: NA_DATA.USER_INFO});
                        Toast('注册成功')
                        break;
                }

                const {data: loginData, status} = await APIRouter.user_login(data.data.usr, password)

                if (user) {
                    console.log('退出旧账号: ', user)
                    switch (Platform.OS) {
                        case 'ios':
                            const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                            await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{token: sessid}]);
                            await OCHelper.call('UGUserModel.setCurrentUser:');
                            break;
                        case 'android':
                            await ANHelper.callAsync(CMD.SAVE_DATA, {key: NA_DATA.LOGIN_INFO});
                            await ANHelper.callAsync(CMD.SAVE_DATA, {key: NA_DATA.USER_INFO});
                            break;
                    }
                    UGStore.dispatch({type: 'reset'})
                }

                switch (Platform.OS) {
                    case 'ios':
                        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [acc, 'userName']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [pwd, 'userPsw']);
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
                const {data: UserInfo,} = await APIRouter.user_info()

                switch (Platform.OS) {
                    case 'ios':
                        await OCHelper.call('UGUserModel.setCurrentUser:', [{...UserInfo.data, ...UGUserModel.getYS(loginData?.data)}]);
                        break;
                    case 'android':
                        await ANHelper.callAsync(CMD.SAVE_DATA,
                            {
                                key: NA_DATA.USER_INFO,
                                ...UserInfo?.data
                            })
                        break;
                }

                UGStore.dispatch({type: 'merge', props: UserInfo?.data});

                UGStore.save();

                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                        break;
                    case 'android':
                        Toast('登录成功')
                        break;
                }

                hideLoading();
                popToRoot();
            }
            if (data?.data?.autoLogin == false) {
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
                        break;
                    case 'android':
                        Toast(data.msg ?? "")
                        break;
                }

                hideLoading();
                popToRoot();
                navigate(PageName.BYLoginPage, {usr: acc, pwd: pwd})
            }
        } catch (error) {
            hideLoading();
            EventRegister.emit('reload')
            if (error.message.includes("推荐人")) {
                Alert.alert(error?.message, "")
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
                        break;
                    case 'android':

                        break;
                }
            } else {
                switch (Platform.OS) {
                    case 'ios':
                        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '注册失败']);
                        break;
                    case 'android':
                        Toast(error?.message ?? '注册失败')
                        break;
                }
            }

        }
    }

    return (
        <BaseScreen screenName={"注册"}>
            <StatusBar barStyle="dark-content" translucent={true}/>
            <View style={{alignItems: "center", width: AppDefine.width, height: 140}}>
                <Image style={{width: AppDefine.width, height: 182, resizeMode: "stretch", position: "absolute"}}
                       source={{uri: httpClient.defaults.baseURL + "/views/mobileTemplate/20/images/login-blue-bg.png"}}/>
                <Image style={{width: 150, height: 150, resizeMode: "stretch"}}
                       source={{uri: mobile_logo}}/>
            </View>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                            style={{marginHorizontal: 36, marginTop: 28, marginBottom: 30}}>
                    <BYRegisterInput visible={hide_reco != 0} onChangeText={(text) => setInviter(text)}
                                     placeholder={"推荐人或上级代理"}
                                     img={httpClient.defaults.baseURL + "/images/moban9_icon/icon-reco.png"}/>
                    {inviter == "" && <View style={{flexDirection: "row"}}>
                        <Text style={{
                            color: "red",
                            fontSize: 12,
                            textAlign: "left",
                            flex: 1,
                            paddingVertical: 4
                        }}>*请填写推荐人ID</Text>
                    </View>}
                    <BYRegisterInput onChangeText={(text) => setAcc(text)} placeholder={"请输入会员账号（6-15位字母或数字)"}
                                     img={httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png"}/>
                    {!regex.test(acc) && <View style={{flexDirection: "row"}}>
                        <Text style={{
                            color: "red",
                            fontSize: 12,
                            textAlign: "left",
                            flex: 1,
                            paddingVertical: 4
                        }}>*请使用6-15位英文或数字的组合</Text>
                    </View>}
                    <BYRegisterInput isPwd={true} onChangeText={(text) => setPwd(text)} placeholder={"请输入密码（长度不能低于6位)"}
                                     img={httpClient.defaults.baseURL + "/images/moban9_icon/icon-pwd.png"}/>
                    <BYRegisterInput isPwd={true} onChangeText={(text) => setConfirmPwd(text)} placeholder={"请确认密码"}
                                     img={httpClient.defaults.baseURL + "/images/moban9_icon/icon-pwd.png"}/>
                    <BYRegisterInput visible={reg_email != 0} onChangeText={(text) => setEmail(text)} placeholder={"请输入电子邮件"}
                                     img={httpClient.defaults.baseURL + "/images/moban9_icon/icon-email.png"}/>
                    {getVcode}
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={{flex: 1, backgroundColor: "#d19898", borderRadius: 30, marginTop: 12}}
                                          onPress={() => {
                                              onSubmit()
                                          }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "white",
                                    textAlign: "center",
                                    paddingVertical: 16
                                }}>立即开户</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <View style={{flexDirection: "row", marginTop: 16}}>
                            <Text style={{color: "#3c3c3c", fontSize: 14}}>已有账号？</Text>
                            <Text style={{color: "#387ef5", fontSize: 14}} onPress={() => {
                                navigate(PageName.BYLoginPage, "")
                            }}>马上登录</Text>
                        </View>
                        <Text style={{color: "#666", marginTop: 16, fontSize: 14}}>Copyright ©2012-2020 All Right
                            Reserved</Text>
                    </View>
                </ScrollView>
        </BaseScreen>
    )
}

const SlidingVerification = ({onChange}: { onChange: (data: any) => void }) => {
    const webViewScript = `setTimeout(function() {
            document.getElementById('app').style.background = 'white'
            window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight);
          }, 500);
          true;`;
    const [webviewHeight, setWebViewHeight] = useState(0)
    const hadnleMessage = (e: WebViewMessageEvent) => {
        let eData = e?.nativeEvent?.data;
        console.log("sliding response: " + eData)

        if (typeof eData == 'string') {
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
        <View style={{height: webviewHeight}}>
            <WebView
                ref={webViewRef}
                style={{minHeight: webviewHeight, backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', height: 10}}
                javaScriptEnabled
                injectedJavaScript={webViewScript}
                startInLoadingState
                source={{uri: slidingUrl}}
                onMessage={hadnleMessage}
            />
        </View>
    );
}

const LetterVerificationCode = ({code, onPress, reg_vcode}: { code: string, onPress: () => {}, reg_vcode: 1 | 3 }) => {
    const [hide, setHide] = useState(reg_vcode == 1 ? false : true)
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            backgroundColor: 'gray',
            borderRadius: 4,
            borderColor: 'white',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10
        }}>
            <View style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={"Safety"} type={"antdesign"} color="black" size={24}/>
            </View>
            <View style={{height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5}}></View>
            {!hide ? <TouchableWithoutFeedback onPress={onPress}>
                <Image resizeMode={'contain'} style={{height: "100%", aspectRatio: 2}} source={{uri: code}}/>
            </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
                setHide(false)
                onPress()
            }}>
                <Text>点击显示验证码</Text>
            </TouchableWithoutFeedback>}

        </View>


    )
}
