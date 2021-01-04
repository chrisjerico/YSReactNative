import { Platform } from 'react-native'
import APIRouter, { UserReg } from '../../network/APIRouter'
import useSignIn from './useSignIn'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import SlideCodeModel from '../../../redux/model/other/SlideCodeModel'

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
    onStart: () => {
    },
    onSuccess: () => {
      onSuccessAutoLogin && onSuccessAutoLogin()
    },
    onError: (error) => {
      onErrorAutoLogin && onErrorAutoLogin(error)
    },
  })

  const userSingUp = async (params: {
    inviter: string; // 推荐人ID
    usr: string; // 账号
    pwd: string; // 密码
    fundPwd: string; // 取款密码
    fullName: string; // 真实姓名
    qq: string; // QQ号
    wx: string; // 微信号
    phone: string; // 手机号
    smsCode: string; // 短信验证码
    imgCode: string; // 字母验证码
    slideCode: SlideCodeModel; // 滑动验证码
    email: string; // 邮箱
    regType: 'user' | 'agent'; // 用户注册 或 代理注册
  }) => {
    (await api.user.reg(params)).promise.then(async (data)=> {
      if (data.data.autoLogin) {
        //登陸
        await signIn({
          account: params.usr,
          password: params.pwd,
          device: Platform.OS == 'android' ? 2 : 3,
        })
      } else {
        onSuccess && onSuccess()
      }
    })
  }

  const signUp = async (params: UserReg) => {
    try {
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
          await signIn({
            account: usr,
            password: pwd,
            device: Platform.OS == 'android' ? 2 : 3,
          })
        } else {
          onSuccess && onSuccess()
        }
      } else {
        console.log('-------------msg_reg_msg---------', msg_reg_msg)
        onError && onError(msg_reg_msg)
      }
    } catch (error) {
      onError && onError(error)
    }
  }
  return { signUp, userSingUp }
}

export default useSignUp
