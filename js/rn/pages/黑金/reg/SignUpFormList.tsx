import React, {RefObject} from 'react'
import {FormComponentProps} from "../../../public/components/tars/FormComponent";
import {AgentType, PasswordStrength} from "../../../public/models/Enum";
import {SlideCode} from "../../../public/models/Interface";
import AgentButtonComponent from "../../../public/components/tars/AgentButtonComponent";
import {scale} from "../../../public/tools/Scale";
import ReloadSlidingVerification from "../../../public/components/tars/ReloadSlidingVerification";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";

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
  phoneNumber: string;
  slideCodeRef: RefObject<any>;
  show: Show;
  onChange: OnChange;
  label: Label;
  passwordLimit: PasswordLimit;
  Form?: (props: FormComponentProps & { leftIconTitle: string }) => any;
}

interface PasswordLimit {
  strength: PasswordStrength,
  maxLength: number,
  minLength: number,
}

interface OnChange {
  onChangeRecommendGuy: (value: string) => any;
  obChangeAccount: (value: string) => any;
  obChangePassword: (value: string) => any;
  onChangeConfirmPassword: (value: string) => any;
  onChaneRealName: (value: string) => any;
  onChaneFundPassword: (value: string) => any;
  onChaneQQ: (value: string) => any;
  onChaneWeChat: (value: string) => any;
  onChanePhone: (value: string) => any;
  onChangeEmail: (value: string) => any;
  onChaneSms: (value: string) => any;
  onChangeSlideCode: (value: SlideCode) => any;
  onChangeAgent: (value: AgentType) => any;
}

const SignUpFormList = ({
                          slideCodeColor,
                          phoneNumber,
                          show,
                          onChange,
                          label,
                          slideCodeRef,
                          passwordLimit,
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

  const {maxLength} = passwordLimit

  return (
    <>
      <Form
        leftIconName={'users'}
        onChangeText={onChangeRecommendGuy}
        label={recommendGuyLabel}
        placeholder={'推荐人ID'}
        leftIconTitle={'推荐人'}
        show={showRecommendGuy}
        placeholderTextColor={'#d9d9d9'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        onChangeText={obChangeAccount}
        label={'*请使用6-15位英文或数字的组合'}
        placeholder={'帐号'}
        show={true}
        leftIconName={'users'}
        leftIconTitle={'用户帐号'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={obChangePassword}
        label={passwordLebel}
        placeholder={'密码'}
        showRightIcon
        show={true}
        maxLength={maxLength}
        rightIconType={'eye'}
        leftIconTitle={'登录密码'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
        rightIconStyle={{
          highColor: HJThemeColor.黑金.themeColor,
          color: '#d9d9d9',
        }}
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
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
        rightIconStyle={{
          highColor: HJThemeColor.黑金.themeColor,
          color: '#d9d9d9',
        }}
      />
      <Form
        leftIconName={'user'}
        onChangeText={onChaneRealName}
        label={nameLabel}
        placeholder={'真实姓名'}
        show={showName}
        leftIconTitle={'真实姓名'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
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
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
        rightIconStyle={{
          highColor: HJThemeColor.黑金.themeColor,
          color: '#d9d9d9',
        }}
      />
      <Form
        onChangeText={onChaneQQ}
        label={qqLabel}
        placeholder={'QQ号'}
        show={showQQ}
        leftIconTitle={'QQ号'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          name: 'QQ',
          type: 'antdesign',
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        onChangeText={onChaneWeChat}
        label={wxLabel}
        placeholder={'微信号'}
        leftIconTitle={'微信号'}
        show={showWx}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          name: 'wechat',
          type: 'font-awesome',
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        leftIconName={'smartphone'}
        onChangeText={onChanePhone}
        label={phoneNumberLabel}
        placeholder={'手机号'}
        show={showPhoneNumber}
        leftIconTitle={'手机号码'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        onChangeText={onChangeEmail}
        label={emailLabel}
        placeholder={'电子邮箱'}
        leftIconTitle={'电子邮箱'}
        show={showEmail}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          type: 'material-community',
          name: 'email-outline',
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <Form
        leftIconName={'lock'}
        onChangeText={onChaneSms}
        placeholder={'短信验证码'}
        show={showSms}
        extra={phoneNumber}
        showRightIcon={true}
        rightIconType={'sms'}
        leftIconTitle={'验证码'}
        placeholderTextColor={'white'}
        inputStyle={{
          color: 'white',
          fontSize: scale(24)
        }}
        leftIcon={{
          color: HJThemeColor.黑金.themeColor,
          size: scale(36),
        }}
      />
      <AgentButtonComponent
        show={showAgentButton}
        onChangeAgent={onChangeAgent}
        containerStyle={{marginTop: scale(20)}}
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
