import { useCallback, useMemo, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { AgentType, Necessity, PasswordStrength } from '../../models/Enum'
import { SlideCode } from '../../models/Interface'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { showLoading, UGLoadingType } from '../../widget/UGLoadingCP'
import useSignUp from './useSignUp'
import useSysInfo from './useSysInfo'
import useTryPlay from './useTryPlay'

interface UseRegisterPage {
  homePage?: PageName
  signInPage?: PageName
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
  const [slideCode, setSlideCode] = useState<SlideCode>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })
  const [email, setEmail] = useState(null)
  const [sms, setSms] = useState(null)
  // refs
  const slideCodeRef = useRef(null)
  const agentRef = useRef<AgentType>(null)

  const navigateToHomePage = useCallback(() => {
    homePage && navigate(homePage, {})
  }, [])

  const navigateToSignInPage = useCallback(() => {
    signInPage && navigate(signInPage, {})
  }, [])

  const { tryPlay } = useMemo(
    () =>
      useTryPlay({
        onStart: () => {
          showLoading({ type: UGLoadingType.Loading, text: '正在登录...' })
        },
        onSuccess: () => {
          showLoading({ type: UGLoadingType.Success, text: '登录成功' })
          navigateToHomePage()
        },
        onError: (error) => {
          showLoading({ type: UGLoadingType.Error, text: error ?? '登录失败' })
        },
      }),
    []
  )

  const { signUp } = useMemo(
    () =>
      useSignUp({
        onStart: () => {
          showLoading({ type: UGLoadingType.Loading, text: '正在注册...' })
        },
        onSuccessAutoLogin: () => {
          showLoading({ type: UGLoadingType.Success, text: '自动登录成功' })
          navigateToHomePage()
        },
        onErrorAutoLogin: (error) => {
          showLoading({ type: UGLoadingType.Error, text: error ?? '自动登录失败' })
        },
        onSuccess: () => {
          showLoading({ type: UGLoadingType.Success, text: '注册成功' })
          navigateToSignInPage()
        },
        onError: (error) => {
          showLoading({ type: UGLoadingType.Error, text: error ?? '注册失败' })
          setSlideCode({
            nc_csessionid: undefined,
            nc_token: undefined,
            nc_sig: undefined,
          })
          slideCodeRef?.current?.reload()
        },
      }),
    []
  )

  // stores
  const { sysInfo } = useSysInfo({})
  // data handle
  const { necessity, passwordLimit, allowReg, closeregreason } = sysInfo
  const { strength, maxLength, minLength } = passwordLimit
  // const { nc_csessionid, nc_token, nc_sig } = slideCode
  // valid
  // const recommendGuy_valid = /^\d+$/.test(recommendGuy) || necessity?.recommendGuy != Necessity.必填
  // const account_valid = account?.length >= 6
  // const password_valid = validPassword(password, strength) && password?.length >= minLength && password?.length <= maxLength
  // const confirmPassword_valid = confirmPassword == password
  // const name_valid = necessity?.name != Necessity.必填 // /^[\u4E00-\u9FA5]+$/.test(name) ||
  // const fundPassword_valid = (fundPassword?.length == 4 && /^\d+$/.test(fundPassword)) || necessity?.fundPassword != Necessity.必填
  // const qq_valid = qq?.length >= 5 || necessity?.qq != Necessity.必填
  // const wx_valid = weChat || necessity?.wx != Necessity.必填
  // const email_valid = email || necessity?.email != Necessity.必填
  // const phoneNumber_valid = phoneNumber || necessity?.phoneNumber != Necessity.必填
  // const slideCode_valid = (nc_csessionid && nc_token && nc_sig) || necessity?.slideCode != Necessity.必填
  // const sms_valid = sms?.length == 6 || necessity?.sms != Necessity.必填

  const valid = true //confirmPassword_valid
  // account_valid &&
  // password_valid &&
  // confirmPassword_valid &&
  // recommendGuy_valid &&
  // name_valid &&
  // fundPassword_valid &&
  // qq_valid &&
  // wx_valid &&
  // email_valid &&
  // phoneNumber_valid &&
  // slideCode_valid &&
  // sms_valid

  // onChange
  const onChangeAgent = useCallback((value: AgentType) => (agentRef.current = value), [])
  const onChangeRecommendGuy = useCallback((value: string) => setRecommendGuy(value), [])
  const onChangeAccount = useCallback((value: string) => setAccount(value), [])
  const onChangePassword = useCallback((value: string) => setPassword(value), [])
  const onChangeConfirmPassword = useCallback((value: string) => setConfirmPassword(value), [])
  const onChaneRealName = useCallback((value: string) => setName(value), [])
  const onChaneFundPassword = useCallback((value: string) => setFundPassword(value), [])
  const onChaneQQ = useCallback((value: string) => setQQ(value), [])
  const onChaneWeChat = useCallback((value: string) => setWeChat(value), [])
  const onChanePhone = useCallback((value: string) => setPhoneNumber(value), [])
  const onChangeEmail = useCallback((value: string) => setEmail(value), [])
  const onChaneSms = useCallback((value: string) => setSms(value), [])
  const onChangeSlideCode = setSlideCode

  const getPasswordLimitString = () => {
    if (strength == PasswordStrength.数字字母) {
      return '，密码须有数字及字母'
    } else if (strength == PasswordStrength.数字字母字符) {
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
  const nameLabel = getLabel(necessity?.name, '必须与您的银行账户名称相同，以免未能到账')
  const passwordLebel = '*请使用至少' + minLength + '位至' + maxLength + '位英文或数字的组合' + getPasswordLimitString()
  const confirmPasswordLabel = password == confirmPassword && confirmPassword ? '' : '密码不一致'
  const imageCodeLabel = '*请输入验证码'

  const onChange = {
    onChangeRecommendGuy,
    onChangeAccount,
    onChangePassword,
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

  const navigateTo = {
    navigateToHomePage,
    navigateToSignInPage,
  }

  const _signUp = () => {
    if (allowReg) {
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
        regType: agentRef.current, // 用户注册 或 代理注册,
      }
      // @ts-ignore
      signUp(params)
    } else {
      Alert.alert(null, closeregreason, [{ text: '确定', style: 'cancel' }])
    }
  }

  return {
    slideCodeRef,
    show,
    valid,
    label,
    onChange,
    navigateTo,
    passwordLimit,
    sign: {
      signUp: _signUp,
      tryPlay,
    },
  }
}

export default useSignUpPage
