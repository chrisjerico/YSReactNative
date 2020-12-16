import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import APIRouter from '../../../../../network/APIRouter'
import { arrayEmpty } from '../../../../../tools/Ext'
import { ugLog } from '../../../../../tools/UgLog'
import { Toast } from '../../../../../tools/ToastUtils'
import { WithdrawalListData } from '../../../../../network/Model/wd/WithdrawalRecordModel'

/**
 * 取款记录
 * @constructor
 */
const UseWithdrawalRecordList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [withdrawalData, setWithdrawalData] = useState<Array<WithdrawalListData>>([])//所有数据

  const [pageIndex, setPageIndex] = useState(1)//当前第几页

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setPageIndex(1)
                                      setRefreshing(true)
                                      requestWithdrawalData(true)
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestWithdrawalData(true)
  }, [])

  /**
   * 请求取款记录
   * clear: 从头请求
   */
  const requestWithdrawalData = async (clear: boolean) => {
    //pageIndex为1的时候，不再执行加载更多
    if(!clear && pageIndex == 1) return

    clear && setRefreshing(true)
    const date = new Date().format('yyyy-MM-dd')

    APIRouter.capital_withdrawalRecordList({
      startDate: '2020-01-01',
      endDate: date,
      page: pageIndex.toString(),
      rows: "20",
    }).then(({ data: res }) => {
      let listData = res?.data?.list
      ugLog('datas res=', pageIndex, res)
      if (res?.code == 0) {
        //没有更多数据了
        if (arrayEmpty(listData)) {
          setPageIndex(1)
        } else {
          setPageIndex(pageIndex + 1)
          if (clear) {
            setWithdrawalData(listData)
          } else {
            setWithdrawalData([...withdrawalData, ...listData])
          }
        }

      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
      clear && setRefreshing(false)
    })
  }

  return {
    refreshCT,
    withdrawalData,
    requestWithdrawalData,
  }
}

export default UseWithdrawalRecordList

