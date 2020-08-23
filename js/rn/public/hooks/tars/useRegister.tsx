import { Platform } from 'react-native'
import APIRouter, { UserReg } from '../../network/APIRouter'
import useLogIn from './useLogIn'
import {
  ToastStatus,
  ToastSuccess,
  cleanNativeUser,
  ToastError,
} from '../../tools/tars'

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useRegister = (options: Options = {}) => {
  const { logIn } = useLogIn()
  const { onSuccess, onError } = options
  const register = async (params: UserReg) => {
    try {
      if (Platform?.OS == 'ios') {
        ToastStatus('正在注册...')
        const { usr, pwd } = params
        const user_reg_response = await APIRouter.user_reg(params)
        const user_reg_data = user_reg_response?.data?.data
        const msg_reg_msg = user_reg_response?.data?.msg
        // console.log("------------user_reg_data------------", user_reg_data)
        if (user_reg_data) {
          // 註冊成功
          ToastSuccess('注册成功')
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
          // 註冊失敗
          ToastError(msg_reg_msg ?? '注册失败')
          onError && onError(msg_reg_msg ?? '注册失败')
        }
      }
    } catch (error) {
      ToastError(error)
      onError && onError(error)
    }
  }
  return { register }
}

export default useRegister
