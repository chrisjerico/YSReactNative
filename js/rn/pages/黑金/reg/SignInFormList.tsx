import React from 'react'
import {FormComponentProps} from "../../../public/components/temp/FormComponent";
import CheckBox from "../../../public/views/temp/CheckBox";
import {scale} from "../../../public/tools/Scale";
import ReloadSlidingVerification from "../../../public/components/temp/ReloadSlidingVerification";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";

interface SignInFormListProps {
  slideCodeColor?: string;
  slideCodeRef: any;
  value: any;
  onChange: any;
  show: any;
  Form?: (props: FormComponentProps & { leftIconTitle: string }) => any;
}

const SignInFormList = ({
                          slideCodeRef,
                          value,
                          onChange,
                          show,
                          Form,
                          slideCodeColor
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
          color: HJThemeColor.黑金.themeColor,
          size: scale(40),
        }}
        placeholderTextColor={'white'}
        inputStyle={{color: 'white',
          fontSize: scale(24)}}
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
          color: HJThemeColor.黑金.themeColor,
          size: scale(40),
        }}
        placeholderTextColor={'white'}
        inputStyle={{color: 'white',
          fontSize: scale(24)}}
        onChangeText={onChangePassword}
        showRightIcon
        defaultValue={password}
        rightIconType={'eye'}
        leftIconTitle={'密码'}
        rightIconStyle={{
          highColor: HJThemeColor.黑金.themeColor,
          color: '#d9d9d9',
        }}
      />
      <CheckBox
        onPress={onChangeRemember}
        label={'记住密码'}
        containerStyle={{
          alignSelf: 'flex-start',
          marginTop: scale(10),
        }}
        labelTextStyle={{color: 'white'}}
        defaultValue={remember}
      />
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
