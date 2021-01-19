import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 * @constructor
 */
const UseLhcHX = () => {

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
    //取出生肖数据，生成对应的数据
    !anyEmpty(curData) && setZodiacData(playOddDetailData()?.setting?.zodiacNums?.map((item) => ({
      ...item,
      id: curData[0]?.id + item?.name
    })))
  }, [curData])

  /**
   * 更新数据
   * @param playOddData
   */
  const updatePlayOddData = (playOddData?: PlayOddData) => {
    setPlayOddData(playOddData)
    //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    if (!anyEmpty(playOddData?.playGroups)) {
      setPageData([playOddData?.playGroups])
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
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    updatePlayOddData,
  }
}

export default UseLhcHX

