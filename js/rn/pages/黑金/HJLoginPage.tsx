import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  StyleSheet
} from 'react-native';
import {OCHelper} from '../../public/define/OCHelper/OCHelper';
import FastImage from 'react-native-fast-image';
import PushHelper from '../../public/define/PushHelper';
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel';
import {PageName} from '../../public/navigation/Navigation';
import {Icon,} from 'react-native-elements';
import {useSafeArea} from 'react-native-safe-area-context';
import {useForm, Controller} from "react-hook-form";
import APIRouter from '../../public/network/APIRouter';
import useLoginIn from '../../public/hooks/useLoginIn';
import {push, pop} from '../../public/navigation/RootNavigation';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import {UGStore} from '../../redux/store/UGStore';
import {ActionType} from '../../redux/store/ActionTypes';
import {useDimensions} from '@react-native-community/hooks';
import DialogInput from 'react-native-dialog-input';
import {useSelector} from 'react-redux';
import {httpClient} from '../../public/network/httpClient';
import {NSValue} from '../../public/define/OCHelper/OCBridge/OCCall';
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {Toast} from "../../public/tools/ToastUtils";
import {ugLog} from "../../public/tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {NA_DATA} from "../../public/define/ANHelper/hp/DataDefine";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";
import {scale} from "../../public/tools/Scale";
import {FastImageAutoWidth} from '../../public/tools/img/ExtImage';
import CommStyles from "../base/CommStyles";

let errorTimes = 0
const HJLoginPage = ({route, navigation}) => {

  const {control, errors, handleSubmit} = useForm()
  const [accountFocus, setAccountFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [GGmodalShow, setGGModalShow] = useState(false)
  const {isTest} = UGStore.globalProps.userInfo;
  const userData = UGStore.globalProps.userInfo;

  const sysStore = UGStore.globalProps.sysConf;
  const {mobile_logo = ""} = sysStore

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
      showLoading({type: UGLoadingType.Loading});

      const {data, status} = await APIRouter.user_guestLogin()
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

      const {data: userInfo} = await APIRouter.user_info()

      switch (Platform.OS) {
        case "android":
          await ANHelper.callAsync(CMD.SAVE_DATA,
            {
              key: NA_DATA.USER_INFO,
              ...userInfo?.data
            })
          break;
      }

      UGStore.dispatch({type: 'merge', userInfo: userInfo?.data});
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
  const {loginSuccessHandle} = useLoginIn()
  const onSubmit = async ({account, pwd, googleCode = "", slideCode}) => {
    const simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
    if (simplePwds.indexOf(pwd) > -1) {
      switch (Platform.OS) {
        case "ios":
          await OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码']);
          await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
            {selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController']},
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
      showLoading({type: UGLoadingType.Loading, text: '正在登录...'});

      const {data, status} = await APIRouter.user_login(account, pwd.md5(), googleCode, slideCode)
      if (data.data == null)
        throw {message: data?.msg}
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
      await loginSuccessHandle(data, {account, pwd, isRemember})
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
    <View style={{backgroundColor: '#1a1a1e', flex: 1}}>
      <Header/>
      <ScrollView style={{
        flex: 1,
        paddingHorizontal: 15
      }}>
        <FastImage style={_styles.logo}
                   resizeMode={'contain'}
                   source={{uri: mobile_logo}}/>

        <View style={_styles.input}>
          <FastImage style={_styles.input_icon}
                     source={{uri: "http://test29f.fhptcdn.com/views/mobileTemplate/28/images/icon-user.png"}}/>
          <Controller
            onBlur={() => {
              setAccountFocus(false)
            }}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{flex: 1, color: 'white'}}

            as={<TextInput
              placeholderTextColor={accountFocus ? '#8e8e93' : "white"}
              onFocus={() => {
                setAccountFocus(true)
              }}/>}
            rules={{
              required: {
                value: true,
                message: "请输入用户名"
              }
            }}
            name="account"
            control={control}
            defaultValue=""
            placeholder={'请输入会员账号'}/>
        </View>
        <View style={_styles.input}>
          <FastImage style={_styles.input_icon}
                     source={{uri: "http://test29f.fhptcdn.com/views/mobileTemplate/28/images/icon-pwd.png"}}/>
          <Controller
            onBlur={() => {
              setPwdFocus(false)

            }}
            onChange={args => {
              return args[0].nativeEvent.text
            }}
            style={{flex: 1, color: 'white'}}
            as={<TextInput secureTextEntry={secureTextEntry}
                           placeholderTextColor={pwdFocus ? '#8e8e93' : "white"}
                           onFocus={() => {

                             setPwdFocus(true)
                           }}/>} name="pwd" rules={{
            required: {
              value: true,
              message: "请输入密码",
            }
          }} control={control} defaultValue="" placeholder={'请输入密码'}/>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              setSecureTextEntry(secureTextEntry => !secureTextEntry)
            }}>
            <Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'}
                  type="ionicon" size={22} color={
              HJThemeColor.黑金.themeColor
            }
                  containerStyle={{marginLeft: 15, marginRight: 4}}/>
          </TouchableOpacity>
        </View>

        <View style={{
          marginTop: scale(50),
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableWithoutFeedback

            onPress={() => {
              setIsRemember(isRemember => !isRemember)
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{
                borderWidth: 1,
                borderColor: '#39a2d0',
                width: scale(28),
                height: scale(28),
                borderRadius: scale(8),
              }}>
                {isRemember ? (
                  <Icon name='check'
                        type='foundation'
                        color="#39a2d0"
                        size={13}/>
                ) : null}
              </View>
              <Text style={{
                color: '#8e8e93',
                fontSize: scale(20),
                marginLeft: scale(8)
              }}>记住密码</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
          }} style={{color: '#8e8e93', fontSize: scale(20)}}>忘记密码?</Text>

        </View>
        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={[_styles.log_bt, {marginTop: scale(60)}]}>
            <Text style={{color: "white", fontSize: scale(28)}}>登录</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={CommStyles.center}>
          <View style={{
            width: '50%',
            marginTop: scale(50),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{flexDirection: 'row'}}>
              <FastImage style={_styles.text_icon}
                         resizeMode={'contain'}
                         source={{uri: "http://test61a.fhptcdn.com/views/mobileTemplate/28/images/login_ptsy.png"}}/>
              <Text onPress={() => {
                push(PageName.HJHomePage)
              }} style={{color: '#8e8e93', fontSize: scale(20)}}>平台首页</Text>
            </View>

            <View style={[CommStyles.line_v, {height: scale(20), marginHorizontal: scale(32)}]}/>

            <View style={{flexDirection: 'row'}}>
              <FastImage style={_styles.text_icon}
                         resizeMode={'contain'}
                         source={{uri: "http://test61a.fhptcdn.com/views/mobileTemplate/28/images/login_lxkf.png"}}/>
              <Text onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
              }} style={{color: '#8e8e93', fontSize: scale(20)}}>联系客服</Text>
            </View>

          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => {
          push(PageName.HJRegisterPage)
        }}>
          <View style={[CommStyles.center, {padding: scale(16)}]}>
            <Text style={{
              color: "#8e8e93",
              fontSize: scale(22),
              marginTop: scale(30),
            }}>马上注册</Text>
          </View>
        </TouchableWithoutFeedback>

      </ScrollView>
      <DialogInput isDialogVisible={GGmodalShow}
                   title={"请输入谷歌验证码"}
                   message={""}
                   cancelText={"取消"}
                   submitText={"確定"}
                   hintInput={"请输入谷歌验证码"}
                   submitInput={(inputText) => onSubmit({
                     account: control.getValues("account"),
                     pwd: control.getValues("pwd"),
                     googleCode: inputText
                   })}
                   closeDialog={() => {
                     setGGModalShow(false)
                   }}>
      </DialogInput>
    </View>

  )
}
const Header = () => {
  const {top} = useSafeArea()
  return (
    <View style={{
      height: 68 + top,
      paddingTop: top,
      backgroundColor: "#1a1a1e",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15
    }}>
      <TouchableWithoutFeedback onPress={() => {
        pop();
        switch (Platform.OS) {
          case "ios":
            OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
            break;
        }
      }}>
        <Icon name="close" type="materialIcon" color="rgba(142, 142, 147,1)" size={30}/>
      </TouchableWithoutFeedback>

    </View>
  )
}

const _styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 4,
    borderColor: '#34393c',
    borderBottomWidth: scale(1),
    borderBottomColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_icon: {
    width: scale(36),
    height: scale(36),
    marginHorizontal: scale(24)
  },
  text_icon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(12),
  },
  logo: {
    width: '100%',
    height: scale(64),
    marginBottom: scale(64)
  },
  log_bt: {
    flex: 1,
    height: 50,
    backgroundColor: "#00000099",
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: HJThemeColor.黑金.themeColor,
    borderWidth: scale(1),
  },
})

export default HJLoginPage
