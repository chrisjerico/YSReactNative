import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength, dicNull } from '../../../../public/tools/Ext'
import { isSameBall, isSelectedBallOnId } from '../../widget/it/ISelBall'
import { UGStore } from '../../../../redux/store/UGStore'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { ugLog } from '../../../../public/tools/UgLog'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { parseLMASelectedData } from '../../util/select/lhc/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/select/lhc/ParseHXSelectedUtil'
import { doubleDigit } from '../../../../public/tools/StringUtil'
import { filterSelectedData, filterSelectedSubData } from '../../util/LotteryUtil'
import { randomItem } from '../../util/ArithUtil'
import { Play } from '../../../../public/network/Model/PlayOddDataModel'
import { currentPlayOddData } from '../../util/select/ParseSelectedUtil'
import { prepareSelectedBetData } from '../../board/tools/BetUtil'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据

  const [selectedBalls, setSelectedBalls] = useState<Array<PlayData | ZodiacNum>>([]) //选中了哪些球或者生肖
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //此页显示的彩种数据
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页

  useEffect(() => {
    prepareSelectedBetData(playOddData, selectedBalls)

  }, [selectedBalls])

  useEffect(() => {

    ugLog('恢复选中的数据')
    const curSelectedData: Map<string, Map<string, SelectedPlayModel>> = UGStore.globalProps?.selectedData[playOddData?.code]

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
                  setSelectedBalls(playModel?.zodiacs)
                  break
                default:
                  setSelectedBalls(playModel?.plays)
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
   * @param addBalls 选中球
   * @param removeBalls 取消的球
   */
  const addAndRemoveBallList = (addBalls?: Array<PlayData | ZodiacNum>, removeBalls?: Array<PlayData | ZodiacNum>) => {
    const filterBalls = selectedBalls?.filter((item) => !isSelectedBallOnId(removeBalls, item))
    const newBalls = dicNull(addBalls) ? filterBalls : [...filterBalls, ...addBalls]
    setSelectedBalls(newBalls)
  }

  /**
   * 强制选中它
   * @param ballData 选中的球
   */
  const forceAdd = (ballData?: PlayData | ZodiacNum) => {
    setSelectedBalls([...selectedBalls, ballData])
  }

  /**
   * 强制取消它
   * @param ballData 取消的球
   */
  const forceRemove = (ballData?: PlayData | ZodiacNum) => {
    let newResult = selectedBalls?.filter((item) => !isSameBall(item, ballData))
    setSelectedBalls(newResult)
  }

  /**
   * 添加或移除选中的球
   * @param ballData 球
   * @param groupEnable 当前页是否开启
   */
  const addOrRemoveBall = (ballData?: PlayData | ZodiacNum, groupEnable?: string) => {
    if (ballData?.enable != '0' && groupEnable == '1') {
      if (isSelectedBallOnId(selectedBalls, ballData)) {
        forceRemove(ballData)

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

        forceAdd(ballData)
      }
    }
  }

  /**
   * 根据生肖数字取出对应的球
   * @param zodiac
   * @param groupData
   */
  const zodiacBallIds = (zodiac?: ZodiacNum,
                         groupData?: PlayGroupData): Array<PlayData> => {
    //重组数字
    const checkMap = zodiac.nums.map((item) => doubleDigit(item))

    return groupData?.plays?.filter((item) => checkMap?.includes(item?.name))
  }

  /**
   * 机选下注
   * @param currentPageData 当前这一页的数据
   */
  const randomSelectBalls = () => {
    //当前页的数据
    const currentPageData: Array<PlayGroupData> = currentPlayOddData()?.pageData?.groupTri[tabIndex]
    const firstGroupData = currentPageData[0]//一组数据，有的彩票只有一组数据
    const firstAvailablePlayBalls = (firstGroupData?.exPlays ?? firstGroupData?.plays) //自定义的球使用exPlays
      ?.filter((ball) => ball?.enable != '0')
    const zodiacNums = playOddData?.pageData?.zodiacNums
    ugLog('randomSelect = ', firstGroupData?.code, firstGroupData?.alias, firstAvailablePlayBalls)

    switch (firstGroupData?.code) {
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      {
        switch (firstGroupData?.alias) {
          case '二连肖':
          case '二连尾':
            //需要2个球
            randomItem(firstAvailablePlayBalls, 2).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break
          case '三连肖':
          case '三连尾':
            //需要3个球
            randomItem(firstAvailablePlayBalls, 3).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break
          case '四连肖':
          case '四连尾':
            //需要4个球
            randomItem(firstAvailablePlayBalls, 4).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break
          case '五连肖':
          case '五连尾':
            //需要5个球
            randomItem(firstAvailablePlayBalls, 5).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break

        }
      }
        break

      case LhcCode.HX://合肖
        //需要2个球
        randomItem(zodiacNums, 2).map((item: ZodiacNum) =>
          addOrRemoveBall(item, firstGroupData?.enable))
        break
      case LhcCode.LMA:  //连码
        switch (firstGroupData?.alias) {
          case '二全中':
          case '二中特':
          case '特串':
            //需要2个球
            randomItem(firstAvailablePlayBalls, 2).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break
          case '三全中':
          case '三中二':
            //需要3个球
            randomItem(firstAvailablePlayBalls, 3).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break
          case '四全中':
            //需要4个球
            randomItem(firstAvailablePlayBalls, 4).map((item) =>
              addOrRemoveBall(item, firstGroupData?.enable))
            break

        }
        break

      case LhcCode.ZXBZ:  //自选不中
        //需要5个球
        randomItem(firstAvailablePlayBalls, 5).map((item) =>
          addOrRemoveBall(item, firstGroupData?.enable))
        break

      default://默认每组选1个
        currentPageData?.map((groupData) => {
          //从可用的球里面随机选出1个
          const item: PlayData = randomItem(groupData?.plays?.filter((ball) => ball?.enable != '0'))[0]
          addOrRemoveBall(item, groupData?.enable)
        })
        break
    }
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
    addAndRemoveBallList,
    addOrRemoveBall,
    zodiacBallIds,
  }
}

export default UseLotteryHelper

