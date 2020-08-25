import { Platform } from 'react-native'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { saveNativeUser, ToastStatus, cleanNativeUser, ToastSuccess, updateUserInfo, ToastError } from '../../tools/tars'


interface LogIn {
  isRemember?: boolean;
  account: string;
  password: string;
}

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogIn = (options: Options = {}) => {
  const { onSuccess, onError } = options
  const logIn = async ({ account, password, isRemember = false }: LogIn) => {
    try {
      if (Platform?.OS == 'ios') {
        ToastStatus('正在登录...')
        // await APIRouter.user_logout()
        const user_login_response = await APIRouter.user_login(
          account,
          password
        )
        const user_login_data = user_login_response?.data?.data
        const user_login_msg = user_login_response?.data?.msg
        // console.log("------------user_login_data------------", user_login_data)
        if (user_login_data) {
          // 登录成功
          ToastSuccess('登录成功！')
          await cleanNativeUser()
          await saveNativeUser({
            currentUser: [
              UGUserModel.getYS(user_login_data),
            ],
            isRememberPsd: isRemember,
            userName: isRemember ? account : '',
            userPsw: isRemember ? password : ''

          })
          const user_info_response = await updateUserInfo()
          await OCHelper.call('UGUserModel.setCurrentUser:', [
            { ...user_info_response?.data?.data, ...UGUserModel.getYS(user_login_data) },
          ])
          onSuccess && onSuccess()
        } else {
          // 登录失敗
          ToastError(user_login_msg ?? '登录失败')
          onError && onError(user_login_msg ?? '登录失败')
        }
      }
    } catch (error) {
      ToastError(error)
      onError && onError(error)
    }
  }
  return { logIn }
}
export default useLogIn
