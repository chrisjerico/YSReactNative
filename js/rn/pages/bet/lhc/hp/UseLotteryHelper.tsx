import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { PlayGroupData, PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import BetLotteryContext from '../../BetLotteryContext'
import { isSelectedBallOnId } from '../../const/ISelBall'
import { UGStore } from '../../../../redux/store/UGStore'
import LotteryConst from '../../const/LotteryConst'
import parseTMData from '../../util/ps/ParseTMDataUtil'
import parseHXData from '../../util/ps/ParseHXDataUtil'
import parseZTData from '../../util/ps/ParseZTDataUtil'
import parseLMAData from '../../util/ps/ParseLMADataUtil'
import parseSBData from '../../util/ps/ParseSBDataUtil'
import parsePTYXData from '../../util/ps/ParsePTYXDataUtil'
import parseLXData from '../../util/ps/ParseLXDataUtil'
import parseLWData from '../../util/ps/ParseLWDataUtil'
import parseZXBZData from '../../util/ps/ParseZXBZDataUtil'
import { ugLog } from '../../../../public/tools/UgLog'
import SelectedLotteryModel from '../../../../redux/model/game/SelectedLotteryModel'
import { parseLMASelectedData } from '../../util/sel/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/sel/ParseHXSelectedUtil'
import { Toast } from '../../../../public/tools/ToastUtils'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const {
    playOddDetailData, //彩票数据，比如六合彩
  } = useContext(BetLotteryContext)

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页

  useEffect(() => {


    const selData = new Map<string, Array<PlayGroupData>>()

//     const subData: SelectedLotterySubData = {
//       groupId: playOddData?.pageData?.groupTri[tabIndex]
//     }
//
// UGStore.dispatch({type: 'merge', selectedLotteryData: {
//   selectedData: {
//     '': {
//
//     }
//   }
//   }})

    /**
     *
     * 投注数据以彩种的形式存在，比如选中了 特码B -> 两面 -> 某个球，存下的数据就是 特码B数据 以及 这个球的数据
     */
    switch (playOddData?.code) {
      case LotteryConst.TM:  //特码
      case LotteryConst.LM: //两面
      case LotteryConst.ZM: //正码
      case LotteryConst.ZT:  //正特
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX:  //五行
      case LotteryConst.LMA:  //连码
      case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TX: //特肖
      case LotteryConst.ZX: //正肖
      case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
      case LotteryConst.ZXBZ:  //自选不中
        selData[playOddData?.code] = parseLMASelectedData(playOddData, selectedBalls)
        break

      case LotteryConst.HX://合肖
        selData[playOddData?.code] = parseHXSelectedData(playOddData, selectedBalls)
        break
    }

    const selectedLotteryModel: SelectedLotteryModel = { selectedData: selData }
    UGStore.dispatch({ type: 'merge', selectedLotteryModel })
    ugLog(`选中的数据 = ${playOddData?.name} ${playOddData?.code}`, JSON.stringify(selectedBalls))
    ugLog(`重新组合的数据 = ${playOddData?.name} ${playOddData?.code}`, JSON.stringify(selectedLotteryModel))

  }, [selectedBalls])

  //当前选中的第几页数据
  const currentPageData = (): Array<PlayGroupData> =>
    tabIndex < arrayLength(playOddData?.pageData?.groupTri) ? playOddData?.pageData?.groupTri[tabIndex] : []

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
      switch (playOddData?.code) {
        case LotteryConst.ZXBZ:  //自选不中 最多只能选中12个
          if(arrayLength(selectedBalls) >= 12) {
            Toast('自选不中请选择2到12个数据')
            return
          }
          break
      }

      setSelectedBalls([...selectedBalls, ballId])
    }
  }

  /**
   * 根据生肖数字取出对应的球ID
   * @param zodiac
   * @param groupData
   */
  const zodiacBallIds = (zodiac?: ZodiacNum,
                         groupData?: PlayGroupData): string[] => {
    //重组数字
    const checkMap = zodiac.nums.map((item) => ('0' + item).slice(-2))

    return groupData?.plays?.filter((item) => checkMap?.includes(item?.name))
      .map((item) => item?.id)
  }

  return {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
    zodiacBallIds,
  }
}

export default UseLotteryHelper

