import UGUserModel from "../../../redux/model/全局/UGUserModel"
import { UGStore } from "../../../redux/store/UGStore"
import UGSysConfModel from "../../../redux/model/全局/UGSysConfModel"
import { useState, useEffect } from "react"
import useLogOut from "./useLogOut"
import { navigate, navigationRef, pop } from "../../navigation/RootNavigation"
import { ToastSuccess, ToastError } from "../../tools/tars"
import { PageName } from "../../navigation/Navigation"
import APIRouter from "../../network/APIRouter"
import { OCHelper } from "../../define/OCHelper/OCHelper"

interface UseMinePage {
  setProps: (props: any) => any;
  homePage: PageName;
}

const useMinePage = ({ setProps, homePage }: UseMinePage) => {
  // yellowBox
  console.disableYellowBox = true
  // stores
  const {
    avatar,
    usr,
    balance,
    unreadMsg,
    isTest,
    curLevelGrade,
  }: UGUserModel = UGStore.globalProps.userInfo
  const { userCenter }: UGSysConfModel = UGStore.globalProps.sysConf
  // states
  const [showBackBtn, setShowBackBtn] = useState(false)
  const [avatarListLoading, setAvatarListLoading] = useState(true)
  const [avatarListVisible, setAvatarListVisible] = useState(false)
  const [avatarList, setAvatarList] = useState([])
  const [money, setMoney] = useState(balance)
  // functions
  const { logOut } = useLogOut({
    onSuccess: () => {
      navigate(homePage, {})
      ToastSuccess('登出成功')
    },
    onError: (error) => {
      ToastError('登出失败')
    },
  })
  const fetchAvatarList = async () => {
    try {
      setAvatarListLoading(true)
      const response = await APIRouter.system_avatarList()
      const avatarList = response?.data?.data ?? []
      setAvatarList(avatarList)
    } catch (error) {
      console.log(error)
    } finally {
      setAvatarListLoading(false)
    }
  }

  const fetchBalance = async () => {
    try {
      const { data } = await APIRouter.user_balance_token()
      const balance = data?.data?.balance
      setMoney(balance)
      UGStore.dispatch({ type: 'merge', userInfo: { balance } })
    } catch (error) { }
  }

  const saveAvatar = async ({ url, filename }) => {
    try {
      UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } })
      const value = await APIRouter.task_changeAvatar(filename)
      if (value?.data?.code == 0) {
        ToastSuccess('修改头像成功')
      } else {
        ToastError('修改头像失败')
      }
    } catch (error) {
      ToastError('修改头像失败')
      console.log("-------error------", error)
    } finally {
      setAvatarListVisible(false)
    }
  }

  const openAvatarList = () => { !isTest && setAvatarListVisible(true) }
  const closeAvatarList = () => { setAvatarListVisible(false) }
  const signOut = logOut

  const goBack = () => {
    !pop() &&
      OCHelper.call(
        'UGNavigationController.current.popViewControllerAnimated:',
        [true]
      )
  }
  // effects
  useEffect(() => {
    fetchAvatarList()
    setProps({
      didFocus: async () => {
        OCHelper.call(
          'UGNavigationController.current.viewControllers.count'
        ).then((ocCount) => {
          const show =
            ocCount > 1 ||
            navigationRef?.current?.getRootState().routes.length > 1
          setShowBackBtn(show)
        })
      },
    })
  }, [])

  return {
    showBackBtn,
    avatarListLoading,
    avatarListVisible,
    avatarList,
    money,
    userCenter,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
    fetchAvatarList,
    fetchBalance,
    saveAvatar,
    signOut,
    openAvatarList,
    closeAvatarList,
    goBack
  }

}

export default useMinePage