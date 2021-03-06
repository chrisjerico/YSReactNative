import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { isSameBall, isSelectedBallOnId } from '../../widget/it/ISelBall'
import { UGStore } from '../../../../redux/store/UGStore'
import { CqsscCode, LCode, LhcCode } from '../../const/LotteryConst'
import { ugLog } from '../../../../public/tools/UgLog'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { parseLMASelectedData } from '../../util/select/lhc/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/select/lhc/ParseHXSelectedUtil'
import { doubleDigit } from '../../../../public/tools/StringUtil'
import { filterSelectedDataCount, filterSelectedSubCount } from '../../util/LotteryUtil'
import { randomItem } from '../../util/ArithUtil'
import { Play } from '../../../../public/network/Model/PlayOddDataModel'
import { currentPlayOddData, currentTabGroupData, tabGroupData } from '../../util/select/ParseSelectedUtil'
import { checkClickCount, prepareSelectedBetData } from '../../board/tools/BetUtil'
import { DeviceEventEmitter } from 'react-native'
import { EmitterTypes } from '../../../../public/define/EmitterTypes'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const sliderValue = UGStore.globalProps?.sliderValue

  const [selectedBalls, setSelectedBalls] = useState<Array<PlayData | ZodiacNum>>([]) //选中了哪些球或者生肖
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //此页显示的彩种数据
  const [tabIndex, setTabIndex] = useState(0) //当前选中第几页

  useEffect(() => {
    if (!dicNull(playOddData) && !dicNull(UGStore.globalProps?.selectedData)) { //等到数据加载完成以后
      ugLog('恢复选中的数据')
      const curSelectedData: Map<string, Map<string, SelectedPlayModel>> = UGStore.globalProps?.selectedData[playOddData?.code]

      switch (playOddData?.code) {
        // case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        //   break
        default:
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
    }
  }, [playOddData])

  useEffect(() => {
    //收到消息就机投一注
    const lisRandom = DeviceEventEmitter.addListener(EmitterTypes.RANDOM_SELECT_LOTTERY, () => {
      randomSelectBalls()
    })

    //收到消息就清空选项
    const lisClear = DeviceEventEmitter.addListener(EmitterTypes.CLEAR_SELECT_LOTTERY, () => {
      setSelectedBalls([])
    })

    //Tab有变化就清除选择的数据
    UGStore.dispatch({ type: 'reset', lotteryTabIndex: tabIndex })
    setSelectedBalls([])

    return () => {
      lisRandom.remove()
      lisClear.remove()
    }
  }, [tabIndex, playOddData])

  useEffect(() => {
    if (!dicNull(playOddData)) { //等到数据加载完成以后
      prepareSelectedBetData(playOddData, selectedBalls)
    }

  }, [selectedBalls, playOddData])

  //当前选中的第几页数据
  const currentPageData = (): Array<PlayGroupData> =>
    tabIndex < arrayLength(playOddData?.pageData?.groupTri) ? playOddData?.pageData?.groupTri[tabIndex] : []

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
        if (checkClickCount(ballData, playOddData, selectedBalls)) {
          forceAdd(ballData)
        }

      }
    } else {
      Toast('当前玩法组已关闭')
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
   */
  const randomSelectBalls = () => {
    const tabData = tabGroupData(tabIndex)
    //当前页的数据
    const currentPageData = currentTabGroupData()
    //如果不是当前页，就不作处理
    if (tabData != currentPageData) return

    ugLog('当前机选=', JSON.stringify(currentPageData))

    const firstGroupData = currentPageData[0]//一组数据，有的彩票只有一组数据
    const firstAvailablePlayBalls = (firstGroupData?.exPlays ?? firstGroupData?.plays) //找出可用数据, 自定义的球使用exPlays
      ?.filter((ball) => ball?.enable != '0')
    const zodiacNums = playOddData?.pageData?.zodiacNums
    ugLog('randomSelect = ', firstGroupData?.code, firstGroupData?.alias, firstAvailablePlayBalls)

    setSelectedBalls([])
    switch (playOddData?.code) {
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      {
        switch (firstGroupData?.alias) {
          case '二连肖':
          case '二连尾':
            //需要2个球
          {
            const ball5 = randomItem(firstAvailablePlayBalls, 2)
            addAndRemoveBallList(ball5)
          }
            break
          case '三连肖':
          case '三连尾':
            //需要3个球
          {
            const ball5 = randomItem(firstAvailablePlayBalls, 3)
            addAndRemoveBallList(ball5)
          }
            break
          case '四连肖':
          case '四连尾':
            //需要4个球
          {
            const ball5 = randomItem(firstAvailablePlayBalls, 4)
            addAndRemoveBallList(ball5)
          }
            break
          case '五连肖':
          case '五连尾':
            //需要5个球
          {
            const ball5 = randomItem(firstAvailablePlayBalls, 5)
            addAndRemoveBallList(ball5)
          }
            break

        }
      }
        break

      case LhcCode.HX://合肖
        //需要2个球
        const zodiac2 = randomItem(zodiacNums, 2)
        addAndRemoveBallList(zodiac2)
        break
      case LhcCode.LMA:  //连码
        switch (firstGroupData?.alias) {
          case '二中二':
          case '二全中':
          case '二中特':
          case '特串':
            //需要2个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 2)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '三中三':
          case '三全中':
          case '三中二':
            //需要3个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 3)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '四中四':
          case '四全中':
            //需要4个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 4)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '五中五':
          case '前二组选':
          case '前三组选':
            //需要5个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 5)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '六中五':
            //需要6个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 6)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '七中五':
            //需要7个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 7)
            addAndRemoveBallList(randomBalls)
          }
            break
          case '八中五':
            //需要8个球
          {
            const randomBalls = randomItem(firstAvailablePlayBalls, 8)
            addAndRemoveBallList(randomBalls)
          }
            break
        }
        break

      case LhcCode.ZXBZ:  //自选不中
        //需要5个球
      {
        const randomBalls = randomItem(firstAvailablePlayBalls, 5)
        addAndRemoveBallList(randomBalls)
      }
        break

      default://默认每组选1个
      {
        const dataList = currentPageData?.filter((groupData) =>
          groupData?.enable == '1')?.map((groupData) =>
          randomItem(groupData?.plays?.filter((ball) => ball?.enable != '0'))[0])
        addAndRemoveBallList(dataList)
      }
        break
    }
  }

  return {
    sliderValue,
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

