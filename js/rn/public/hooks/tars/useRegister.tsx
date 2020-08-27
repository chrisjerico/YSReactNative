import { Platform } from 'react-native'
import APIRouter, { UserReg } from '../../network/APIRouter'
import {
  cleanNativeUser,
  ToastError,
  ToastStatus,
  ToastSuccess,
} from '../../tools/tars'
import useLogIn from './useLogIn'

interface Options {
  onSuccessRegister?: () => any;
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useRegister = (options: Options = {}) => {
  const { logIn } = useLogIn({
    onSuccess: () => {
      ToastSuccess('登录成功')
    },
    onError: (error) => {
      ToastError('自动登录失败' + error ? ' : ' + error : '')
      console.log('--------自動登录失败--------', error)
    },
  })
  const { onSuccessRegister, onSuccess, onError } = options
  const register = async (params: UserReg) => {
    try {
      if (Platform?.OS == 'ios') {
        ToastStatus('正在注册...')
        const { usr, pwd } = params
        const user_reg_response = await APIRouter.user_reg(params)
        const user_reg_data = user_reg_response?.data?.data
        const msg_reg_msg = user_reg_response?.data?.msg
        if (user_reg_data) {
          // 註冊成功
          onSuccessRegister && onSuccessRegister()
          const { autoLogin } = user_reg_data
          if (autoLogin) {
            //登陸
            await cleanNativeUser()
            await logIn({
              account: usr,
              password: pwd,
            })
          }
          onSuccess && onSuccess()
        } else {
          onError && onError(msg_reg_msg)
        }
      }
    } catch (error) {
      onError && onError(error)
    }
  }
  return { register }
}

export default useRegister
