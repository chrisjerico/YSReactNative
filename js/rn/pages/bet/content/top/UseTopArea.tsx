import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import { GameTab } from '../../const/LotteryConst'

/**
 * 顶部功能区域 标题栏，游戏聊天切换 等等
 */
const UseTopArea = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据

  const [gameTabIndex, setGameTabIndex] = useState(GameTab.LOTTERY) // 彩票和聊天切换TAB

  /**
   * 初始化
   */
  useEffect(() => {
    UGStore.dispatch({type: 'reset', gameTabIndex: GameTab.LOTTERY})
  }, [])

  /**
   * 监听别处对 UGStore.globalProps?.gameTabIndex 的改动
   */
  useEffect(() => {
    if (UGStore.globalProps?.gameTabIndex != gameTabIndex) {
      setGameTabIndex(UGStore.globalProps?.gameTabIndex)
    }
  }, [UGStore.globalProps?.gameTabIndex])

  return {
    userInfo,
    systemInfo,
    // nextIssueData,
    // setNextIssueData,
    gameTabIndex,
    setGameTabIndex,
    playOddDetailData,
  }
}

export default UseTopArea
