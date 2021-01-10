import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import APIRouter from '../../../../public/network/APIRouter'
import { ugLog } from '../../../../public/tools/UgLog'
import BetLotteryContext from '../../BetLotteryContext'
import ISelBall, { isSelectedBallOnId } from '../../const/ISelBall'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import LotteryConst from '../../const/LotteryConst'
import LotteryData from '../../const/LotteryData'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 * @constructor
 */
const UseLhcPTYX = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [dataPTYX, setDataPTYX] = useState<Array<PlayGroupData>>(null) //当前正码数据列表
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等
  const [lotteryCode, setLotteryCode] = useState<string>(null) //当前的彩票CODE，是平特一肖 还是 平特尾数 等等

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    if (!anyEmpty(lotteryCode)) {
      setPlayOddData(playOddDetailData()?.playOdds?.find(
        (item) => item?.code == lotteryCode))
    }
  }, [lotteryCode, playOddDetailData()])

  useEffect(() => {
    //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    if (!anyEmpty(playOddData?.playGroups)) {
      switch (lotteryCode) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
          setDataPTYX([null, ...playOddData?.playGroups])

          break;
        case LotteryConst.WS://平特尾数
          setDataPTYX([null, ...playOddData?.playGroups])

          break;
        case LotteryConst.TWS://头尾数
          setDataPTYX(playOddData?.playGroups)

          break;
      }

    }
  }, [playOddData])

  useEffect(() => {
    //取出生肖数据，生成对应的数据
    if (!anyEmpty(dataPTYX)) {
      switch (lotteryCode) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
          setZodiacData(playOddData?.playGroups[0]?.plays.map((item) =>
            playOddDetailData()?.setting?.zodiacNums?.find((zodiac) =>
              zodiac?.name == item?.name)))

          break;
        case LotteryConst.WS://平特尾数
          setZodiacData(playOddData?.playGroups[0]?.plays.map((item, index) => {
            return {
              key: item?.id,
              name: item?.name,
              nums: LotteryData.WS[index],
            }
          }))

          break;
        case LotteryConst.TWS://头尾数
          setZodiacData(playOddData?.playGroups[1]?.plays.map((item, index) => {
            return {
              key: item?.id,
              name: item?.name,
              nums: LotteryData.WS[index],
            }
          }))

          break;
      }

    }
  }, [dataPTYX])

  return {
    setLotteryCode,
    dataPTYX,
    setDataPTYX,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcPTYX

