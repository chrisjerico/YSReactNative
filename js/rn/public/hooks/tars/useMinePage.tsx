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

interface DefaultUserCenterLogo {
  1: string, // 存款
  2: string, // 取款
  3: string, // 银行卡管理
  4: string, // 利息宝
  5: string, // 推荐收益
  6: string, // 彩票注单记录
  7: string, // 其他注单记录
  8: string, // 额度转换
  9: string, // 站内信
  10: string, // 安全中心
  11: string, // 任务中心
  12: string, // 个人信息
  13: string, // 建议反馈
  14: string, // 在线客服
  15: string, // 活动彩金
  16: string, // 长龙助手
  17: string, // 全民竞猜
  18: string, // 开奖走势
  19: string, // QQ客服
}
interface UseMinePage {
  setProps?: (props: any) => any;
  homePage?: PageName;
  defaultUserCenterLogo: DefaultUserCenterLogo
}

const useMinePage = ({ setProps, homePage, defaultUserCenterLogo }: UseMinePage) => {
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
    uid,
    nextLevelInt,
    curLevelInt,
    taskRewardTotal,
    curLevelTitle,
    nextLevelTitle,
  }: UGUserModel = UGStore.globalProps.userInfo
  const { mobile_logo, userCenter }: UGSysConfModel = UGStore.globalProps.sysConf
  const userCenterItems = userCenter?.map(ele => {
    const { logo, code } = ele
    const newLogo = (logo?.length == 0 || !logo) ? defaultUserCenterLogo?.[code] : logo
    return Object.assign({}, ele, { logo: newLogo })
  })
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
    },
    onError: (error) => {
      ToastError(error || '登出失败')
      console.log('--------登出失败--------', error)
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
    fetchAvatarList().then(() => {
      setProps && setProps({
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
    })
  }, [])

  return {
    uid,
    mobile_logo,
    showBackBtn,
    avatarListLoading,
    avatarListVisible,
    avatarList,
    money,
    userCenterItems,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
    curLevelInt,
    nextLevelInt,
    taskRewardTotal,
    curLevelTitle,
    nextLevelTitle,
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