import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { WithdrawalListData } from '../../../../../public/network/Model/wd/WithdrawalRecordModel'

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
                                      requestWithdrawalData({ clear: true, selPage: 1 })
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestWithdrawalData({ clear: true, selPage: 1 })
  }, [])

  /**
   * 请求取款记录
   * clear: 从头请求
   */
  const requestWithdrawalData = async ({clear,
                                         selPage}: IWithdrawal) => {
    //pageIndex为1的时候，不再执行加载更多
    if(!clear && pageIndex == 1) return

    clear && setRefreshing(true)
    const date = new Date().format('yyyy-MM-dd')
    let reqPage = !anyEmpty(selPage) ? selPage : pageIndex

    APIRouter.capital_withdrawalRecordList({
      startDate: '2020-01-01',
      endDate: date,
      page: reqPage.toString(),
      rows: "20",
    }).then(({ data: res }) => {
      let listData = res?.data?.list
      ugLog('datas res=', pageIndex, res)
      if (res?.code == 0) {
        //没有更多数据了
        if (clear) {
          setPageIndex(reqPage + 1)
          setWithdrawalData(listData)
        } else {
          //没有更多数据了
          if (arrayEmpty(listData)) {
            setPageIndex(1)
          } else {
            setPageIndex(reqPage + 1)
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

/**
 * 请求参数
 * clear: 从头请求
 * selPage: 指定哪一页
 */
interface IWithdrawal {
  clear: boolean,
  selPage?: number,
}

export default UseWithdrawalRecordList

