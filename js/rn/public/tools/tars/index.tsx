import APIRouter from '../../network/APIRouter'
import { UGStore } from '../../../redux/store/UGStore'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import AppDefine from '../../define/AppDefine'

interface SaveNativeUser {
  currentUser: any[];
  isRememberPsd?: boolean;
  userName: string;
  userPsw: string;
  notification?: string;
}

export const updateUserInfo = async () => {
  try {
    const user_info_response = await APIRouter.user_info()
    const user_info_data = user_info_response?.data?.data
    const user_info_msg = user_info_response?.data?.msg
    if (user_info_data) {
      UGStore.dispatch({ type: 'merge', userInfo: user_info_data })
      UGStore.save()
      return user_info_response
    } else {
      throw user_info_msg ?? '更新使用者失败'
    }
  } catch (error) {
    console.log('-------------updateUserInfo error-------------', error)
    throw error
    // await OCHelper.call('UGUserModel.setCurrentUser:', []);
    // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
    // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
  }
}

export const saveNativeUser = async ({
  currentUser,
  isRememberPsd = false,
  userName,
  userPsw,
  notification = 'UGNotificationLoginComplete',
}: SaveNativeUser) => {
  try {
    await OCHelper.call('UGUserModel.setCurrentUser:', currentUser)
    await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [
      isRememberPsd,
      'isRememberPsd',
    ])
    await OCHelper.call(
      'NSUserDefaults.standardUserDefaults.setObject:forKey:',
      [userName, 'userName']
    )
    await OCHelper.call(
      'NSUserDefaults.standardUserDefaults.setObject:forKey:',
      [userPsw, 'userPsw']
    )
    // await OCHelper.call(
    //   'NSNotificationCenter.defaultCenter.postNotificationName:object:',
    //   [notification]
    // )
    // await OCHelper.call(
    //   'UGNavigationController.current.popToRootViewControllerAnimated:',
    //   [true]
    // )
  } catch (error) {
    throw error ?? 'SaveNativeUser Error'
  }
}


export const cleanNativeUser = async () => {
  try {
    const user = await OCHelper.call('UGUserModel.currentUser')
    if (user) {
      const sessid = await OCHelper.call('UGUserModel.currentUser.sessid')
      await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])
      await OCHelper.call('UGUserModel.setCurrentUser:')
      await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
      UGStore.dispatch({ type: 'reset', userInfo: {} });
    }
  } catch (error) {
    throw error ?? '清除旧使用者失败'
  }
}


export const ToastSuccess = (msg: any) => {
  console.log("--------ToastSuccess--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [typeof m === 'string' ? m : ''])
}

export const ToastError = (msg: any) => {
  console.log("--------ToastError--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [typeof m === 'string' ? m : ''])
}


export const ToastStatus = (msg: any) => {
  console.log("--------ToastStatus--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showWithStatus:', [typeof m === 'string' ? m : ''])
}


export const getHtml5Image = (id: number, path: string, type: 'png' | 'jpg' | 'gif' = 'png') => {
  return AppDefine.host + '/views/mobileTemplate/' + id?.toString() + '/images/' + path + '.' + type
  // return 'http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png'
}

export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 10, top: 100 }
  } else if (position == 2) {
    return { left: 10, bottom: 100 }
  } else if (position == 3) {
    return { right: 10, top: 100 }
  } else if (position == 4) {
    return { right: 10, bottom: 100 }
  } else {
    return {}
  }
}
