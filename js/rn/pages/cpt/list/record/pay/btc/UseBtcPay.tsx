import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../../public/tools/Ext'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { PayAisleData } from '../../../../../../public/network/Model/wd/PayAisleModel'

/**
 * BTC支付
 * @constructor
 */
const UseBtcPay = () => {

  const moneyOption = ['1', '10', '50', '100', '500', '1000', '5000', '10000', '50000', '100000'] //金额选项

  const [inputMoney, setInputMoney] = useState(null) //输入金额
  const [inputName, setInputName] = useState(null) //输入姓名
  const [inputRemark, setInputRemark] = useState(null) //输入备注
  const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道

  /**
   * 请求支付通道记录
   */
  const requestPayData = async () => {

    APIRouter.capital_rechargeCashier().then(({ data: res }) => {
      let listData = res?.data
      //ugLog('data res=', JSON.stringify(res?.data))
      if (res?.code == 0) {

      } else {
        Toast(res?.msg)
      }
    }).finally(() => {

    })
  }

  return {
    moneyOption,
    inputMoney,
    setInputMoney,
    inputName,
    setInputName,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
    requestPayData,
  }
}

export default UseBtcPay

