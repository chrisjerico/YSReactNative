import React from 'react'
import CheckBox from './CheckBox'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { FormComponentProps } from '../../components/tars/FormComponent'
import { scale } from '../../tools/Scale'

interface SignInFormList {
  reloadSlidingVerificationColor?: string;
  slideCodeRef: any;
  value: any;
  onChange: any;
  show: any;
  SignInForm?: (props: FormComponentProps) => any;
}

const SignInFormList = ({
  slideCodeRef,
  value,
  onChange,
  show,
  SignInForm,
  reloadSlidingVerificationColor
}: SignInFormList) => {
  const { remember, account, password } = value

  const {
    onChangePassword,
    onChangeAccount,
    onChangeRemember,
    onChangeSlideCode,
  } = onChange

  const { loginVCode } = show

  return (
    <>
      <SignInForm
        show={true}
        placeholder={'请输入会员帐号'}
        onChangeText={onChangeAccount}
        leftIcon={{
          name: 'user-circle',
          type: 'font-awesome',
        }}
        defaultValue={account}
        enableLabel={false}
        leftIconTitle={'帐号'}
      />
      <SignInForm
        enableLabel={false}
        show={true}
        placeholder={'请输入密码'}
        leftIcon={{
          name: 'unlock-alt',
          type: 'font-awesome',
        }}
        onChangeText={onChangePassword}
        showRightIcon
        defaultValue={password}
        rightIconType={'eye'}
        leftIconTitle={'密码'}
      />
      <CheckBox
        onPress={onChangeRemember}
        label={'记住密码'}
        containerStyle={{ alignSelf: 'flex-start', marginTop: scale(10) }}
        defaultValue={remember}
      />
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={loginVCode}
        onChange={onChangeSlideCode}
        backgroundColor={reloadSlidingVerificationColor}
        containerStyle={{
          backgroundColor: reloadSlidingVerificationColor
        }}
      />
    </>
  )
}

export default SignInFormList
