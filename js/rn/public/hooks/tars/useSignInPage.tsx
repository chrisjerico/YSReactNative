import { useRef, useState } from 'react'
import UGSysConfModel, { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { navigate, pop } from '../../navigation/RootNavigation'
import { ToastError, ToastStatus, ToastSuccess } from '../../tools/tars'
import useLogIn from './useLogIn'
import useTryPlay from './useTryPlay'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

interface UseSignInPage {
  navigation: any;
  homePage: PageName;
  registerPage: PageName
}

const useSignInPage = ({
  navigation,
  homePage,
  registerPage
}: UseSignInPage) => {
  const { type }: any = navigation?.dangerouslyGetState() ?? {}

  const { loginVCode, login_to }: UGSysConfModel = UGStore.globalProps.sysConf
  // states
  const slidingVerificationRrf = useRef(null)
  const [account, setAccount] = useState(UGStore.globalProps.sign?.account)
  const [password, setPassword] = useState(UGStore.globalProps.sign?.password)
  const [isRemember, setIsRemember] = useState(UGStore.globalProps.sign?.isRemember ?? false)
  const [showPassword, setShowPassword] = useState(false)
  const [slidingVerification, setSlidingVerification] = useState<SlidingVerification>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })

  const goBack = () => {
    switch (type) {
      case 'tab':
        navigate(homePage, {})
        break
      case 'stack':
        pop()
        break
      default:
        console.log('------no navigation type------')
    }
  }

  const goToRegisterPage = () => {
    navigate(registerPage, {})
  }

  const goToHomePage = () => {
    navigate(homePage, {})
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
      setSlidingVerification({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slidingVerificationRrf?.current?.reload()
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
      account,
      //@ts-ignore
      password: password?.md5(),
      isRemember,
    })
  }

  const onChangeAccount = (value: any) => {
    setAccount(value)
    UGStore.dispatch({
      type: 'merge', sign: {
        account: isRemember ? account : null,
        password: isRemember ? password : null
      }
    });
  }

  const onChangePassword = (value: any) => {
    setPassword(value)
    UGStore.dispatch({
      type: 'merge', sign: {
        account: isRemember ? account : null,
        password: isRemember ? password : null
      }
    });
  }

  const onChangeIsRemember = () => {
    setIsRemember(!isRemember)
    UGStore.dispatch({
      type: 'merge', sign: {
        isRemember: !isRemember,
        account: !isRemember ? account : null,
        password: !isRemember ? password : null
      }
    });
  }

  const onChanePasswordSecure = () => {
    setShowPassword(!showPassword)
  }

  const onChangeSlidingVerification = setSlidingVerification
  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slidingVerification
  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode
  const valid = account && password && loginVCode_valid

  return {
    goBack,
    goToRegisterPage,
    goToHomePage,
    onChangeAccount,
    onChangePassword,
    onChangeIsRemember,
    onChanePasswordSecure,
    onChangeSlidingVerification,
    signIn,
    tryPlay,
    account,
    password,
    isRemember,
    loginVCode,
    valid,
    showPassword,
    slidingVerificationRrf
  }
}

export default useSignInPage
