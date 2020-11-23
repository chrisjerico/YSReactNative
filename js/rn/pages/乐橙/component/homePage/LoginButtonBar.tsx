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

      // switch (Platform.OS) {
      //   case 'ios':
      //     OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
      //     break;
      //   case 'android':
      //     Toast('正在登录...')
      //     break;
      // }

      const { data, status } = await APIRouter.user_guestLogin()
      debugger

      switch (Platform.OS) {
        case 'ios':
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])
          //@ts-ignore
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)])
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])
          await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])
          break
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA, {
            key: NA_DATA.LOGIN_INFO,
            ...data?.data,
          })
          break
      }

      const { data: userInfo } = await APIRouter.user_info()

      switch (Platform.OS) {
        case 'ios':
          //TODO
          break
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA, {
            key: NA_DATA.USER_INFO,
            ...userInfo?.data,
          })
          break
      }

      UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data })
      UGStore.save()

      Toast('登录成功！')
      // OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
    } catch (error) {
      // OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
      Toast(error?.message ?? '登入失败')
      console.log(error)
    }

    hideLoading()
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          PushHelper.pushLogin()
        }}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>登录</Text>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback
        onPress={() => {
          PushHelper.pushRegister()
        }}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>注册</Text>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: '#333', width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }} />
      <TouchableWithoutFeedback onPress={testPlay}>
        <Text style={{ color: '#333', fontSize: 17.6, lineHeight: 24.6 }}>试玩</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}
