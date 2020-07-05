import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useRegister from '../../public/hooks/useRegister'
import { PageName } from '../../public/navigation/Navigation'
import {
  navigate,
  pop,
  popToRoot
} from '../../public/navigation/RootNavigation'
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

  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [hideFundPassword, setHideFundPassword] = useState(true)
  const [agent, setAgent] = useState(false)

  const valid =
    recommendGuy &&
    account &&
    password &&
    confirmPassword &&
    realName &&
    fundPassword

  const {
    hide_reco, // 代理人 0不填，1选填，2必填
    reg_name, // 真实姓名 0不填，1选填，2必填
    reg_fundpwd, // 取款密码 0不填，1选填，2必填
    reg_qq, // QQ 0不填，1选填，2必填
    reg_wx, // 微信 0不填，1选填，2必填
    reg_phone, // 手机 0不填，1选填，2必填
    reg_email, // 邮箱 0不填，1选填，2必填
    reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
    agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    smsVerify, // 手机短信验证
  } = SystemStore

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
      <View style={styles.container}>
        <View style={styles.whiteBlock}>
          <View style={styles.formContainer}>
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setRecommendGuy(value)}
              label={'推荐人ID，如没有可不填写'}
              labelStyle={styles.warningText}
              placeholder={'推荐人ID'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setAccount(value)}
              label={'为了您的资料安全，请使用真实资料!'}
              labelStyle={styles.warningText}
              placeholder={'帐号'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setPassword(value)}
              label={'*请使用6-15位英文或数字的组合'}
              labelStyle={styles.warningText}
              placeholder={'密码'}
              secureTextEntry={hidePassword}
              showRightIcon
              rightIconProps={{
                color: hidePassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHidePassword(!hidePassword)
                },
              }}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setConfirmPassword(value)}
              label={'*请使用至少6位字符'}
              labelStyle={styles.warningText}
              placeholder={'确认密码'}
              secureTextEntry={hideConfirmPassword}
              showRightIcon
              rightIconProps={{
                color: hideConfirmPassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHideConfirmPassword(!hideConfirmPassword)
                },
              }}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setRealName(value)}
              label={'*必须与您的银行账户名称相同，以免未能到账！'}
              labelStyle={styles.warningText}
              placeholder={'真实姓名'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setFundPassword(value)}
              label={'*请输入4数字取款密码'}
              labelStyle={styles.warningText}
              placeholder={'取款密码'}
              secureTextEntry={hideFundPassword}
              showRightIcon
              rightIconProps={{
                color: hideFundPassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHideFundPassword(!hideFundPassword)
                },
              }}
            />
          </View>
          {agentRegbutton == '1' ? (
            <View
              style={{
                flex: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AgentRedButton
                toggle={agent}
                onPressLeftButton={() => {
                  setAgent(false)
                }}
                onPressRightButton={() => {
                  setAgent(true)
                }}
              />
            </View>
          ) : (
              <View style={{ flex: 10 }} />
            )}
          <View style={{ flex: 50, justifyContent: 'space-between' }}>
            <Button
              title={'注册'}
              buttonStyle={
                valid
                  ? {
                    backgroundColor: '#ffffff',
                    borderColor: '#F0F0F0',
                    borderWidth: scale(1),
                    width: '100%',
                  }
                  : { backgroundColor: '#D0D0D0' }
              }
              titleStyle={{ color: valid ? '#EA0000' : '#ffffff' }}
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 65,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
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
      </View>
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
    aspectRatio: 485 / 655,
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
  },
  formContainer: {
    flex: 440,
    justifyContent: 'space-around',
  },
  warningText: {
    color: '#FF7575',
    fontSize: scale(15),
  },
})
export default BZHRegisterPage
