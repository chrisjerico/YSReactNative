import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Icon} from 'react-native-elements';
import WebView from 'react-native-webview';
import AppDefine from '../../public/define/AppDefine';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import {UGUserCenterItem, UGUserCenterType} from '../../redux/model/全局/UGSysConfModel';
import {Skin1} from '../../public/theme/UGSkinManagers';
import UGTextField from '../../public/widget/UGTextField';
import {Actions} from 'react-native-router-flux';

interface IState {
  rememberPassword: boolean;
}

export default class XBJLoginVC extends Component<{}, IState> {
  account: string = null; // 账号
  pwd: string = null; // 密码
  errorTimes: number = 0; // 失败次数大于3时需要滑动验证
  slideCode: SlideCodeModel; // 滑动验证码
  googleCode: string; // 谷歌验证码

  constructor(props) {
    super(props);
    this.state = {rememberPassword: true};
    async function getLocalPwd(this: XBJLoginVC) {
      var isRemember = await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd']);
      if (isRemember) {
        this.account = await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName']);
        this.pwd = await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw']);
      }
      this.setState({rememberPassword: isRemember});
    }
    getLocalPwd.bind(this)();
  }

  onLoginBtnClick() {
    var err: string;
    if (!this.account?.trim()?.length) {
      err = '请输入用户名';
    } else if (!this.pwd?.trim()?.length) {
      err = '请输入密码';
    } else if (this.errorTimes > 3 && !this.slideCode) {
      err = '请完成滑动验证';
    }
    if (err) {
      AppDefine.ocCall('HUDHelper.showMsg:', [err]);
      return;
    }
    AppDefine.ocCall('SVProgressHUD.showWithStatus:', ['正在登录...']);
    NetworkRequest1.user_login(this.account, this.pwd.md5(), this.googleCode, this.slideCode)
      .then(data => {
        console.log('登录成功');
        AppDefine.ocCall('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);

        async function didLogin(this: XBJLoginVC) {
          // 退出旧账号（试玩账号）
          var user = await AppDefine.ocCall('UGUserModel.currentUser');
          if (user) {
            console.log('退出旧账号');
            console.log(user);
            var sessid = await AppDefine.ocCall('UGUserModel.currentUser.sessid');
            await AppDefine.ocCall('CMNetwork.userLogoutWithParams:completion:', [{token: sessid}]);
            await AppDefine.ocCall('UGUserModel.setCurrentUser:');
            await AppDefine.ocCall('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
          }

          // 保存数据
          await AppDefine.ocCall('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data)]);
          await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.setBool:forKey:', [this.state.rememberPassword, 'isRememberPsd']);
          await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.setObject:forKey:', [this.state.rememberPassword ? this.account : '', 'userName']);
          await AppDefine.ocCall('NSUserDefaults.standardUserDefaults.setObject:forKey:', [this.state.rememberPassword ? this.pwd : '', 'userPsw']);
          await AppDefine.ocCall('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);

          // 去下一页
          var simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
          if (simplePwds.indexOf(this.pwd) > -1) {
            await AppDefine.ocCall('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
            await AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [
              {selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController']},
              true,
            ]);
          } else {
            await AppDefine.ocCall('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
          }
        }
        didLogin.bind(this)();
      })
      .catch((err: Error) => {
        AppDefine.ocCall('SVProgressHUD.showErrorWithStatus:', [err.message]);
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

  render() {
    return (
      <LinearGradient colors={Skin1.bgColor} style={{flex: 1, justifyContent: 'center', marginTop: -AppDefine.height * 0.1}}>
        <FastImage source={{uri: 'https://i.ibb.co/PrsPnxF/m-logo.png'}} style={{marginLeft: AppDefine.width * 0.5 - 50, width: 100, height: 36}} />
        <View style={{marginLeft: 24, marginTop: 56, width: AppDefine.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center'}}>登录</Text>
            <UGTextField
              type="账号"
              placeholder="请输入账号"
              containerStyle={{marginTop: 24}}
              defaultValue={this.account}
              onChangeText={text => {
                this.account = text;
              }}
            />
            <UGTextField
              type="密码"
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
                  this.setState({rememberPassword: !this.state.rememberPassword});
                }}>
                {this.state.rememberPassword ? (
                  <Icon name="radio-button-checked" type="materialIcon" color="rgba(0, 0, 0, 0.8)" size={16} />
                ) : (
                  <Icon name="radio-button-unchecked" type="materialIcon" color="rgba(0, 0, 0, 0.6)" size={16} />
                )}
                <Text style={{marginLeft: 6, color: 'white'}}>记住密码</Text>
              </TouchableOpacity>
              <Text
                style={{marginTop: -10, marginRight: -5, padding: 10, textAlign: 'right', color: 'white'}}
                onPress={() => {
                  UGUserCenterItem.pushViewController(UGUserCenterType.在线客服);
                }}>
                忘记密码
              </Text>
            </View>
            <Button
              style={{marginTop: 55}}
              buttonStyle={{borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D'}}
              ViewComponent={LinearGradient}
              linearGradientProps={{colors: ['#B0937D', '#997961'], start: {x: 0, y: 1}, end: {x: 1, y: 1}}}
              titleStyle={{fontSize: 16}}
              title="登录"
              onPress={this.onLoginBtnClick.bind(this)}
            />
            <Button
              title="免费试玩"
              buttonStyle={{marginTop: 15, marginBottom: -5, backgroundColor: 'transparent'}}
              titleStyle={{fontSize: 12}}
              onPress={() => {
                AppDefine.ocCall('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                AppDefine.ocCall('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
              }}
            />
          </View>
          <TouchableOpacity
            style={{width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center'}}
            activeOpacity={1}
            onPress={() => {
              Actions.replace('XBJRegisterVC');
            }}>
            <FastImage source={{uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png'}} style={{marginLeft: 17, width: 20, height: 20, opacity: 0.6}} />
            <Text style={{marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6}}>注册新用户</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
