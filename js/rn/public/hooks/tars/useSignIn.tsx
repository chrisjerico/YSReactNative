import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { UGStore } from '../../../redux/store/UGStore'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { NA_DATA } from '../../define/ANHelper/hp/DataDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'

interface SignIn {
  account: string
  password: string
  slideCode?: any
  fullName?: string
}

interface Options {
  onStart?: () => any
  onSuccess?: () => any
  onError?: (error: any) => any
  onNeedFullName?: () => any
}

const handleSignIn = async ({ user_login_data, user_login_msg, onSuccess, onError }) => {
  if (user_login_data?.['API-SID'] && user_login_data?.['API-TOKEN']) {
    // 登录成功
    switch (Platform.OS) {
      case 'ios':
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(user_login_data)])
        break
      case 'android':
        await ANHelper.callAsync(CMD.SAVE_DATA, {
          key: NA_DATA.LOGIN_INFO,
          ...user_login_data,
        })
        break
    }
    const response = await APIRouter.user_info()
    const user_info_data = response?.data?.data
    const user_info_msg = response?.data?.msg
    if (user_info_data) {
      const currentUser = [{ ...user_info_data, ...UGUserModel.getYS(user_login_data) }]
      switch (Platform.OS) {
        case 'ios':
          await OCHelper.call('UGUserModel.setCurrentUser:', currentUser)
          break
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA, {
            key: NA_DATA.USER_INFO,
            ...user_info_data,
          })
          break
      }
      UGStore.dispatch({ type: 'merge', userInfo: user_info_data })
      UGStore.save()
      onSuccess && onSuccess()
    } else {
      // 登录失敗
      onError && onError(user_info_msg)
    }
  } else {
    // 登录失敗
    onError && onError(user_login_msg)
  }
}

const useSignIn = (options: Options = {}) => {
  const { onSuccess, onError, onStart, onNeedFullName } = options
  const signIn = async ({ account, password, slideCode, fullName }: SignIn) => {
    try {
      onStart && onStart()
      const user_login_response = await APIRouter.user_login({
        usr: account,
        pwd: password,
        slideCode,
        fullName,
      })
      const user_login_data = user_login_response?.data?.data
      const user_login_msg = user_login_response?.data?.msg
      if (user_login_data?.['needFullName']) {
        onNeedFullName && onNeedFullName()
      } else {
        handleSignIn({
          user_login_data,
          user_login_msg,
          onSuccess,
          onError,
        })
      }
    } catch (error) {
      onError && onError(error)
    }
  }
  return { signIn }
}
export default useSignIn
