import React from 'react'
import AgentRedButtonComponent from '../../components/tars/AgentRedButtonComponent'
import { FormComponentProps } from '../../components/tars/FormComponent'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { scale } from '../../tools/Scale'

interface Show {
  showRecommendGuy: boolean;
  showName: boolean;
  showFundPassword: boolean;
  showQQ: boolean;
  showWx: boolean;
  showPhoneNumber: boolean;
  showEmail: boolean;
  showSlideCode: boolean;
  showAgentButton: boolean;
  showSms: boolean;
}

interface Label {
  passwordLebel: string;
  recommendGuyLabel: string;
  confirmPasswordLabel: string;
  fundPasswordLabel: string;
  nameLabel: string;
  imageCodeLabel: string;
  emailLabel: string;
  phoneNumberLabel: string;
  qqLabel: string;
  wxLabel: string;
}

interface SignUpFormListProps {
  slideCodeColor: string;
  slideCodeRef: any;
  show: Show;
  onChange: any;
  label: Label;
  limit: any;
  Form?: (props: FormComponentProps) => any;
}

const SignUpFormList = ({
  slideCodeColor,
  show,
  onChange,
  label,
  slideCodeRef,
  limit,
  Form = () => {
    return null
  },
}: SignUpFormListProps) => {
  const {
    showRecommendGuy,
    showName,
    showFundPassword,
    showQQ,
    showWx,
    showEmail,
    showPhoneNumber,
    showSms,
    showSlideCode,
    showAgentButton,
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
    onChaneSms,
    onChangeSlideCode,
    onChangeAgent,
  } = onChange

  const {
    recommendGuyLabel,
    passwordLebel,
    confirmPasswordLabel,
    fundPasswordLabel,
    nameLabel,
    emailLabel,
    phoneNumberLabel,
    wxLabel,
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
        label={nameLabel}
        placeholder={'真实姓名'}
        show={showName}
        leftIconTitle={'真实姓名'}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={onChaneFundPassword}
        label={fundPasswordLabel}
        placeholder={'取款密码'}
        showRightIcon
        show={showFundPassword}
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
        label={wxLabel}
        placeholder={'微信号'}
        leftIconTitle={'微信号'}
        show={showWx}
      />
      <Form
        leftIconName={'smartphone'}
        onChangeText={onChanePhone}
        label={phoneNumberLabel}
        placeholder={'手机号'}
        show={showPhoneNumber}
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
        onChangeText={onChaneSms}
        placeholder={'短信验证码'}
        show={showSms}
        showRightIcon={true}
        rightIconType={'sms'}
      />
      <AgentRedButtonComponent
        show={showAgentButton}
        onChangeAgent={onChangeAgent}
        containerStyle={{ marginTop: scale(20) }}
      />
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={showSlideCode}
        onChange={onChangeSlideCode}
        backgroundColor={slideCodeColor}
        containerStyle={{
          backgroundColor: slideCodeColor,
        }}
      />
    </>
  )
}

export default SignUpFormList
