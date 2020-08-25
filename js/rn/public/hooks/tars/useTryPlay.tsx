import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import APIRouter from '../../network/APIRouter'
import {
  saveNativeUser,
  ToastError,
  ToastStatus,
  ToastSuccess,
  updateUserInfo
} from '../../tools/tars'

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useTryPlay = (options: Options = {}) => {
  const { onSuccess, onError } = options
  const tryPlay = async () => {
    try {
      if (Platform.OS == 'ios') {
        ToastStatus('正在登录...')
        const user_guestLogin_response = await APIRouter.user_guestLogin()
        const user_guestLogin_data = user_guestLogin_response?.data?.data
        const user_guestLogin_msg = user_guestLogin_response?.data?.msg
        console.log(
          '----------user_guestLogin_data---------',
          user_guestLogin_data
        )
        if (user_guestLogin_data) {
          ToastSuccess('登录成功！')
          // 試玩成功
          // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
          //@ts-ignore
          await saveNativeUser({
            currentUser: [UGUserModel.getYS(user_guestLogin_data)],
            userName: '',
            userPsw: '',
          })
          await updateUserInfo()
          onSuccess && onSuccess()
        } else {
          // 試玩失敗
          ToastError(user_guestLogin_msg ?? '登录失败')
          onError && onError(user_guestLogin_msg ?? '登录失败')
        }
      }
    } catch (error) {
      ToastError(error)
      onError && onError(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
