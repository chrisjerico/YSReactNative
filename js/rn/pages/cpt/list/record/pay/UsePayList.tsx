import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import APIRouter from '../../../../../public/network/APIRouter'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { PayAisleData } from '../../../../../public/network/Model/wd/PayAisleModel'

/**
 * 虚拟币教程
 * @constructor
 */
const UsePayList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [payBigData, setPayBigData] = useState<PayAisleData>(null)//所有数据

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestPayData()
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestPayData()
  }, [])

  /**
   * 请求支付通道记录
   */
  const requestPayData = async () => {

    setRefreshing(true)

    APIRouter.capital_rechargeCashier().then(({ data: res }) => {
      let listData = res?.data
      //ugLog('data res=', JSON.stringify(res?.data))
      if (res?.code == 0) {
        setPayBigData(listData)

      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
      setRefreshing(false)
    })
  }

  return {
    refreshCT,
    payBigData,
    requestPayData,
  }
}

export default UsePayList

