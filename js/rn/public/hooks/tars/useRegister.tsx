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
  onSuccessWithAutoLogin?: () => any;
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useRegister = (options: Options = {}) => {
  const { logIn } = useLogIn({
    onStart: () => {
      ToastStatus('注册成功，正在登录...')
    },
    onSuccess: () => {
      ToastSuccess('登录成功')
    },
    onError: (error) => {
      ToastError(error ?? '自动登录失败')
      console.log('--------自動登录失败--------', error)
    },
  })
  const { onSuccessWithAutoLogin, onSuccess, onError } = options
  const register = async (params: UserReg) => {
    try {
      if (Platform?.OS == 'ios') {
        ToastStatus('正在注册...')
        const { usr, pwd } = params
        const user_reg_response = await APIRouter.user_reg(params)
        const user_reg_data = user_reg_response?.data?.data
        const msg_reg_msg = user_reg_response?.data?.msg
        console.log("--------user_reg_response--------", user_reg_response)
        if (user_reg_data) {
          // 註冊成功
          const { autoLogin } = user_reg_data
          if (autoLogin) {
            //登陸
            await logIn({
              account: usr,
              password: pwd,
            })
            onSuccessWithAutoLogin && onSuccessWithAutoLogin()
          } else {
            onSuccess && onSuccess()
          }
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
