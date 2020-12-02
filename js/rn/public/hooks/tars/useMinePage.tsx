import { useRef } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { Necessity } from '../../models/Enum'
import { PageName } from '../../navigation/Navigation'
import { navigate } from '../../navigation/RootNavigation'
import { hideLoading, showError, showLoading } from '../../widget/UGLoadingCP'
import useRerender from './useRerender'
import useSignOut from './useSignOut'
import useSysInfo from './useSysInfo'

interface DefaultUserCenterLogos {
  1: string // 存款
  2: string // 取款
  3: string // 银行卡管理
  4: string // 利息宝
  5: string // 推荐收益
  6: string // 彩票注单记录
  7: string // 其他注单记录
  8: string // 额度转换
  9: string // 站内信
  10: string // 安全中心
  11: string // 任务中心
  12: string // 个人信息
  13: string // 建议反馈
  14: string // 在线客服
  15: string // 活动彩金
  16: string // 长龙助手
  17: string // 全民竞猜
  18: string // 开奖走势
  19: string // QQ客服
}
interface UseMinePage {
  homePage?: PageName
  onSuccessSignOut?: () => any
  defaultUserCenterLogos: DefaultUserCenterLogos
}

const useMinePage = ({ homePage, defaultUserCenterLogos, onSuccessSignOut }: UseMinePage) => {
  // states
  const pickAvatarComponentRef = useRef(null)
  const { reRender } = useRerender()

  // infos
  const userInfo = UGStore.globalProps.userInfo
  const rightMenus = UGStore.globalProps.rightMenu
  const { sysInfo } = useSysInfo({
    defaultUserCenterLogos,
  })

  const { necessity } = sysInfo

  const { bons } = necessity
  // signs
  const { signOut } = useSignOut({
    onStart: () => {
      showLoading('正在退出...')
    },
    onSuccess: () => {
      hideLoading()
      // showLoading({ type: UGLoadingType.Success, text: '退出成功' })
      navigate(homePage, {})
      onSuccessSignOut && onSuccessSignOut()
    },
    onError: (error) => {
      showError(error ?? '退出失败')
    },
  })

  const onPressAvatar = () => pickAvatarComponentRef?.current?.open()

  const onSaveAvatarSuccess = reRender

  const sign = {
    signOut,
  }

  const show = {
    showBons: bons == Necessity.必填 ? true : false,
  }

  const value = {
    sysInfo,
    userInfo,
  }

  return {
    pickAvatarComponentRef,
    onPressAvatar,
    onSaveAvatarSuccess,
    value,
    sign,
    rightMenus,
    show,
    reRender,
  }
}

export default useMinePage
