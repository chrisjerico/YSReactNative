import { useEffect, useState } from "react"
import UGSysConfModel from "../../../redux/model/全局/UGSysConfModel"
import UGUserModel from "../../../redux/model/全局/UGUserModel"
import { UGStore } from "../../../redux/store/UGStore"
import { PageName } from "../../navigation/Navigation"
import { navigate } from "../../navigation/RootNavigation"
import APIRouter from "../../network/APIRouter"
import { ToastError, ToastSuccess } from "../../tools/tars"
import useLogOut from "./useLogOut"

interface DefaultUserCenterLogos {
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
  homePage?: PageName;
  defaultUserCenterLogos: DefaultUserCenterLogos
}

const useMinePage = ({ homePage, defaultUserCenterLogos }: UseMinePage) => {
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
    const newLogo = (logo?.length == 0 || !logo) ? defaultUserCenterLogos?.[code] : logo
    return Object.assign({}, ele, { logo: newLogo })
  })
  // states
  const [avatarListLoading, setAvatarListLoading] = useState(true)
  const [avatarListVisible, setAvatarListVisible] = useState(false)
  const [avatarList, setAvatarList] = useState([])
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
      console.log("-------error------", error)
    } finally {
      setAvatarListLoading(false)
    }
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

  // effects

  useEffect(() => {
    console.log("----------a--------")
    fetchAvatarList()
  }, [])

  const value = {
    balance,
    uid,
    mobile_logo,
    avatarListLoading,
    avatarListVisible,
    avatarList,
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
  }

  const sign = {
    signOut
  }

  return {
    value,
    sign,
    fetchAvatarList,
    saveAvatar,
    openAvatarList,
    closeAvatarList,
  }

}

export default useMinePage