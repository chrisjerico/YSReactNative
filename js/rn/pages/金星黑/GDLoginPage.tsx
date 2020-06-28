import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import FastImage from 'react-native-fast-image';
import PushHelper from '../../public/define/PushHelper';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import { Navigation, PageName } from '../../public/navigation/Navigation';
import { Icon, Button } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import APIRouter from '../../public/network/APIRouter';
import useLoginIn from '../../public/hooks/useLoginIn';
import { push, pop } from '../../public/navigation/RootNavigation';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { UGStore } from '../../redux/store/UGStore';
import { ActionType } from '../../redux/store/ActionTypes';
let errorTimes = 0
const GDLoginPage = ({
  route, navigation
}) => {

  const { control, errors, triggerValidation, handleSubmit } = useForm()
  const [accountFocus, setAccountFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const init = async () => {
    let isRemember: boolean = await OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
    setIsRemember(isRemember)
    if (isRemember) {
      const account = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName']);
      control.setValue("account", account)
      const pwd = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw']);
      control.setValue("pwd", pwd)
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
    if (errors?.account) {
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [errors?.account?.message]);
      return
    }
    if (errors?.pwd) {
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [errors?.pwd?.message]);
      return
    }
  }, [errors])
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
  const { loginSuccessHandle } = useLoginIn()
  const onSubmit = async ({ account, pwd }) => {
    const simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
    if (simplePwds.indexOf(this.pwd) > -1) {
      await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
      await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
        { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
        true,
      ]);
      return
    }

    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
      const { data, status } = await APIRouter.user_login(account, pwd.md5(), "")
      if (data.data == null)
        throw { message: data?.msg }
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
      await loginSuccessHandle(data, { account, pwd, isRemember })
    } catch (error) {
      errorTimes += 1
      if (errorTimes >= 3) {
        control.setValue("account", "")
        control.setValue("pwd", "")
      }
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
    }
  }
  return (
    <View style={{ backgroundColor: '#1a1a1e', flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={{ textAlign: 'left', color: 'white', fontSize: 30, marginTop: 10, marginBottom: 5, fontWeight: "bold" }}>欢迎你</Text>
        <Text style={{ textAlign: 'left', color: 'white', fontSize: 12, marginTop: 10, marginBottom: 20, fontWeight: "bold" }}>没有账号,立即<Text onPress={() => {
          push(PageName.GDRegisterPage)
        }} style={{ color: '#cfa461' }}> 注册 </Text>或<Text onPress={testPlay} style={{ color: '#cfa461' }}> 免费试玩 </Text></Text>
        <View style={{ backgroundColor: accountFocus ? "white" : '#34393c', height: 50, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
          <FastImage style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={accountFocus ? 'black' : '#cfa461'} source={{ uri: "http://test10.6yc.com/images/icon-user.png" }}></FastImage>
          <View style={{ height: '40%', width: 1, backgroundColor: accountFocus ? '#8e8e93' : '#cfa461', marginRight: 5 }}></View>
          <Controller
            onBlur={() => {
              setAccountFocus(false)
            }}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1, color: !accountFocus ? '#cfa461' : 'black' }}

            as={<TextInput
              placeholderTextColor={accountFocus ? '#8e8e93' : '#cfa461'}
              onFocus={() => {
                setAccountFocus(true)
              }} />}
            rules={{
              required: {
                value: true, message
                  : "请输入用户名"
              }
            }}
            name="account"
            control={control}
            defaultValue=""
            placeholder={'帐号'}
          />
        </View>
        <View style={{ backgroundColor: pwdFocus ? "white" : '#34393c', height: 50, marginTop: 20, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
          <FastImage style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={pwdFocus ? 'black' : '#cfa461'} source={{ uri: "http://test10.6yc.com/images/icon-pwd.png" }}></FastImage>
          <View style={{ height: '40%', width: 1, backgroundColor: pwdFocus ? '#8e8e93' : '#cfa461', marginRight: 5 }}></View>
          <Controller
            onBlur={() => {
              setPwdFocus(false)

            }}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{ flex: 1, color: !pwdFocus ? '#cfa461' : 'black' }}
            as={<TextInput secureTextEntry={secureTextEntry} placeholderTextColor={pwdFocus ? '#8e8e93' : '#cfa461'} onFocus={() => {

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
            <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={pwdFocus ? "#8e8e93" : '#cfa461'} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
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
            height: 50, backgroundColor: '#cfa461',
            borderRadius: 4,
            marginTop: 20, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "white", fontSize: 14 }}>登录</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          pop()
        }}>
          <View style={{
            flex: 1,
            height: 50,
            borderRadius: 8,
            marginTop: 10, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "white", fontSize: 14 }}>返回首页</Text>
          </View>
        </TouchableWithoutFeedback>
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
        OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
      }}>
        <Icon name="keyboard-arrow-left" type="materialIcon" color="rgba(142, 142, 147,1)" size={30} />
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback onPress={() => {
        push(PageName.ZLRegisterPage)
      }}>
        <Text style={{ color: "#68abf9", fontSize: 18, fontWeight: "bold" }}>注册</Text>
      </TouchableWithoutFeedback> */}
    </View>
  )
}
export default GDLoginPage
