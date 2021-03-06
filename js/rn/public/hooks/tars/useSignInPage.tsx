import { useCallback, useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'
import UGSignModel from '../../../redux/model/全局/UGSignModel'
import { UGStore } from '../../../redux/store/UGStore'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { PageName } from '../../navigation/Navigation'
import { push } from '../../navigation/RootNavigation'
import { hideLoading, showError, showLoading, showSuccess } from '../../widget/UGLoadingCP'
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
  const serverErrorCount = useRef(0)
  const { reRender } = useRerender()
  const { sysInfo } = useSys({})
  const sign = UGStore?.globalProps.sign
  const menus = UGStore.globalProps.rightMenu
  const { loginVCode, loginTo, oauth } = sysInfo
  const showFacebookSignIn = oauth?.switch
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
  const { current: v } = useRef<UGSignModel>(sign)

  const navigateToSignUpPage = useCallback(() => {
    homePage && push(signUpPage, {})
  }, [])

  const navigateToHomePage = useCallback(() => {
    homePage && push(homePage, {})
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]).then(() => {
          OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
        })
        break
      case 'android':
        ANHelper.callAsync(CMD.RELOAD_PAGE, { key: 'home_page' }).then()
        break
    }
  }, [])

  const { signIn } = useMemo(
    () =>
      useSignIn({
        onStart: () => {
          showLoading('正在登录...')
        },
        onSuccess: () => {
          navigateToHomePage()
          UGStore.dispatch({
            type: 'merge',
            sign: {
              account: v.remember ? v.account : null,
              password: v.remember ? v.password : null,
            },
          }, false)
          // if (loginTo == LoginTo.首页) {
          //   navigateToHomePage()
          // } else {
          //   navigateToHomePage()
          //   PushHelper.pushUserCenterType(UGUserCenterType.我的页)
          // }
          showSuccess('登录成功')
        },
        onError: (error) => {
          serverErrorCount.current = serverErrorCount.current + 1
          showError(error ?? '登录失败')
          setSlideCode({
            nc_csessionid: undefined,
            nc_token: undefined,
            nc_sig: undefined,
          })
          slideCodeRef?.current?.reload()
        },
        onNeedFullName: () => {
          needNameInputRef?.current?.reload()
          hideLoading()
        },
      }),
    []
  )

  const { tryPlay } = useMemo(
    () =>
      useTryPlay({
        onStart: () => {
          showLoading('正在登录...')
        },
        onSuccess: () => {
          navigateToHomePage()
          showSuccess('登录成功')
        },
        onError: (error) => {
          showError(error ?? '登录失败')
        },
      }),
    []
  )

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

  const onChangeAccount = useCallback(
    (value: string) => {
      setAccount(v.account = value)
    },
    [password]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      setPassword(v.password = value)
    },
    [account]
  )

  const onChangeRemember = useCallback(
    (value: boolean) => {
      v.remember = value
    },
    [account, password]
  )

  const onSubmitFullName = (fullName: string) => {
    const params = {
      account: account,
      //@ts-ignore
      password: password?.md5(),
      slideCode,
      fullName,
      device: (Platform.OS == 'android' ? 2 : 3) as 2 | 3,
    }
    signIn(params)
  }

  const showSignInSlideCode = loginVCode || serverErrorCount.current >= 3
  const onChangeSlideCode = setSlideCode
  // data handle
  const { nc_csessionid, nc_token, nc_sig } = slideCode
  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !showSignInSlideCode
  // const valid = account && password && loginVCode_valid ? true : false
  const account_valid = account?.length > 0
  const password_valid = password?.length > 0
  const valid = account_valid && password_valid && loginVCode_valid ? true : false

  const getValidErrorMessage = () => {
    if (!account_valid) {
      return '请输入帐号'
    } else if (!password_valid) {
      return '请输入密码'
    } else if (!loginVCode_valid) {
      return '请滑动验证码'
    } else {
      return '不明错误'
    }
  }

  const value = {
    account,
    password,
    remember: v.remember,
  }

  const onChange = {
    onChangeAccount,
    onChangePassword,
    onChangeRemember,
    onChangeSlideCode,
    onSubmitFullName,
  }

  const navigateTo = {
    navigateToHomePage,
    navigateToSignUpPage,
  }

  const show = {
    showSignInSlideCode,
    showFacebookSignIn,
  }

  const _signIn = () => {
    if (valid) {
      const params = {
        account: account,
        //@ts-ignore
        password: password?.md5(),
        slideCode,
        device: (Platform.OS == 'android' ? 2 : 3) as 2 | 3,
      }
      signIn(params)
    } else {
      showError(getValidErrorMessage() || '')
    }
  }

  const reference = {
    slideCodeRef,
    needNameInputRef,
  }

  const info = {
    menus,
    sysInfo,
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
    info,
  }
}

export default useSignInPage
