import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { UGStore } from '../../../redux/store/UGStore'
import { AgentType, Necessity, PasswordStrength } from '../../models/Enum'
import { SlideCode } from '../../models/Interface'
import { PageName } from '../../navigation/Navigation'
import { navigate, popToRoot } from '../../navigation/RootNavigation'
import { validPassword } from '../../tools/tars'
import { hideLoading, showError, showLoading, showSuccess } from '../../widget/UGLoadingCP'
import useRerender from './useRerender'
import useSignOut from './useSignOut'
import useSignUp from './useSignUp'
import useSysInfo from './useSysInfo'
import useTryPlay from './useTryPlay'

interface UseRegisterPage {
  homePage?: PageName
  signInPage?: PageName
  onSuccessSignOut?: () => any
}

const useSignUpPage = ({ homePage, signInPage, onSuccessSignOut }: UseRegisterPage) => {
  const { reRender } = useRerender()

  const rightMenus = UGStore.globalProps.rightMenu

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
  const inviteCodeRef = useRef<string>()

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
          showLoading('正在登录...')
        },
        onSuccess: () => {
          showSuccess('登录成功')
          navigateToHomePage()
        },
        onError: (error) => {
          showError(error ?? '登录失败')
        },
      }),
    []
  )

  const { signUp } = useSignUp({
    onStart: () => {
      showLoading('正在注册...')
    },
    onSuccessAutoLogin: () => {
      showSuccess('自动登录成功')
      navigateToHomePage()
    },
    onErrorAutoLogin: (error) => {
      showError(error ?? '自动登录失败')
    },
    onSuccess: () => {
      showSuccess('注册成功')
      UGStore.dispatch({
        type: 'merge',
        sign: {
          account: account,
          password: password,
        },
      })
      navigateToSignInPage()
    },
    onError: (error) => {
      showError(error ?? '注册失败')
      setSlideCode({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slideCodeRef?.current?.reload()
    },
  })

  const { signOut } = useMemo(
    () =>
      useSignOut({
        onStart: () => {
          showLoading('正在退出...')
        },
        onSuccess: () => {
          hideLoading()
          reRender()
          onSuccessSignOut && onSuccessSignOut()
        },
        onError: (error) => {
          showError(error ?? '退出失败')
        },
      }),
    []
  )

  // stores
  const { sysInfo } = useSysInfo({})
  // data handle
  const { necessity, passwordLimit, allowReg, closeregreason, inviteWord } = sysInfo
  useEffect(() => {
    if (!allowReg) {
      Alert.alert(null, closeregreason, [{ text: '确定', style: 'cancel', onPress: popToRoot }])
    }
  }, [allowReg])

  const { strength, maxLength, minLength } = passwordLimit
  // const { nc_csessionid, nc_token, nc_sig } = slideCode
  // valid
  // const recommendGuy_valid = /^\d+$/.test(recommendGuy) || necessity?.recommendGuy != Necessity.必填
  // const account_valid = account?.length >= 6
  const password_valid = validPassword(password, strength) && password?.length >= minLength && password?.length <= maxLength
  const confirmPassword_valid = confirmPassword == password
  // const name_valid = necessity?.name != Necessity.必填 // /^[\u4E00-\u9FA5]+$/.test(name) ||
  // const fundPassword_valid = (fundPassword?.length == 4 && /^\d+$/.test(fundPassword)) || necessity?.fundPassword != Necessity.必填
  // const qq_valid = qq?.length >= 5 || necessity?.qq != Necessity.必填
  // const wx_valid = weChat || necessity?.wx != Necessity.必填
  // const email_valid = email || necessity?.email != Necessity.必填
  // const phoneNumber_valid = phoneNumber || necessity?.phoneNumber != Necessity.必填
  // const slideCode_valid = (nc_csessionid && nc_token && nc_sig) || necessity?.slideCode != Necessity.必填
  // const sms_valid = sms?.length == 6 || necessity?.sms != Necessity.必填

  const valid = confirmPassword_valid && password_valid ? true : false
  // account_valid &&
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
  const onChaneFundPassword = useCallback((value: string) => setFundPassword(value?.replace(/[^0-9]/g, '')), [])
  const onChaneQQ = useCallback((value: string) => setQQ(value), [])
  const onChaneWeChat = useCallback((value: string) => setWeChat(value), [])
  const onChanePhone = useCallback((value: string) => setPhoneNumber(value), [])
  const onChangeEmail = useCallback((value: string) => setEmail(value), [])
  const onChaneSms = useCallback((value: string) => setSms(value), [])
  const onChangeInviteCode = useCallback((value: string) => (inviteCodeRef.current = value), [])
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
      return label + '(必填)'
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
  const passwordLebel = '请使用至少' + minLength + '位至' + maxLength + '位英文或数字的组合' + getPasswordLimitString()
  const confirmPasswordLabel = password == confirmPassword || (!password?.length && !confirmPassword?.length) ? '' : '密码不一致'
  const accountLabel = '请使用6-15位英文或数字的组合'
  const inviteCodeLabel = getLabel(necessity?.inviteCode, '邀请码') // ，如没有可不填

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
    onChangeInviteCode,
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
    showInviteCode: necessity?.inviteCode != Necessity.隱藏,
  }

  const label = {
    accountLabel,
    passwordLebel,
    recommendGuyLabel,
    confirmPasswordLabel,
    fundPasswordLabel,
    nameLabel,
    emailLabel,
    phoneNumberLabel,
    qqLabel,
    wxLabel,
    inviteCodeLabel,
  }

  const navigateTo = {
    navigateToHomePage,
    navigateToSignInPage,
  }

  const placeholder = {
    recommendGuyPlaceholder: '推荐人ID',
    accountPlaceholder: '帐号',
    passwordPlaceholder: '密码',
    confirmPasswordPlaceholder: '确认密码',
    fundPasswordPlaceholder: '取款密码',
    qqPlaceholder: 'QQ号',
    wxPlaceholder: '微信号',
    emailPlaceholder: '电子邮箱',
    smsPlaceholder: '短信验证码',
    inviteCodePlaceholder: inviteWord,
  }

  const getValidErrorMessage = () => {
    if (!password_valid) {
      return '密码' + passwordLebel
    } else if (!confirmPassword_valid) {
      return confirmPasswordLabel
    } else {
      return '不明错误'
    }
  }

  const _signUp = () => {
    // if (allowReg) {
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
        regType: agentRef.current, // 用户注册 或 代理注册,
        inviteCode: inviteCodeRef.current, // 邀請碼
      }
      // @ts-ignore
      signUp(params)
    } else {
      showError(getValidErrorMessage() || '')
    }
    // } else {
    //   Alert.alert(null, closeregreason, [{ text: '确定', style: 'cancel' }])
    // }
  }

  const value = {
    fundPassword,
  }

  const reference = {
    slideCodeRef,
  }

  return {
    placeholder,
    reference,
    value,
    show,
    valid,
    label,
    onChange,
    navigateTo,
    passwordLimit,
    sign: {
      signUp: _signUp,
      tryPlay,
      signOut,
    },
    rightMenus,
  }
}

export default useSignUpPage
