import React from 'react'
import {FormComponentProps} from "../../../public/components/temp/FormComponent";
import CheckBox from "../../../public/views/temp/CheckBox";
import {scale} from "../../../public/tools/Scale";
import ReloadSlidingVerification from "../../../public/components/temp/ReloadSlidingVerification";

interface SignInFormListProps {
  slideCodeColor?: string;
  slideCodeRef: any;
  value: any;
  onChange: any;
  show: any;
  Form?: (props: FormComponentProps & { leftIconTitle: string }) => any;
  hideRemember?: boolean;
}

const SignInFormList = ({
                          slideCodeColor,
                          slideCodeRef,
                          value,
                          onChange,
                          show,
                          Form,
                          hideRemember,
                        }: SignInFormListProps) => {
  const {remember, account, password} = value

  const {
    onChangePassword,
    onChangeAccount,
    onChangeRemember,
    onChangeSlideCode,
  } = onChange

  const {loginVCode} = show

  return (
    <>
      <Form
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
      <Form
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
      {
        hideRemember ? null :
          <CheckBox
            onPress={onChangeRemember}
            label={'记住密码'}
            containerStyle={{alignSelf: 'flex-start', marginTop: scale(10)}}
            defaultValue={remember}
          />
      }
      <ReloadSlidingVerification
        ref={slideCodeRef}
        show={loginVCode}
        onChange={onChangeSlideCode}
        backgroundColor={slideCodeColor}
        containerStyle={{
          backgroundColor: slideCodeColor
        }}
      />
    </>
  )
}

export default SignInFormList
