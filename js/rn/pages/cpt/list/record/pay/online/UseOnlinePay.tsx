import * as React from 'react'
import { useEffect, useState } from 'react'
import { Linking, RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../../public/tools/Ext'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { PayAisleData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import { hideLoading, showLoading } from '../../../../../../public/widget/UGLoadingCP'
import queryStrng from 'query-string'
/**
 * 在线支付
 * @constructor
 */
const UseOnlinePay = () => {

  const moneyOption = ['1', '10', '50', '100', '500', '1000', '5000', '10000', '50000', '100000'] //金额选项

  const [inputMoney, setInputMoney] = useState(null) //输入金额
  const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道

  /**
   * 开始存款
   */
  const requestPayData = async (params: IRechargeOnlineParams) => {

    if (!params?.money) {
      Toast('请输入金额')
      return
    }

    showLoading()
    APIRouter.recharge_onlinePay(params).then(({ data: res }) => {
      //ugLog('data res=', JSON.stringify(res?.data))
      if (res?.code == 0) {
        const {payId, gateway, money} = queryStrng.parse(res?.data)
        ugLog('payId=', payId, gateway, money)
        APIRouter.open_onlinepay({
          payId: payId.toString(),
          gateway: gateway.toString(),
          money: money.toString(),
        })
      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
      hideLoading()
    })
  }

  return {
    moneyOption,
    inputMoney,
    setInputMoney,
    selPayChannel,
    setSelPayChannel,
    requestPayData,
  }
}

export default UseOnlinePay

