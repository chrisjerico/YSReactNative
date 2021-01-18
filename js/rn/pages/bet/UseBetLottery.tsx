import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import APIRouter from '../../public/network/APIRouter'
import { anyEmpty } from '../../public/tools/Ext'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../redux/store/UGStore'
import UseParseLotteryDataHelper from './util/lt/UseParseLotteryDataHelper'

/**
 * 彩票下注
 * @constructor
 */
const UseBetLottery = () => {

  const {
    parseLotteryListData,
  } = UseParseLotteryDataHelper()

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const refListController = useRef()
  const [lotteryId, setLotteryId] = useState(null) //当前彩票ID
  const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //当前期数据
  const [playOddDetailData, setPlayOddDetailData] = useState<PlayOddDetailData>(null) //彩票数据
  const [loadedLottery, setLoadedLottery] = useState<Array<string>>([])//需要加载进来的彩票列表

  useEffect(() => {
    requestNextData(lotteryId)
    requestLotteryData(lotteryId)
  }, [lotteryId])

  /**
   * 数据发生变化时重新组合列表数据
   */
  useEffect(() => {
    parseLotteryListData(playOddDetailData)
  }, [playOddDetailData])

  /**
   * 下一期的数据
   */
  const requestNextData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_nextIssue(id)
      .then(({ data: res }) => res)
    //ugLog('requestNextData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      setNextIssueData(res?.data)
    }

    return res?.code
  }

  /**
   * 彩票详情
   */
  const requestLotteryData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_playOdds(id)
      .then(({ data: res }) => res)
    //ugLog('requestLotteryData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      setPlayOddDetailData(res?.data)
    }

    return res?.code
  }

  return {
    refListController,
    userInfo,
    systemInfo,
    setLotteryId,
    nextIssueData,
    playOddDetailData,
    loadedLottery,
    setLoadedLottery,
    requestNextData,
    requestLotteryData,
  }
}

export default UseBetLottery

