import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength, dicNull } from '../../../../public/tools/Ext'
import { isSelectedBallOnId } from '../../const/ISelBall'
import { UGStore } from '../../../../redux/store/UGStore'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { ugLog } from '../../../../public/tools/UgLog'
import SelectedLotteryModel, { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { parseLMASelectedData } from '../../util/select/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/select/ParseHXSelectedUtil'
import { doubleDigit } from '../../../../public/tools/StringUtil'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const currentPlayOddData = UGStore.globalProps?.playOddDetailData.playOdds[UGStore.globalProps?.currentColumnIndex] //当前选中的彩种数据 特码 两面 等
  // const selectedLotteryModel = UGStore.globalProps?.selectedLotteryModel //选中的游戏数据，如 特码B的第1个、第2个

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //此页显示的彩种数据
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页

  useEffect(() => {
    //生成选中的数据
    const newSelectedModel = dicNull(UGStore.globalProps?.selectedLotteryModel?.selectedData) ?
      new Map<string, Map<string, Map<string, SelectedPlayModel>>>() :
      JSON.parse(JSON.stringify(UGStore.globalProps?.selectedLotteryModel?.selectedData))

    switch (playOddData?.code) {
      case LhcCode.TM:  //特码
      case LhcCode.LM: //两面
      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case LhcCode.WX:  //五行 或 五星
      case LhcCode.LMA:  //连码
      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case LhcCode.ZXBZ:  //自选不中
      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
      case CqsscCode.YZDW:  //一字定位
      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      case CqsscCode.BDW:  //不定位
      case CqsscCode.DWD:  //定位胆
        newSelectedModel[playOddData?.code] = parseLMASelectedData(playOddData, selectedBalls)
        break

      case LhcCode.HX://合肖
        newSelectedModel[playOddData?.code] = parseHXSelectedData(playOddData, selectedBalls)
        break
    }

    const selectedLotteryModel: SelectedLotteryModel = { selectedData: newSelectedModel }
    UGStore.dispatch({ type: 'reset', selectedLotteryModel })

    ugLog('选中的数据 selectedBalls = ', JSON.stringify(selectedBalls))
    ugLog(`选中的数据 selectedLotteryModel = ${playOddData?.name} ${playOddData?.code}`, JSON.stringify(UGStore.globalProps?.selectedLotteryModel))

  }, [selectedBalls])

  useEffect(() => {

    ugLog('恢复选中的数据')
    const selModel = UGStore.globalProps?.selectedLotteryModel
    const curSelectedData: Map<string, Map<string, SelectedPlayModel>> = selModel?.selectedData[playOddData?.code]

    switch (playOddData?.code) {
      case LhcCode.TM:  //特码
      case LhcCode.LM: //两面
      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case LhcCode.WX:  //五行 或 五星
      case LhcCode.LMA:  //连码
      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case LhcCode.ZXBZ:  //自选不中
      case LhcCode.HX://合肖
      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
      case CqsscCode.YZDW:  //一字定位
        // ugLog('恢复选中的数据 curSelectedData 1111= ', JSON.stringify(curSelectedData))
        // ugLog('恢复选中的数据 groupTri 2222= ', JSON.stringify(playOddData?.pageData?.groupTri))
        if (curSelectedData && arrayLength(playOddData?.pageData?.groupTri) == 1) {//只有1页数据/非特殊玩法，才恢复选中数据
          // 第一页第一条数据的 alias是TAB名字，也是TAB的 key
          const groupDataArr: Map<string, SelectedPlayModel> = curSelectedData[playOddData?.pageData?.groupTri[0][0]?.alias]
          // ugLog('恢复选中的数据 groupDataArr 3333 = ', JSON.stringify(groupDataArr))
          if (!dicNull(groupDataArr)) {
            ((Object.values(groupDataArr) as Array<SelectedPlayModel>))?.map((playModel) => {
              switch (playOddData?.code) {
                case LhcCode.HX://合肖
                {
                  const ids = playModel?.zodiacs?.map((zodiac) => zodiac?.id)
                  setSelectedBalls(ids)
                }
                  break
                default: {
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
   * Tab有变化就清除选择的数据
   */
  useEffect(() => {
    UGStore.dispatch({ type: 'reset', lotteryTabIndex: tabIndex })
    setSelectedBalls([])
  }, [tabIndex])

  /**
   * 添加或移除选中的球列表
   * @param addBalls 选中球的ID
   * @param removeBalls 取消的球ID
   */
  const addAndRemoveBallList = (addBalls?: Array<string>, removeBalls?: Array<string>) => {
    const filterBalls = selectedBalls?.filter((item) => !removeBalls?.includes(item))
    const newBalls = dicNull(addBalls) ? filterBalls : [...filterBalls, ...addBalls]
    setSelectedBalls(newBalls)
  }

  /**
   * 强制选中它
   * @param ballId 选中的球ID
   */
  const forceAdd = (ballId?: string) => {
    setSelectedBalls([...selectedBalls, ballId])
  }

  /**
   * 强制取消它
   * @param ballId 取消的球ID
   */
  const forceRemove = (ballId?: string) => {
    let newResult = selectedBalls?.filter((item) => item != ballId)
    setSelectedBalls(newResult)
  }

  /**
   * 添加或移除选中的球
   * @param ballId 球的ID
   */
  const addOrRemoveBall = (ballId?: string) => {
    //重组数字
    if (isSelectedBallOnId(selectedBalls, ballId)) {
      forceRemove(ballId)

    } else {
      //ugLog('arrayLength(selectedBalls) = ', arrayLength(selectedBalls))
      switch (playOddData?.code) {
        case LhcCode.HX:  //合肖 最多只能选中11个
          if (arrayLength(selectedBalls) > 10) {
            Toast('合肖请选择2到11个选项')
            return
          }
          break
        case LhcCode.ZXBZ:  //自选不中 最多只能选中12个
          if (arrayLength(selectedBalls) > 11) {
            Toast('自选不中请选择5到12个选项')
            return
          }
          break
      }

      forceAdd(ballId)
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
    const checkMap = zodiac.nums.map((item) => doubleDigit(item))

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
    addAndRemoveBallList,
    addOrRemoveBall,
    zodiacBallIds,
  }
}

export default UseLotteryHelper

