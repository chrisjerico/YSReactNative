import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';

import FastImage from 'react-native-fast-image';


import { Icon, } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import { useForm, Controller } from "react-hook-form";
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import APIRouter from '../../../public/network/APIRouter';
import { UGStore } from '../../../redux/store/UGStore';
import { pop, push, navigate } from '../../../public/navigation/RootNavigation';
import useLoginIn from '../../../public/hooks/useLoginIn';
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel';
import PushHelper from '../../../public/define/PushHelper';
import { PageName } from '../../../public/navigation/Navigation';
import { useLanguageContext } from '../../../public/context/LanguageContextProvider';
let errorTimes = 0
const VietnamLogin = ({ route, navigation }) => {
  const { control, errors, handleSubmit } = useForm()
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
        UGStore.dispatch({ type: 'merge', userInfo: userInfo.data });
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
  const { currcentLanguagePackage } = useLanguageContext()
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
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
            height: 50, backgroundColor: "#298dff",
            borderRadius: 16,
            marginTop: 20, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>{currcentLanguagePackage?.["app.log.in"]}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          navigate(PageName.VietnamRegister, {})
        }}>
          <View style={{
            flex: 1,
            height: 50, borderColor: "#298dff",
            borderWidth: 1,
            borderRadius: 30,
            marginTop: 20, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "#298dff", fontSize: 20 }}>{currcentLanguagePackage?.["app.registered"]}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={testPlay}>
          <View style={{
            flex: 1,
            height: 50, borderColor: "#298dff",
            borderWidth: 1,
            borderRadius: 30,
            marginTop: 20, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: "#298dff", fontSize: 20 }}>{currcentLanguagePackage?.["app.demo1"]}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>

  )
}
const Header = () => {
  const { top } = useSafeArea()
  const { currcentLanguagePackage } = useLanguageContext()
  return (
    <View>
      <View style={{ height: top }}></View>
      <View style={{ height: 68, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={() => {
          pop();
          OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
        }}>
          <Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30} />
        </TouchableOpacity >
        <Text>{currcentLanguagePackage?.["app.log.in"]}</Text>
      </View>
    </View>
  )
}
export default VietnamLogin
