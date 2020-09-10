import { useRef, useState } from 'react'
import UGSysConfModel, { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { ToastError, ToastStatus, ToastSuccess } from '../../tools/tars'
import useLogIn from './useLogIn'
import useTryPlay from './useTryPlay'
import useSys from './useSys'
import { LoginTo } from '../../models/Types'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

interface UseSignInPage {
  homePage: PageName;
  signUpPage: PageName;
}

const useSignInPage = ({
  homePage,
  signUpPage,
}: UseSignInPage) => {

  // stores
  const { sys } = useSys({})
  const sign = UGStore?.globalProps.sign
  const { loginVCode, loginTo } = sys
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
  const rememberRef = useRef(sign?.remember)

  const goToRegisterPage = () => {
    homePage && navigate(signUpPage, {})
  }

  const goToHomePage = () => {
    homePage && navigate(homePage, {})
  }

  const { logIn } = useLogIn({
    onStart: () => {
      ToastStatus('正在登录...')
    },
    onSuccess: () => {
      if (loginTo == LoginTo.首页) {
        goToHomePage()
      } else {
        PushHelper.pushUserCenterType(UGUserCenterType.我的页)
      }
      ToastSuccess('登录成功')
    },
    onError: (error) => {
      setSlideCode({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slideCodeRef?.current?.reload()
      ToastError(error || '登录失败')
      console.log("--------登录失败--------", error)
    },
  })

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

  const signIn = () => {
    logIn({
      account: account,
      //@ts-ignore
      password: password?.md5(),
      slideCode
    })
  }

  const onChangeAccount = (value: string) => {
    UGStore.dispatch({
      type: 'merge', sign: {
        account: rememberRef.current ? value : null,
        password: rememberRef.current ? password : null
      }
    });
    setAccount(value)
  }

  const onChangePassword = (value: string) => {
    UGStore.dispatch({
      type: 'merge', sign: {
        account: rememberRef.current ? account : null,
        password: rememberRef.current ? value : null
      }
    });
    setPassword(value)
  }

  const onChangeRemember = (value: boolean) => {
    rememberRef.current = value
    UGStore.dispatch({
      type: 'merge', sign: {
        remember: value,
        account: value ? account : null,
        password: value ? password : null
      }
    });
  }

  const onChangeSlideCode = setSlideCode
  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slideCode
  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode
  const valid = (account && password && loginVCode_valid) ? true : false

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
  }

  const goTo = {
    goToHomePage,
    goToRegisterPage,
  }

  const show = {
    loginVCode
  }

  const _sign = {
    signIn,
    tryPlay,
  }

  return {
    slideCodeRef,
    goTo,
    onChange,
    value,
    valid,
    show,
    sign: _sign
  }
}

export default useSignInPage
