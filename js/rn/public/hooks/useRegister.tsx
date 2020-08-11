import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { popToRoot } from '../navigation/RootNavigation'
import APIRouter, { UserReg } from '../network/APIRouter'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'

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
  } catch (err) {
    throw err
  }
}

const loginUser = async ({ usr,
  pwd, params }) => {
  try {
    const { data: loginData }: any = await APIRouter.user_login(
      usr,
      pwd
    )
    await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [params?.usr, 'userName']);
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [params?.pwd, 'userPsw']);
    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
    await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
    const { data: UserInfo } = await APIRouter.user_info()
    await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo?.data, ...UGUserModel.getYS(loginData?.data) }]);
    UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });
    UGStore.save();
  } catch (error) {
    console.log("---------error---------", error)
    throw '自动登录失败'
  }
}

const useRegister = (options: Options = { onSuccess: popToRoot }) => {
  const { onSuccess, onError } = options
  const register = async (params: UserReg) => {
    try {
      if (Platform.OS == 'ios') {
        OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...'])
        const { data } = await APIRouter.user_reg(params)
        const userReg_data = data?.data
        const msg = data?.msg
        if (userReg_data) {
          const { autoLogin, usr } = userReg_data
          if (autoLogin) {
            //註冊成功 自動登陸
            const { pwd } = params
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['注册成功'])
            onSuccess && onSuccess()
            await cleanOldUser()
            await loginUser({
              usr,
              pwd,
              params
            })
          } else {
            //註冊成功 不登陸
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [msg?.toString() ?? '注册成功'])
            onSuccess && onSuccess()
          }
        } else {
          // 註冊失敗
          OCHelper.call('SVProgressHUD.showErrorWithStatus:', [msg?.toString() ?? '注册失败'])
          onError && onError('注册失败')
        }
      }
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.toString() ?? '注册失败'])
      onError && onError(error)
    }
  }

  return { register }
}

export default useRegister


