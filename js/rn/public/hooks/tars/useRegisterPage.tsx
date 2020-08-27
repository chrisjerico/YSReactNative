import { useEffect, useRef, useState } from 'react'
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import APIRouter from '../../network/APIRouter'
import { ToastError, ToastSuccess, validPassword } from '../../tools/tars'
import useRegister from './useRegister'

interface SlidingVerification {
  nc_csessionid?: string;
  nc_token?: string;
  nc_sig?: string;
}

interface UseRegisterPage {
  // navigation: any;
  homePage: PageName;
}

const useRegisterPage = ({ homePage }: UseRegisterPage) => {
  // states
  const slidingVerificationRrf = useRef(null)
  const [recommendGuy, setRecommendGuy] = useState(null)
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [realName, setRealName] = useState(null)
  const [fundPassword, setFundPassword] = useState(null)
  const [qq, setQQ] = useState(null)
  const [weChat, setWeChat] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [correctImageCode, setCorrectImageCode] = useState('')
  const [imageCode, setImageCode] = useState(null)
  const [slidingVerification, setSlidingVerification] =
    useState<SlidingVerification>
      ({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
  const [email, setEmail] = useState(null)
  const [sms, setSms] = useState(null)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showFundPassword, setShowFundPassword] = useState(false)
  const [agent, setAgent] = useState(false)

  // functions

  const goToHomePage = () => {
    navigate(homePage, {})
  }

  const { register } = useRegister({
    onSuccessWithAutoLogin: goToHomePage,
    onSuccess: () => {
      ToastSuccess('注册成功')
      goToHomePage()
    },
    onError: (error) => {
      setSlidingVerification({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slidingVerificationRrf?.current?.reload()
      ToastError(error || '注册失败')
      console.log("-------注册失败-------", error)
    }
  })

  const fetchImgCaptcha = () => {
    APIRouter.secure_imgCaptcha().then((value) => {
      setCorrectImageCode(value?.data)
    }).catch((error) => {

    })
  }
  const fetchSms = async () => {
    try {
      const { data } = await APIRouter.secure_smsCaptcha(phoneNumber)
      const { code, msg } = data ?? {}
      if (code != 0) {
        throw { message: msg }
      } else {
        ToastSuccess(msg)
      }
    } catch (error) {
      ToastError(error?.message)
    }
  }
  // stores
  const {
    hide_reco, // 代理人 0隱藏，1选填，2必填
    reg_name, // 真实姓名 0隱藏，1选填，2必填
    reg_fundpwd, // 取款密码 0隱藏，1选填，2必填
    reg_qq, // QQ 0隱藏，1选填，2必填
    reg_wx, // 微信 0隱藏，1选填，2必填
    reg_phone, // 手机 0隱藏，1选填，2必填
    reg_email, // 邮箱 0隱藏，1选填，2必填
    reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
    smsVerify, // 手机短信验证,
  }: UGSysConfModel = UGStore.globalProps.sysConf

  // effects
  useEffect(() => {
    if (reg_vcode == 1) {
      fetchImgCaptcha()
    } else {
      setCorrectImageCode('')
    }
  }, [reg_vcode])

  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slidingVerification
  const account_valid = account?.length >= 6
  const password_valid = validPassword(password, pass_limit)
  const confirmPassword_valid = confirmPassword == password
  const recommendGuy_valid = recommendGuy || !hide_reco || hide_reco == 1
  const realName_valid = realName || !reg_name || reg_name == 1
  const fundPassword_valid =
    fundPassword?.length == 4 || !reg_fundpwd || reg_fundpwd == 1
  const qq_valid = qq?.length >= 5 || !reg_qq || reg_qq == 1
  const weChat_valid = weChat || !reg_wx || reg_wx == 1
  const email_valid = email || !reg_email || reg_email == 1
  const phoneNumber_valid = phoneNumber || !reg_phone || reg_phone == 1
  const reg_vcode_valid =
    (nc_csessionid && nc_token && nc_sig) ||
    !reg_vcode ||
    reg_vcode == 1 ||
    reg_vcode == 3
  const sms_valid = sms?.length == 6 || !smsVerify

  const valid =
    account_valid &&
    password_valid &&
    confirmPassword_valid &&
    recommendGuy_valid &&
    realName_valid &&
    fundPassword_valid &&
    qq_valid &&
    weChat_valid &&
    email_valid &&
    phoneNumber_valid &&
    reg_vcode_valid &&
    sms_valid

  const onChangeRecommendGuy = (value: any) => setRecommendGuy(value)
  const obChangeAccount = (value: any) => setAccount(value)
  const obChangePassword = (value: any) => setPassword(value)
  const onChangeConfirmPassword = (value: any) => setConfirmPassword(value)
  const onChaneRealName = (value: any) => setRealName(value)
  const onChaneFundPassword = (value: any) => setFundPassword(value)
  const onChaneQQ = (value: any) => setQQ(value)
  const onChaneWeChat = (value: any) => setWeChat(value)
  const onChanePhone = (value: any) => setPhoneNumber(value)
  const onChangeEmail = (value: any) => setEmail(value)
  const onChangeImageCode = (value: any) => setImageCode(value)
  const onChaneSms = (value: any) => setSms(value)
  const onChangeSlidingVerification = setSlidingVerification
  // Secure
  const onChanePasswordSecure = () => setShowPassword(!showPassword)
  const onChaneConfirmPasswordSecure = () => setShowConfirmPassword(!showConfirmPassword)
  const onChaneFundPasswordSecure = () => setShowFundPassword(!showFundPassword)

  //

  const signUp = () => {
    if (valid) {
      const params = {
        inviter: recommendGuy, // 推荐人ID
        usr: account, // 账号
        pwd: password?.md5(), // 密码
        fundPwd: fundPassword?.md5(), // 取款密码
        fullName: realName, // 真实姓名
        qq: qq, // QQ号
        wx: weChat, // 微信号
        phone: phoneNumber, // 手机号
        smsCode: sms ?? '', // 短信验证码
        imgCode: imageCode ?? '', // 字母验证码,
        'slideCode[nc_sid]': slidingVerification?.nc_csessionid,
        'slideCode[nc_token]': slidingVerification?.nc_token,
        'slideCode[nc_sig]': slidingVerification?.nc_sig,
        email: email, // 邮箱
        regType: agent ? 'agent' : 'user', // 用户注册 或 代理注册,
      }
      register(params as any)
    }
  }
  return {
    slidingVerificationRrf,
    hide_reco,
    pass_length_min,
    pass_length_max,
    password,
    confirmPassword,
    reg_name,
    reg_fundpwd,
    reg_qq,
    reg_wx,
    reg_phone,
    reg_email,
    reg_vcode,
    showPassword,
    showConfirmPassword,
    showFundPassword,
    correctImageCode,
    smsVerify,
    agentRegbutton,
    agent,
    valid,
    onChangeRecommendGuy,
    obChangeAccount,
    obChangePassword,
    onChangeConfirmPassword,
    onChaneRealName,
    onChaneFundPassword,
    onChaneQQ,
    onChaneWeChat,
    onChanePhone,
    onChangeEmail,
    onChangeImageCode,
    onChaneSms,
    onChangeSlidingVerification,
    onChanePasswordSecure,
    onChaneConfirmPasswordSecure,
    onChaneFundPasswordSecure,
    fetchImgCaptcha,
    fetchSms,
    goToHomePage,
    signUp,
    setAgent
  }
}

export default useRegisterPage
