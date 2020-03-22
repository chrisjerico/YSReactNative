import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AppDefine from '../../公共类/AppDefine';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {Skin1} from '../../公共类/UGSkinManagers';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Input, Icon} from 'react-native-elements';
import UGTextField from '../../公共类/UGTextField';
import {SysConf1} from '../../Model/全局/UGSysConfModel';
import {acc} from 'react-native-reanimated';
import NetworkRequest1 from '../../公共类/网络/NetworkRequest1';
import {SlideCodeModel} from '../../Model/常规/SlideCodeModel';
import WebView from 'react-native-webview';

interface IState {
  isAgent: boolean; // 是否代理注册
  accountErr: string; // 用户名错误信息
}

export default class XBJRegisterVC extends Component<{}, IState> {
  referrerId: string = ''; // 推荐人ID
  account: string = ''; // 账号
  pwd1: string = ''; // 密码
  pwd2: string = ''; // 确认密码
  realname: string = ''; // 真实姓名
  phone: string = ''; // 手机号
  letterCode: string = ''; // 字母验证码
  smsCode: string = ''; // 短信验证码
  slideCode: SlideCodeModel; // 滑动验证码
  fundPwd = ''; // 取款密码
  qq = ''; // QQ
  wechat = ''; // 微信
  email = ''; // 邮箱

  constructor(props) {
    super(props);
    this.state = {isAgent: false};
  }

  componentDidMount() {
    AppDefine.navController?.setOptions({headerTransparent: true, title: ''});
  }

  onRegisterBtnClick() {
    var {referrerId, account, pwd1, pwd2, realname, phone, letterCode, smsCode, slideCode, qq, wechat, email, fundPwd} = this;
    var {
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
    } = SysConf1;
    var err: string;
    var pwdWrongLength: boolean = pwd1.length < pass_length_min || pwd1.length > pass_length_max;
    if (hide_reco == 2) {
      err = !referrerId?.length ? '请输入推荐人ID' : undefined;
      err = referrerId.length > 10 ? '长度在1到10之间' : undefined;
    } else if (!account.trim().length) {
      err = '请输入账号';
    } else if (account.length < 6 || account.length > 15 || !account.isIntegerAndLetter) {
      err = '请输入6-15位英文或数字的组合的用户名';
    } else if (!pwd1.length) {
      err = '请输入密码';
    } else if (!pwd2.length) {
      err = '请输入确认密码';
    } else if (pwd1 !== pwd2) {
      err = '两次输入的密码不一致';
    } else if (pass_limit == 1) {
      if (pwdWrongLength || !pwd1.isIntegerAndLetter) {
        err = `请输入${pass_length_min}到${pass_length_max}位数字字母组成的密码`;
      }
    } else if (pass_limit == 2) {
      if (pwdWrongLength || !pwd1.isVisibleASCII) {
        err = `请输入${pass_length_min}到${pass_length_max}位数字字母符号组成的密码`;
      }
    } else if (pwdWrongLength) {
      err = `请输入${pass_length_min}到${pass_length_max}位长度的密码`;
    } else if (reg_name == 2) {
      err = !realname.length ? '请输入真实姓名' : undefined;
      err = realname.length < 2 || !realname.isChinese ? '请输入正确的真实姓名' : undefined;
    } else if (reg_qq == 2 && !qq.length) {
      err = '请输入QQ号';
    } else if (reg_wx == 2 && !wechat.length) {
      err = '请输入微信号';
    } else if (reg_phone == 2) {
      err = !phone.length ? '请输入手机号' : undefined;
      err = !phone.isMobile ? '请输入正确的手机号' : undefined;
    } else if (reg_email == 2) {
      err = !email.length ? '请输入邮箱' : undefined;
      err = !email.isEmail ? '请输入正确的邮箱' : undefined;
    } else if (reg_fundpwd == 2 && fundPwd.length < 4) {
      err = '请输入4位数字的取款密码';
    } else if (reg_vcode == 1 && !letterCode.length) {
      err = '请输入验证码';
    } else if (smsVerify && !smsCode.length) {
      err = '请输入短信验证码';
    }
    if (err) {
      AppDefine.ocCall('HUDHelper.showMsg:', [err]);
      return;
    }

    // 注册
    NetworkRequest1.user_reg({
      inviter: referrerId,
      usr: account,
      pwd: pwd1.md5(),
      fundPwd: fundPwd.md5(),
      fullName: realname,
      qq: qq,
      wx: wechat,
      phone: phone,
      smsCode: smsCode,
      imgCode: letterCode,
      slideCode: slideCode,
      email: email,
      regType: this.state.isAgent ? 'agent' : 'user',
    })
      .then(data => {
        console.log(data);
      })
      .catch((err: Error) => {
        AppDefine.ocCall('SVProgressHUD.showErrorWithStatus:', [err.message]);
      });
  }

  // 滑动验证
  SlidingVerification(props: {hidden: boolean}) {
    return (
      <View style={{marginTop: 13, height: props.hidden ? 0 : 52, borderRadius: 26, overflow: true}}>
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
    var {agentRegbutton = '1', hide_reco, reg_name, reg_fundpwd, reg_qq, reg_wx, reg_phone, reg_email, reg_vcode, smsVerify} = SysConf1;

    var selectedColor = 'rgba(0, 0, 0, 0.5)';
    return (
      <LinearGradient colors={Skin1.bgColor}>
        <ScrollView style={{paddingTop: 80, paddingBottom: 100}}>
          <FastImage source={{uri: 'https://i.ibb.co/PrsPnxF/m-logo.png'}} style={{marginLeft: AppDefine.width * 0.5 - 50, width: 100, height: 36}} />
          <View style={{marginLeft: 24, marginTop: 56, width: AppDefine.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center'}}
              activeOpacity={1}
              onPress={() => {
                AppDefine.tabController?.navigate('XBJLoginVC');
              }}>
              <FastImage source={{uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png'}} style={{marginLeft: 17, width: 20, height: 20, opacity: 0.6}} />
              <Text style={{marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6}}>返回登录</Text>
            </TouchableOpacity>
            <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24}}>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center'}}>注册</Text>
              <View
                style={{
                  marginTop: agentRegbutton == '1' ? 20 : 0,
                  marginBottom: 12,
                  flexDirection: 'row',
                  height: agentRegbutton == '1' ? 40 : 0,
                  borderRadius: 21,
                  borderWidth: agentRegbutton == '1' ? 1 : 0,
                  borderColor: selectedColor,
                  overflow: true,
                }}>
                <Button
                  title="用户注册"
                  containerStyle={{flex: 1}}
                  buttonStyle={{borderRadius: 0, backgroundColor: this.state.isAgent ? 'transparent' : selectedColor}}
                  titleStyle={{fontWeight: this.state.isAgent ? '400' : '500', color: this.state.isAgent ? selectedColor : 'white'}}
                  onPress={() => {
                    this.setState({isAgent: false});
                  }}
                />
                <Button
                  title="代理注册"
                  containerStyle={{flex: 1}}
                  buttonStyle={{borderRadius: 0, backgroundColor: !this.state.isAgent ? 'transparent' : selectedColor}}
                  titleStyle={{fontWeight: !this.state.isAgent ? '400' : '500', color: !this.state.isAgent ? selectedColor : 'white'}}
                  onPress={() => {
                    this.setState({isAgent: true});
                  }}
                />
              </View>
              <UGTextField
                type="推荐人ID"
                placeholder={'推荐人ID' + (hide_reco == 1 ? '（选填）' : '')}
                hidden={!hide_reco}
                onChangeText={text => {
                  this.referrerId = text;
                }}
              />
              <UGTextField
                type="账号"
                placeholder="账号长度为6-15位"
                errorMessage="用户名: 为 6-15 位字母与数字组成"
                onEndEditing={() => {
                  if (this.account.length) {
                    var tmpAccount = this.account;
                    NetworkRequest1.user_exists(tmpAccount)
                      .then(() => {
                        this.setState({accountErr: null});
                      })
                      .catch((err: Error) => {
                        if (this.account === tmpAccount) {
                          this.setState({accountErr: err.message});
                        }
                      });
                  } else {
                    this.setState({accountErr: null});
                  }
                }}
                onChangeText={text => {
                  this.account = text;
                }}
              />
              <Text style={{marginRight: 5, marginTop: this.state.accountErr ? 5 : 0, height: this.state.accountErr ? 18 : 0, color: 'red', textAlign: 'right', fontSize: 12}}>
                {this.state.accountErr}
              </Text>
              <UGTextField
                type="密码"
                onChangeText={text => {
                  this.pwd1 = text;
                }}
              />
              <UGTextField
                type="密码"
                placeholder="请输入确认密码"
                onChangeText={text => {
                  this.pwd2 = text;
                }}
              />
              <UGTextField
                type="真实姓名"
                placeholder={'真实姓名' + (reg_name == 1 ? '（选填）' : '')}
                hidden={!reg_name}
                onChangeText={text => {
                  this.realname = text;
                }}
              />
              <UGTextField
                type="QQ"
                placeholder={'QQ号' + (reg_qq == 1 ? '（选填）' : '')}
                hidden={!reg_qq}
                onChangeText={text => {
                  this.qq = text;
                }}
              />
              <UGTextField
                type="微信"
                placeholder={'微信号' + (reg_wx == 1 ? '（选填）' : '')}
                hidden={!reg_wx}
                onChangeText={text => {
                  this.wechat = text;
                }}
              />
              <UGTextField
                type="邮箱"
                placeholder={'邮箱地址' + (reg_email == 1 ? '（选填）' : '')}
                hidden={!reg_email}
                onChangeText={text => {
                  this.email = text;
                }}
              />
              <UGTextField
                type="手机号"
                placeholder={'手机号' + (reg_phone == 1 ? '（选填）' : '')}
                hidden={!reg_phone}
                onChangeText={text => {
                  this.phone = text;
                }}
              />
              <UGTextField
                type="短信验证码"
                hidden={!smsVerify}
                onChangeText={text => {
                  this.smsCode = text;
                }}
              />
              <UGTextField
                type="字母验证码"
                hidden={reg_vcode != 1}
                onChangeText={text => {
                  this.letterCode = text;
                }}
              />
              <UGTextField
                type="密码"
                maxLength={4}
                placeholder={'取款密码' + (reg_fundpwd == 1 ? '（选填）' : '')}
                hidden={!reg_fundpwd}
                keyboardType="number-pad"
                onChangeText={text => {
                  this.fundPwd = text;
                }}
              />
              <this.SlidingVerification hidden={reg_vcode != 2} />
              <Button
                style={{marginTop: 24}}
                buttonStyle={{borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D'}}
                ViewComponent={LinearGradient}
                linearGradientProps={{colors: ['#B0937D', '#997961'], start: {x: 0, y: 1}, end: {x: 1, y: 1}}}
                titleStyle={{fontSize: 16}}
                title="注册"
                onPress={this.onRegisterBtnClick.bind(this)}
              />
            </View>
          </View>
          <View style={{height: 200}} />
        </ScrollView>
      </LinearGradient>
    );
  }
}
