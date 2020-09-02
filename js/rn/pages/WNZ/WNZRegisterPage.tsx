import React, { useRef } from 'react'
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import AgentRedButtonComponent from '../../public/components/tars/AgentRedButtonComponent'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import useRegisterPage from '../../public/hooks/tars/useRegisterPage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import Form from '../../public/views/tars/Form'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MenuModalComponent from './components/MenuModalComponent'
import config from './config'
import Menu from './views/Menu'
import SignInHeader from './views/SignInHeader'

const WNZRegisterPage = () => {
  const menu = useRef(null)

  const {
    reg,
    show,
    slidingVerificationRrf,
    correctImageCode,
    label,
    valid,
    onChange,
    fetchImgCaptcha,
    fetchSms,
    goToHomePage,
    signUp,
  } = useRegisterPage({})

  const {
    hide_reco,
    pass_length_max,
    reg_name,
    reg_fundpwd,
    reg_qq,
    reg_wx,
    reg_phone,
    reg_email,
    reg_vcode,
    smsVerify,
    agentRegbutton,
  } = reg
  const {
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
    onChangeAgent,
  } = onChange

  const { totalValid } = valid

  const {
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
  } = label

  const { showPassword, showConfirmPassword, showFundPassword } = show

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignInHeader
          onPressLeftTool={popToRoot}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressRegister={() => {
            navigate(PageName.WNZSignInPage, {})
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          showContent={!showPassword}
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
          showContent={!showConfirmPassword}
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
          showContent={!showFundPassword}
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
            />
          )}
        />
        {reg_vcode == 2 && (
          <ReloadSlidingVerification
            ref={slidingVerificationRrf}
            onChange={onChangeSlidingVerification}
            containerStyle={{ marginBottom: scale(20) }}
          />
        )}
        {parseInt(agentRegbutton) && (
          <AgentRedButtonComponent onChangeAgent={onChangeAgent} />
        )}
      </ScrollView>
      <MenuModalComponent
        ref={menu}
        menus={
          // @ts-ignore
          config?.menuSignIn?.concat(config?.menus)
        }
        renderMenu={({ item }) => {
          const { title, onPress } = item
          return (
            <Menu
              color={WNZThemeColor.威尼斯.themeColor}
              title={title}
              onPress={() => {
                menu?.current?.close()
                onPress && onPress()
              }}
            />
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: scale(20),
  },
})

export default WNZRegisterPage
