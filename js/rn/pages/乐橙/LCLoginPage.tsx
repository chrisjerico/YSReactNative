import * as React from "react";
import {TextInput, View, Text, TouchableOpacity, Platform} from "react-native";
import {BaseScreen} from "./component/BaseScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import useLoginIn from "../../public/hooks/useLoginIn";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {UGStore} from "../../redux/store/UGStore";
import {navigate, pop} from "../../public/navigation/RootNavigation";
// @ts-ignore
import md5 from "blueimp-md5";
import DialogInput from 'react-native-dialog-input';
import {PageName} from "../../public/navigation/Navigation";

let errorTimes = 0
const LCLoginPage = ({route, navigation, setProps}) => {
    const [isRemember, setIsRemember] = useState(false)
    const [acc, setAcc] = useState("")
    const [pwd, setPwd] = useState("")
    const [GGmodalShow, setGGModalShow] = useState(false)
    const {loginSuccessHandle} = useLoginIn()

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
            const {data, status} = await APIRouter.user_guestLogin()
            if (Platform.OS == 'ios') {
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                //@ts-ignore
                await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
                await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                const {data: userInfo} = await APIRouter.user_info()
                await UGStore.dispatch({type: 'merge', userInfo: userInfo?.data});
                UGStore.save();
                setProps()
                OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
            }
        } catch (error) {
            console.log(error)
        }
        pop();
    }

    const login = async ({account, pwd, googleCode = "", slideCode}: { account: string, pwd: string, googleCode?: string, slideCode?: any }) => {
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
            setProps()
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
        <BaseScreen screenName={"登录"}>
            <View style={{marginHorizontal: 24, top: 46}}>
                <View style={{
                    flexDirection: "row",
                    paddingVertical: 16,
                    paddingHorizontal: 4,
                    borderBottomWidth: 1,
                    borderColor: "#dddddd"
                }}>
                    <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"user-o"}/>
                    <TextInput style={{flex: 1}} onChangeText={(text) => setAcc(text)} placeholder={'请输入账号'}/>
                </View>
                <View style={{
                    marginTop: 8,
                    flexDirection: "row",
                    paddingVertical: 16,
                    paddingHorizontal: 4,
                    borderBottomWidth: 1,
                    borderColor: "#dddddd"
                }}>
                    <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"unlock-alt"}/>
                    <TextInput style={{flex: 1}} onChangeText={(text) => setPwd(text)} placeholder={'请输入密码'}/>
                </View>
                {/*<TouchableOpacity onPress={() => setIsRemember(!isRemember)}>*/}
                <View style={{flexDirection: "row", alignItems: "center", paddingTop: 24}}>
                    <CheckBox
                        boxType={'square'}
                        style={{height: 20, width: 20, borderColor: "black"}}
                        value={isRemember}
                        onValueChange={setIsRemember}
                    />
                    <Text style={{paddingLeft: 8}}>记住密码</Text>
                </View>
                <View style={{paddingTop: 16}}>
                    {pwd != "" && acc != "" ? <TouchableOpacity style={{
                        marginTop: 8,
                        backgroundColor: "gold",
                        borderRadius: 4,
                        borderBottomWidth: 1,
                        borderColor: "#dddddd"
                    }} onPress={() => login({account: acc, pwd})} >
                        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>登录</Text>
                    </TouchableOpacity> : <TouchableOpacity disabled={true} style={{
                        marginTop: 8,
                        backgroundColor: "#ffefae",
                        borderRadius: 4,
                        borderBottomWidth: 1,
                        borderColor: "#dddddd"
                    }}>
                        <Text style={{alignSelf: "center", paddingVertical: 20, color: "#ddd"}}>登录</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity style={{
                        marginTop: 8,
                        backgroundColor: "#dedede",
                        borderRadius: 4,
                        borderBottomWidth: 1,
                        borderColor: "#dddddd"
                    }}>
                        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>马上注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 8,
                        backgroundColor: "#dedede",
                        borderRadius: 4,
                        borderBottomWidth: 1,
                        borderColor: "#dddddd"
                    }} onPress={() => testPlay()}>
                        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>免费试玩</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 8,
                        backgroundColor: "#dedede",
                        borderRadius: 4,
                        borderBottomWidth: 1,
                        borderColor: "#dddddd"
                    }} onPress={() => navigate(PageName.LCHomePage)}>
                        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>返回首页</Text>
                    </TouchableOpacity>
                </View>
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

export default LCLoginPage
