import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { Toast } from '../../../../../public/tools/ToastUtils'

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
                                      requestDepositData({ clear: true })
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestDepositData({ clear: true })
  }, [])

  /**
   * 请求存款记录
   * clear: 从头请求
   * selPage: 指定哪一页
   */
  const requestDepositData = async ({clear,
                                      selPage}: IDepositList) => {
    //pageIndex为1的时候，不再执行加载更多
    if(!clear && pageIndex == 1) return

    if (clear) {//从第1页开始请求
      setRefreshing(true)
      selPage = 1
    }
    const date = new Date().format('yyyy-MM-dd')
    let reqPage = !anyEmpty(selPage) ? selPage : pageIndex

    APIRouter.capital_rechargeRecordList({
      startDate: '2020-01-01',
      endDate: date,
      page: reqPage.toString(),
      rows: "20",
    }).then(({ data: res }) => {
      let listData = res?.data?.list
      ugLog('datas res=', res)
      if (res?.code == 0) {
        //没有更多数据了
        if (clear) {
          setPageIndex(reqPage + 1)
          setDepositData(listData)
        } else {
          //没有更多数据了
          if (arrayEmpty(listData)) {
            setPageIndex(1)
          } else {
            setPageIndex(reqPage + 1)
            setDepositData([...depositData, ...listData])
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
    depositData,
    requestDepositData,
  }
}

/**
 * 请求参数
 * clear: 从头请求
 * selPage: 指定哪一页
 */
interface IDepositList {
  clear: boolean,
  selPage?: number,
}

export default UseDepositRecordList

