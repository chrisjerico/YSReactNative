import { Platform } from 'react-native'
import APIRouter, { UserReg } from '../../network/APIRouter'
import useSignIn from './useSignIn'

interface Options {
  onSuccessAutoLogin?: () => any
  onErrorAutoLogin?: (error: any) => any
  onStart?: () => any
  onSuccess?: () => any
  onError?: (error: any) => any
}

const useSignUp = (options: Options = {}) => {
  const { onSuccessAutoLogin, onErrorAutoLogin, onStart, onSuccess, onError } = options
  const { signIn } = useSignIn({
    onStart: () => {},
    onSuccess: () => {
      onSuccessAutoLogin && onSuccessAutoLogin()
    },
    onError: (error) => {
      onErrorAutoLogin && onErrorAutoLogin(error)
    },
  })
  const signUp = async (params: UserReg) => {
    try {
      onStart && onStart()
      const { usr, pwd } = params
      const user_reg_response = await APIRouter.user_reg(params)
      const user_reg_data = user_reg_response?.data?.data
      const msg_reg_msg = user_reg_response?.data?.msg
      console.log('--------user_reg_data-------', user_reg_data)
      console.log('--------msg_reg_msg-------', msg_reg_msg)
      if (user_reg_data) {
        // 註冊成功
        const { autoLogin } = user_reg_data
        if (autoLogin) {
          //登陸
          await signIn({
            account: usr,
            password: pwd,
          })
        } else {
          onSuccess && onSuccess()
        }
      } else {
        onError && onError(msg_reg_msg)
      }
    } catch (error) {
      onError && onError(error)
    }
  }
  return { signUp }
}

export default useSignUp
