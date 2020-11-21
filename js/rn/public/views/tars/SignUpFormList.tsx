import React, { memo, RefObject } from 'react'
import AgentButtonComponent from '../../components/tars/AgentButtonComponent'
import { FormComponentProps } from '../../components/tars/FormComponent'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { AgentType, PasswordStrength } from '../../models/Enum'
import { SlideCode } from '../../models/Interface'
import { scale } from '../../tools/Scale'

export type SignUpRenderFormProps = FormComponentProps & { [key: string]: any }

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
  showInviteCode: boolean
}

interface Label {
  passwordLebel: string
  recommendGuyLabel: string
  confirmPasswordLabel: string
  fundPasswordLabel: string
  nameLabel: string
  emailLabel: string
  phoneNumberLabel: string
  qqLabel: string
  wxLabel: string
  accountLabel: string
  inviteCodeLabel: string
}

interface SignUpFormListProps {
  slideCodeColor: string
  show: Show
  onChange: OnChange
  label: Label
  passwordLimit: PasswordLimit
  renderForm: (props: SignUpRenderFormProps) => any
  reference?: Reference
  value: Value
  placeholder?: Placeholder
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

interface Placeholder {
  recommendGuyPlaceholder: string
  accountPlaceholder: string
  passwordPlaceholder: string
  confirmPasswordPlaceholder: string
  fundPasswordPlaceholder: string
  qqPlaceholder: string
  wxPlaceholder: string
  emailPlaceholder: string
  smsPlaceholder: string
  inviteCodePlaceholder: string
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
  onChangeInviteCode: (value: string) => any
}

const SignUpFormList = ({ slideCodeColor, show, onChange, label, reference, passwordLimit, value, placeholder, renderForm }: SignUpFormListProps) => {
  const { fundPassword } = value
  const {
    recommendGuyPlaceholder,
    accountPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
    fundPasswordPlaceholder,
    qqPlaceholder,
    wxPlaceholder,
    emailPlaceholder,
    smsPlaceholder,
    inviteCodePlaceholder,
  } = placeholder
  const { showRecommendGuy, showName, showFundPassword, showQQ, showWx, showEmail, showPhoneNumber, showSms, showSlideCode, showAgentButton, showInviteCode } = show
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
    onChangeInviteCode,
  } = onChange

  const { recommendGuyLabel, passwordLebel, confirmPasswordLabel, fundPasswordLabel, nameLabel, emailLabel, phoneNumberLabel, wxLabel, qqLabel, accountLabel, inviteCodeLabel } = label

  const { maxLength } = passwordLimit

  const { slideCodeRef } = reference

  const Form = renderForm

  return (
    <>
      <Form leftIconName={'users'} onChangeText={onChangeInviteCode} label={inviteCodeLabel} placeholder={inviteCodePlaceholder} leftIconTitle={'邀请码'} visible={showInviteCode} />
      <Form leftIconName={'users'} onChangeText={onChangeRecommendGuy} label={recommendGuyLabel} placeholder={recommendGuyPlaceholder} leftIconTitle={'推荐人'} visible={showRecommendGuy} />
      <Form onChangeText={onChangeAccount} label={accountLabel} placeholder={accountPlaceholder} visible={true} leftIconName={'users'} leftIconTitle={'用户帐号'} />
      <Form
        leftIconName={'lock'}
        onChangeText={onChangePassword}
        label={passwordLebel}
        placeholder={passwordPlaceholder}
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
        placeholder={confirmPasswordPlaceholder}
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
        placeholder={fundPasswordPlaceholder}
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
        placeholder={qqPlaceholder}
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
        placeholder={wxPlaceholder}
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
        placeholder={emailPlaceholder}
        leftIconTitle={'电子邮箱'}
        visible={showEmail}
      />
      <Form leftIconName={'lock'} onChangeText={onChaneSms} placeholder={smsPlaceholder} visible={showSms} showRightIcon={true} rightIconType={'sms'} leftIconTitle={'验证码'} />
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
