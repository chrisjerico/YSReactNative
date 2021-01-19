import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import LotteryConst from '../../const/LotteryConst'
import LotteryData from '../../const/LotteryData'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 * @constructor
 */
const UseLhcPTYX = () => {

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  useEffect(() => {
    //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    if (!anyEmpty(playOddData?.playGroups)) {
      switch (playOddData?.code) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
        case LotteryConst.ZX: //正肖
          setPageData([[null, ...playOddData?.playGroups]])
          break;
        case LotteryConst.WS://平特尾数
          setPageData([[null, ...playOddData?.playGroups]])
          break;
        case LotteryConst.TWS://头尾数
          setPageData([playOddData?.playGroups])
          break;
        case LotteryConst.LX: //连肖
          setPageData(playOddData?.playGroups?.map((item) => [null, item]))
          break;
        case LotteryConst.LW: //连尾
          //连尾数据缺少一个 尾，补上
          setPageData(playOddData?.playGroups?.map((item) => [null, {
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
      switch (playOddData?.code) {
        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
        case LotteryConst.ZX: //正肖
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

  /**
   * 更新数据
   * @param playOddData
   */
  const updatePlayOddData = (playOddData?: PlayOddData) => {
    setPlayOddData(playOddData)
  }

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    updatePlayOddData,
  }
}

export default UseLhcPTYX

