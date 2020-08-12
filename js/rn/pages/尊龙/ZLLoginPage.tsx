import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform, TouchableWithoutFeedback, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import FastImage from 'react-native-fast-image';
import PushHelper from '../../public/define/PushHelper';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import { PageName,  } from '../../public/navigation/Navigation';
import { Icon, } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";
import APIRouter from '../../public/network/APIRouter';
import useLoginIn from '../../public/hooks/useLoginIn';
import { push, pop } from '../../public/navigation/RootNavigation';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { UGStore, IGlobalState } from '../../redux/store/UGStore';
import { ActionType } from '../../redux/store/ActionTypes';
import { useDimensions } from '@react-native-community/hooks';
import DialogInput from 'react-native-dialog-input';
import { useSelector } from 'react-redux';
import { httpClient } from '../../public/network/httpClient';
import { NSValue } from '../../public/define/OCHelper/OCBridge/OCCall';
import {ANHelper, CMD, NA_DATA} from "../../public/define/ANHelper/ANHelper";
import {Toast} from "../../public/tools/ToastUtils";
import {ugLog} from "../../public/tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";

let errorTimes = 0
const ZLLoginPage = ({ route, navigation }) => {

    const { control, errors, handleSubmit } = useForm()
    const [accountFocus, setAccountFocus] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [isRemember, setIsRemember] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [GGmodalShow, setGGModalShow] = useState(false)
    const { isTest } = UGStore.globalProps.userInfo;
    const userData = UGStore.globalProps.userInfo;

    const init = async () => {
        switch (Platform.OS) {
            case "ios":
                let isRemember: boolean = await OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
                setIsRemember(isRemember)
                if (isRemember) {
                    const account = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName']);
                    control.setValue("account", account)
                    const pwd = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw']);
                    control.setValue("pwd", pwd)
                }
                break;
            case "android":
                let result: string = await ANHelper.callAsync(CMD.LOAD_DATA, {key: NA_DATA.LOGIN_INFO})
                let loginInfo = JSON.parse(result);
                setIsRemember(loginInfo?.isRemember)
                if (loginInfo?.isRemember) {
                    control.setValue("account", loginInfo?.account)
                    control.setValue("pwd", loginInfo?.pwd)
                }
                break;

        }
    }
    useEffect(() => {
        init()
        if (route?.params?.usr && route?.params?.pwd) {
            control.setValue("account", route?.params?.usr)
            control.setValue("pwd", route?.params?.pwd)
        }
    }, [])
    useEffect(() => {
        switch (Platform.OS) {
            case "ios":
                if (errors?.account) {
                    OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [errors?.account?.message]);
                    return
                }
                if (errors?.pwd) {
                    OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [errors?.pwd?.message]);
                    return
                }
                break;
            case "android":
                Toast(errors?.account?.message ?? errors?.pwd?.message);
                break;

        }
    }, [errors])
    const testPlay = async () => {
        try {
            showLoading({ type: UGLoadingType.Loading });

            const { data, status } = await APIRouter.user_guestLogin()
            ugLog("data=", data, status)

            switch (Platform.OS) {
                case "ios":
                    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                    //@ts-ignore
                    await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
                    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                    await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                    break;
                case "android":
                    await ANHelper.callAsync(CMD.SAVE_DATA,
                        {
                            key: NA_DATA.LOGIN_INFO,
                            ...data?.data
                        });
                    break;
            }

            const { data: userInfo } = await APIRouter.user_info()

            switch (Platform.OS) {
                case "ios":
                    //TODO
                    break;
                case "android":
                    await ANHelper.callAsync(CMD.SAVE_DATA,
                      {
                          key: NA_DATA.USER_INFO,
                          ...userInfo?.data
                      })
                    break;
            }

            UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data });
            UGStore.save();

            Toast('登录成功！')
            // switch (Platform.OS) {
            //     case "ios":
            //         OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
            //         break;
            //     case "android":
            //         Toast('登录成功！')
            //         break;
            // }

            pop();
        } catch (error) {
            console.log(error)
        }

        hideLoading()
    }
    const { loginSuccessHandle } = useLoginIn()
    const onSubmit = async ({ account, pwd, googleCode = "", slideCode }) => {
        const simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
        if (simplePwds.indexOf(pwd) > -1) {
            switch (Platform.OS) {
                case "ios":
                    await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
                    await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                        { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                        true,
                    ]);
                    break;
                case "android":
                    Toast('你的密码过于简单，可能存在风险，请把密码修改成复杂密码')
                    break;

            }
            return
        }
        try {
            // switch (Platform.OS) {
            //     case "ios":
            //         OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
            //         break;
            //     case "android":
            //         Toast('正在登录...')
            //         break;
            //
            // }
            showLoading({ type: UGLoadingType.Loading, text: '正在登录...' });

            const { data, status } = await APIRouter.user_login(account, pwd.md5(), googleCode, slideCode)
            if (data.data == null)
                throw { message: data?.msg }
            if (data.data?.ggCheck == true) {
                switch (Platform.OS) {
                    case "ios":
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['请输入谷歌验证码']);
                        break;
                    case "android":
                        Toast('请输入谷歌验证码')
                        break;

                }
                setGGModalShow(true)
                return
                // Alert.alert("")
            }
            switch (Platform.OS) {
                case "ios":
                    OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    break;
                case "android":
                    Toast('登录成功！')
                    break;

            }
            setGGModalShow(false)
            await loginSuccessHandle(data, { account, pwd, isRemember })
        } catch (error) {
            errorTimes += 1
            if (errorTimes >= 3) {
                control.setValue("account", "")
                control.setValue("pwd", "")
                setGGModalShow(false)
            }
            switch (Platform.OS) {
                case "ios":
                    OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
                    break;
                case "android":
                    Toast(error?.message ?? '登入失败')
                    break;

            }
        }

        hideLoading()
    }

    return (
        <View style={{ backgroundColor: '#1a1a1e', flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, marginTop: 10, marginBottom: 20, fontWeight: "bold" }}>账号登录</Text>
                <View style={{ backgroundColor: accountFocus ? "white" : '#34393c', height: 50, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={accountFocus ? 'black' : 'white'} source={{ uri: "http://test10.6yc.com/images/icon-user.png" }}></FastImage>
                    <View style={{ height: '40%', width: 1, backgroundColor: accountFocus ? '#8e8e93' : "white", marginRight: 5 }}></View>
                    <Controller
                        onBlur={() => {
                            setAccountFocus(false)
                        }}
                        onChange={args => {
                            return args[0].nativeEvent.text
                        }}
                        style={{ flex: 1, color: !accountFocus ? 'white' : 'black' }}

                        as={<TextInput
                            placeholderTextColor={accountFocus ? '#8e8e93' : "white"}
                            onFocus={() => {
                                setAccountFocus(true)
                            }} />}
                        rules={{
                            required: {
                                value: true,
                                message : "请输入用户名"
                            }
                        }}
                        name="account"
                        control={control}
                        defaultValue=""
                        placeholder={'帐号'}
                    />
                </View>
                <View style={{ backgroundColor: pwdFocus ? "white" : '#34393c', height: 50, marginTop: 20, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={pwdFocus ? 'black' : 'white'} source={{ uri: "http://test10.6yc.com/images/icon-pwd.png" }}></FastImage>
                    <View style={{ height: '40%', width: 1, backgroundColor: pwdFocus ? '#8e8e93' : "white", marginRight: 5 }}></View>
                    <Controller
                        onBlur={() => {
                            setPwdFocus(false)

                        }}
                        onChange={args => {
                            return args[0].nativeEvent.text
                        }}
                        style={{ flex: 1, color: !pwdFocus ? 'white' : 'black' }}
                        as={<TextInput secureTextEntry={secureTextEntry} placeholderTextColor={pwdFocus ? '#8e8e93' : "white"} onFocus={() => {

                            setPwdFocus(true)
                        }} />} name="pwd" rules={{
                            required: {
                                value: true, message
                                    : "请输入密码"
                            }
                        }} control={control} defaultValue="" placeholder={'密码'} />
                    <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => {
                            setSecureTextEntry(secureTextEntry => !secureTextEntry)
                        }}>
                        <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={pwdFocus ? "#8e8e93" : "rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
                    }} style={{ color: '#8e8e93', fontSize: 14 }}>忘记密码?</Text>
                    <TouchableWithoutFeedback

                        onPress={() => {
                            setIsRemember(isRemember => !isRemember)
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                borderWidth: 1, borderColor: 'white',
                                width: 18, height: 18,
                                borderRadius: 5
                            }}>
                                {isRemember ? (
                                    <Icon name='check'
                                        type='foundation' color="white" size={13} />
                                ) : null}
                            </View>
                            <Text style={{ color: '#8e8e93', fontSize: 14, marginLeft: 3 }}>记住密码</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
                    <View style={{
                        flex: 1,
                        height: 50, backgroundColor: "#b67866",
                        borderRadius: 8,
                        marginTop: 20, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: "white", fontSize: 20 }}>登录</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={testPlay}>
                    <View style={{
                        flex: 1,
                        height: 50, backgroundColor: "#a09e9d",
                        borderRadius: 8,
                        marginTop: 20, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: "white", fontSize: 20 }}>免费试玩</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <DialogInput isDialogVisible={GGmodalShow}
                title={"请输入谷歌验证码"}
                message={""}
                cancelText={"取消"}
                submitText={"確定"}
                hintInput={"请输入谷歌验证码"}
                submitInput={(inputText) => onSubmit({ account: control.getValues("account"), pwd: control.getValues("pwd"), googleCode: inputText })}
                closeDialog={() => { setGGModalShow(false) }}>
            </DialogInput>
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
                <Icon name="close" type="materialIcon" color="rgba(142, 142, 147,1)" size={30} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
                push(PageName.ZLRegisterPage)
            }}>
                <Text style={{ color: "#68abf9", fontSize: 18, fontWeight: "bold" }}>注册</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
export default ZLLoginPage
