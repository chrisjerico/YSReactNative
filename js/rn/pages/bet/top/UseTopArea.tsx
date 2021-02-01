import { useContext, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'

/**
 * 顶部功能区域 标题栏，游戏聊天切换 等等
 */
const UseTopArea = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据

  const [gameTabIndex, setGameTabIndex] = useState(0) // 彩票和聊天切换TAB
  // const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) // 下一期的彩票信息

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
