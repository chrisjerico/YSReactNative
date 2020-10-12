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
import useSignInPage from '../../public/hooks/temp/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/temp/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import SignInFormList from '../../public/views/temp/SignInFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import {LEFThemeColor} from "../../public/theme/colors/LEFThemeColor";

const LEFSignInPage = () => {
  console.disableYellowBox = true

  const {
    sign,
    value,
    onChange,
    navigateTo,
    show,
    slideCodeRef,
    valid,
  } = useSignInPage({
    homePage: PageName.LEFHomePage,
    signUpPage: PageName.LEFSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign

  return (
    <>
      <SafeAreaHeader headerColor={LEFThemeColor.乐FUN.tabBarBgColor}>
        <MineHeader
          title={'登录'}
          titleColor={LEFThemeColor.乐FUN.themeColor}
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
          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={'#ffffff'}
            show={show}
            onChange={onChange}
            value={value}
            Form={SignInForm}
          />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={[
              styles.button,
              {
                backgroundColor: LEFThemeColor.乐FUN.themeColor,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signIn}
          />
          <Button
            title={'马上注册'}
            containerStyle={styles.signUpButton}
            titleStyle={styles.signUpText}
            onPress={navigateToSignUpPage}
          />
          <Button
            title={'免费试玩'}
            containerStyle={styles.tryButton}
            titleStyle={{ color: LEFThemeColor.乐FUN.themeColor, fontSize: scale(23) }}
            onPress={tryPlay}
          />
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(20) }}
    inputContainerStyle={{ borderColor: '#d9d9d9' }}
    leftIcon={{
      ...props.leftIcon,
      color: LEFThemeColor.乐FUN.themeColor,
    }}
  />
)

const styles = StyleSheet.create({
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
    paddingBottom: scale(44),
    marginBottom: scaleHeight(70),
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
    marginTop: scale(10),
  },
  button: {
    width: '100%',
    marginTop: scale(16),
    aspectRatio: 8,
    borderRadius: scale(22),
  },
  signUpButton: {
    backgroundColor: 'white',
    borderColor: LEFThemeColor.乐FUN.themeColor,
    borderWidth: scale(1),
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(22),
    marginTop: scale(20),
  },
  tryButton: {
    backgroundColor: 'white',
    borderColor: LEFThemeColor.乐FUN.themeColor,
    borderWidth: scale(1),
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(22),
    marginTop: scale(20),
  },
  signUpText: {
    color: LEFThemeColor.乐FUN.themeColor,
    fontSize: scale(23)
  },
})

export default LEFSignInPage
