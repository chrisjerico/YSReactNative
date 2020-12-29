import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../../public/tools/Ext'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { PayAisleData, PayAisleListData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import { hideLoading, showLoading } from '../../../../../../public/widget/UGLoadingCP'

/**
 * BTC支付
 * @constructor
 */
const UseBtcPay = () => {

  const moneyOption = ['1', '10', '50', '100', '500', '1000', '5000', '10000', '50000', '100000'] //金额选项

  const [payData, setPayData] = useState<PayAisleListData>(null) //存款数据对象
  const [inputMoney, setInputMoney] = useState(null) //输入金额
  const [btcMoney, setBtcMoney] = useState(0) //btc金额
  const [newRate, setNewRate] = useState(1) //新计算的汇率
  const [newUsd, setNewUsd] = useState(1) //新计算的1比1美元
  const [inputRemark, setInputRemark] = useState(null) //输入备注
  const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道

  useEffect(() => {
    if (payData != null) {
      setInputMoney(null)
      setBtcMoney(0)
      rateMoney(Number(payData?.channel[selPayChannel]?.currencyRate))

      // APIRouter.system_currencyRate({
      //   from: 'CNY',
      //   to: 'USD',
      //   amount: '1',
      //   float: payData?.channel[selPayChannel]?.branchAddress
      // }).then(({ data: res }) => {
      //   ugLog('rate res=', res)
      //   setNewRate(rateMoney(Number(res?.data?.rate)))
      // })
    }

  }, [payData, selPayChannel])

  useEffect(() => {
    const money = Math.round(inputMoney * 100 * newRate) / 100
    setBtcMoney(money)
  }, [inputMoney])

  /**
   * 计算当前的汇率
   * 汇率 * ( 1 + 浮动汇率 / 100 ) = 结果
   * 为保证精度不丢失，对数据放大 10000倍 再缩小
   */
  const rateMoney = (convertRate: number) => {
    const channel = payData?.channel[selPayChannel]
    if (channel?.domain == 'CGP') {
      setNewRate(1)
      setNewUsd(1)
    } else {

      // const convertRate = Number(channel?.currencyRate) //原始汇率
      const floatRate = Number(channel?.branchAddress) //浮动汇率
      let newRate = Math.round((convertRate * 10000) * (100 + floatRate))
      newRate /= 10000 * 100

      if(newRate <= 0) return 1

      setNewRate(newRate)

      let usd = Math.round(100 / newRate)/100
      ugLog('1比1美元 汇率=', convertRate, newRate, usd)
      setNewUsd(usd)
    }
  }

  /**
   * 开始存款
   */
  const requestPayData = async (params: IRechargeOfflineParams) => {
    if (!params?.amount) {
      Toast('请输入金额')
      return
    }

    ugLog('params=', JSON.stringify(params))
    showLoading()

    const res = await APIRouter.recharge_transfer(params)
      .then(({ data: res }) => res)
    //ugLog('data res=', JSON.stringify(res?.data))
    hideLoading()
    Toast(res?.msg)
    return res?.code
  }

  return {
    newRate,
    newUsd,
    moneyOption,
    inputMoney,
    setInputMoney,
    btcMoney,
    setBtcMoney,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
    payData,
    setPayData,
    requestPayData,
  }
}

export default UseBtcPay

