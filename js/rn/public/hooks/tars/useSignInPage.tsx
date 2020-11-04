import { useCallback, useMemo, useRef, useState } from 'react'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { LoginTo } from '../../models/Enum'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { hideLoading, showLoading, UGLoadingType } from '../../widget/UGLoadingCP'
import useRerender from './useRerender'
import useSignIn from './useSignIn'
import useSignOut from './useSignOut'
import useSys from './useSysInfo'
import useTryPlay from './useTryPlay'

interface SlidingVerification {
  nc_csessionid: string
  nc_token: string
  nc_sig: string
}

interface UseSignInPage {
  homePage: PageName
  signUpPage: PageName
  onSuccessSignOut?: () => any
}

const useSignInPage = ({ homePage, signUpPage, onSuccessSignOut }: UseSignInPage) => {
  // stores
  const { reRender } = useRerender()
  const { sysInfo } = useSys({})
  const sign = UGStore?.globalProps.sign
  const rightMenus = UGStore.globalProps.rightMenu

  const { loginVCode, loginTo } = sysInfo
  // states
  const [account, setAccount] = useState(sign?.account)
  const [password, setPassword] = useState(sign?.password)
  const [slideCode, setSlideCode] = useState<SlidingVerification>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })
  // refs
  const slideCodeRef = useRef(null)
  const needNameInputRef = useRef(null)
  const rememberRef = useRef(sign?.remember)

  const navigateToSignUpPage = useCallback(() => {
    homePage && navigate(signUpPage, {})
  }, [])

  const navigateToHomePage = useCallback(() => {
    homePage && navigate(homePage, {})
  }, [])

  const { logIn } = useLogIn({
    onStart: () => {
      showLoading()
      ToastStatus('正在登录...')
    },
    [password]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      UGStore.dispatch({
        type: 'merge',
        sign: {
          account: rememberRef.current ? account : null,
          password: rememberRef.current ? value : null,
        },
      })
      setPassword(value)
    },
    [account]
  )

  const onChangeRemember = useCallback(
    (value: boolean) => {
      rememberRef.current = value
      UGStore.dispatch({
        type: 'merge',
        sign: {
          remember: value,
          account: value ? account : null,
          password: value ? password : null,
        },
      })
    },
    [account, password]
  )

  const onChangeFullName = (fullName: string) => {
    const params = {
      account: account,
      //@ts-ignore
      password: password?.md5(),
      slideCode,
      fullName,
    }
    signIn(params)
  }

  const onChangeSlideCode = setSlideCode
  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slideCode
  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode
  const valid = account && password && loginVCode_valid ? true : false

  const value = {
    account,
    password,
    remember: rememberRef.current,
  }

  const onChange = {
    onChangeAccount,
    onChangePassword,
    onChangeRemember,
    onChangeSlideCode,
    onChangeFullName,
  }

  const navigateTo = {
    navigateToHomePage,
    navigateToSignUpPage,
  }

  const show = {
    loginVCode,
  }

  const _signIn = () => {
    const params = {
      account: account,
      //@ts-ignore
      password: password?.md5(),
      slideCode,
    }
    signIn(params)
  }

  const reference = {
    slideCodeRef,
    needNameInputRef,
  }

  return {
    valid,
    reference,
    navigateTo,
    onChange,
    value,
    show,
    sign: {
      signIn: _signIn,
      tryPlay,
      signOut,
    },
    rightMenus,
  }
}

export default useSignInPage
