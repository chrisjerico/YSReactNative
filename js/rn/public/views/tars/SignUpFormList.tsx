import React, { memo, RefObject } from 'react'
import AgentButtonComponent from '../../components/tars/AgentButtonComponent'
import { FormComponentProps } from '../../components/tars/FormComponent'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { AgentType, PasswordStrength } from '../../models/Enum'
import { SlideCode } from '../../models/Interface'
import { scale } from '../../tools/Scale'

interface Show {
  showRecommendGuy: boolean
  showName: boolean
  showFundPassword: boolean
  showQQ: boolean
  showWx: boolean
  showPhoneNumber: boolean
  showEmail: boolean
  showSlideCode: boolean
  showAgentButton: boolean
  showSms: boolean
}

interface Label {
  passwordLebel: string
  recommendGuyLabel: string
  confirmPasswordLabel: string
  fundPasswordLabel: string
  nameLabel: string
  imageCodeLabel: string
  emailLabel: string
  phoneNumberLabel: string
  qqLabel: string
  wxLabel: string
}

interface SignUpFormListProps {
  slideCodeColor: string
  show: Show
  onChange: OnChange
  label: Label
  passwordLimit: PasswordLimit
  Form?: (props: FormComponentProps & { leftIconTitle: string }) => any
  reference?: Reference
  value: Value
}

interface PasswordLimit {
  strength: PasswordStrength
  maxLength: number
  minLength: number
}

interface Reference {
  slideCodeRef?: RefObject<any>
}

interface Value {
  fundPassword: string
}

interface OnChange {
  onChangeRecommendGuy: (value: string) => any
  onChangeAccount: (value: string) => any
  onChangePassword: (value: string) => any
  onChangeConfirmPassword: (value: string) => any
  onChaneRealName: (value: string) => any
  onChaneFundPassword: (value: string) => any
  onChaneQQ: (value: string) => any
  onChaneWeChat: (value: string) => any
  onChanePhone: (value: string) => any
  onChangeEmail: (value: string) => any
  onChaneSms: (value: string) => any
  onChangeSlideCode: (value: SlideCode) => any
  onChangeAgent: (value: AgentType) => any
}

const SignUpFormList = ({
  slideCodeColor,
  show,
  onChange,
  label,
  reference,
  passwordLimit,
  value,
  Form = () => {
    return null
  },
}: SignUpFormListProps) => {
  const { fundPassword } = value
  const { showRecommendGuy, showName, showFundPassword, showQQ, showWx, showEmail, showPhoneNumber, showSms, showSlideCode, showAgentButton } = show
  const {
    onChangeRecommendGuy,
    onChangeAccount,
    onChangePassword,
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

  const { recommendGuyLabel, passwordLebel, confirmPasswordLabel, fundPasswordLabel, nameLabel, emailLabel, phoneNumberLabel, wxLabel, qqLabel } = label

  const { maxLength } = passwordLimit

  const { slideCodeRef } = reference

  return (
    <>
      <Form leftIconName={'users'} onChangeText={onChangeRecommendGuy} label={recommendGuyLabel} placeholder={'推荐人ID'} leftIconTitle={'推荐人'} visible={showRecommendGuy} />
      <Form onChangeText={onChangeAccount} label={'*请使用6-15位英文或数字的组合'} placeholder={'帐号'} visible={true} leftIconName={'users'} leftIconTitle={'用户帐号'} />
      <Form
        leftIconName={'lock'}
        onChangeText={onChangePassword}
        label={passwordLebel}
        placeholder={'密码'}
        showRightIcon
        visible={true}
        maxLength={maxLength}
        rightIconType={'eye'}
        leftIconTitle={'登录密码'}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={onChangeConfirmPassword}
        label={confirmPasswordLabel}
        placeholder={'确认密码'}
        showRightIcon
        visible={true}
        rightIconType={'eye'}
        leftIconTitle={'确认密码'}
      />
      <Form leftIconName={'user'} onChangeText={onChaneRealName} label={nameLabel} placeholder={'真实姓名'} visible={showName} leftIconTitle={'真实姓名'} />
      <Form
        leftIconName={'lock'}
        onChangeText={onChaneFundPassword}
        label={fundPasswordLabel}
        placeholder={'取款密码'}
        showRightIcon
        visible={showFundPassword}
        maxLength={4}
        rightIconType={'eye'}
        leftIconTitle={'取款密码'}
        value={fundPassword}
      />
      <Form
        leftIconProps={{
          name: 'QQ',
          type: 'antdesign',
        }}
        onChangeText={onChaneQQ}
        label={qqLabel}
        placeholder={'QQ号'}
        visible={showQQ}
        leftIconTitle={'QQ号'}
      />
      <Form
        leftIconProps={{
          name: 'wechat',
          type: 'font-awesome',
        }}
        onChangeText={onChaneWeChat}
        label={wxLabel}
        placeholder={'微信号'}
        leftIconTitle={'微信号'}
        visible={showWx}
      />
      <Form leftIconName={'smartphone'} onChangeText={onChanePhone} label={phoneNumberLabel} placeholder={'手机号'} visible={showPhoneNumber} leftIconTitle={'手机号码'} />
      <Form
        leftIconProps={{
          type: 'material-community',
          name: 'email-outline',
        }}
        onChangeText={onChangeEmail}
        label={emailLabel}
        placeholder={'电子邮箱'}
        leftIconTitle={'电子邮箱'}
        visible={showEmail}
      />
      <Form leftIconName={'lock'} onChangeText={onChaneSms} placeholder={'短信验证码'} visible={showSms} showRightIcon={true} rightIconType={'sms'} leftIconTitle={'验证码'} />
      <AgentButtonComponent visible={showAgentButton} onChangeAgent={onChangeAgent} containerStyle={{ marginVertical: scale(20) }} />
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

export default memo(SignUpFormList)
