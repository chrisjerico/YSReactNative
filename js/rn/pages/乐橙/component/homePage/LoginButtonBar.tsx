import * as React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import PushHelper from '../../../../public/define/PushHelper'
import { PageName } from '../../../../public/navigation/Navigation'
import useSignInPage from '../../../../public/hooks/tars/useSignInPage'

export const LoginButtonBar = () => {
  const { sign, navigateTo } = useSignInPage({
    homePage: PageName.LCHomePage,
    signUpPage: PageName.LCRegisterPage,
  })
  const { navigateToSignUpPage } = navigateTo
  const { tryPlay } = sign

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
      <TouchableWithoutFeedback onPress={() => {
        PushHelper.pushLogin()
      }}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>登录</Text>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback onPress={navigateToSignUpPage}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>注册</Text>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback onPress={tryPlay}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>试玩</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}
