import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { ToastStatus } from '../../tools/tars'

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
        if (user_guestLogin_data) {
          console.log("-------user_guestLogin_data-----", user_guestLogin_data)
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(user_guestLogin_data)])
          // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
          // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
          await updateUserInfo()
          onSuccess && onSuccess()
        } else {
          // 試玩失敗
          onError && onError(user_guestLogin_msg)
        }
      }
    } catch (error) {
      onError && onError(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
