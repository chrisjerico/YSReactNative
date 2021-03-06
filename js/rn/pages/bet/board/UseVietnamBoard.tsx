import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import { anyEmpty, arrayEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import { Toast } from '../../../public/tools/ToastUtils'
import { checkBetCount, generateBetArray, vietnamSelectedCount } from './tools/BetUtil'
import { LotteryResultData } from '../../../public/network/Model/lottery/result/LotteryResultModel'
import { AsyncStorageKey } from '../../../redux/store/IGlobalStateHelper'
import { BetShareModel } from '../../../redux/model/game/bet/BetShareModel'
import { ugLog } from '../../../public/tools/UgLog'
import { filterSelectedDataCount, filterSelectedSubCount, filterSelectedSubMap } from '../util/LotteryUtil'
import { DeviceEventEmitter, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { EmitterTypes } from '../../../public/define/EmitterTypes'
import { IEmitterMessage } from './it/IEmitterMessage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { Slider } from 'react-native-elements'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import UseBetBoard from './UseBetBoard'
import { currentPlayOddData, currentTabGroupData } from '../util/select/ParseSelectedUtil'
import { HoChiMinSub, LCode } from '../const/LotteryConst'
import { showHintToast } from '../../../public/tools/StringUtil'
import { combineArr } from '../util/ArithUtil'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'
import { PlayData } from '../../../public/network/Model/lottery/PlayOddDetailModel'


/**
 * 越南彩票下注 功能面板
 * @constructor
 */
const UseVietnamBoard = () => {

  const betBoard = UseBetBoard()

  useEffect(() => {
    UGStore.dispatch({ type: 'reset', betCount: 1 })
  }, [])

  /**
   * 开始下注
   */
  const checkShowBetPayment = () => {
    const betCount = UGStore.globalProps?.betCount

    if (!betCount || betCount <= 0) {
      Toast('请输入下注数量')
      // } else if (count <= 0) {
      //   Toast('请选择玩法')
    } else if (checkBetCount()) {
      const newData = generateBetArray(
        UGStore.globalProps?.nextIssueData,
        UGStore.globalProps?.sliderValue?.toString(),
        UGStore.globalProps?.inputMoney?.toString(),
        UGStore.globalProps?.selectedData,
        betCount
      )

      UGStore.dispatch({ type: 'reset', betShareModel: newData })
    }
  }

  /**
   * 一条数据的金额
   */
  const priceOfItem = (): number => {
    const gameType = betBoard?.playOddDetailData?.game?.gameType // 彩种类别，六合彩 秒秒彩
    const subCode = currentTabGroupData()[0]?.plays[0]?.code // 批号2，批号3 等等

    switch (true) {
      case subCode == HoChiMinSub.PIHAO2:
        if (gameType == LCode.ofclvn_hochiminhvip) {
          return 18
        }
        return 27

      case subCode == HoChiMinSub.PIHAO3:
        if (gameType == LCode.ofclvn_hochiminhvip) {
          return 17
        }
        return 23

      case subCode == HoChiMinSub.PIHAO4:
        if (gameType == LCode.ofclvn_hochiminhvip) {
          return 16
        }
        return 20

      case subCode == HoChiMinSub.LOT2FIRST && gameType == LCode.ofclvn_haboivip:
        return 23

      case subCode == HoChiMinSub.ZHUZHANG7 && gameType == LCode.ofclvn_haboivip:
        return 4

      case subCode == HoChiMinSub.BIAOTIWB && gameType == LCode.ofclvn_hochiminhvip:
      case subCode == HoChiMinSub.H_3WBDJT && gameType == LCode.ofclvn_hochiminhvip:
        return 2

    }

    return 1
  }

  /**
   * 选中的注数
   */
  const betCount = useMemo<number>(() => {
    return vietnamSelectedCount()

  }, [UGStore.globalProps?.selectedData])

  /**
   * 选中的注数对应的金额
   */
  const betMoney = useMemo<string>(() => {
    const money = betCount * priceOfItem()
    UGStore.dispatch({ type: 'reset', inputMoney: money })
    return money.toString()
  }, [betCount])

  return {
    ...betBoard,
    betCount,
    betMoney,
    priceOfItem,
    checkShowBetPayment,
  }
}


export default UseVietnamBoard

