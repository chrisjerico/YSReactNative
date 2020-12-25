import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { PayAisleData } from '../../../../../public/network/Model/wd/PayAisleModel'

/**
 * 支付通道记录
 * @constructor
 */
const UsePayList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [payData, setPayData] = useState<PayAisleData>(null)//所有数据

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
      ugLog('data res=', JSON.stringify(res?.data))
      if (res?.code == 0) {
        setPayData(listData)

      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
      setRefreshing(false)
    })
  }

  return {
    refreshCT,
    payData,
    requestPayData,
  }
}

export default UsePayList

