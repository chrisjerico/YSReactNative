import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { UGStore } from '../../../redux/store/UGStore'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'

interface LogIn {
  account: string;
  password: string;
  slideCode: any;
}

interface Options {
  onStart?: () => any;
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogIn = (options: Options = {}) => {
  const { onSuccess, onError, onStart } = options
  const logIn = async ({ account, password, slideCode }: LogIn) => {
    try {
      if (Platform?.OS == 'ios') {
        onStart && onStart()
        const user_login_response = await APIRouter.user_login(
          account,
          password,
          undefined,
          slideCode
        )
        const user_login_data = user_login_response?.data?.data
        const user_login_msg = user_login_response?.data?.msg
        if (user_login_data) {
          // 登录成功
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(user_login_data)])
          const response = await APIRouter.user_info()
          const user_info_data = response?.data?.data
          const user_info_msg = response?.data?.msg
          if (user_info_data) {
            const currentUser = [
              { ...user_info_data, ...UGUserModel.getYS(user_login_data) },
            ]
            await OCHelper.call('UGUserModel.setCurrentUser:', currentUser)
            UGStore.dispatch({ type: 'merge', userInfo: user_info_data });
            UGStore.save();
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
    } catch (error) {
      onError && onError(error)
    }
  }
  return { logIn }
}
export default useLogIn
