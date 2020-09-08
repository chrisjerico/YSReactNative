import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../../redux/store/IGlobalStateHelper'
import APIRouter from '../../network/APIRouter'
import {
  saveNativeUser,
  ToastStatus
} from '../../tools/tars'
import {ugLog} from "../../tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useTryPlay = (options: Options = {}) => {
  const { onSuccess, onError } = options
  const tryPlay = async () => {
    try {
      showLoading({ type: UGLoadingType.Loading });

      const user_guestLogin_response = await APIRouter.user_guestLogin()
      const user_guestLogin_data = user_guestLogin_response?.data?.data
      const user_guestLogin_msg = user_guestLogin_response?.data?.msg
      if (user_guestLogin_data) {
        // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
        //@ts-ignore
        await saveNativeUser({
          currentUser: [UGUserModel.getYS(user_guestLogin_data)],
          userName: '',
          userPsw: '',
        })
        await updateUserInfo()

        hideLoading()
        onSuccess && onSuccess()
      } else {
        // 試玩失敗
        onError && onError(user_guestLogin_msg)
      }

    } catch (error) {
      hideLoading()
      onError && onError(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
