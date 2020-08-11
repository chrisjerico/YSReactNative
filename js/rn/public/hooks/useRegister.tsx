import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { popToRoot } from '../navigation/RootNavigation'
import APIRouter, { UserReg } from '../network/APIRouter'
import { ToastError, ToastStatus, ToastSuccess } from '../tools/ToastUtils'

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const cleanOldUser = async () => {
  try {
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
  } catch (error) {
    throw error
  }
}

const login = async ({ usr, pwd }) => {
  try {
    const { data }: any = await APIRouter.user_login(usr, pwd)
    await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data?.data)]);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [usr, 'userName']);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [pwd, 'userPsw']);
    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
    await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
    const { data: UserInfo } = await APIRouter.user_info()
    await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo?.data, ...UGUserModel.getYS(data?.data) }]);
    UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });
    UGStore.save();
  } catch (error) {
    throw '自动登录失败'
  }
}

const useRegister = (options: Options = { onSuccess: popToRoot }) => {
  const { onSuccess, onError } = options
  const register = async (params: UserReg) => {
    try {
      ToastStatus('正在注册...')
      const { usr, pwd } = params
      if (Platform.OS == 'ios') {
        const { data } = await APIRouter.user_reg(params)
        const userReg_data = data?.data
        const msg = data?.msg
        if (userReg_data) {
          // 註冊成功
          ToastSuccess('注册成功')
          const { autoLogin } = userReg_data
          if (autoLogin) {
            //登陸
            await cleanOldUser()
            await login({ usr, pwd })
          }
          onSuccess && onSuccess()
        } else {
          // 註冊失敗
          ToastError(msg)
          onError && onError('注册失败')
        }
      }
    } catch (error) {
      ToastError(error)
      onError && onError(error)
    }
  }

  return { register }
}

export default useRegister


