import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { showLoading } from '../../public/widget/UGLoadingCP'
import APIRouter from '../../public/network/APIRouter'
import { ugLog } from '../../public/tools/UgLog'
import { anyEmpty } from '../../public/tools/Ext'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 彩票下注
 * @constructor
 */
const UseBetLottery = () => {

  // const [payData, setPayData] = useState<PayAisleListData>(null) //存款数据对象
  // const [inputMoney, setInputMoney] = useState(null) //输入金额
  // const [btcMoney, setBtcMoney] = useState(0) //btc金额
  // const [newRate, setNewRate] = useState(1) //新计算的汇率
  // const [newUsd, setNewUsd] = useState(1) //新计算的1比1美元
  // const [inputRemark, setInputRemark] = useState(null) //输入备注
  // const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道

  // useEffect(() => {
  //   if (payData != null) {
  //     setInputMoney(null)
  //     setBtcMoney(0)
  //     rateMoney(Number(payData?.channel[selPayChannel]?.currencyRate))
  //
  //     //再调用一次实时汇率
  //     APIRouter.system_currencyRate({
  //       from: 'CNY',
  //       to: 'USD',
  //       amount: '1',
  //       float: payData?.channel[selPayChannel]?.branchAddress
  //     }).then(({ data: res }) => {
  //       ugLog('实时汇率=', res)
  //       rateMoney(Number(res?.data?.rate))
  //     })
  //   }
  //
  // }, [payData, selPayChannel])
  //
  // useEffect(() => {
  //   const money = Math.round(inputMoney * 100 * newRate) / 100
  //   setBtcMoney(money)
  // }, [inputMoney])
  //
  // /**
  //  * 计算当前的汇率
  //  * 汇率 * ( 1 + 浮动汇率 / 100 ) = 结果
  //  * 为保证精度不丢失，对数据放大 10000倍 再缩小
  //  */
  // const rateMoney = (convertRate: number) => {
  //   const channel = payData?.channel[selPayChannel]
  //   if (channel?.domain == 'CGP') {
  //     setNewRate(1)
  //     setNewUsd(1)
  //   } else {
  //
  //     // const convertRate = Number(channel?.currencyRate) //原始汇率
  //     const floatRate = Number(channel?.branchAddress) //浮动汇率
  //     let newRate = Math.round((convertRate * 10000) * (100 + floatRate))
  //     newRate /= 10000 * 100
  //
  //     if(newRate <= 0) return 1
  //
  //     setNewRate(newRate)
  //
  //     let usd = Math.round(100 / newRate)/100
  //     ugLog('1比1美元 汇率=', convertRate, newRate, usd)
  //     setNewUsd(usd)
  //   }
  // }
  //

  const [lotteryId, setLotteryId] = useState(null)
  const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //当前期数据
  const [playOddDetailData, setPlayOddDetailData] = useState<PlayOddDetailData>(null) //彩票数据

  useEffect(()=>{
    requestNextData(lotteryId)
    requestLotteryData(lotteryId)
  }, [lotteryId])

  /**
   * 下一期的数据
   */
  const requestNextData = async (id?: string) => {
    if(anyEmpty(id)) return null

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
    if(anyEmpty(id)) return null

    const res = await APIRouter.game_playOdds(id)
      .then(({ data: res }) => res)
    //ugLog('requestLotteryData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      setPlayOddDetailData(res?.data)
    }

    return res?.code
  }

  return {
    // newRate,
    // newUsd,
    // moneyOption,
    // inputMoney,
    // setInputMoney,
    // btcMoney,
    // setBtcMoney,
    // inputRemark,
    // setInputRemark,
    // selPayChannel,
    // setSelPayChannel,
    // payData,
    // setPayData,
    // requestPayData,
    setLotteryId,
    nextIssueData,
    playOddDetailData,
    requestNextData,
    requestLotteryData,
  }
}

export default UseBetLottery

