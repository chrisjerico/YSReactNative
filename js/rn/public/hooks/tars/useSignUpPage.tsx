import { useRef, useState } from 'react'
import { Necessity } from '../../models/Enum'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { ToastError, ToastSuccess, validPassword } from '../../tools/tars'
import useRegister from './useRegister'
import useSys from './useSys'
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
  const [name, setName] = useState(null)
  const [fundPassword, setFundPassword] = useState(null)
  const [qq, setQQ] = useState(null)
  const [weChat, setWeChat] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
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
  const { sys } = useSys({})
  // data handle
  const { necessity, pass_length_max, pass_length_min, pass_limit } = sys
  const { nc_csessionid, nc_token, nc_sig } = slideCode
  // valid
  const recommendGuy_valid = /^\d+$/.test(recommendGuy) || necessity?.recommendGuy != Necessity.必填
  const account_valid = account?.length >= 6
  const password_valid =
    validPassword(password, pass_limit) &&
    password?.length >= pass_length_min &&
    password?.length <= pass_length_max
  const confirmPassword_valid = confirmPassword == password
  const name_valid = /^[\u4E00-\u9FA5]+$/.test(name) || necessity?.name != Necessity.必填
  const fundPassword_valid = (fundPassword?.length == 4 && /^\d+$/.test(fundPassword)) || necessity?.fundPassword != Necessity.必填
  const qq_valid = qq?.length >= 5 || necessity?.qq != Necessity.必填
  const wx_valid = weChat || necessity?.wx != Necessity.必填
  const email_valid = email || necessity?.email != Necessity.必填
  const phoneNumber_valid = phoneNumber || necessity?.phoneNumber != Necessity.必填
  const slideCode_valid = (nc_csessionid && nc_token && nc_sig) || necessity?.slideCode != Necessity.必填
  const sms_valid = sms?.length == 6 || necessity?.sms != Necessity.必填

  const valid = false
  account_valid &&
    password_valid &&
    confirmPassword_valid &&
    recommendGuy_valid &&
    name_valid &&
    fundPassword_valid &&
    qq_valid &&
    wx_valid &&
    email_valid &&
    phoneNumber_valid &&
    slideCode_valid &&
    sms_valid

  // onChange
  const onChangeAgent = (value: any) => setAgent(value)
  const onChangeRecommendGuy = (value: any) => setRecommendGuy(value)
  const obChangeAccount = (value: any) => setAccount(value)
  const obChangePassword = (value: any) => setPassword(value)
  const onChangeConfirmPassword = (value: any) => setConfirmPassword(value)
  const onChaneRealName = (value: any) => setName(value)
  const onChaneFundPassword = (value: any) => setFundPassword(value)
  const onChaneQQ = (value: any) => setQQ(value)
  const onChaneWeChat = (value: any) => setWeChat(value)
  const onChanePhone = (value: any) => setPhoneNumber(value)
  const onChangeEmail = (value: any) => setEmail(value)
  const onChaneSms = (value: any) => setSms(value)
  const onChangeSlideCode = setSlideCode

  const getPasswordLimitString = () => {
    if (pass_limit == '1') {
      return '，密码须有数字及字母'
    } else if (pass_limit == '2') {
      return '，密码须有数字及字母及字符'
    } else {
      return ''
    }
  }

  const getLabel = (necessity: Necessity, label: string) => {
    if (necessity == Necessity.选填) {
      return label + '(选填)'
    } else if (necessity == Necessity.必填) {
      return '*' + label
    } else {
      return label
    }
  }

  const qqLabel = getLabel(necessity?.qq, '请输入合法的QQ号')
  const wxLabel = getLabel(necessity?.wx, '请输入合法的微信号')
  const phoneNumberLabel = getLabel(necessity?.phoneNumber, '请输入合法的手机号')
  const emailLabel = getLabel(necessity?.email, '请输入合法的电子邮箱')
  const recommendGuyLabel = getLabel(necessity?.recommendGuy, '请填写推荐人ID，只能包含数字')
  const fundPasswordLabel = getLabel(necessity?.fundPassword, '请输入4数字取款密码')
  const nameLabel = getLabel(
    necessity?.name,
    '必须与您的银行账户名称相同，以免未能到账'
  )
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
        fullName: name, // 真实姓名
        qq: qq, // QQ号
        wx: weChat, // 微信号
        phone: phoneNumber, // 手机号
        smsCode: sms ?? '', // 短信验证码
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
    onChaneSms,
    onChangeSlideCode,
    onChangeAgent,
  }

  const show = {
    showRecommendGuy: necessity?.recommendGuy != Necessity.隱藏,
    showName: necessity?.name != Necessity.隱藏,
    showFundPassword: necessity?.fundPassword != Necessity.隱藏,
    showQQ: necessity?.qq != Necessity.隱藏,
    showWx: necessity?.wx != Necessity.隱藏,
    showPhoneNumber: necessity?.phoneNumber != Necessity.隱藏,
    showEmail: necessity?.email != Necessity.隱藏,
    showSlideCode: necessity?.slideCode != Necessity.隱藏,
    showAgentButton: necessity?.agentButton != Necessity.隱藏,
    showSms: necessity?.sms != Necessity.隱藏,
  }

  const label = {
    passwordLebel,
    recommendGuyLabel,
    confirmPasswordLabel,
    fundPasswordLabel,
    nameLabel,
    imageCodeLabel,
    emailLabel,
    phoneNumberLabel,
    qqLabel,
    wxLabel,
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
