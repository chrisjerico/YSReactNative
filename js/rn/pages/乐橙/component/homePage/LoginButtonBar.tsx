import * as React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import PushHelper from '../../../../public/define/PushHelper'
import { PageName } from '../../../../public/navigation/Navigation'
import useSignInPage from '../../../../public/hooks/tars/useSignInPage'
import { UGUserCenterType } from '../../../../redux/model/全局/UGSysConfModel'
import { UGText } from '../../../../../doy/public/Button之类的基础组件/DoyButton'

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
        PushHelper.pushUserCenterType(UGUserCenterType.登录页)
      }}>
        <UGText style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>登录</UGText>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback onPress={navigateToSignUpPage}>
        <UGText style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>注册</UGText>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback onPress={tryPlay}>
        <UGText style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>试玩</UGText>
      </TouchableWithoutFeedback>
    </View>
  )
}
