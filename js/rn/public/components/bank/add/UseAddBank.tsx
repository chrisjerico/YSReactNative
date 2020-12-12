import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { ugLog } from '../../../tools/UgLog'
import { anyEmpty, anyLength } from '../../../tools/Ext'
import { ManageBankCardData } from '../../../network/Model/act/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'

/**
 * 银行卡管理
 * @constructor
 */
const UseAddBank = () => {

  const [bankDetailData, setBankDetailData] = useState<ManageBankCardData>(null)
  const [btcDetailData, setBtcDetailData] = useState<ManageBankCardData>(null)

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestBankDetailData(null)
    // requestLogData("0")
  }, [])

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestBankDetailData = async (category?: string) => {
    APIRouter.user_bankCardList().then(({ data: res }) => {
    }).finally(() => {
    })
  }

  return {
    bankDetailData,
    btcDetailData,
    requestBankDetailData,
  }
}

export default UseAddBank
