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
    playOddData,
    setPlayOddData,
    lotteryCode,
    setLotteryCode,
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [dataPTYX, setDataPTYX] = useState<Array<Array<PlayGroupData>>>(null) //当前正码数据列表
  const [tabIndex, setTabIndex] = useState(0) //当前选中哪个tab
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据

  const [curData, setCurData] = useState<Array<PlayGroupData>>(null) //当前选中的TAB数据

  useEffect(() => {
    !anyEmpty(dataPTYX) && setCurData(dataPTYX[tabIndex])
  }, [tabIndex, dataPTYX])

  useEffect(() => {
    //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    if (!anyEmpty(playOddData?.playGroups)) {
      switch (lotteryCode) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
          setDataPTYX([[null, ...playOddData?.playGroups]])
          break;
        case LotteryConst.WS://平特尾数
          setDataPTYX([[null, ...playOddData?.playGroups]])
          break;
        case LotteryConst.TWS://头尾数
          setDataPTYX([playOddData?.playGroups])
          break;
        case LotteryConst.LX: //连肖
          setDataPTYX(playOddData?.playGroups?.map((item) => [null, item]))
          break;
        case LotteryConst.LW: //连尾
          //连尾数据缺少一个 尾，补上
          setDataPTYX(playOddData?.playGroups?.map((item) => [null, {
            ...item,
            plays: item?.plays?.map((item) => ({
                ...item,
                alias: item?.alias + '尾'
              }
            ))
          }]))
          break;
      }

    }
  }, [playOddData])

  useEffect(() => {
    //取出生肖数据，生成对应的数据
    if (!anyEmpty(curData)) {
      switch (lotteryCode) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
          setZodiacData(curData[1]?.plays.map((item) =>
            playOddDetailData()?.setting?.zodiacNums?.find((zodiac) =>
              zodiac?.name == item?.name)))

          break;
        case LotteryConst.LX: //连肖
          setZodiacData(curData[1]?.plays.map((item) => {
            let zodiacNum = playOddDetailData()?.setting?.zodiacNums?.find((zodiac) =>
              zodiac?.name == item?.alias)
            return {
              ...zodiacNum,
              alias: item?.alias
            }
          }))

          break;
        case LotteryConst.WS://平特尾数
          setZodiacData(curData[1]?.plays.map((item, index) => {
            return {
              key: item?.id,
              name: item?.name,
              nums: LotteryData.WS[index],
            }
          }))
          break;
        case LotteryConst.TWS://头尾数
          setZodiacData(curData[1]?.plays.map((item, index) => {
            return {
              key: item?.id,
              name: item?.name,
              nums: LotteryData.WS[index],
            }
          }))
          break;
        case LotteryConst.LW://连尾
          setZodiacData(curData[1]?.plays.map((item, index) => {
            return {
              key: item?.id,
              alias: item?.alias,
              nums: LotteryData.WS[index],
            }
          }))
          break;
      }

    }
  }, [curData])

  return {
    setLotteryCode,
    tabIndex,
    setTabIndex,
    curData,
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

