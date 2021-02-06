import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { numberToFloatString } from '../../../../public/tools/StringUtil'
import { calculateItemCount, combineSelectedData, gatherSelectedItems, initItemMoney } from '../tools/BetUtil'
import { zodiacPlayX } from '../tools/hx/BetHXUtil'
import { playDataX } from '../tools/zxbz/BetZXBZUtil'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { NormalModel } from '../../../../public/network/Model/NormalModel'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import APIRouter from '../../../../public/network/APIRouter'
import { syncUserInfo } from '../../../../public/tools/user/UserTools'
import { LotteryResultModel } from '../../../../public/network/Model/lottery/result/LotteryResultModel'
import { jsDic } from '../../../经典/Model/UGChanglongaideModel'
import { combineArrayName} from '../tools/ezdw/BetEZDWUtil'
import { combineOddsName } from '../../util/LotteryUtil'

/**
 * 下注面板
 *
 * @constructor
 */
const UsePayBoard = () => {

  const currentPlayOddData = UGStore.globalProps?.playOddDetailData.playOdds[UGStore.globalProps?.currentColumnIndex] //当前彩种
  const currentPlayGroupData = currentPlayOddData?.pageData?.groupTri[UGStore.globalProps?.lotteryTabIndex] //当前界面
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  const [selectedCombineData, setSelectedCombineData] = useState<Array<SelectedPlayModel>>(null) //重新组合过的彩种数据，一页一页的
  const [oneDenData, setOneDenData] = useState<Array<SelectedPlayModel>>(null) //将选中的数据转换成1维数据
  const [totalMoney, setTotalMoney] = useState(0) //计算总价格
  const [averageMoney, setAverageMoney] = useState(1) //输入平均价格
  const [itemCount, setItemCount] = useState(0) //选中的条目数据
  const [moneyMap, setMoneyMap] = useState<Map<string, number>>(null) //输入单项价格列表，id -> money

  useEffect(() => {
    const copyData = JSON.parse(JSON.stringify(UGStore.globalProps?.selectedLotteryModel?.selectedData))
    const newSelectedData = combineSelectedData(currentPlayOddData, copyData)
    ugLog('combineSelectedData newSelectedData = ', JSON.stringify(newSelectedData))
    setSelectedCombineData(newSelectedData)
  }, [])

  useEffect(() => {
    const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
    setAverageMoney(defaultMoney)
  }, [UGStore.globalProps?.selectedLotteryModel?.inputMoney])

  /**
   * 选中的数据变化时重新计算条目
   */
  useEffect(() => {
    //总共有多少条数据
    setItemCount(calculateItemCount(selectedCombineData))
    setMoneyMap(initItemMoney(selectedCombineData))
  }, [selectedCombineData])

  /**
   * 平均价格和条目变化时重新计算总金额
   */
  useEffect(() => {
    setTotalMoney(itemCount * averageMoney)
    ugLog('averageMoney total money = ', itemCount, averageMoney)
  }, [averageMoney, itemCount])

  /**
   * 价格变化时重新计算总金额
   */
  useEffect(() => {
    ugLog('moneyMap total money = ', moneyMap && JSON.stringify(Object.values(moneyMap)))
    const money = dicNull(moneyMap) ?
      0 :
      Object.values(moneyMap)?.reduce((previousValue, currentValue) =>
        previousValue + currentValue)

    setTotalMoney(money)
  }, [moneyMap])

  /**
   *
   * 开始下注
   */
  const startBetting = async (): Promise<LotteryResultModel> => {
    const betBean: Array<BetLotteryData> = []

    selectedCombineData?.map((selModel) => {
      switch (selModel?.code) {
        case LhcCode.TM:  //特码
        case LhcCode.LM: //两面
        case LhcCode.ZM: //正码
        case LhcCode.ZT:  //正特
        case LhcCode.ZM1_6: //正码1T6
        case LhcCode.SB: //色波
        case LhcCode.ZOX://总肖
        case LhcCode.WX:  //五行 或 五星
        case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        case LhcCode.TX: //特肖
        case LhcCode.ZX: //正肖
        case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
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
          selModel?.plays?.map((playData) => {
            betBean.push({
              money: numberToFloatString(moneyMap[playData?.exId ?? playData?.id]),
              odds: playData?.odds,
              playId: playData?.id,
              playIds: nextIssueData?.id,
            } as BetLotteryData)
          })
          break

        case LhcCode.LX: //连肖
        case LhcCode.LW: //连尾
          selModel?.plays?.map((playData) => {
            betBean.push({
              money: numberToFloatString(moneyMap[playData?.alias]),
              odds: playData?.odds,
              playId: playData?.id,
              playIds: playData?.exPlayIds,
              betInfo: playData?.alias,
            } as BetLotteryData)
          })
          break

        case LhcCode.HX://合肖
        {
          const playX = zodiacPlayX(selModel)
          betBean.push({
            money: numberToFloatString(moneyMap[playX?.exId ?? playX?.id]),
            playId: playX?.id,
            odds: playX?.odds,
            betInfo: selModel?.zodiacs?.map((item) => item?.name).toString(),
          } as BetLotteryData)
        }
          break

        case LhcCode.LMA:  //连码
        {
          const groupPlay0 = selModel?.playGroups?.plays[0]
          const play0 = selModel?.plays[0]
          betBean.push({
            money: numberToFloatString(moneyMap[play0?.exId ?? play0?.id]),
            playId: groupPlay0?.id,
            playIds: nextIssueData?.id,
            betInfo: combineArrayName(selModel).toString(),
          } as BetLotteryData)
        }
          break

        case LhcCode.ZXBZ:  //自选不中
        {
          const playX = playDataX(selModel)
          betBean.push({
            money: numberToFloatString(moneyMap[playX?.exId ?? playX?.id]),
            odds: playX?.odds,
            playId: playX?.id,
            betInfo: combineArrayName(selModel).toString(),
          } as BetLotteryData)
        }
          break

        case CqsscCode.YZDW:  //一字定位
        {
          const play0 = selModel?.playGroups?.plays[0]
          selModel?.plays?.map((playData) => {
            betBean.push({
              money: numberToFloatString(moneyMap[playData?.exId ?? playData?.id]),
              playId: play0?.id,
              odds: play0?.odds,
              playIds: nextIssueData?.id,
              betInfo: playData?.name,
            } as BetLotteryData)
          })
        }
          break

        case CqsscCode.EZDW:  //二字定位
        case CqsscCode.SZDW:  //三字定位
        {
          const groupPlay0 = selModel?.playGroups?.plays[0]
          const play0 = selModel?.playGroups?.plays[0]
          selModel?.plays?.map((playData) => {
            betBean.push({
              money: numberToFloatString(moneyMap[playData?.name]),
              playId: groupPlay0?.id,
              odds: play0?.odds,
              betInfo: playData?.name,
            } as BetLotteryData)
          })
        }
          break
      }

    })

    const pms: IBetLotteryParams = {
      activeReturnCoinRatio: '0',
      betBean: betBean,
      betIssue: nextIssueData?.curIssue,
      endTime: (moment(nextIssueData?.curCloseTime).toDate().getTime() / 1000).toString(),
      gameId: nextIssueData?.id,
      totalNum: itemCount?.toString(),
      totalMoney: numberToFloatString(totalMoney),
      isInstant: nextIssueData?.isInstant,
    }

    const { data } = await api.user.userGameBetWithParams(pms).promise
    await syncUserInfo(false)
    hideLoading()

    return {...data, data: {...data?.data, betParams: pms}}

  }

  return {
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    itemCount,
    currentPlayGroupData,
    nextIssueData,
    playOddDetailData,
    selectedCombineData,
    setSelectedCombineData,
    startBetting,
  }
}

export default UsePayBoard
