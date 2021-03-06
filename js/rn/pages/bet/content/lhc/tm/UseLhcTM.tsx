import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOdd } from '../../../../../public/network/Model/PlayOddDataModel'
import { ugLog } from '../../../../../public/tools/UgLog'
import { isSelectedBallOnId } from '../../../widget/it/ISelBall'


/**
 * 六合彩特码
 * @constructor
 */
const UseLhcTM = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
    currentPageData,
  } = UseLotteryHelper()

  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  /**
   * 有选中的数据变化时，计算生肖的选中情况
   */
  useEffect(() => {
    let selArr = []
    playOddData?.pageData?.zodiacNums?.map((zodiac) => {
      let data = currentPageData()
      const zodiacBalls = zodiacBallIds(zodiac, data[0])

      const intersection = selectedBalls?.filter((item) => isSelectedBallOnId(zodiacBalls, item))
      if (arrayLength(intersection) == arrayLength(zodiac.nums)) {
        selArr = [...selArr, zodiac]
      }
    })

    setSelectedZodiac(selArr)
  }, [tabIndex, selectedBalls])

  /**
   * 添加或移除生肖
   * @param zodiac
   */
  const addOrRemoveZodiac = (zodiac: ZodiacNum) => {
    //重组数字
    const data = currentPageData()
    const zodiacBalls = zodiacBallIds(zodiac, data[0])

    if (isSelectedBallOnId(selectedZodiac, zodiac)) {
      let newResult = selectedBalls?.filter((item) => !isSelectedBallOnId(zodiacBalls, item))
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls(Array.from(new Set([...selectedBalls, ...zodiacBalls])))
    }
  }

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveZodiac,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseLhcTM

