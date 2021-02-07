import * as React from 'react'
import { useEffect, useState } from 'react'
import APIRouter from '../../public/network/APIRouter'
import { anyEmpty } from '../../public/tools/Ext'
import { UGStore } from '../../redux/store/UGStore'
import { parseLotteryDetailData } from './util/parse/ParseLotteryUtil'
import { LotteryResultData } from '../../public/network/Model/lottery/result/LotteryResultModel'
import { IMiddleMenuItem } from '../../public/components/menu/MiddleMenu'
import { IBetLotteryParams } from '../../public/network/it/bet/IBetLotteryParams'

/**
 * 彩票下注
 * @constructor
 */
const UseBetLottery = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const betShareModel = UGStore.globalProps.betShareModel //下注数据结构

  const [lotteryId, setLotteryId] = useState(null) //当前彩票ID
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const [loadedLottery, setLoadedLottery] = useState<Array<string>>([])//需要加载进来的彩票列表
  const [betResult, setBetResult] = useState<LotteryResultData>(null) //下注结果
  const [chatMenu, setChatMenu] = useState<Array<IMiddleMenuItem>>(null) //聊天室菜单

  useEffect(() => {
    requestLotteryData(lotteryId)
  }, [lotteryId])

  /**
   * 彩票详情
   */
  const requestLotteryData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_playOdds(id)
      .then(({ data: res }) => res)
    // ugLog('requestLotteryData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      const newPlayOdds = parseLotteryDetailData(res?.data)
      UGStore.dispatch({ type: 'reset', playOddDetailData: { ...res?.data, playOdds: newPlayOdds } })
    }

    return res?.code
  }

  /**
   * 是否显示分享聊天室
   * @param betData
   */
  const showShareRoom = (betData?: IBetLotteryParams) => {
    if (systemInfo?.chatRoomSwitch && userInfo?.chatShareBet == 1 && Number(betData?.totalMoney) >= Number(systemInfo?.chatShareBetMinAmount)) {
      setChatMenu(UGStore.globalProps?.chatRoomData?.chatAry?.map((item) => {
          return (({
            title: `${item?.roomName}`,
            id: item?.roomId,
          } as IMiddleMenuItem))
        }),
      )
    }

  }

  return {
    userInfo,
    systemInfo,
    betShareModel,
    betResult,
    setBetResult,
    setLotteryId,
    playOddDetailData,
    loadedLottery,
    setLoadedLottery,
    chatMenu,
    setChatMenu,
    showShareRoom,
    requestLotteryData,
  }
}

export default UseBetLottery

