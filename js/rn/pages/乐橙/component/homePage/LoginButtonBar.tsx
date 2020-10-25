import * as React from 'react'
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import PushHelper from '../../../../public/define/PushHelper'
import UGUserModel from '../../../../redux/model/全局/UGUserModel'
import APIRouter from '../../../../public/network/APIRouter'
import { UGStore } from '../../../../redux/store/UGStore'
import { OCHelper } from '../../../../public/define/OCHelper/OCHelper'
import { hideLoading, showLoading, UGLoadingType } from '../../../../public/widget/UGLoadingCP'
import { ANHelper } from '../../../../public/define/ANHelper/ANHelper'
import { Toast } from '../../../../public/tools/ToastUtils'
import { NA_DATA } from '../../../../public/define/ANHelper/hp/DataDefine'
import { CMD } from '../../../../public/define/ANHelper/hp/CmdDefine'
import { navigate, push } from '../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../public/navigation/Navigation'
import useSignInPage from '../../../../public/hooks/tars/useSignInPage'

export const LoginButtonBar = () => {
  const { sign, navigateTo  } = useSignInPage({
    homePage: PageName.LCHomePage,
    signUpPage: PageName.LCRegisterPage,
  })
  const { tryPlay } = sign
  const { navigateToSignUpPage } = navigateTo

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
