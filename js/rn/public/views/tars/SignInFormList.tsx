import React, { memo, RefObject } from 'react'
import { FormComponentProps } from '../../components/tars/FormComponent'
import NeedNameInputComponent from '../../components/tars/NeedNameInputComponent'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { scale } from '../../tools/Scale'
import CheckBox, { CheckBoxProps } from './CheckBox'

export type SignInRenderFormProps = FormComponentProps & { [key: string]: any }

interface SignInFormListProps {
  slideCodeColor?: string
  value: { [key: string]: any }
  onChange: OnChange
  show: Show
  renderForm: (props: SignInRenderFormProps) => any
  showCheckBox?: boolean
  accountFormProps?: { [key: string]: any }
  passwordFormProps?: { [key: string]: any }
  checkBoxProps?: CheckBoxProps
  reference?: Reference
}

interface Reference {
  slideCodeRef?: RefObject<any>
  needNameInputRef?: RefObject<any>
}

interface Show {
  loginVCode?: boolean
}

interface OnChange {
  onChangePassword?: (text: string) => any
  onChangeAccount?: (text: string) => any
  onChangeRemember?: (remember: boolean) => any
  onChangeSlideCode?: (data: any) => any
  onSubmitFullName?: (text: string) => any
}

const SignInFormList = ({ value, onChange, show, renderForm, slideCodeColor, showCheckBox = true, accountFormProps, passwordFormProps, checkBoxProps, reference }: SignInFormListProps) => {
  const { remember, account, password } = value

  const { onChangePassword, onChangeAccount, onChangeRemember, onChangeSlideCode, onSubmitFullName } = onChange

  const { loginVCode } = show

  const { slideCodeRef, needNameInputRef } = reference

  const Form = renderForm

  return (
    <>
      <Form
        {...accountFormProps}
        visible={true}
        placeholder={'请输入会员帐号'}
        onChangeText={onChangeAccount}
        leftIconProps={{
          name: 'user-circle',
          type: 'font-awesome',
        }}
        defaultValue={account}
        showLabel={false}
        leftIconTitle={'帐号'}
      />
      <Form
        {...passwordFormProps}
        showLabel={false}
        visible={true}
        placeholder={'请输入密码'}
        leftIconProps={{
          name: 'unlock-alt',
          type: 'font-awesome',
        }}
        onChangeText={onChangePassword}
        showRightIcon
        defaultValue={password}
        rightIconType={'eye'}
        leftIconTitle={'密码'}
      />
      {showCheckBox && <CheckBox {...checkBoxProps} onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: scale(10) }} defaultValue={remember} />}
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={loginVCode}
        onChange={onChangeSlideCode}
        backgroundColor={slideCodeColor}
        containerStyle={{
          backgroundColor: slideCodeColor,
        }}
      />
      <NeedNameInputComponent ref={needNameInputRef} onSubmitFullName={onSubmitFullName} />
    </>
  )
}

export default memo(SignInFormList)
