import {Alert, Dimensions, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {navigate, pop, popToRoot} from "../../public/navigation/RootNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import * as React from "react";
import {useState} from "react";
import {UGStore} from "../../redux/store/UGStore";
import {PageName} from "../../public/navigation/Navigation";
import {RegisterItem} from "./component/registerPage/RegisterItem";
// @ts-ignore
import md5 from "blueimp-md5";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {EventRegister} from "react-native-event-listeners";

interface RegisterData {
    acc: string
    pwd: string
    confirmPwd: string
    reco?: string
    reg_name?: string
    reg_fundpwd?: string
    reg_qq?: string
    reg_wx?: string
    reg_phone?: string
    reg_email?: string
    reg_vcdoe?: string
}

const LCRegisterPage = ({navigation, setProps}) => {
    const [regType, setRegType] = useState<'user' | 'agent'>("user")
    const [data, setData] = useState<RegisterData>({acc: "", pwd: "", confirmPwd: ""})
    const SystemStore = UGStore.globalProps.sysConf
    const regex = RegExp("^[A-Za-z0-9]{6,15}$")
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

    const onSubmit = async (registerData) => {
        try {
            const password = md5(registerData.pwd)
            OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);

            // if (requestData.slideCode) {
            //     console.log(requestData.slideCode)
            //     requestData.smsCode = ""
            //     requestData.imgCode = ""
            //     requestData["slideCode[nc_sid]"] = requestData.slideCode["nc_csessionid"]
            //     requestData["slideCode[nc_token]"] = requestData.slideCode["nc_token"]
            //     requestData["slideCode[nc_sig]"] = requestData.slideCode["nc_sig"]
            //     delete requestData.slideCode
            // }

            const {data, status} =
                await APIRouter.user_reg({
                    usr: registerData.acc,
                    pwd: password,
                    regType: regType,
                })
            debugger
            if (data?.data == null)
                throw {message: data?.msg}
            if (data?.data?.autoLogin) {
                const user = await OCHelper.call('UGUserModel.currentUser');

                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                const {data: loginData, status} = await APIRouter.user_login(data.data.usr, password)
                if (user) {
                    console.log('退出旧账号');
                    console.log(user);
                    const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                    await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{token: sessid}]);
                    await OCHelper.call('UGUserModel.setCurrentUser:');
                    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                    UGStore.dispatch({type: 'reset'})
                }
                await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [registerData.acc, 'userName']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [registerData.pwd, 'userPsw']);
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                const {data: UserInfo,} = await APIRouter.user_info()
                await OCHelper.call('UGUserModel.setCurrentUser:', [{...UserInfo.data, ...UGUserModel.getYS(loginData?.data)}]);
                UGStore.dispatch({type: 'merge', props: UserInfo?.data});
                setProps();
                UGStore.save();
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                popToRoot();
            }
            if (data?.data?.autoLogin == false) {
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
                popToRoot();
                navigate(PageName.LCLoginPage, {usr: registerData.acc, pwd: registerData.pwd})
            }
        } catch (error) {
            EventRegister.emit('reload')
            if (error.message.includes("推荐人")) {
                Alert.alert(error?.message, "")
                OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
            } else {
                OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '注册失败']);
            }

        }
    }

    return (
        <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
            <SafeAreaView style={{backgroundColor: "gold"}}>
                <View style={{
                    backgroundColor: "gold",
                    width: Dimensions.get("screen").width,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                }}>
                    <Text style={{
                        paddingTop: 20,
                        paddingBottom: 20,
                        textAlign: "center",
                        fontSize: 17,
                        width: "100%",
                        alignSelf: "center"
                    }}>注册</Text>
                    <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => pop()}>
                        <Icon size={33} name={'angle-left'}/>
                    </TouchableOpacity>
                </View>
                <View style={{height: 40, backgroundColor: "gold"}}/>
            </SafeAreaView>
            <View style={{

                borderWidth: 1,
                backgroundColor: "white",
                borderColor: "#ddd",
                borderRadius: 12,
                bottom: 30
            }}>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 12, marginVertical: 20, maxHeight: 550}}>
                        <Text style={{color: "red", fontSize: 14}}>为了您的资金安全，请使用真实资料!</Text>
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            borderColor: "#ddd",
                            marginTop: 12
                        }}>
                            <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"user-o"}/>
                            <TextInput onChangeText={(text) => setData({...data, acc: text})} placeholder={"帐号"}
                                       style={{flex: 1}}/>
                        </View>
                        {regex.test(data.acc) ?
                            <Text style={{marginTop: 12, fontSize: 12, color: "#6bab64"}}>*该账号可用</Text> :
                            <Text style={{marginTop: 12, fontSize: 12, color: "red"}}>*请使用6-15位英文或数字的组合</Text>
                        }
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            borderColor: "#ddd",
                            marginTop: 12
                        }}>
                            <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"unlock-alt"}/>
                            <TextInput onChangeText={(text) => setData({...data, pwd: text})} placeholder={"密码"}
                                       style={{flex: 1}}/>
                        </View>
                        <Text style={{marginTop: 12, fontSize: 12, color: "red"}}>*请使用至少6位字符</Text>
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            borderColor: "#ddd",
                            marginTop: 12
                        }}>
                            <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"unlock-alt"}/>
                            <TextInput onChangeText={(text) => setData({...data, confirmPwd: text})}
                                       placeholder={"确认密码"} style={{flex: 1}}/>
                        </View>
                        {data.pwd != "" && data.pwd != data.confirmPwd &&
                        <Text style={{marginTop: 12, fontSize: 12, color: "#e00013"}}>*密码不一致</Text>}
                        <RegisterItem placeHolder={"请输入真实姓名"} iconName={"user-o"} config={reg_name} onChangeText={(text) => setData({...data, reg_name: text})}/>
                        <RegisterItem placeHolder={"请输入4数字取款密码"} iconName={"unlock-alt"} config={reg_fundpwd} onChangeText={(text) => setData({...data, reg_fundpwd: text})}/>
                        <RegisterItem placeHolder={"请输入QQ帐号"} iconName={"qq"} iconType={"AntDesign"} config={reg_qq} onChangeText={(text) => setData({...data, reg_qq: text})}/>
                        <RegisterItem placeHolder={"请输入微信号"} iconName={"wechat"} iconType={"AntDesign"}
                                      config={reg_wx} onChangeText={(text) => setData({...data, reg_wx: text})}/>
                        <RegisterItem placeHolder={"请输入手机号码"} iconName={"mobile"} config={reg_phone} onChangeText={(text) => setData({...data, reg_phone: text})}/>
                        <RegisterItem placeHolder={"请输入手机短信验证码"} iconName={"unlock-alt"} config={smsVerify} onChangeText={(text) => setData({...data, reg_vcdoe: text})}/>
                        <RegisterItem placeHolder={"请输入邮箱地址"} iconName={"envelope-o"} config={reg_email} onChangeText={(text) => setData({...data, reg_email: text})}/>
                        <TouchableOpacity
                            onPress={() => onSubmit(data)}
                            style={{paddingVertical: 16, marginTop: 12, borderRadius: 8, backgroundColor: "#ff9c06"}}>
                            <Text style={{alignSelf: "center", color: "white", fontSize: 16}}>注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate(PageName.LCLoginPage)}>
                            <Text style={{marginTop: 28, alignSelf: "center", color: "#7e7e7e"}}>返回登录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate(PageName.LCHomePage)}>
                            <Text style={{marginTop: 28, alignSelf: "center", color: "#7e7e7e"}}>返回首页</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default LCRegisterPage
