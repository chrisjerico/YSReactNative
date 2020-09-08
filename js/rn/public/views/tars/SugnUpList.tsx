import React from 'react'
import AgentRedButtonComponent from "../../components/tars/AgentRedButtonComponent"
import { FormComponentProps } from "../../components/tars/FormComponent"
import ReloadSlidingVerification from "../../components/tars/ReloadSlidingVerification"
import { scale } from "../../tools/Scale"

interface SignUpListProps {
  slideCodeColor: string;
  slideCodeRef: any;
  show: any;
  onChange: any;
  label: any;
  limit: any;
  Form?: (props: FormComponentProps) => any;
}

const SignUpList = ({ slideCodeColor, show, onChange, label, slideCodeRef, limit, Form = () => { return null } }: SignUpListProps) => {

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

  const { pass_length_max } = limit

  return (
    <>
      <Form
        leftIconName={'users'}
        onChangeText={onChangeRecommendGuy}
        label={recommendGuyLabel}
        placeholder={'推荐人ID'}
        leftIconTitle={'推荐人'}
        show={showRecommendGuy}
      />
      <Form
        onChangeText={obChangeAccount}
        label={'*请使用6-15位英文或数字的组合'}
        placeholder={'帐号'}
        show={showName}
        leftIconName={'users'}
        leftIconTitle={'用户帐号'}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={obChangePassword}
        label={passwordLebel}
        placeholder={'密码'}
        showRightIcon
        show={true}
        maxLength={pass_length_max}
        rightIconType={'eye'}
        leftIconTitle={'登录密码'}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={onChangeConfirmPassword}
        label={confirmPasswordLabel}
        placeholder={'确认密码'}
        showRightIcon
        show={true}
        rightIconType={'eye'}
        leftIconTitle={'确认密码'}
      />
      <Form
        leftIconName={'user'}
        onChangeText={onChaneRealName}
        label={realNameLabel}
        placeholder={'真实姓名'}
        show={showName}
        leftIconTitle={'真实姓名'}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={onChaneFundPassword}
        label={fundpwdLabel}
        placeholder={'取款密码'}
        showRightIcon
        show={showfundpwd}
        maxLength={4}
        rightIconType={'eye'}
        leftIconTitle={'取款密码'}
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
        leftIconTitle={'QQ号'}
      />
      <Form
        leftIcon={{
          name: 'wechat',
          type: 'font-awesome',
        }}
        onChangeText={onChaneWeChat}
        label={wechatLabel}
        placeholder={'微信号'}
        leftIconTitle={'微信号'}
        show={showWx}
      />
      <Form
        leftIconName={'smartphone'}
        onChangeText={onChanePhone}
        label={phoneLabel}
        placeholder={'手机号'}
        show={showPhone}
        leftIconTitle={'手机号码'}
      />
      <Form
        leftIcon={{
          type: 'material-community',
          name: 'email-outline',
        }}
        onChangeText={onChangeEmail}
        label={emailLabel}
        placeholder={'电子邮箱'}
        leftIconTitle={'电子邮箱'}
        show={showEmail}
      />
      <Form
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
      <Form
        leftIconName={'lock'}
        onChangeText={onChaneSms}
        placeholder={'短信验证码'}
        show={showSms}
        showRightIcon={true}
        rightIconType={'sms'}
      />
      <AgentRedButtonComponent
        show={parseInt(agentRegbutton) ? true : false}
        onChangeAgent={onChangeAgent}
        containerStyle={{ marginTop: scale(20) }}
      />
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={showSlideCode}
        onChange={onChangeSlideCode}
        backgroundColor={slideCodeColor}
        containerStyle={{
          backgroundColor: slideCodeColor
        }}
      />
    </>
  )
}


export default SignUpList