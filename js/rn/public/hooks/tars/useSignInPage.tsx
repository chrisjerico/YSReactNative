import { useRef, useState } from 'react'
import UGSysConfModel, { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { ToastError, ToastStatus, ToastSuccess } from '../../tools/tars'
import useLogIn from './useLogIn'
import useTryPlay from './useTryPlay'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

interface UseSignInPage {
  homePage?: PageName;
  registerPage?: PageName;
}

const useSignInPage = ({
  homePage,
  registerPage
}: UseSignInPage) => {

  // stores
  const { sysConf, sign } = UGStore?.globalProps ?? {}
  const { loginVCode, login_to }: UGSysConfModel = sysConf
  // states
  const [account, setAccount] = useState(sign?.account)
  const [password, setPassword] = useState(sign?.password)
  const [slideCode, setSlideCode] = useState<SlidingVerification>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })
  const slideCodeRef = useRef(null)
  const remember = useRef(sign?.remember)

  const goToRegisterPage = () => {
    homePage && navigate(registerPage, {})
  }

  const goToHomePage = () => {
    homePage && navigate(homePage, {})
  }

  const { logIn } = useLogIn({
    onStart: () => {
      ToastStatus('正在登录...')
    },
    onSuccess: () => {
      if (parseInt(login_to)) {
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
      ToastError('登录失败' + error ? ' : ' + error : '')
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
        account: remember.current ? value : null,
        password: remember.current ? password : null
      }
    });
    setAccount(value)
  }

  const onChangePassword = (value: string) => {
    UGStore.dispatch({
      type: 'merge', sign: {
        account: remember.current ? account : null,
        password: remember.current ? value : null
      }
    });
    setPassword(value)
  }

  const onChangeRemember = (value: boolean) => {
    remember.current = value
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
    remember: remember.current,
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

  const ref = {
    slideCode: slideCodeRef
  }

  const show = {
    loginVCode
  }

  const _sign = {
    signIn,
    tryPlay,
  }

  return {
    goTo,
    onChange,
    value,
    ref,
    valid,
    show,
    sign: _sign
  }
}

export default useSignInPage
