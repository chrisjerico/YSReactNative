import React, { useEffect, useRef } from 'react';
import { View, Text, Platform } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import WebView from 'react-native-webview';
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import AppDefine from '../../public/define/AppDefine';
import UGTextField from '../../public/widget/UGTextField';
import { connect } from 'react-redux';
import { PageName } from '../../public/navigation/Navigation';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { UGStore } from '../../redux/store/UGStore';
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel';
import { UGBasePageProps } from '../base/UGPage';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { navigate, popToRoot } from '../../public/navigation/RootNavigation';
import { Toast } from "../../public/tools/ToastUtils";
import { SlidingVerification } from './XBJLoginPage';
import { showError, showLoading, showMessage, showSuccess, UGLoadingType } from '../../public/widget/UGLoadingCP';
import { ANHelper } from '../../public/define/ANHelper/ANHelper';
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine';
import { NA_DATA } from '../../public/define/ANHelper/hp/DataDefine';
import APIRouter from '../../public/network/APIRouter';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { api } from '../../public/network/NetworkRequest1/NetworkRequest1';


interface XBJRegisterVars {
  referrerId?: string;// 推荐人ID
  account?: string;// 账号
  pwd1?: string;// 密码
  pwd2?: string;// 确认密码
  realname?: string;// 真实姓名
  phone?: string;// 手机号
  letterCode?: string;// 字母验证码
  smsCode?: string;// 短信验证码
  slideCode?: SlideCodeModel;// 滑动验证码
  fundPwd?: string;// 取款密码
  qq?: string;// QQ
  wechat?: string;// 微信
  email?: string;// 邮箱
  reloadSlide?: () => void; // 刷新滑块
}

// 定义Props
export interface XBJRegisterProps extends UGBasePageProps<XBJRegisterProps> {
  isAgent?: boolean; // 是否代理注册
}

export const XBJRegisterPage = (props: XBJRegisterProps) => {
  const { setProps, navigation } = props;
  const { current: v } = useRef<XBJRegisterVars>({});
  
  useEffect(() => {
    navigation.setOptions({ unmountOnBlur: false })
    setProps({
      backgroundColor: Skin1.bgColor,
      navbarOpstions: { hidden: true, backgroundColor: 'transparent', hideUnderline: true, back: true },
      didFocus: () => {
        v.reloadSlide();
      }
    })
  }, []);

  function onRegisterBtnClick() {
    const {
      hide_reco, // 代理人 0不填，1选填，2必填
      reg_name, // 真实姓名 0不填，1选填，2必填
      reg_fundpwd, // 取款密码 0不填，1选填，2必填
      reg_qq, // QQ 0不填，1选填，2必填
      reg_wx, // 微信 0不填，1选填，2必填
      reg_phone, // 手机 0不填，1选填，2必填
      reg_email, // 邮箱 0不填，1选填，2必填
      pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
      reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
      smsVerify, // 是否需要短信验证码
      pass_length_min,
      pass_length_max,
    } = UGStore.globalProps?.sysConf;
    let err: string;
    const pwdWrongLength: boolean = v.pwd1?.length < pass_length_min || v.pwd1?.length > pass_length_max;
    if (hide_reco == 2) {
      err = !v.referrerId?.length ? '请输入推荐人ID' : undefined;
      err = v.referrerId?.length > 10 ? '长度在1到10之间' : undefined;
    } else if (!v.account?.trim().length) {
      err = '请输入账号';
    } else if (v.account?.length < 6 || v.account?.length > 15 || !v.account?.isIntegerAndLetter) {
      err = '请输入6-15位英文或数字的组合的用户名';
    } else if (!v.pwd1?.length) {
      err = '请输入密码';
    } else if (!v.pwd2?.length) {
      err = '请输入确认密码';
    } else if (v.pwd1 !== v.pwd2) {
      err = '两次输入的密码不一致';
    } else if (pass_limit == 1) {
      if (pwdWrongLength || !v.pwd1?.isIntegerAndLetter) {
        err = `请输入${pass_length_min}到${pass_length_max}位数字字母组成的密码`;
      }
    } else if (pass_limit == 2) {
      if (pwdWrongLength || !v.pwd1?.isVisibleASCII) {
        err = `请输入${pass_length_min}到${pass_length_max}位数字字母符号组成的密码`;
      }
    } else if (pwdWrongLength) {
      err = `请输入${pass_length_min}到${pass_length_max}位长度的密码`;
    } else if (reg_name == 2) {
      err = !v.realname?.length ? '请输入真实姓名' : undefined;
      err = v.realname?.length < 2 || !v.realname?.isChinese ? '请输入正确的真实姓名' : undefined;
    } else if (reg_qq == 2 && !v.qq?.length) {
      err = '请输入QQ号';
    } else if (reg_wx == 2 && !v.wechat?.length) {
      err = '请输入微信号';
    } else if (reg_phone == 2) {
      err = !v.phone?.length ? '请输入手机号' : undefined;
      err = !v.phone?.isMobile ? '请输入正确的手机号' : undefined;
    } else if (reg_email == 2) {
      err = !v.email?.length ? '请输入邮箱' : undefined;
      err = !v.email?.isEmail ? '请输入正确的邮箱' : undefined;
    } else if (reg_fundpwd == 2 && v.fundPwd?.length < 4) {
      err = '请输入4位数字的取款密码';
    } else if (reg_vcode == 1 && !v.letterCode?.length) {
      err = '请输入验证码';
    } else if (smsVerify && !v.smsCode?.length) {
      err = '请输入短信验证码';
    }
    if (err) {
      showMessage(err);
      return;
    }

    v.reloadSlide();

    // 注册
    showLoading()
    api.user.reg({
      inviter: v.referrerId,
      usr: v.account,
      pwd: v.pwd1?.md5(),
      fundPwd: v.fundPwd?.md5(),
      fullName: v.realname,
      qq: v.qq,
      wx: v.wechat,
      phone: v.phone,
      smsCode: v.smsCode,
      imgCode: v.letterCode,
      slideCode: new SlideCodeModel(v.slideCode),
      email: v.email,
      regType: props.isAgent ? 'agent' : 'user',
    }).then((sm) => {
      sm.setCompletionBlock(({ data: { autoLogin } }) => {
        showSuccess('注册成功');
        navigation.setOptions({unmountOnBlur:true})
        didRegisterSuccess(v.account, v.pwd1, autoLogin);
      });
    });
  }

  const { agentRegbutton = '1', domainBindAgentId, hide_reco, reg_name, reg_fundpwd, reg_qq, reg_wx, reg_phone, reg_email, reg_vcode, smsVerify } = UGStore.globalProps.sysConf;
  const selectedColor = 'rgba(0, 0, 0, 0.5)';

  return (
    <ScrollView style={{ paddingTop: 65, paddingBottom: 100 }}>
      <FastImage source={{ uri: 'https://i.ibb.co/PrsPnxF/m-logo.png' }} style={{ marginLeft: AppDefine.width * 0.5 - 50, width: 100, height: 36 }} />
      <View style={{ marginLeft: 24, marginTop: 56, width: AppDefine.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}
          activeOpacity={1}
          onPress={() => {
            navigate(PageName.XBJLoginPage);
          }}>
          <FastImage source={{ uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png' }} style={{ marginLeft: 17, width: 20, height: 20, opacity: 0.6 }} />
          <Text style={{ marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6 }}>返回登录</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center' }}>注册</Text>
          <View
            style={{
              marginTop: agentRegbutton == '1' ? 20 : 0,
              marginBottom: 12,
              flexDirection: 'row',
              height: agentRegbutton == '1' ? 40 : 0,
              borderRadius: 21,
              borderWidth: agentRegbutton == '1' ? 1 : 0,
              borderColor: selectedColor,
              overflow: 'hidden',
            }}>
            <Button
              title="用户注册"
              containerStyle={{ flex: 1 }}
              buttonStyle={{ borderRadius: 0, backgroundColor: props.isAgent ? 'transparent' : selectedColor }}
              titleStyle={{ fontWeight: props.isAgent ? '400' : '500', color: props.isAgent ? selectedColor : 'white' }}
              onPress={() => {
                setProps({ isAgent: false });
              }}
            />
            <Button
              title="代理注册"
              containerStyle={{ flex: 1 }}
              buttonStyle={{ borderRadius: 0, backgroundColor: !props.isAgent ? 'transparent' : selectedColor }}
              titleStyle={{ fontWeight: !props.isAgent ? '400' : '500', color: !props.isAgent ? selectedColor : 'white' }}
              onPress={() => {
                setProps({ isAgent: true });
              }}
            />
          </View>
          {hide_reco && <UGTextField
            type="推荐人ID"
            placeholder={'推荐人ID' + (hide_reco == 1 ? '（选填）' : '')}
            value={parseInt(domainBindAgentId) > 0 ? domainBindAgentId : ''}
            editable={parseInt(domainBindAgentId) <= 0}
            onChangeText={text => {
              v.referrerId = text;
            }}
          />}
          <UGTextField
            type="账号"
            placeholder="账号长度为6-15位"
            errorMessage="用户名: 为 6-15 位字母与数字组成"
            onChangeText={text => {
              v.account = text;
            }}
          />
          <UGTextField
            type="密码"
            onChangeText={text => {
              v.pwd1 = text;
            }}
          />
          <UGTextField
            type="密码"
            placeholder="请输入确认密码"
            onChangeText={text => {
              v.pwd2 = text;
            }}
          />
          {reg_name && <UGTextField
            type="真实姓名"
            placeholder={'真实姓名' + (reg_name == 1 ? '（选填）' : '')}
            onChangeText={text => {
              v.realname = text;
            }}
          />}
          {reg_qq != 0 && <UGTextField
            type="QQ"
            placeholder={'QQ号' + (reg_qq == 1 ? '（选填）' : '')}
            onChangeText={text => {
              v.qq = text;
            }}
          />}
          {reg_wx != 0 && <UGTextField
            type="微信"
            placeholder={'微信号' + (reg_wx == 1 ? '（选填）' : '')}
            onChangeText={text => {
              v.wechat = text;
            }}
          />}
          {reg_email != 0 && <UGTextField
            type="邮箱"
            placeholder={'邮箱地址' + (reg_email == 1 ? '（选填）' : '')}
            onChangeText={text => {
              v.email = text;
            }}
          />}
          {reg_phone && <UGTextField
            type="手机号"
            placeholder={'手机号' + (reg_phone == 1 ? '（选填）' : '')}
            onChangeText={text => {
              v.phone = text;
            }}
          />}
          {smsVerify && <UGTextField
            type="短信验证码"
            didSmsButtonClick={startCountdown => {
              api.secure.smsCaptcha(v.phone).setCompletionBlock(() => {
                startCountdown();
              });
            }}
            onChangeText={text => {
              v.smsCode = text;
            }}
          />}
          {reg_vcode == 1 && <UGTextField
            type="字母验证码"
            onChangeText={text => {
              v.letterCode = text;
            }}
          />}
          {reg_fundpwd && <UGTextField
            type="密码"
            maxLength={4}
            placeholder={'取款密码' + (reg_fundpwd == 1 ? '（选填）' : '')}
            keyboardType="number-pad"
            onChangeText={text => {
              v.fundPwd = text;
            }}
          />}
          <SlidingVerification hidden={reg_vcode == 0} setReload={(reload) => {
            v.reloadSlide = reload;
          }} didVerified={slideCode => {
            v.slideCode = slideCode
          }} />
          <Button
            style={{ marginTop: 24 }}
            buttonStyle={{ borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D' }}
            ViewComponent={LinearGradient}
            linearGradientProps={{ colors: ['#B0937D', '#997961'], start: { x: 0, y: 1 }, end: { x: 1, y: 1 } }}
            titleStyle={{ fontSize: 16 }}
            title="注册"
            onPress={onRegisterBtnClick}
          />
        </View>
      </View>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
}

async function didRegisterSuccess(acct: string, pwd: string, autoLogin: boolean) {
  if (autoLogin) {
    let user
    switch (Platform.OS) {
      case 'ios':
        user = await OCHelper.call('UGUserModel.currentUser');
        break;
      case 'android':
        user = await ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.USER_INFO });
        break;
    }
    showMessage('注册成功');

    const { data: loginData, status } = await APIRouter.user_login(acct, pwd)

    if (user) {
      console.log('退出旧账号: ', user)
      switch (Platform.OS) {
        case 'ios':
          const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
          await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
          await OCHelper.call('UGUserModel.setCurrentUser:');
          break;
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.LOGIN_INFO });
          await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.USER_INFO });
          break;
      }
      UGStore.dispatch({ type: 'reset' })
    }

    switch (Platform.OS) {
      case 'ios':
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [acct, 'userName']);
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
    const { data: UserInfo, } = await APIRouter.user_info()

    switch (Platform.OS) {
      case 'ios':
        await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo.data, ...UGUserModel.getYS(loginData?.data) }]);
        break;
      case 'android':
        await ANHelper.callAsync(CMD.SAVE_DATA,
          {
            key: NA_DATA.USER_INFO,
            ...UserInfo?.data
          })
        break;
    }

    UGStore.dispatch({ type: 'merge', props: UserInfo?.data });
    UGStore.save();
    popToRoot();
  } else {
    popToRoot();
    navigate(PageName.XBJLoginPage, { usr: acct, pwd: pwd })
  }
}
