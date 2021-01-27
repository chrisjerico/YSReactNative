import * as React from 'react'
import { useEffect, useState } from 'react'
import { Linking, RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../../public/tools/Ext'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { PayAisleData, PayAisleListData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import { hideLoading, showLoading } from '../../../../../../public/widget/UGLoadingCP'
import queryStrng from 'query-string'
/**
 * 在线支付
 * @constructor
 */
const UseOnlinePay = () => {


  const [curSelBank, setCurSelBank] = useState(null) //选择了哪个银行
  const [accountItems, setAccountItems] = useState(null) //账户有哪些
  const [inputMoney, setInputMoney] = useState(null) //输入金额
  const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道
  const [moneyOption, setMoneyOption] = useState<Array<string>>(null) //输入金额选项
  const [payData, setPayData] = useState<PayAisleListData>(null) //当前数据
  const [payBigData, setPayBigData] = useState<PayAisleData>(null) //总数据


  useEffect(() => {
    //重新绘制银行选择界面
    if (payData != null) {
      let curChannel = payData?.channel[selPayChannel]
      let banks = curChannel?.para?.bankList?.map(
        (item, index) =>
          ({
            label: item.name, value: item.code,
          }))
      !anyEmpty(banks) && setAccountItems(banks)
      !anyEmpty(banks) && setCurSelBank(banks[0].value)
      setMoneyOption(payBigData?.quickAmount)
      if(!anyEmpty(curChannel?.para?.fixedAmount)) {
        const moneyOp = curChannel?.para?.fixedAmount?.split(' ')
        if (!anyEmpty(moneyOp)) {
          setMoneyOption(moneyOp)
        }
      }
    }
  }, [selPayChannel, payData])

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
    setPayData,
    setPayBigData,
    curSelBank,
    setCurSelBank,
    accountItems,
    setAccountItems,
    moneyOption,
    setMoneyOption,
    inputMoney,
    setInputMoney,
    selPayChannel,
    setSelPayChannel,
    requestPayData,
  }
}

export default UseOnlinePay

