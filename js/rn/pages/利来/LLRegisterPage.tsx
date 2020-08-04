import * as React from "react";
import {useState} from "react";
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BaseScreen} from "../乐橙/component/BaseScreen";
import AppDefine from "../../public/define/AppDefine";
import {navigate, popToRoot} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import {IGlobalState, UGStore} from "../../redux/store/UGStore";
import {ActionType} from "../../redux/store/ActionTypes";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {EventRegister} from "react-native-event-listeners";
// @ts-ignore
import md5 from 'blueimp-md5';
import {useSelector} from "react-redux";

export const LLRegisterPage = () => {
    const [acc, setAcc] = useState("")
    const [pwd, setPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [regType, setRegType] = useState<'user' | 'agent'>("user")
    const regex = RegExp("^[A-Za-z0-9]{6,15}$")
    const SystemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
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

    const onSubmit = async () => {
        try {
            const password = md5(pwd)
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

            const {data, status} = await APIRouter.user_reg({
                usr: acc,
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
                    UGStore.dispatch({type: ActionType.Clear_User})
                }
                await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [acc, 'userName']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [pwd, 'userPsw']);
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                const {data: UserInfo,} = await APIRouter.user_info()
                await OCHelper.call('UGUserModel.setCurrentUser:', [{...UserInfo.data, ...UGUserModel.getYS(loginData?.data)}]);
                UGStore.dispatch({type: ActionType.UpdateUserInfo, props: UserInfo?.data});

                UGStore.save();
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                popToRoot();
            }
            if (data?.data?.autoLogin == false) {
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
                popToRoot();
                navigate(PageName.LLLoginPage, {usr: acc, pwd: pwd})
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
        <BaseScreen screenName={"注册"}>
            <View style={{alignItems: "center", width: AppDefine.width, height: 140}}>
                <Image style={{width: AppDefine.width, height: 140, resizeMode: "stretch", position: "absolute"}}
                       source={{uri: "https://test10.6yc.com/views/mobileTemplate/20/images/login-blue-bg.png"}}/>
                <Image style={{width: 290, height: 80, top: 20}}
                       source={{uri: "https://cdn01.zdwoodfactory.cn/upload/t010/customise/images/m_logo.jpg?v=1578471928"}}/>
            </View>
            <View style={{flex: 1, alignItems: "center", marginHorizontal: 36}}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d0d0",
                    paddingTop: 12
                }}>
                    <Image style={{height: 18, width: 18, marginRight: 8}}
                           source={{uri: "https://test10.6yc.com/images/moban9_icon/icon-user.png"}}/>
                    <TextInput
                        maxLength={15}
                        onChangeText={(text) => {
                            setAcc(text)
                        }}
                        style={{fontSize: 14, paddingVertical: 20, flex: 1}}
                        placeholderTextColor={"#333"}
                        placeholder={"请输入会员账号（6-15位字母或数字)"}/>
                </View>
                {!regex.test(acc) && <View style={{flexDirection: "row"}}>
                    <Text style={{
                        color: "red",
                        fontSize: 12,
                        textAlign: "left",
                        flex: 1,
                        paddingVertical: 4
                    }}>*请使用6-15位英文或数字的组合</Text>
                </View>}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d0d0",
                    paddingTop: 12,
                    justifyContent: "center"
                }}>
                    <Image style={{height: 18, width: 18, marginRight: 8, resizeMode: "stretch"}}
                           source={{uri: "https://test10.6yc.com/images/moban9_icon/icon-pwd.png"}}/>
                    <TextInput
                        onChangeText={(text) => setPwd(text)}
                        style={{fontSize: 14, paddingVertical: 20, flex: 1}}
                        placeholderTextColor={"#333"}
                        placeholder={"请输入密码（长度不能低于6位)"}/>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d0d0",
                    paddingTop: 12,
                    justifyContent: "center"
                }}>
                    <Image style={{height: 18, width: 18, marginRight: 8, resizeMode: "stretch"}}
                           source={{uri: "https://test10.6yc.com/images/moban9_icon/icon-pwd.png"}}/>
                    <TextInput
                        onChangeText={(text) => setConfirmPwd(text)}
                        style={{fontSize: 14, paddingVertical: 20, flex: 1}}
                        placeholderTextColor={"#333"}
                        placeholder={"请确认密码"}/>
                </View>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: "#d19898", borderRadius: 30, marginTop: 12}}
                                      onPress={() => {
                                          onSubmit()
                                      }}>
                        <Text
                            style={{fontSize: 16, color: "white", textAlign: "center", paddingVertical: 16}}>立即开户</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", marginTop: 16}}>
                    <Text style={{color: "#3c3c3c", fontSize: 14}}>已有账号？</Text>
                    <Text style={{color: "#387ef5", fontSize: 14}} onPress={() => {
                        navigate(PageName.LLLoginPage, "")
                    }}>马上登录</Text>
                </View>
                <Text style={{color: "#666", marginTop: 16, fontSize: 14}}>Copyright ©2012-2020 All Right
                    Reserved</Text>
            </View>
        </BaseScreen>
    )
}
