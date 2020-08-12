import React from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text, Platform, PlatformAndroidStatic, PlatformIOSStatic} from 'react-native';
import UGBasePage from '../base/UGBasePage';
import {ZHTYLoginProps, ZHTYLoginStateToProps} from './ZHTYLoginProps';
import {OCHelper} from '../../public/define/OCHelper/OCHelper';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import WebView from 'react-native-webview';
import AppDefine from '../../public/define/AppDefine';
import FastImage from 'react-native-fast-image';
import UGTextField from '../../public/widget/UGTextField';
import PushHelper from '../../public/define/PushHelper';
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel';
import LinearGradient from 'react-native-linear-gradient';
import {Navigation, PageName} from '../../public/navigation/Navigation';
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import {Icon, Button} from 'react-native-elements';
import {Res} from '../../Res/icon/Resources';

class ZHTYLoginPage extends UGBasePage<ZHTYLoginProps> {
  account: string = null; // 账号
  pwd: string = null; // 密码
  errorTimes: number = 0; // 失败次数大于3时需要滑动验证
  slideCode: SlideCodeModel; // 滑动验证码
  googleCode: string; // 谷歌验证码

  constructor(props) {
    super(props);
    async function getLocalPwd(this: ZHTYLoginPage) {
        let isRemember = false;

        switch (Platform.OS) {
            case 'ios':
                isRemember = await OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
                if (isRemember) {
                    this.account = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName']);
                    this.pwd = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw']);
                }
                break;
            case 'android':
                //TODO Android

                break;
        }

        if (this.props.rememberPassword == isRemember) {
        this.setState({});
        } else {
        this.setProps({rememberPassword: isRemember});
        }
    }
    getLocalPwd.bind(this)();
  }

  // 请求数据
  requestData() {}

  // 成为焦点页面
  didFocus(params: ZHTYLoginProps) {}

  onLoginBtnClick() {
    this.context;
    var err: string;
    if (!this.account || !this.account.trim().length) {
      err = '请输入用户名';
    } else if (!this.pwd || !this.pwd.trim().length) {
      err = '请输入密码';
    } else if (this.errorTimes > 3 && !this.slideCode) {
      err = '请完成滑动验证';
    }
    if (err) {
      OCHelper.call('HUDHelper.showMsg:', [err]);
      return;
    }
    OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
    NetworkRequest1.user_login(this.account, this.pwd.md5(), this.googleCode, this.slideCode)
      .then(data => {
        console.log('登录成功');
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);

        async function didLogin(this: ZHTYLoginPage) {
          // 退出旧账号（试玩账号）
          var user = await OCHelper.call('UGUserModel.currentUser');
          if (user) {
            console.log('退出旧账号');
            console.log(user);
            var sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
            await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{token: sessid}]);
            await OCHelper.call('UGUserModel.setCurrentUser:');
          }

          // 保存数据
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data)]);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [this.props.rememberPassword, 'isRememberPsd']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [this.props.rememberPassword ? this.account : '', 'userName']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [this.props.rememberPassword ? this.pwd : '', 'userPsw']);
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);

          // 去下一页
          var simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
          if (simplePwds.indexOf(this.pwd) > -1) {
            await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
            await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController']},
              true,
            ]);
          } else {
            await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
          }
        }
        didLogin.bind(this)();
      })
      .catch((err: Error) => {
        OCHelper.call('SVProgressHUD.showErrorWithStatus:', [err.message]);
        if ((this.errorTimes += 1) > 3) {
          this.setState({});
        }
      });
  }

  // 滑动验证
  SlidingVerification(props: {hidden: boolean}) {
    return (
      <View style={{marginTop: 13, height: props.hidden ? 0 : 52, borderRadius: 26, overflow: 'hidden'}}>
        <WebView
          style={{marginLeft: -15, marginRight: -14, marginTop: -22, flex: 1}}
          javaScriptEnabled
          startInLoadingState
          source={{uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native`}}
          onMessage={e => {
            console.log('e=');
            console.log(e);
          }}
        />
      </View>
    );
  }

  renderContent(): React.ReactNode {
    return (
      <View style={{}}>
        <FastImage source={{uri: 'https://i.ibb.co/PrsPnxF/m-logo.png'}} style={{marginLeft: (AppDefine.width - 100) / 2, width: 100, height: 36}} />
        <FastImage source={Res.zhtyLoginSponsor} style={{marginTop: 10, marginLeft: (AppDefine.width - 270) / 2, width: 270, height: 64}} />
        <View style={{marginHorizontal: 30}}>
          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              height: 46,
              borderRadius: 23,
              borderWidth: 1,
              borderColor: '#ffffff55',
              overflow: 'hidden',
            }}>
            <Button
              title="登录"
              containerStyle={{flex: 1, borderRadius: 23, overflow: 'hidden'}}
              buttonStyle={{borderRadius: 0, height: 46, backgroundColor: 'transparent'}}
              titleStyle={{color: 'white'}}
              disabled
              disabledStyle={{backgroundColor: '#ffffff55'}}
              disabledTitleStyle={{color: 'white'}}
            />
            <Button
              title="注册"
              containerStyle={{flex: 1}}
              buttonStyle={{height: 46, backgroundColor: 'transparent'}}
              titleStyle={{color: '#ffffff55'}}
              onPress={() => {
                Navigation.jump(PageName.ZHTYRegisterPage, null, false);
              }}
            />
          </View>
          <UGTextField
            type="账号"
            styleType="下划线样式"
            placeholder="请输入账号"
            containerStyle={{marginTop: 24}}
            defaultValue={this.account}
            onChangeText={text => {
              this.account = text;
            }}
          />
          <UGTextField
            type="密码"
            styleType="下划线样式"
            defaultValue={this.pwd}
            onChangeText={text => {
              this.pwd = text;
            }}
          />
          <this.SlidingVerification hidden={this.errorTimes < 4} />
          <View style={{marginTop: 18, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                this.setProps({rememberPassword: !this.props.rememberPassword});
              }}>
              {this.props.rememberPassword ? (
                <Icon name="radio-button-checked" type="materialIcon" color="rgba(0, 0, 0, 0.8)" size={16} />
              ) : (
                <Icon name="radio-button-unchecked" type="materialIcon" color="rgba(0, 0, 0, 0.6)" size={16} />
              )}
              <Text style={{marginLeft: 6, color: 'white'}}>记住密码</Text>
            </TouchableOpacity>
            <Text
              style={{marginTop: -10, marginRight: -5, padding: 10, textAlign: 'right', color: 'white'}}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
              }}>
              忘记密码
            </Text>
          </View>
          <Button style={{marginTop: 55}} buttonStyle={{borderRadius: 23, height: 46}} titleStyle={{fontSize: 16}} title="登录" onPress={this.onLoginBtnClick.bind(this)} />
          <Button
            title="先去逛逛"
            buttonStyle={{marginTop: 15, marginBottom: -5, height: 50, backgroundColor: 'transparent', borderWidth: 1, borderRadius: 25, borderColor: 'white'}}
            titleStyle={{fontSize: 16}}
            onPress={() => {
              Navigation.pop();
              if (Platform.OS == 'ios') {
                OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
              }
            }}
          />
        </View>
      </View>
    );
  }
}

// 绑定Redux
export default connect(ZHTYLoginStateToProps)(ZHTYLoginPage);
