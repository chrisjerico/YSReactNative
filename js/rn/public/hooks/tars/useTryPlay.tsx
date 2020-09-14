import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import {
  saveNativeUser,
  ToastStatus
} from '../../tools/tars'
import {ugLog} from "../../tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../define/ANHelper/hp/DataDefine";

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
        console.log("-------user_guestLogin_data-----", user_guestLogin_data)
        switch (Platform.OS) {
          case 'ios':
            await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(user_guestLogin_data)])
            // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
            // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
            break;
          case 'android':
            await ANHelper.callAsync(CMD.SAVE_DATA,
              {
                key: NA_DATA.LOGIN_INFO,
                ...user_guestLogin_data
              });
            break;
        }

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
