import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
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
    show,
    ref,
    label,
    onChange,
    goTo,
    sign,
    valid,
    limit,
  } = useRegisterPage({})

  const {
    showRecommendGuy,
    showName,
    showfundpwd,
    showQQ,
    showWx,
    showEmail,
    showPhone,
    showSms,
    showSlideCode,
    showImageCaptcha,
    showImageTouchCaptcha,
    agentRegbutton,
  } = show
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
    onChangeSlideCode,
    onChangeAgent,
  } = onChange

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

  const { slideCode } = ref

  const { goToHomePage } = goTo

  const { signUp } = sign

  const { pass_length_max } = limit

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
          show={showRecommendGuy}
        />
        <Form
          onChangeText={obChangeAccount}
          label={'*请使用6-15位英文或数字的组合'}
          placeholder={'帐号'}
          show={showName}
        />
        <Form
          leftIcon={{
            name: 'lock',
          }}
          onChangeText={obChangePassword}
          label={passwordLebel}
          placeholder={'密码'}
          showRightIcon
          show={true}
          maxLength={pass_length_max}
        />
        <Form
          leftIcon={{
            name: 'lock',
          }}
          onChangeText={onChangeConfirmPassword}
          label={confirmPasswordLabel}
          placeholder={'确认密码'}
          showRightIcon
          show={true}
        />
        <Form
          leftIcon={{
            name: 'user',
          }}
          onChangeText={onChaneRealName}
          label={realNameLabel}
          placeholder={'真实姓名'}
          show={showName}
        />
        <Form
          leftIcon={{
            name: 'lock',
          }}
          onChangeText={onChaneFundPassword}
          label={fundpwdLabel}
          placeholder={'取款密码'}
          showRightIcon
          show={showfundpwd}
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
          show={showQQ}
        />
        <Form
          leftIcon={{
            name: 'wechat',
            type: 'font-awesome',
          }}
          onChangeText={onChaneWeChat}
          label={wechatLabel}
          placeholder={'微信号'}
          show={showWx}
        />
        <Form
          leftIcon={{
            name: 'smartphone',
          }}
          onChangeText={onChanePhone}
          label={phoneLabel}
          placeholder={'手机号'}
          show={showPhone}
        />
        <Form
          leftIcon={{
            type: 'material-community',
            name: 'email-outline',
          }}
          onChangeText={onChangeEmail}
          label={emailLabel}
          placeholder={'电子邮箱'}
          show={showEmail}
        />
        <Form
          leftIcon={{
            name: 'lock',
          }}
          onChangeText={onChangeImageCode}
          label={imageCodeLabel}
          placeholder={showImageTouchCaptcha ? '点击显示验证码' : '验证码'}
          show={showImageCaptcha || showImageTouchCaptcha}
          showRightIcon={true}
          rightIconType={
            showImageTouchCaptcha ? 'touchImgCaptcha' : 'imgCaptcha'
          }
          maxLength={4}
        />
        <Form
          leftIcon={{
            name: 'lock',
          }}
          onChangeText={onChaneSms}
          placeholder={'短信验证码'}
          show={showSms}
          showRightIcon={true}
          rightIconType={'sms'}
        />
        <ReloadSlidingVerification
          ref={slideCode}
          show={showSlideCode}
          onChange={onChangeSlideCode}
          containerStyle={{ marginBottom: scale(20) }}
        />
        <AgentRedButtonComponent
          show={parseInt(agentRegbutton) ? true : false}
          onChangeAgent={onChangeAgent}
        />
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
