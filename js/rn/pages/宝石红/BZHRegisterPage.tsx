import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useRegister from '../../public/hooks/useRegister'
import { PageName } from '../../public/navigation/Navigation'
import {
  navigate,
  pop,
  popToRoot
} from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import Header from '../../public/views/tars/Header'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { IGlobalState } from '../../redux/store/UGStore'
import AgentRedButton from './views/AgentRedButton'
import Form from './views/Form'

const BZHRegisterPage = () => {
  // hooks
  const SystemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
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
    smsVerify, // 手机短信验证,
    agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
  } = SystemStore

  useEffect(() => {
    if (reg_vcode == 1) {
      APIRouter.secure_imgCaptcha().then((value) => {
        console.log('---------抓取imgCaptcha-------')
        setCorrectImageCode(value?.data)
      })
    } else {
      setCorrectImageCode('')
    }
    // APIRouter.secure_smsCaptcha(phoneNumber).then(value => {
    //   console.log("---------------captcha----------", value)
    // })
  }, [reg_vcode])

  const valid =
    recommendGuy &&
    account &&
    password &&
    confirmPassword &&
    realName &&
    fundPassword

  console.log('------reg_vcode-------', reg_vcode)

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
            iconName={'user-circle'}
            onChangeText={(value: any) => setRecommendGuy(value)}
            label={
              hide_reco == 1 ? '推荐人ID，如没有可不填写' : '請填寫推薦人ID'
            }
            placeholder={'推荐人ID'}
            show={hide_reco}
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setAccount(value)}
            label={'*请使用6-15位英文或数字的组合'}
            placeholder={'帐号'}
            show={2}
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setPassword(value)}
            label={'*请使用至少6位字符'}
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
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setConfirmPassword(value)}
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
            enableLabel={false}
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setRealName(value)}
            label={'*必须与您的银行账户名称相同，以免未能到账！'}
            placeholder={'真实姓名'}
            show={reg_name}
          />
          <Form
            iconName={'user-circle'}
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
            iconName={'user-circle'}
            onChangeText={(value: any) => setQQ(value)}
            label={'*请输入合法的QQ号'}
            placeholder={'QQ号'}
            show={reg_qq}
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setWeChat(value)}
            label={'*请输入合法的微信号'}
            placeholder={'微信号'}
            show={reg_wx}
          />
          <Form
            iconName={'user-circle'}
            onChangeText={(value: any) => setPhoneNumber(value)}
            label={'*请输入合法的手机号'}
            placeholder={'手机号'}
            show={reg_phone}
          />
          <Form
            iconType={'Fontisto'}
            iconName={'email'}
            onChangeText={(value: any) => setPhoneNumber(value)}
            label={'*请输入合法的电子邮箱'}
            placeholder={'电子邮箱'}
            show={reg_email}
          />
          <Form
            iconName={'lock'}
            onChangeText={(value: any) => setImageCode(value)}
            label={'*請輸入验证码'}
            placeholder={reg_vcode == 3 ? '点击显示验证码' : '验证码'}
            show={reg_vcode}
            showRightIcon={true}
            renderRightIcon={() => {
              if (reg_vcode == 1 || reg_vcode == 3) {
                return (
                  <FastImage
                    source={{ uri: correctImageCode }}
                    resizeMode={'contain'}
                    style={{ width: scale(150), height: '100%' }}
                  />
                )
              } else {
                return null
              }
            }}
            onFocus={() => {
              if (correctImageCode == '') {
                APIRouter.secure_imgCaptcha().then((value) => {
                  console.log('---------抓取imgCaptcha-------')
                  setCorrectImageCode(value?.data)
                })
              }
            }}
          />
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
                  inviter: recommendGuy,
                  usr: account,
                  pwd: password.md5(),
                  fundPwd: confirmPassword.md5(),
                  fullName: realName,
                  regType: agent ? 'agent' : 'user',
                }
                register(params)
              }
            }}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigate(PageName.BZHSignInPage, {})
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
    backgroundColor: '#d9d9d9',
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    // aspectRatio: 485 / 655,
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingVertical: scale(25),
    flexWrap: 'wrap',
  },
  formContainer: {
    flex: 440,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
  }
})
export default BZHRegisterPage
