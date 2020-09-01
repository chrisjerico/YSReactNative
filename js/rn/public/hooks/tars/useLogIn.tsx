import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { saveNativeUser } from '../../tools/tars'
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../define/ANHelper/hp/DataDefine";

interface LogIn {
  isRemember?: boolean;
  account: string;
  password: string;
}

interface Options {
  onStart?: () => any;
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogIn = (options: Options = {}) => {
  const { onSuccess, onError, onStart } = options
  const logIn = async ({ account, password, isRemember = false }: LogIn) => {
    try {
      showLoading({ type: UGLoadingType.Loading });
      onStart && onStart()
      // await APIRouter.user_logout()
      const user_login_response = await APIRouter.user_login(account, password)
      const user_login_data = user_login_response?.data?.data
      const user_login_msg = user_login_response?.data?.msg
      if (user_login_data) {
        // 登录成功
        // await cleanNativeUser()
        switch (Platform.OS) {
          case "ios":
            await saveNativeUser({
              currentUser: [
                UGUserModel.getYS(user_login_data),
              ],
              isRememberPsd: isRemember,
              userName: isRemember ? account : '',
              userPsw: isRemember ? password : ''

            })
            break;
          case "android":
            await ANHelper.callAsync(CMD.SAVE_DATA,
              {
                key: NA_DATA.LOGIN_INFO,
                ...user_login_data
              });
            break;
        }
        const user_info_data = await updateUserInfo()

        switch (Platform.OS) {
          case "ios":
            await OCHelper.call('UGUserModel.setCurrentUser:', [
              { ...user_info_data, ...UGUserModel.getYS(user_login_data) },
            ])
            break;
          case "android":
            await ANHelper.callAsync(CMD.SAVE_DATA,
              {
                key: NA_DATA.USER_INFO,
                ...user_info_data
              })
            break;
        }

        onSuccess && onSuccess()
      } else {
        // 登录失敗
        onError && onError(user_login_msg)
      }

      hideLoading()
    } catch (error) {
      hideLoading()

      onError && onError(error)
    }
  }
  return { logIn }
}
export default useLogIn
