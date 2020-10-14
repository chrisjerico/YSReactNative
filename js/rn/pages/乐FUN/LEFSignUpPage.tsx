import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/temp/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/temp/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot, push } from '../../public/navigation/RootNavigation'
import { LEFThemeColor } from '../../public/theme/colors/LEFThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/temp/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import SignUpFormList from '../../public/views/temp/SignUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";

const LEFSignUpPage = () => {
  const {
    show,
    slideCodeRef,
    phoneNumber,
    label,
    onChange,
    sign,
    valid,
    passwordLimit,
  } = useSignUpPage({
    homePage: PageName.LEFHomePage,
    signInPage: PageName.LEFSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={LEFThemeColor.乐FUN.themeColor}>
        <MineHeader
          title={'注册'}
          titleColor={LEFThemeColor.乐FUN.textColor2}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={true}
          customerTitle={'登录'}
          onPressCustomerService={()=>{
            push(PageName.LEFSignInPage)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={_styles.container} showsVerticalScrollIndicator={false}>
        <View style={_styles.formContainer}>
          <SignUpFormList
            slideCodeRef={slideCodeRef}
            phoneNumber={phoneNumber}
            slideCodeColor={'#ffffff'}
            show={show}
            label={label}
            passwordLimit={passwordLimit}
            onChange={onChange}
            Form={SignUpForm}
          />
          <Button
            title={'注册'}
            disabled={!valid}
            containerStyle={[
              _styles.button,
              {
                backgroundColor: LEFThemeColor.乐FUN.textColor2,
              },
            ]}
            disabledContainerStyle={_styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <Button
            title={'已有账号，点击登录'}
            containerStyle={_styles.signUpButton}
            titleStyle={_styles.signUpText}
            onPress={() => {
              push(PageName.LEFSignInPage, {})
            }}
          />

        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => {
  return (
    <FormComponent
      {...props}
      containerStyle={_styles.input}
      inputContainerStyle={_styles.input_container}
      leftIcon={{
        ...props.leftIcon,
        color: LEFThemeColor.乐FUN.textColor2,
      }}
    />
  )
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LEFThemeColor.乐FUN.homeContentSubColor,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
  },
  button: {
    width: '100%',
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(22),
  },
  input: {
    marginBottom: scale(20),
  },
  input_container: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: '#DDDDDD',
    paddingHorizontal: scale(8),
  },
  signUpButton: {
    backgroundColor: 'white',
    borderColor: LEFThemeColor.乐FUN.themeColor,
    borderWidth: scale(1),
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(22),
    marginBottom: scale(44),
  },
  signUpText: {
    color: LEFThemeColor.乐FUN.themeColor,
    fontSize: scale(23)
  },
})

export default LEFSignUpPage
