import React, { useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AgentRedButtonComponent from '../../public/components/tars/AgentRedButtonComponent'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import Form from './views/Form'
import config from './config'
import Menu from './views/Menu'
import SignInHeader from './views/SignInHeader'

const WNZSignUpPage = () => {
  const menu = useRef(null)

  const {
    show,
    ref,
    label,
    onChange,
    sign,
    valid,
    limit,
    goTo,
  } = useSignUpPage({
    homePage: PageName.WNZHomePage,
    signInPage: PageName.WNZSignInPage,
  })

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

  const { signUp, tryPlay } = sign

  const { pass_length_max } = limit

  const { goToSignInPage } = goTo

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignInHeader
          onPressLeftTool={pop}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressRegister={goToSignInPage}
        />
      </SafeAreaHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Form
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onChangeRecommendGuy}
            label={recommendGuyLabel}
            placeholder={'推荐人ID'}
            show={showRecommendGuy}
            title={'推荐人'}
          />
          <Form
            onChangeText={obChangeAccount}
            label={'*请使用6-15位英文或数字的组合'}
            placeholder={'帐号'}
            show={showName}
            title={'用护照号'}
          />
          <Form
            onChangeText={obChangePassword}
            label={passwordLebel}
            placeholder={'密码'}
            showRightIcon
            show={true}
            maxLength={pass_length_max}
            title={'登录密码'}
            rightIconType={'eye'}
          />
          <Form
            onChangeText={onChangeConfirmPassword}
            label={confirmPasswordLabel}
            placeholder={'确认密码'}
            showRightIcon
            show={true}
            title={'确认密码'}
          />
          <Form
            onChangeText={onChaneRealName}
            label={realNameLabel}
            placeholder={'真实姓名'}
            show={showName}
            title={'真实姓名'}
          />
          <Form
            onChangeText={onChaneFundPassword}
            label={fundpwdLabel}
            placeholder={'取款密码'}
            showRightIcon
            show={showfundpwd}
            maxLength={4}
            title={'取款密码'}
          />
          <Form
            onChangeText={onChaneQQ}
            label={qqLabel}
            placeholder={'QQ号'}
            show={showQQ}
            title={'QQ号'}
          />
          <Form
            onChangeText={onChaneWeChat}
            label={wechatLabel}
            placeholder={'微信号'}
            show={showWx}
            title={'微信号'}
          />
          <Form
            onChangeText={onChanePhone}
            label={phoneLabel}
            placeholder={'手机号'}
            show={showPhone}
            title={'手机号码'}
          />
          <Form
            onChangeText={onChangeEmail}
            label={emailLabel}
            placeholder={'电子邮箱'}
            show={showEmail}
            title={'电子邮箱'}
          />
          <Form
            onChangeText={onChangeImageCode}
            label={imageCodeLabel}
            placeholder={showImageTouchCaptcha ? '点击显示验证码' : '验证码'}
            show={showImageCaptcha || showImageTouchCaptcha}
            showRightIcon={true}
            rightIconType={
              showImageTouchCaptcha ? 'touchImgCaptcha' : 'imgCaptcha'
            }
            maxLength={4}
            title={'验证码'}
          />
          <Form
            onChangeText={onChaneSms}
            placeholder={'短信验证码'}
            show={showSms}
            showRightIcon={true}
            rightIconType={'sms'}
            title={'短信验证'}
          />
          <ReloadSlidingVerification
            ref={slideCode}
            show={showSlideCode}
            onChange={onChangeSlideCode}
            containerStyle={{
              marginBottom: scale(20),
              backgroundColor: '#f2f2f2',
            }}
            backgroundColor={'#f2f2f2'}
          />
          <AgentRedButtonComponent
            show={parseInt(agentRegbutton) ? true : false}
            onChangeAgent={onChangeAgent}
          />
          <Button
            disabled={!valid}
            title={'立即注册'}
            containerStyle={styles.signUpButton}
            disabledContainerStyle={[
              styles.signUpButton,
              {
                opacity: 0.5,
                backgroundColor: '#dd524d',
              },
            ]}
            titleStyle={{ color: '#ffffff', fontSize: scale(25) }}
            onPress={signUp}
          />
          <Button
            title={'已有帐号，直接登陆'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={pop}
          />
          <Button
            title={'免费试玩'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={tryPlay}
          />
          <Button
            title={'在线客服'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={() =>
              PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }
          />
          <Button
            title={'返回首页'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={popToRoot}
          />
        </View>
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
    marginTop: scale(23),
    marginBottom: scale(100),
  },
  inputContainerStyle: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    paddingLeft: scale(20),
    height: scale(63),
  },
  inputTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(60),
  },
  inputText: {
    fontSize: scale(25),
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#dd524d',
    marginTop: scale(32),
    aspectRatio: 10,
    borderRadius: scale(5),
  },
  whiteButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: scale(15),
    aspectRatio: 10,
    borderRadius: scale(5),
    borderColor: '#ccc',
    borderWidth: scale(1),
  },
  whitwButtonTitle: {
    color: '#f13031',
    fontSize: scale(25),
    fontWeight: '300',
  },
})

export default WNZSignUpPage
