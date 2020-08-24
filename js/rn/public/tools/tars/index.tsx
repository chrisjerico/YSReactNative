import APIRouter from '../../network/APIRouter'
import { UGStore } from '../../../redux/store/UGStore'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import AppDefine from '../../define/AppDefine'
import { scale } from '../Scale'

interface SaveNativeUser {
  currentUser: any[];
  isRememberPsd?: boolean;
  userName: string;
  userPsw: string;
  notification?: string;
}

export const saveNativeUser = async ({
  currentUser,
  isRememberPsd = false,
  userName,
  userPsw,
}: // notification = 'UGNotificationLoginComplete',
  SaveNativeUser) => {
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
      await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [
        { token: sessid },
      ])
      await OCHelper.call('UGUserModel.setCurrentUser:')
      await OCHelper.call(
        'NSNotificationCenter.defaultCenter.postNotificationName:object:',
        ['UGNotificationUserLogout']
      )
      UGStore.dispatch({ type: 'reset', userInfo: {} })
    }
  } catch (error) {
    throw error ?? '清除旧使用者失败'
  }
}

export const ToastSuccess = (msg: any) => {
  console.log('--------ToastSuccess--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const ToastError = (msg: any) => {
  console.log('--------ToastError--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const ToastStatus = (msg: any) => {
  console.log('--------ToastStatus--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const getHtml5Image = (
  id: number,
  path: string,
  type: 'png' | 'jpg' | 'gif' = 'png'
) => {
  return (
    AppDefine.host +
    '/views/mobileTemplate/' +
    id?.toString() +
    '/images/' +
    path +
    '.' +
    type
  )
}

export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 0, top: scale(100) }
  } else if (position == 2) {
    return { left: 0, bottom: scale(100) }
  } else if (position == 3) {
    return { right: 0, top: scale(100) }
  } else if (position == 4) {
    return { right: 0, bottom: scale(100) }
  } else {
    return {}
  }
}
