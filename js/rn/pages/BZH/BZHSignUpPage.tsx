import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import AgentRedButtonComponent from '../../public/components/tars/AgentRedButtonComponent'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot, push } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const BZHSignUpPage = () => {
  const { show, ref, label, onChange, sign, valid, limit } = useSignUpPage({
    homePage: PageName.BZHHomePage,
    signInPage: PageName.BZHSignInPage,
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

  const { signUp } = sign

  const { pass_length_max } = limit

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <MineHeader
          title={'注册'}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBlock}>
          <SignUpForm
            leftIconName={'users'}
            onChangeText={onChangeRecommendGuy}
            label={recommendGuyLabel}
            placeholder={'推荐人ID'}
            show={showRecommendGuy}
          />
          <SignUpForm
            onChangeText={obChangeAccount}
            label={'*请使用6-15位英文或数字的组合'}
            placeholder={'帐号'}
            show={showName}
            leftIconName={'users'}
          />
          <SignUpForm
            leftIconName={'lock'}
            onChangeText={obChangePassword}
            label={passwordLebel}
            placeholder={'密码'}
            showRightIcon
            show={true}
            maxLength={pass_length_max}
            rightIconType={'eye'}
          />
          <SignUpForm
            leftIconName={'lock'}
            onChangeText={onChangeConfirmPassword}
            label={confirmPasswordLabel}
            placeholder={'确认密码'}
            showRightIcon
            show={true}
            rightIconType={'eye'}
          />
          <SignUpForm
            leftIconName={'user'}
            onChangeText={onChaneRealName}
            label={realNameLabel}
            placeholder={'真实姓名'}
            show={showName}
          />
          <SignUpForm
            leftIconName={'lock'}
            onChangeText={onChaneFundPassword}
            label={fundpwdLabel}
            placeholder={'取款密码'}
            showRightIcon
            show={showfundpwd}
            maxLength={4}
            rightIconType={'eye'}
          />
          <SignUpForm
            leftIcon={{
              name: 'QQ',
              type: 'antdesign',
            }}
            onChangeText={onChaneQQ}
            label={qqLabel}
            placeholder={'QQ号'}
            show={showQQ}
          />
          <SignUpForm
            leftIcon={{
              name: 'wechat',
              type: 'font-awesome',
            }}
            onChangeText={onChaneWeChat}
            label={wechatLabel}
            placeholder={'微信号'}
            show={showWx}
          />
          <SignUpForm
            leftIconName={'smartphone'}
            onChangeText={onChanePhone}
            label={phoneLabel}
            placeholder={'手机号'}
            show={showPhone}
          />
          <SignUpForm
            leftIcon={{
              type: 'material-community',
              name: 'email-outline',
            }}
            onChangeText={onChangeEmail}
            label={emailLabel}
            placeholder={'电子邮箱'}
            show={showEmail}
          />
          <SignUpForm
            leftIconName={'lock'}
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
          <SignUpForm
            leftIconName={'lock'}
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
          />
          <AgentRedButtonComponent
            show={parseInt(agentRegbutton) ? true : false}
            onChangeAgent={onChangeAgent}
            containerStyle={{ marginTop: scale(20) }}
          />
          <Button
            title={'注册'}
            disabled={!valid}
            containerStyle={[
              styles.button,
              {
                backgroundColor: BZHThemeColor.宝石红.themeColor,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                push(PageName.BZHSignInPage, {})
              }}
            >
              <Text style={{ fontWeight: '300' }}>{'返回登录'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={popToRoot}>
              <Text style={{ fontWeight: '300' }}>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(10) }}
    inputContainerStyle={{ borderColor: '#d9d9d9' }}
  />
)

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
    width: '100%',
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default BZHSignUpPage

{
  /* <View style={{ width: '100%', marginBottom: scale(20) }}>
            <Text style={{ color: 'red' }}>
              {'为了您的资金安全，请使用真实资料!'}
            </Text>
          </View> */
}
