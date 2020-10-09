import { Platform } from 'react-native'
import APIRouter, { UserReg } from '../../network/APIRouter'
import useLogIn from './useLogIn'

interface Options {
  onSuccessAutoLogin?: () => any
  onErrorAutoLogin?: (error: any) => any
  onStart?: () => any
  onSuccess?: () => any
  onError?: (error: any) => any
}

const useRegister = (options: Options = {}) => {
  const { onSuccessAutoLogin, onErrorAutoLogin, onStart, onSuccess, onError } = options
  const { logIn } = useLogIn({
    onStart: () => {},
    onSuccess: () => {
      onSuccessAutoLogin && onSuccessAutoLogin()
    },
    onError: (error) => {
      onErrorAutoLogin && onErrorAutoLogin(error)
    },
  })
  const register = async (params: UserReg) => {
    try {
      if (Platform?.OS == 'ios') {
        onStart && onStart()
        const { usr, pwd } = params
        const user_reg_response = await APIRouter.user_reg(params)
        const user_reg_data = user_reg_response?.data?.data
        const msg_reg_msg = user_reg_response?.data?.msg
        if (user_reg_data) {
          // 註冊成功
          const { autoLogin } = user_reg_data
          if (autoLogin) {
            //登陸
            await logIn({
              account: usr,
              password: pwd,
            })
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
