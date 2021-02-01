import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import APIRouter from '../../public/network/APIRouter'
import { anyEmpty } from '../../public/tools/Ext'
import { PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../redux/store/UGStore'
import { ugLog } from '../../public/tools/UgLog'
import { parseLotteryDetailData } from './util/ps/ParseLotteryUtil'

/**
 * 彩票下注
 * @constructor
 */
const UseBetLottery = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const refListController = useRef()
  const [lotteryId, setLotteryId] = useState(null) //当前彩票ID
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const [loadedLottery, setLoadedLottery] = useState<Array<string>>([])//需要加载进来的彩票列表

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
      UGStore.dispatch({type: 'reset', playOddDetailData: {...res?.data, playOdds: newPlayOdds}})
    }

    return res?.code
  }

  return {
    refListController,
    userInfo,
    systemInfo,
    setLotteryId,
    playOddDetailData,
    loadedLottery,
    setLoadedLottery,
    requestLotteryData,
  }
}

export default UseBetLottery

