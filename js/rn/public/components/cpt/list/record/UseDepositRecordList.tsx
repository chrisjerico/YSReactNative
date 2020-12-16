import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData, DepositRecordData, DepositRecordModel } from '../../../../network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../tools/Ext'
import { ugLog } from '../../../../tools/UgLog'

/**
 * 存款记录
 * @constructor
 */
const UseDepositRecordList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [depositData, setDepositData] = useState<Array<DepositListData>>([])//所有数据

  const [pageIndex, setPageIndex] = useState(1)//当前第几页

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setPageIndex(1)
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
    //pageIndex为1的时候，不再执行加载更多
    if(!clear && pageIndex == 1) return

    setRefreshing(true)
    const date = new Date().format('yyyy-MM-dd')

    APIRouter.capital_rechargeRecordList({
      startDate: '2020-01-01',
      endDate: date,
      page: pageIndex.toString(),
      rows: "20",
    }).then(({ data: res }) => {
      let listData = res?.data?.list
      ugLog('datas res=', res)
      if (res?.code == 0) {
        //没有更多数据了
        if (arrayEmpty(listData)) {
          setPageIndex(1)
        } else {
          setPageIndex(clear ? 1 : pageIndex + 1)
          setDepositData([...depositData, ...listData])
        }
      }
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

