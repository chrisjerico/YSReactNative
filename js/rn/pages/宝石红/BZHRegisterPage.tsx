import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import SlidingVerification from '../../../rn/public/components/SlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useRegister from '../../public/hooks/useRegister'
import { PageName } from '../../public/navigation/Navigation'
import {
  pop,
  popToRoot,
  push
} from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import Header from '../../public/views/tars/Header'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { IGlobalState, UGStore } from '../../redux/store/UGStore'
import AgentRedButton from './views/AgentRedButton'
import Form from './views/Form'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

const validPassword = (password: string, pass_limit: number) => {
  if (password) {
    if (pass_limit) {
      if ([pass_limit == 1]) {
        return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password)
      } else if ([pass_limit == 2]) {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return false
  }
}

const BZHRegisterPage = () => {
  // hooks
  const SystemStore = UGStore.globalProps.sysConf;
  const { register } = useRegister()

  // state
  const [recommendGuy, setRecommendGuy] = useState(null)
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [realName, setRealName] = useState(null)
  const [fundPassword, setFundPassword] = useState(null)
  const [qq, setQQ] = useState(null)
  const [weChat, setWeChat] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [correctImageCode, setCorrectImageCode] = useState('')
  const [imageCode, setImageCode] = useState(null)
  const [slidingVerification, setSlidingVerification] = useState<SlidingVerification>(null)
  const [email, setEmail] = useState(null)
  const [sms, setSms] = useState(null)

  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [hideFundPassword, setHideFundPassword] = useState(true)
  const [agent, setAgent] = useState(false)

  const {
    hide_reco, // 代理人 0隱藏，1选填，2必填
    reg_name, // 真实姓名 0隱藏，1选填，2必填
    reg_fundpwd, // 取款密码 0隱藏，1选填，2必填
    reg_qq, // QQ 0隱藏，1选填，2必填
    reg_wx, // 微信 0隱藏，1选填，2必填
    reg_phone, // 手机 0隱藏，1选填，2必填
    reg_email, // 邮箱 0隱藏，1选填，2必填
    reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
    smsVerify, // 手机短信验证,
  } = SystemStore

  useEffect(() => {
    if (reg_vcode == 1) {
      getImgCaptcha()
    } else {
      setCorrectImageCode('')
    }
  }, [reg_vcode])

  const valid =
    account?.length >= 6 &&
    validPassword(password, pass_limit) &&
    confirmPassword == password &&
    (recommendGuy || !hide_reco || hide_reco == 1) &&
    (realName || !reg_name || reg_name == 1) &&
    (fundPassword?.length > 4 || !reg_fundpwd || reg_fundpwd == 1) &&
    (qq?.length > 5 || !reg_qq || reg_qq == 1) &&
    (weChat || !reg_wx || reg_wx == 1) &&
    (email || !reg_email || reg_email == 1) &&
    (phoneNumber || !reg_phone || reg_phone == 1) &&
    (slidingVerification || !reg_vcode || reg_vcode == 1 || reg_vcode == 3) &&
    (sms?.length == 6 || !smsVerify)

  const getImgCaptcha = () => {
    APIRouter.secure_imgCaptcha().then((value) => {
      console.log('---------抓取imgCaptcha-------')
      setCorrectImageCode(value?.data)
    })
  }

  const getSms = async () => {
    try {
      const { data } = await APIRouter.secure_smsCaptcha(phoneNumber)
      if (data?.code != 0) {
        throw { message: data.msg }
      } else {
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data?.msg])
      }
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error.message])
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        color={'#e53333'}
        title={'注册'}
        onPressBack={pop}
        onPressCustomerService={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.whiteBlock}>
          <View style={{ width: '100%', marginBottom: scale(20) }}>
            <Text style={{ color: 'red' }}>
              {'为了您的资金安全，请使用真实资料!'}
            </Text>
          </View>
          <Form
            leftIcon={{
              name: 'users',
            }}
            onChangeText={(value: any) => setRecommendGuy(value)}
            label={
              hide_reco == 1 ? '推荐人ID，如没有可不填写' : '請填寫推薦人ID'
            }
            placeholder={'推荐人ID'}
            show={hide_reco}
          />
          <Form
            onChangeText={(value: any) => setAccount(value)}
            label={'*请使用6-15位英文或数字的组合'}
            placeholder={'帐号'}
            show={2}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={(value: any) => setPassword(value)}
            label={'*请使用至少' + pass_length_min + '位字符'}
            placeholder={'密码'}
            secureTextEntry={hidePassword}
            showRightIcon
            rightIconProps={{
              color: hidePassword ? '#d9d9d9' : '#84C1FF',
              onPress: () => {
                setHidePassword(!hidePassword)
              },
            }}
            show={2}
            maxLength={pass_length_max}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={(value: any) => setConfirmPassword(value)}
            label={password == confirmPassword ? null : '密码不一致'}
            placeholder={'确认密码'}
            secureTextEntry={hideConfirmPassword}
            showRightIcon
            rightIconProps={{
              color: hideConfirmPassword ? '#d9d9d9' : '#84C1FF',
              onPress: () => {
                setHideConfirmPassword(!hideConfirmPassword)
              },
            }}
            show={2}
          />
          <Form
            leftIcon={{
              name: 'user',
            }}
            onChangeText={(value: any) => setRealName(value)}
            label={'*必须与您的银行账户名称相同，以免未能到账！'}
            placeholder={'真实姓名'}
            show={reg_name}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={(value: any) => setFundPassword(value)}
            label={'*请输入4数字取款密码'}
            placeholder={'取款密码'}
            secureTextEntry={hideFundPassword}
            showRightIcon
            rightIconProps={{
              color: hideFundPassword ? '#d9d9d9' : '#84C1FF',
              onPress: () => {
                setHideFundPassword(!hideFundPassword)
              },
            }}
            show={reg_fundpwd}
          />
          <Form
            leftIcon={{
              name: 'QQ',
              type: 'antdesign',
            }}
            onChangeText={(value: any) => setQQ(value)}
            label={'*请输入合法的QQ号'}
            placeholder={'QQ号'}
            show={reg_qq}
          />
          <Form
            leftIcon={{
              name: 'wechat',
              type: 'font-awesome',
            }}
            onChangeText={(value: any) => setWeChat(value)}
            label={'*请输入合法的微信号'}
            placeholder={'微信号'}
            show={reg_wx}
          />
          <Form
            leftIcon={{
              name: 'smartphone',
            }}
            onChangeText={(value: any) => setPhoneNumber(value)}
            label={'*请输入合法的手机号'}
            placeholder={'手机号'}
            show={reg_phone}
          />
          <Form
            leftIcon={{
              name: 'email',
            }}
            onChangeText={(value: any) => setEmail(value)}
            label={'*请输入合法的电子邮箱'}
            placeholder={'电子邮箱'}
            show={reg_email}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={(value: any) => setImageCode(value)}
            label={'*請輸入验证码'}
            placeholder={reg_vcode == 3 ? '点击显示验证码' : '验证码'}
            show={reg_vcode == 1 || reg_vcode == 3}
            showRightIcon={true}
            renderRightIcon={() => (
              <TouchableOpacity onPress={getImgCaptcha}>
                <FastImage
                  source={{ uri: correctImageCode }}
                  resizeMode={'contain'}
                  style={{ width: scale(150), height: '100%' }}
                />
              </TouchableOpacity>
            )}
            onFocus={() => {
              if (correctImageCode == '') {
                getImgCaptcha()
              }
            }}
            maxLength={4}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={(value: any) => setSms(value)}
            placeholder={'短信验证码'}
            show={smsVerify}
            showRightIcon={true}
            renderRightIcon={() => (
              <Button
                title={'获取验证码'}
                onPress={getSms}
                titleStyle={{ fontSize: scale(20), fontWeight: '600' }}
              />
            )}
          />
          {reg_vcode == 2 ? (
            <SlidingVerification
              onChange={setSlidingVerification}
              containerStyle={{ marginBottom: scale(20) }}
            />
          ) : null}
          {agentRegbutton !== '1' ? (
            <AgentRedButton
              toggle={agent}
              onPressLeftButton={() => {
                setAgent(false)
              }}
              onPressRightButton={() => {
                setAgent(true)
              }}
            />
          ) : null}
          <Button
            title={'注册'}
            disabled={!valid}
            disabledStyle={{}}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={() => {
              if (valid) {
                const params: any = {
                  inviter: recommendGuy, // 推荐人ID
                  usr: account, // 账号
                  pwd: password?.md5(), // 密码
                  fundPwd: fundPassword?.md5(), // 取款密码
                  fullName: realName, // 真实姓名
                  qq: qq, // QQ号
                  wx: weChat, // 微信号
                  phone: phoneNumber, // 手机号
                  smsCode: sms, // 短信验证码
                  imgCode: imageCode, // 字母验证码,
                  'slideCode[nc_sid]': slidingVerification?.nc_csessionid,
                  'slideCode[nc_token]': slidingVerification?.nc_token,
                  'slideCode[nc_sig]': slidingVerification?.nc_sig,
                  email: email, // 邮箱
                  regType: agent ? 'agent' : 'user', // 用户注册 或 代理注册,
                  // device: string,
                  // accessToken: string,
                  // slideCode: any
                }
                register(params)
              }
            }}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                push(PageName.BZHSignInPage, {})
              }}
            >
              <Text>{'返回登录'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                popToRoot()
              }}
            >
              <Text>{'返回首页'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.bgColor?.[0],
    marginBottom: scale(70)
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25)
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
  },
})

export default BZHRegisterPage
