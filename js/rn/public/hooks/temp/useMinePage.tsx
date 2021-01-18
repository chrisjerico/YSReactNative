import { useRef } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { ToastError } from '../../../Res/icon'
import {
  hideLoading,
  showLoading,
  UGLoadingType
} from '../../widget/UGLoadingCP'
import useLogOut from './useLogOut'
import useRerender from './useRerender'
import useSys from './useSys'

interface DefaultUserCenterLogos {
  1: string; // 存款
  2: string; // 取款
  3: string; // 银行卡管理
  4: string; // 利息宝
  5: string; // 推荐收益
  6: string; // 彩票注单记录
  7: string; // 其他注单记录
  8: string; // 额度转换
  9: string; // 站内信
  10: string; // 安全中心
  11: string; // 任务中心
  12: string; // 个人信息
  13: string; // 建议反馈
  14: string; // 在线客服
  15: string; // 活动彩金
  16: string; // 长龙助手
  17: string; // 全民竞猜
  18: string; // 开奖走势
  19: string; // QQ客服
}
interface UseMinePage {
  homePage?: PageName;
  defaultUserCenterLogos: DefaultUserCenterLogos;
}

const useMinePage = ({ homePage, defaultUserCenterLogos }: UseMinePage) => {
  // states
  const pickAvatarComponentRef = useRef(null)
  const { rerender } = useRerender()

  // stores
  const { sys } = useSys({
    defaultUserCenterLogos
  })
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
  } = UGStore.globalProps.userInfo
  const { mobile_logo, userCenterItems, showSign } = sys

  const { logOut } = useLogOut({
    onStart: () => {
      showLoading()
    },
    onSuccess: () => {
      hideLoading()
      navigate(homePage, {})
    },
    onError: (error) => {
      hideLoading()
      ToastError(error ?? '登出失败')
      console.log('--------登出失败--------', error)
    },
  })

  const signOut = logOut

  const onPressAvatar = () => pickAvatarComponentRef?.current?.open()

  const onSaveAvatarSuccess = rerender

  const value = {
    balance,
    uid,
    mobile_logo,
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
    showSign,
  }

  const sign = {
    signOut,
  }

  return {
    pickAvatarComponentRef,
    onPressAvatar,
    onSaveAvatarSuccess,
    value,
    sign,
  }
}

export default useMinePage
