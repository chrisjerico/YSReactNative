import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
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
import SelectedLotteryModel, { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { parseLMASelectedData } from '../../util/sel/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/sel/ParseHXSelectedUtil'
import { doc } from 'prettier'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const {
    playOddDetailData, //彩票数据，比如六合彩
  } = useContext(BetLotteryContext)

  const currentPlayOddData = UGStore.globalProps?.currentPlayOddData //当前选中的彩种数据 特码 两面 等
  const selectedLotteryModel = UGStore.globalProps?.selectedLotteryModel //选中的游戏数据，如 特码B的第1个、第2个

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //此页显示的彩种数据
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页

  useEffect(() => {
    //生成选中的数据
    const newSelectedModel = new Map<string, Map<string, Map<string, SelectedPlayModel>>>()

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
        newSelectedModel[playOddData?.code] = parseLMASelectedData(playOddData, selectedBalls)
        break

      case LotteryConst.HX://合肖
        newSelectedModel[playOddData?.code] = parseHXSelectedData(playOddData, selectedBalls)
        break
    }

    const selectedLotteryModel: SelectedLotteryModel = { selectedData: newSelectedModel }
    UGStore.dispatch({ type: 'merge', selectedLotteryModel })

    ugLog('选中的数据 selectedBalls = ', JSON.stringify(selectedBalls))
    ugLog(`选中的数据 selectedLotteryModel = ${playOddData?.name} ${playOddData?.code}`, JSON.stringify(UGStore.globalProps?.selectedLotteryModel))

  }, [selectedBalls])

  useEffect(() => {

    ugLog('恢复选中的数据')
    const selModel = UGStore.globalProps?.selectedLotteryModel
    const curSelectedData: Map<string, Map<string, SelectedPlayModel>> = selModel?.selectedData[playOddData?.code]

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
      case LotteryConst.HX://合肖
        // ugLog('恢复选中的数据 curSelectedData 1111= ', JSON.stringify(curSelectedData))
        // ugLog('恢复选中的数据 groupTri 2222= ', JSON.stringify(playOddData?.pageData?.groupTri))
        if (curSelectedData && arrayLength(playOddData?.pageData?.groupTri) == 1) {//只有1页数据/非特殊玩法，才恢复选中数据
          // 第一页第一条数据的 alias是TAB名字，也是TAB的 key
          const groupDataArr: Map<string, SelectedPlayModel> = curSelectedData[playOddData?.pageData?.groupTri[0][0]?.alias]
          // ugLog('恢复选中的数据 groupDataArr 3333 = ', JSON.stringify(groupDataArr))
          if (!dicNull(groupDataArr)) {
            ((Object.values(groupDataArr) as Array<SelectedPlayModel>))?.map((playModel) => {
              switch (playOddData?.code) {
                case LotteryConst.HX://合肖
                {
                  const ids = playModel?.zodiacs?.map((zodiac) => zodiac?.id)
                  setSelectedBalls(ids)
                }
                  break
                default:
                {
                  const ids = playModel?.plays?.map((play) => play?.exId ?? play?.id)
                  setSelectedBalls(ids)
                }
                  break
              }
            })
          }
        }
        break
    }

  }, [playOddData])

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
      ugLog('arrayLength(selectedBalls) = ', arrayLength(selectedBalls))
      switch (playOddData?.code) {
        case LotteryConst.HX:  //合肖 最多只能选中11个
          if(arrayLength(selectedBalls) > 10) {
            Toast('合肖请选择2到11个选项')
            return
          }
          break
        case LotteryConst.ZXBZ:  //自选不中 最多只能选中12个
          if(arrayLength(selectedBalls) > 11) {
            Toast('自选不中请选择5到12个选项')
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
      .map((item) => item?.exId)
  }

  return {
    currentPlayOddData,
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

