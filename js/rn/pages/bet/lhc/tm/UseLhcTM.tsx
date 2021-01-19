import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import { PlayOdd } from '../../../../public/network/Model/PlayOddDataModel'


/**
 * 六合彩特码
 * @constructor
 */
const UseLhcTM = () => {

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
    zodiacBallIds,
  } = UseLotteryHelper()

  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //生肖数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  /**
   * 有选中的数据变化时，计算生肖的选中情况
   */
  useEffect(() => {
    let selArr = []
    zodiacData?.map((zodiac) => {
      let data = pageData[tabIndex]
      const zodiacIds = zodiacBallIds(zodiac, data[0])

      const intersection = selectedBalls?.filter((item) => zodiacIds.includes(item))
      if (arrayLength(intersection) == arrayLength(zodiac.nums)) {
        selArr = [...selArr, zodiac]
      }
    })

    setSelectedZodiac(selArr)
  }, [selectedBalls])

  /**
   * 添加或移除生肖
   * @param item
   */
  const addOrRemoveZodiac = (item: ZodiacNum) => {
    //重组数字
    let data = pageData[tabIndex]
    const zodiacIds = zodiacBallIds(item, data[0])

    if (selectedZodiac.includes(item)) {
      let newResult = selectedBalls?.filter((item) => !zodiacIds.includes(item))
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls(Array.from(new Set([...selectedBalls, ...zodiacIds])))
    }
  }

  /**
   * 更新数据
   * @param playOddData
   */
  const updatePlayOddData = (playOddData?: PlayOddData) => {
    setPlayOddData(playOddData)
    //特码取前3个数据 特码 两面 色波
    if (!anyEmpty(playOddData?.playGroups)) {
      setPageData([
        [playOddData?.playGroups[3], playOddData?.playGroups[4], playOddData?.playGroups[5]],
        [playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]],
      ])
      setZodiacData(playOddDetailData()?.setting?.zodiacNums)

    }
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
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveZodiac,
    addOrRemoveBall,
    updatePlayOddData,
  }
}

export default UseLhcTM

