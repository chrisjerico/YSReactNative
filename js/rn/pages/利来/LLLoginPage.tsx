import * as React from "react";
import {useEffect, useState} from "react";
import {Image, Platform, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {BaseScreen} from "../乐橙/component/BaseScreen";
import {CheckBox} from "./component/CheckBox";
import useLoginIn from "../../public/hooks/useLoginIn";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import PushHelper from "../../public/define/PushHelper";
import {UGUserCenterType} from "../../redux/model/全局/UGSysConfModel";
import useTryPlay from "../../public/hooks/useTryPlay";
import {navigate, pop, push} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import DialogInput from 'react-native-dialog-input';
// @ts-ignore
import md5 from 'blueimp-md5';
import {httpClient} from "../../public/network/httpClient";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {UGStore} from "../../redux/store/UGStore";
import {ActionType} from "../../redux/store/ActionTypes";

let errorTimes = 0
export const LLLoginPage = ({ route, navigation }) => {
    const [acc, setAcc] = useState("")
    const [pwd, setPwd] = useState("")
    const {loginSuccessHandle} = useLoginIn()
    const [isRemember, setIsRemember] = useState(false)
    const [GGmodalShow, setGGModalShow] = useState(false)

    const init = async () => {
        let isRemember: boolean = await OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
        setIsRemember(isRemember)
        if (isRemember) {
            const account = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName']);
            setAcc(account)
            const pwd = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw']);
            setPwd(pwd)
        }
    }

    useEffect(() => {
        init()
        if (route?.params?.usr && route?.params?.pwd) {
            setAcc(route?.params?.usr)
            setPwd(route?.params?.pwd)
        }
    }, [])

    const testPlay = async () => {
        try {
            const { data, status } = await APIRouter.user_guestLogin()
            if (Platform.OS == 'ios') {
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                //@ts-ignore
                await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                const { data: userInfo } = await APIRouter.user_info()
                UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: userInfo?.data });
                UGStore.save();
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
            }
        } catch (error) {
            console.log(error)
        }
        pop();
    }

    const login = async ({account, pwd, googleCode = "", slideCode}: {account: string, pwd: string, googleCode?: string, slideCode?: any}) => {
        const simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123']
        if (simplePwds.indexOf(pwd) > -1) {
            await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
            await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                {selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController']},
                true,
            ]);
            return
        }
        try {
            OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
            const {data, status} = await APIRouter.user_login(account, md5(pwd), googleCode, slideCode)
            if (data.data == null)
                throw {message: data?.msg}
            if (data.data?.ggCheck == true) {
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['请输入谷歌验证码']);
                setGGModalShow(true)
                return
                // Alert.alert("")
            }
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
            setGGModalShow(false)
            await loginSuccessHandle(data, {account, pwd, isRemember})
        } catch (error) {
            errorTimes += 1
            if (errorTimes >= 3) {
                setAcc("")
                setPwd("")
                setGGModalShow(false)
            }
            OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
        }
    }

    return (
        <BaseScreen screenName={"登录"} style={{backgroundColor: "#f5f5f9", alignItems: "center", paddingHorizontal: 28}}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(238, 238, 238)",
                paddingTop: 12
            }}>
                <Image style={{height: 18, width: 18, marginRight: 8}}
                       source={{uri: "https://test10.6yc.com/images/moban9_icon/icon-user.png"}}/>
                <TextInput
                    onChangeText={(text) => setAcc(text)}
                    style={{fontSize: 14, paddingVertical: 20, flex: 1}}
                    placeholderTextColor={"#333"}
                    placeholder={"请输入会员账号"}/>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(238, 238, 238)",
                paddingTop: 12
            }}>
                <Image style={{height: 18, width: 18, marginRight: 8, resizeMode: "stretch"}}
                       source={{uri: "https://test10.6yc.com/images/moban9_icon/icon-pwd.png"}}/>
                <TextInput
                    onChangeText={(text) => setPwd(text)}
                    style={{fontSize: 14, paddingVertical: 20, flex: 1}}
                    placeholderTextColor={"#333"}
                    placeholder={"请输入密码"}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableHighlight
                    onPress={() => login({account: acc, pwd})}
                    underlayColor={"#007aff"} style={{
                    backgroundColor: acc != "" && pwd != "" ? "#d82e2f" : "#d19898",
                    height: 47,
                    width: "auto",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 12,
                    borderRadius: 4
                }}>
                    <Text style={{color: "white", fontSize: 16}}>登 录</Text>
                </TouchableHighlight>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 12}}>
                <CheckBox onCheck={() => setIsRemember(!isRemember)} text={"记住密码"}/>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}
                                  onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.在线客服)}>
                    <Image style={{height: 24, width: 24}}
                           source={{uri: "https://test10.6yc.com/views/mobileTemplate/20/images/kf.png"}}/>
                    <Text style={{color: "#333333", paddingLeft: 8}}>在线客服</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 16, paddingVertical: 24, color: "#3c3c3c"}}>其他</Text>
            <View style={{flexDirection: "row", marginHorizontal: 12}}>
                <TouchableOpacity style={{alignItems: "center"}} onPress={() => {
                    push(PageName.LLRegisterPage)
                }}>
                    <Image style={{height: 64, width: 64}}
                           source={{uri: "https://test10.6yc.com/views/mobileTemplate/20/images/register.png"}}/>
                    <Text style={{marginTop: 8}}>马上注册</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={{alignItems: "center"}} onPress={() => testPlay()}>
                    <Image style={{height: 64, width: 64}}
                           source={{uri: "https://test10.6yc.com/views/mobileTemplate/20/images/mfsw.png"}}/>
                    <Text style={{marginTop: 8}}>免费试玩</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={{alignItems: "center"}} onPress={() => {
                    PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                }}>
                    <Image style={{height: 64, width: 64}}
                           source={{uri: "https://test10.6yc.com/views/mobileTemplate/20/images/dnb.png"}}/>
                    <Text style={{marginTop: 8}}>电脑版</Text>
                </TouchableOpacity>
            </View>
            <DialogInput isDialogVisible={GGmodalShow}
                         title={"请输入谷歌验证码"}
                         message={""}
                         cancelText={"取消"}
                         submitText={"確定"}
                         hintInput={"请输入谷歌验证码"}
                         submitInput={(inputText) => login({account: acc, pwd: pwd, googleCode: inputText})}
                         closeDialog={() => {
                             setGGModalShow(false)
                         }}/>
        </BaseScreen>
    )
}
