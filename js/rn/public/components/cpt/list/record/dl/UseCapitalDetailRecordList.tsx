import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import APIRouter from '../../../../../network/APIRouter'
import { arrayEmpty } from '../../../../../tools/Ext'
import { ugLog } from '../../../../../tools/UgLog'
import { Toast } from '../../../../../tools/ToastUtils'
import { CapitalGroupData, CapitalListData } from '../../../../../network/Model/wd/CapitalDetailModel'

/**
 * 资金明细记录
 * @constructor
 */
const UseCapitalDetailRecordList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [capitalDetailData, setListDetailData] = useState<Array<CapitalListData>>([])//所有数据

  const [pageIndex, setPageIndex] = useState(1)//当前第几页
  const [groups, setGroups] = useState<Array<CapitalGroupData>>([{ id: 0, name: '' }])//当前的分组数据

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setPageIndex(1)
                                      setRefreshing(true)
                                      requestListDetailData(true)
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestListDetailData(true)
  }, [])

  /**
   * 请求资金明细记录
   * clear: 从头请求
   */
  const requestListDetailData = async (clear: boolean) => {
    //pageIndex为1的时候，不再执行加载更多
    if (!clear && pageIndex == 1) return

    clear && setRefreshing(true)
    const date = new Date().format('yyyy-MM-dd')

    APIRouter.capital_capitalDetailRecordList({
      startDate: '2020-01-01',
      endDate: date,
      page: pageIndex.toString(),
      rows: '20',
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
            setListDetailData(listData)
          } else {
            setListDetailData([...capitalDetailData, ...listData])
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
    capitalDetailData,
    requestListDetailData,
  }
}

export default UseCapitalDetailRecordList

