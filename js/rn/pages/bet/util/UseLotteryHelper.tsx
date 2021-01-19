import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { PlayGroupData, PlayOddData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../public/tools/Ext'
import BetLotteryContext from '../BetLotteryContext'
import { isSelectedBallOnId } from '../const/ISelBall'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const {
    lotteryCode,//当前的彩票CODE，正特 正码 等等
    playOddDetailData, //彩票数据
  } = useContext(BetLotteryContext)

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据

  const [pageData, setPageData] = useState<Array<Array<PlayGroupData>>>(null) //当前重组后的所有页面数据列表，1页2页3页等等
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页
  const [curData, setCurData] = useState<Array<PlayGroupData>>(null) //当前选中的第几页数据

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    if (!anyEmpty(lotteryCode)) {
      setPlayOddData(playOddDetailData()?.playOdds?.find(
        (item) => item?.code == lotteryCode()))
    }
  }, [lotteryCode(), playOddDetailData()])

  /**
   * 添加或移除选中的球
   * @param ballId 球的ID
   */
  const addOrRemoveBall = (ballId?: string) => {
    //重组数字
    if (isSelectedBallOnId(selectedBalls, ballId)) {
      let newResult = selectedBalls?.filter((item) => item != ballId)
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls([...selectedBalls, ballId])
    }
  }

  /**
   * 根据生肖数字取出对应的球ID
   * @param zodiac
   */
  const zodiacBallIds = (zodiac?: ZodiacNum,
                         groupData?: PlayGroupData): string[] => {
    //重组数字
    const checkMap = zodiac.nums.map((item) => ('0' + item).slice(-2))

    const zodiacIds = groupData?.plays?.filter((item) => checkMap?.includes(item?.name))
      .map((item) => item?.id)

    // ugLog('checkMap=', JSON.stringify(checkMap))
    // ugLog('data=', JSON.stringify(groupData))

    return zodiacIds
  }

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    playOddData,
    setPlayOddData,
    lotteryCode,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  }
}

export default UseLotteryHelper

