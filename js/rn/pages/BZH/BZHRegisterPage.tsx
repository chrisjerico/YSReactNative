import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useRegisterPage from '../../public/hooks/tars/useRegisterPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, push } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import AgentRedButton from './views/AgentRedButton'
import Form from './views/Form'

const BZHRegisterPage = () => {
  const {
    slidingVerificationRrf,
    hide_reco,
    pass_length_max,
    reg_name,
    reg_fundpwd,
    reg_qq,
    reg_wx,
    reg_phone,
    reg_email,
    reg_vcode,
    showPassword,
    showConfirmPassword,
    showFundPassword,
    correctImageCode,
    smsVerify,
    agentRegbutton,
    agent,
    valid,
    recommendGuyLabel,
    passwordLebel,
    confirmPasswordLabel,
    fundpwdLabel,
    realNameLabel,
    imageCodeLabel,
    emailLabel,
    phoneLabel,
    wechatLabel,
    qqLabel,
    onChangeRecommendGuy,
    obChangeAccount,
    obChangePassword,
    onChangeConfirmPassword,
    onChaneRealName,
    onChaneFundPassword,
    onChaneQQ,
    onChaneWeChat,
    onChanePhone,
    onChangeEmail,
    onChangeImageCode,
    onChaneSms,
    onChangeSlidingVerification,
    onChanePasswordSecure,
    onChaneConfirmPasswordSecure,
    onChaneFundPasswordSecure,
    fetchImgCaptcha,
    fetchSms,
    goToHomePage,
    signUp,
    setAgent,
  } = useRegisterPage({
    homePage: PageName.BZHHomePage,
  })

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <TouchableWithoutFeedback onPress={pop}>
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>{'注册'}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <Text style={styles.headerTitle}>{'客服'}</Text>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            onChangeText={onChangeRecommendGuy}
            label={recommendGuyLabel}
            placeholder={'推荐人ID'}
            show={hide_reco}
          />
          <Form
            onChangeText={obChangeAccount}
            label={'*请使用6-15位英文或数字的组合'}
            placeholder={'帐号'}
            show={2}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={obChangePassword}
            label={passwordLebel}
            placeholder={'密码'}
            secureTextEntry={!showPassword}
            showRightIcon
            rightIconProps={{
              onPress: onChanePasswordSecure,
            }}
            show={2}
            maxLength={pass_length_max}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={onChangeConfirmPassword}
            label={confirmPasswordLabel}
            placeholder={'确认密码'}
            secureTextEntry={!showConfirmPassword}
            showRightIcon
            rightIconProps={{
              onPress: onChaneConfirmPasswordSecure,
            }}
            show={2}
          />
          <Form
            leftIcon={{
              name: 'user',
            }}
            onChangeText={onChaneRealName}
            label={realNameLabel}
            placeholder={'真实姓名'}
            show={reg_name}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={onChaneFundPassword}
            label={fundpwdLabel}
            placeholder={'取款密码'}
            secureTextEntry={!showFundPassword}
            showRightIcon
            rightIconProps={{
              onPress: onChaneFundPasswordSecure,
            }}
            show={reg_fundpwd}
            maxLength={4}
          />
          <Form
            leftIcon={{
              name: 'QQ',
              type: 'antdesign',
            }}
            onChangeText={onChaneQQ}
            label={qqLabel}
            placeholder={'QQ号'}
            show={reg_qq}
          />
          <Form
            leftIcon={{
              name: 'wechat',
              type: 'font-awesome',
            }}
            onChangeText={onChaneWeChat}
            label={wechatLabel}
            placeholder={'微信号'}
            show={reg_wx}
          />
          <Form
            leftIcon={{
              name: 'smartphone',
            }}
            onChangeText={onChanePhone}
            label={phoneLabel}
            placeholder={'手机号'}
            show={reg_phone}
          />
          <Form
            leftIcon={{
              type: 'material-community',
              name: 'email-outline',
            }}
            onChangeText={onChangeEmail}
            label={emailLabel}
            placeholder={'电子邮箱'}
            show={reg_email}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={onChangeImageCode}
            label={imageCodeLabel}
            placeholder={reg_vcode == 3 ? '点击显示验证码' : '验证码'}
            show={reg_vcode == 1 || reg_vcode == 3}
            showRightIcon={true}
            renderRightIcon={() => (
              <TouchableWithoutFeedback onPress={fetchImgCaptcha}>
                <FastImage
                  source={{ uri: correctImageCode }}
                  resizeMode={'contain'}
                  style={{ width: scale(150), height: '100%' }}
                />
              </TouchableWithoutFeedback>
            )}
            onFocus={() => {
              if (correctImageCode == '') {
                fetchImgCaptcha()
              }
            }}
            maxLength={4}
          />
          <Form
            leftIcon={{
              name: 'lock',
            }}
            onChangeText={onChaneSms}
            placeholder={'短信验证码'}
            show={smsVerify}
            showRightIcon={true}
            renderRightIcon={() => (
              <Button
                title={'获取验证码'}
                onPress={fetchSms}
                titleStyle={{ fontSize: scale(20), fontWeight: '600' }}
                activeOpacity={1}
              />
            )}
          />
          {reg_vcode == 2 ? (
            <ReloadSlidingVerification
              ref={slidingVerificationRrf}
              onChange={onChangeSlidingVerification}
              containerStyle={{ marginBottom: scale(20) }}
            />
          ) : null}
          {parseInt(agentRegbutton) ? (
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
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={signUp}
            activeOpacity={1}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                push(PageName.BZHSignInPage, {})
              }}
            >
              <Text>{'返回登录'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={goToHomePage}>
              <Text>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
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
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHRegisterPage
