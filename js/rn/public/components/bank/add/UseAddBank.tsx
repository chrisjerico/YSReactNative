import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { ugLog } from '../../../tools/UgLog'
import { anyEmpty, anyLength } from '../../../tools/Ext'
import { ManageBankCardData } from '../../../network/Model/act/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { BankDetailListData, BankDetailListModel } from '../../../network/Model/bank/BankDetailListModel'

/**
 * 银行卡管理
 * @constructor
 */
const UseAddBank = () => {

  /**
   * 银行账户类似
   */
  const [bankDetailData, setBankDetailData] = useState<BankDetailListModel>(null)
  const [btcDetailData, setBtcDetailData] = useState<BankDetailListModel>(null)

  /**
   * 银行有哪些
   */
  const [bankDetailItems, setBankDetailItems] = useState(null)

  /**
   * 虚拟币有哪些
   */
  const [btcDetailItems, setBtcDetailItems] = useState(null)

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestBankDetailData("1")
    requestBankDetailData("4")
    // requestLogData("0")
  }, [])

  /**
   * 请求申请彩金数据
   * @param category 1, 银行卡，4虚拟币
   */
  const requestBankDetailData = async (category?: string) => {
    APIRouter.user_bankInfoList(category).then(({ data: res }) => {
      if (category == '1') {
        setBankDetailData(res)
        !anyEmpty(res?.data) && setBankDetailItems(res?.data?.map(
          (item, index) =>
            ({ label: item.name, value: item.id })))
      } else if (category == '4') {
        setBtcDetailData(res)
        !anyEmpty(res?.data) && setBtcDetailItems(res?.data?.map(
          (item, index) =>
            ({ label: item.name, value: item.id })))
      }
    }).finally(() => {
    })
  }

  return {
    bankDetailData,
    btcDetailData,
    bankDetailItems,
    btcDetailItems,
    requestBankDetailData,
  }
}

export default UseAddBank
