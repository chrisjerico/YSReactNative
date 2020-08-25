import { useRef, useState, useEffect } from 'react'
import UGSysConfModel, {
  UGUserCenterType,
} from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { navigate, pop } from '../../navigation/RootNavigation'
import useLogIn from './useLogIn'
import useTryPlay from './useTryPlay'
import { OCHelper } from '../../define/OCHelper/OCHelper'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

interface UseSignInPage {
  navigation: any;
  setProps: (props: any) => any;
  homepage: PageName;
  isRemember: boolean;
  account: string;
  password: string;
  registerPage: PageName
}

const useSignInPage = ({
  navigation,
  homepage,
  setProps,
  isRemember,
  account,
  password,
  registerPage
}: UseSignInPage) => {
  const { type }: any = navigation?.dangerouslyGetState() ?? {}

  // states
  const [slidingVerification, setSlidingVerification] = useState<SlidingVerification>({
    nc_csessionid: undefined,
    nc_token: undefined,
    nc_sig: undefined,
  })
  const [hidePassword, setHidePassword] = useState(true)
  const slidingVerificationRrf = useRef(null)

  const { loginVCode, login_to }: UGSysConfModel = UGStore.globalProps.sysConf

  const goBack = () => {
    switch (type) {
      case 'tab':
        navigate(homepage, {})
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
    navigate(homepage, {})
  }

  const cleanAccountPassword = (isRemember: boolean) => {
    if (!isRemember) {
      console.log('----忘記帳密----')
      setProps({ account: null, password: null })
    }
  }

  const { logIn } = useLogIn({
    onSuccess: () => {
      if (parseInt(login_to)) {
        goToHomePage()
      } else {
        PushHelper.pushUserCenterType(UGUserCenterType.我的页)
      }
    },
    onError: () => {
      setSlidingVerification({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      slidingVerificationRrf?.current?.reload()
    },
  })

  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      goToHomePage()
    },
    onError: () => { },
  })

  const signIn = () => {
    logIn({
      account,
      //@ts-ignore
      password: password?.md5(),
      isRemember,
    })
  }

  // effects
  useEffect(() => {
    switch (type) {
      case 'tab':
        const unsubscribe = navigation.addListener('focus', () => {
          OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', [
            'isRememberPsd',
          ])
            .then((isRemember) => {
              console.log('--------isRemember--------', isRemember)
              cleanAccountPassword(isRemember)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        return unsubscribe
      case 'stack':
        console.log('-------here------')
        cleanAccountPassword(isRemember)
        break
      default:
        console.log('------no navigation type------')
    }
  }, [])

  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slidingVerification

  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode
  const valid = account && password && loginVCode_valid
  console.log("-----------valid-----------", valid)
  console.log("-----------account-----------", account)
  console.log("-----------password-----------", password)
  console.log("-----------loginVCode_valid-----------", loginVCode_valid)
  return {
    hidePassword,
    setHidePassword,
    valid,
    signIn,
    tryPlay,
    goBack,
    loginVCode,
    goToHomePage,
    goToRegisterPage,
    slidingVerificationRrf,
    setSlidingVerification
  }
}

export default useSignInPage
