import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { popToRoot } from '../navigation/RootNavigation'
import APIRouter, { UserReg } from '../network/APIRouter'

interface UseRegister {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const cleanOldUser = async () => {
  const user = await OCHelper.call('UGUserModel.currentUser')
  if (user) {
    // 退出舊帳號
    const sessid = await OCHelper.call(
      'UGUserModel.currentUser.sessid'
    )
    await OCHelper.call(
      'CMNetwork.userLogoutWithParams:completion:',
      [{ token: sessid }]
    )
    await OCHelper.call('UGUserModel.setCurrentUser:')
    await OCHelper.call(
      'NSNotificationCenter.defaultCenter.postNotificationName:object:',
      ['UGNotificationUserLogout']
    )
    UGStore.dispatch({ type: 'reset', userInfo: {} });
  }
}

const useRegister = (params: UseRegister = { onSuccess: popToRoot }) => {
  const { onSuccess, onError } = params
  const register = async (params: UserReg) => {
    try {
      if (Platform.OS == 'ios') {
        OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...'])
        const { data: regData }: any = await APIRouter.user_reg(params)
        const user_reg_data = regData?.data
        if (user_reg_data) {
          const { autoLogin, usr } = user_reg_data
          if (autoLogin) {
            //註冊成功 自動登陸
            const { pwd } = params
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['注册成功'])
            const { data: loginData }: any = await APIRouter.user_login(
              usr,
              pwd
            )
            await cleanOldUser()
            await OCHelper.call('UGUserModel.setCurrentUser:', [
              UGUserModel.getYS(loginData?.data),
            ])
            await OCHelper.call(
              'NSUserDefaults.standardUserDefaults.setBool:forKey:',
              [true, 'isRememberPsd']
            )
            await OCHelper.call(
              'NSUserDefaults.standardUserDefaults.setObject:forKey:',
              [params?.usr, 'userName']
            )
            await OCHelper.call(
              'NSUserDefaults.standardUserDefaults.setObject:forKey:',
              [params?.pwd, 'userPsw']
            )
            await OCHelper.call(
              'NSNotificationCenter.defaultCenter.postNotificationName:object:',
              ['UGNotificationLoginComplete']
            )
            await OCHelper.call(
              'UGNavigationController.current.popToRootViewControllerAnimated:',
              [true]
            )
            const { data: UserInfo, } = await APIRouter.user_info()
            await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo.data, ...UGUserModel.getYS(loginData?.data) }]);
            UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });
            UGStore.save();
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功'])
            onSuccess && onSuccess()
          } else {
            //註冊成功 不登陸
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
              regData.msg ?? '注册成功',
            ])
          }
        } else {
          // 註冊失敗
          OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
            regData?.msg ?? '注册失败',
          ])
          onError && onError('注册失败')
        }
      }
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
        error ?? '注册失败',
      ])
      onError && onError(error)
    }
  }

  return { register }
}

export default useRegister


