import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositRecordData, DepositRecordModel } from '../../../../network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../network/APIRouter'
import { anyEmpty } from '../../../../tools/Ext'

/**
 * 存款记录
 * @constructor
 */
const UseDepositRecordList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [depositData, setDepositData] = useState<DepositRecordData>(null)//所有数据

  const [pageIndex, setPageIndex] = useState(0)//当前第几页

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setRefreshing(true)
                                      requestDepositData(true)
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestDepositData(true)
  }, [])

  /**
   * 请求存款记录
   * clear: 从头请求
   */
  const requestDepositData = async (clear: boolean) => {
    setRefreshing(true)
    const date = new Date()
    let endDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    APIRouter.capital_rechargeRecordList({
      startDate: '2010-01-01',
      endDate: endDate,
      page: pageIndex.toString(),
      rows: "20",
    }).then(({ data: res }) => {
      setPageIndex(clear ? 1 : pageIndex + 1)
      setDepositData(res?.data)
    }).finally(() => {
      setRefreshing(false)
    })
  }

  return {
    refreshCT,
    depositData,
    requestDepositData,
  }
}

export default UseDepositRecordList

