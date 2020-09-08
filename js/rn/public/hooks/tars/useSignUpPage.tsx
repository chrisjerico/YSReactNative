import { useRef, useState } from 'react'
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { ToastError, ToastSuccess, validPassword } from '../../tools/tars'
import useRegister from './useRegister'
import useTryPlay from './useTryPlay'

interface SlidingVerification {
  nc_csessionid?: string;
  nc_token?: string;
  nc_sig?: string;
}

interface UseRegisterPage {
  homePage?: PageName;
  signInPage?: PageName;
}

const useSignUpPage = ({ homePage, signInPage }: UseRegisterPage) => {
  // states
  const [recommendGuy, setRecommendGuy] = useState(null)
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [realName, setRealName] = useState(null)
  const [fundPassword, setFundPassword] = useState(null)
  const [qq, setQQ] = useState(null)
  const [weChat, setWeChat] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [imageCode, setImageCode] = useState(null)
  const [slideCode, setSlideCode] = useState<SlidingVerification>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })
  const [email, setEmail] = useState(null)
  const [sms, setSms] = useState(null)
  const [agent, setAgent] = useState(false)
  // refs
  const slideCodeRef = useRef(null)

  const goToHomePage = () => {
    homePage && navigate(homePage, {})
  }

  const goToSignInPage = () => {
    signInPage && navigate(signInPage, {})
  }
  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      goToHomePage()
      ToastSuccess('登录成功')
    },
    onError: (error) => {
      ToastError('登录失败')
      console.log("--------試玩失败--------", error)
    },
  })

  const { register } = useRegister({
    onSuccessWithAutoLogin: goToHomePage,
    onSuccess: () => {
      ToastSuccess('注册成功')
      goToHomePage()
    },
    onError: (error) => {
      setSlideCode({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slideCodeRef?.current?.reload()
      ToastError('注册失败')
      console.log('-------注册失败-------', error)
    },
  })

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

  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slideCode
  const account_valid = account?.length >= 6
  const password_valid =
    validPassword(password, pass_limit) &&
    password?.length >= pass_length_min &&
    password?.length <= pass_length_max
  const confirmPassword_valid = confirmPassword == password
  const recommendGuy_valid =
    /^\d+$/.test(recommendGuy) || !hide_reco || hide_reco == 1
  const realName_valid =
    /^[\u4E00-\u9FA5]+$/.test(realName) || !reg_name || reg_name == 1
  const fundPassword_valid =
    (fundPassword?.length == 4 && /^\d+$/.test(fundPassword)) ||
    !reg_fundpwd ||
    reg_fundpwd == 1
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

  const onChangeAgent = (value: any) => setAgent(value)
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
  const onChangeSlideCode = setSlideCode

  //

  const getPasswordLimitString = () => {
    if (pass_limit == 1) {
      return '，密码须有数字及字母'
    } else if (pass_limit == 2) {
      return '，密码须有数字及字母及字符'
    } else {
      return ''
    }
  }

  const getLabel = (reco: number, label: string) => {
    if (reco == 1) {
      return label + '(选填)'
    } else if (reco == 2) {
      return '*' + label
    } else {
      return label
    }
  }

  const qqLabel = getLabel(reg_qq, '请输入合法的QQ号')
  const wechatLabel = getLabel(reg_wx, '请输入合法的微信号')
  const phoneLabel = getLabel(reg_phone, '请输入合法的手机号')
  const emailLabel = getLabel(reg_email, '请输入合法的电子邮箱')
  const recommendGuyLabel = getLabel(hide_reco, '请填写推荐人ID，只能包含数字') //hide_reco == 1 ? '推荐人ID，只能包含数字，如没有可不填写(选填)' : '*请填写推荐人ID，只能包含数字'
  const fundpwdLabel = getLabel(reg_fundpwd, '请输入4数字取款密码') //reg_fundpwd == 1 ? '请输入4数字取款密码(选填)' : '*请输入4数字取款密码'
  const realNameLabel = getLabel(
    reg_name,
    '必须与您的银行账户名称相同，以免未能到账'
  ) // reg_name == 1 ? '必须与您的银行账户名称相同，以免未能到账！(选填)' : '*必须与您的银行账户名称相同，以免未能到账！'
  const passwordLebel =
    '*请使用至少' +
    pass_length_min +
    '位至' +
    pass_length_max +
    '位英文或数字的组合' +
    getPasswordLimitString()
  const confirmPasswordLabel = (password == confirmPassword) && confirmPassword ? '' : '密码不一致'
  const imageCodeLabel = '*请输入验证码'

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
        'slideCode[nc_sid]': slideCode?.nc_csessionid,
        'slideCode[nc_token]': slideCode?.nc_token,
        'slideCode[nc_sig]': slideCode?.nc_sig,
        email: email, // 邮箱
        regType: agent ? 'agent' : 'user', // 用户注册 或 代理注册,
      }
      // @ts-ignore
      register(params)
    }
  }

  const onChange = {
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
    onChangeSlideCode,
    onChangeAgent,
  }

  const show = {
    showRecommendGuy: hide_reco > 0 ? true : false, // 代理人 0隱藏，1选填，2必填
    showName: reg_name > 0 ? true : false, // 真实姓名 0隱藏，1选填，2必填
    showfundpwd: reg_fundpwd > 0 ? true : false, // 取款密码 0隱藏，1选填，2必填
    showQQ: reg_qq > 0 ? true : false, // QQ 0隱藏，1选填，2必填
    showWx: reg_wx > 0 ? true : false, // 微信 0隱藏，1选填，2必填
    showPhone: reg_phone > 0 ? true : false, // 手机 0隱藏，1选填，2必填
    showEmail: reg_email > 0 ? true : false, // 邮箱 0隱藏，1选填，2必填
    showSlideCode: reg_vcode == 2 ? true : false,
    showImageCaptcha: reg_vcode == 1 ? true : false,
    showImageTouchCaptcha: reg_vcode == 3 ? true : false,
    agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    showSms: smsVerify, // 手机短信验证,
  }

  const label = {
    passwordLebel,
    recommendGuyLabel,
    confirmPasswordLabel,
    fundpwdLabel,
    realNameLabel,
    imageCodeLabel,
    emailLabel,
    phoneLabel,
    qqLabel,
    wechatLabel,
  }

  const goTo = {
    goToHomePage,
    goToSignInPage
  }

  const sign = {
    signUp,
    tryPlay
  }

  const limit = {
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
  }

  return {
    slideCodeRef,
    show,
    valid,
    label,
    onChange,
    goTo,
    sign,
    limit
  }
}

export default useSignUpPage
