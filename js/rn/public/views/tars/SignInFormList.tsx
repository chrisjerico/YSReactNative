import React, { memo, RefObject } from 'react'
import { FormComponentProps } from '../../components/tars/FormComponent'
import ReloadSlidingVerification from '../../components/tars/ReloadSlidingVerification'
import { scale } from '../../tools/Scale'
import CheckBox from './CheckBox'

interface SignInFormListProps {
  slideCodeColor?: string
  slideCodeRef: RefObject<any>
  value: { [key: string]: any }
  onChange: { [key: string]: any }
  show: { [key: string]: any }
  Form?: (props: FormComponentProps & { leftIconTitle: string }) => any
  showCheckBox?: boolean
}

const SignInFormList = ({ slideCodeRef, value, onChange, show, Form, slideCodeColor, showCheckBox = true }: SignInFormListProps) => {
  const { remember, account, password } = value

  const { onChangePassword, onChangeAccount, onChangeRemember, onChangeSlideCode } = onChange

  const { loginVCode } = show

  return (
    <>
      <Form
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
      {showCheckBox && <CheckBox onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: scale(10) }} defaultValue={remember} />}
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={loginVCode}
        onChange={onChangeSlideCode}
        backgroundColor={slideCodeColor}
        containerStyle={{
          backgroundColor: slideCodeColor,
        }}
      />
    </>
  )
}

export default memo(SignInFormList)
