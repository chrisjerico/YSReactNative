import React, { useState, useEffect } from 'react';
import {View, Text, Platform, PlatformIOSStatic, PlatformAndroidStatic} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'react-native-elements';
import WebView from 'react-native-webview';
import AppDefine from '../../public/define/AppDefine';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import UGTextField from '../../public/widget/UGTextField';
import PushHelper from '../../public/define/PushHelper';
import { connect } from 'react-redux';
import {  PageName } from '../../public/navigation/Navigation';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { UGStore } from '../../redux/store/UGStore';
import { UGBasePageProps } from '../base/UGPage';
import { number } from 'prop-types';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { UGLoadingType, showLoading } from '../../public/widget/UGLoadingCP';
import { XBJRegisterProps } from './XBJRegisterPage';
import { navigate } from '../../public/navigation/RootNavigation';


// 声明成员变量
interface XJBLoginVars {
  account: string; // 账号
  pwd: string; // 密码
  errorTimes: number; // 失败次数大于3时需要滑动验证
  slideCode: SlideCodeModel; // 滑动验证码
  googleCode: string; // 谷歌验证码
}

// 声明Props
export interface XBJLoginProps extends UGBasePageProps<XBJLoginProps, XJBLoginVars> {
  rememberPassword?: boolean; // 是否记住密码
}

// 滑动验证
function SlidingVerification(props: { hidden: boolean }) {
  return (
    <View style={{ marginTop: 13, height: props.hidden ? 0 : 52, borderRadius: 26, overflow: 'hidden' }}>
      <WebView
        style={{ marginLeft: -15, marginRight: -14, marginTop: -22, flex: 1 }}
        javaScriptEnabled
        startInLoadingState
        source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
        onMessage={(e) => {
          console.log('e=');
          console.log(e);
        }}
      />
    </View>
  );
}

export const XBJLoginPage = (props: XBJLoginProps) => {
  let { setProps, vars: v } = props;

  useEffect(() => {
    async function getLocalPwd() {
      let isRemember = false;

      switch (Platform.OS) {
        case 'ios':
          isRemember = await OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
          if (isRemember) {
            v.account = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName'])
            v.pwd = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])
          }
          break;
        case 'android':
          //TODO Android

          break;
      }

      if (props.rememberPassword == isRemember) {
        setProps();
      } else {
        setProps({
          navbarOpstions: { hidden:false, backgroundColor: 'transparent', hideUnderline: true, back: true },
          backgroundColor: Skin1.bgColor,
          rememberPassword: isRemember
        })
      }
    }
    getLocalPwd();
  }, [])

  function onLoginBtnClick() {
    var err: string;
    if (!v.account?.trim()?.length) {
      err = '请输入用户名';
    } else if (!v.pwd?.trim()?.length) {
      err = '请输入密码';
    } else if (v.errorTimes > 3 && !v.slideCode) {
      err = '请完成滑动验证';
    }
    if (err) {
      OCHelper.call('HUDHelper.showMsg:', [err]);
      return;
    }
    OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
    NetworkRequest1.user_login(v.account, v.pwd.md5(), v.googleCode, v.slideCode)
      .then((data) => {
        console.log('登录成功');
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);

        async function didLogin() {
          // 退出旧账号（试玩账号）
          var user = await OCHelper.call('UGUserModel.currentUser');
          if (user) {
            console.log('退出旧账号');
            console.log(user);
            var sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
            await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
            await OCHelper.call('UGUserModel.setCurrentUser:');
          }

          // 保存数据
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data)]);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [props.rememberPassword, 'isRememberPsd']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [props.rememberPassword ? v.account : '', 'userName']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [props.rememberPassword ? v.pwd : '', 'userPsw']);
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);

          // 去下一页
          var simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
          if (simplePwds.indexOf(v.pwd) > -1) {
            await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
            await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
              true,
            ]);
          } else {
            await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
          }
        }
        didLogin();
      })
      .catch((err: Error) => {
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [err.message]);
        if ((v.errorTimes += 1) > 3) {
          setProps();
        }
      });
  }

  return (
    <View style={{ marginTop: AppDefine.height * 0.08 }}>
      <FastImage source={{ uri: 'https://i.ibb.co/PrsPnxF/m-logo.png' }} style={{ marginLeft: AppDefine.width * 0.5 - 50, width: 100, height: 36 }} />
      <View style={{ marginLeft: 24, marginTop: 56, width: AppDefine.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center' }}>登录</Text>
          <UGTextField
            type="账号"
            placeholder="请输入账号"
            containerStyle={{ marginTop: 24 }}
            defaultValue={v.account}
            onChangeText={(text) => {
              v.account = text;
            }}
          />
          <UGTextField
            type="密码"
            defaultValue={v.pwd}
            onChangeText={(text) => {
              v.pwd = text;
            }}
          />
          <SlidingVerification hidden={v.errorTimes < 4} />
          <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {
                setProps({ rememberPassword: !props.rememberPassword });
              }}>
              {props.rememberPassword ? (
                <Icon name="radio-button-checked" type="materialIcon" color="rgba(0, 0, 0, 0.8)" size={16} />
              ) : (
                  <Icon name="radio-button-unchecked" type="materialIcon" color="rgba(0, 0, 0, 0.6)" size={16} />
                )}
              <Text style={{ marginLeft: 6, color: 'white' }}>记住密码</Text>
            </TouchableOpacity>
            <Text
              style={{ marginTop: -10, marginRight: -5, padding: 10, textAlign: 'right', color: 'white' }}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
              }}>
              忘记密码
              </Text>
          </View>
          <Button
            style={{ marginTop: 55 }}
            buttonStyle={{ borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D' }}
            ViewComponent={LinearGradient}
            linearGradientProps={{ colors: ['#B0937D', '#997961'], start: { x: 0, y: 1 }, end: { x: 1, y: 1 } }}
            titleStyle={{ fontSize: 16 }}
            title="登录"
            onPress={onLoginBtnClick}
          />
          <Button
            title="免费试玩"
            buttonStyle={{ marginTop: 15, marginBottom: -5, backgroundColor: 'transparent' }}
            titleStyle={{ fontSize: 12 }}
            onPress={() => {
              switch (Platform.OS) {
                case 'ios':
                  OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                  OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                  break;
                case 'android':

                  break;
              }
            }}
          />
        </View>
        <TouchableOpacity
          style={{ width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}
          activeOpacity={1}
          onPress={() => {
            navigate<XBJRegisterProps>(PageName.XBJRegisterPage);
          }}>
          <FastImage source={{ uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png' }} style={{ marginLeft: 17, width: 20, height: 20, opacity: 0.6 }} />
          <Text style={{ marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6 }}>注册新用户</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
