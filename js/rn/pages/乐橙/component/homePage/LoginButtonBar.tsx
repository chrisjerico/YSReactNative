import * as React from "react";
import {TouchableWithoutFeedback, View, Text, Platform} from "react-native";
import PushHelper from "../../../../public/define/PushHelper";
import UGUserModel from "../../../../redux/model/全局/UGUserModel";
import {ActionType} from "../../../../redux/store/ActionTypes";
import APIRouter from "../../../../public/network/APIRouter";
import {IGlobalState, UGStore} from "../../../../redux/store/UGStore";
import {OCHelper} from "../../../../public/define/OCHelper/OCHelper";
import {useSelector} from "react-redux";

export const LoginButtonBar = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "", curLevelTitle, usr, balance, isTest } = userStore
    const testPlay = async () => {
        try {
            OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
            const { data, status } = await APIRouter.user_guestLogin()
            debugger
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
            OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
            console.log(error)
        }
    }

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushLogin()
            }}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>登录</Text>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9}}/>
            <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushRegister()
            }}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>注册</Text>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9}}/>
            <TouchableWithoutFeedback onPress={testPlay}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>试玩</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
