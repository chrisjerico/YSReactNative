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
import { BYThemeColor } from '../../public/theme/colors/BYThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/temp/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import SignUpFormList from '../../public/views/temp/SignUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";

const BYSignUpPage = () => {
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
    homePage: PageName.BYHomePage,
    signInPage: PageName.BYSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={BYThemeColor.白曜.tabBarBgColor}>
        <MineHeader
          title={'注册'}
          titleColor={BYThemeColor.白曜.themeColor}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
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
              styles.button,
              {
                backgroundColor: BYThemeColor.白曜.themeColor,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <Button
            title={'已有账号，点击登录'}
            containerStyle={styles.signUpButton}
            titleStyle={styles.signUpText}
            onPress={() => {
              push(PageName.BYSignInPage, {})
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
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={{ borderColor: '#d9d9d9' }}
      leftIcon={{
        ...props.leftIcon,
        color: BYThemeColor.白曜.themeColor,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BYThemeColor.白曜.homeContentSubColor,
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
  signUpButton: {
    backgroundColor: 'white',
    borderColor: BYThemeColor.白曜.themeColor,
    borderWidth: scale(1),
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(22),
    marginBottom: scale(44),
  },
  signUpText: {
    color: BYThemeColor.白曜.themeColor,
    fontSize: scale(23)
  },
})

export default BYSignUpPage
