import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import BetLotteryContext from '../BetLotteryContext'
import ISelBall, { isSelectedBallOnId } from '../const/ISelBall'
import UseLotteryHelper from '../util/UseLotteryHelper'
import { bool } from 'prop-types'


/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseLhcBoard = () => {

  const [sliderValue, setSliderValue] = useState<number>(0) //拉条进度
  const [inputMoney, setInputMoney] = useState<string>(null) //输入的金额
  const [showChip, setShowChip] = useState<boolean>(false) //是否显示筹码

  useEffect(() => {
  }, [])

  return {
    sliderValue,
    setSliderValue,
    inputMoney,
    setInputMoney,
    showChip,
    setShowChip,
  }
}

interface ILMABallArray {
  id: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcBoard
export { ILMABallArray }

