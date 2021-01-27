import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty, arrayLength } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { CapitalGroupData, CapitalListData } from '../../../../../public/network/Model/wd/CapitalDetailModel'
import moment from 'moment'
import { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'
import { getBankIcon } from '../../../../bank/list/UseManageBankList'
import { api } from '../../../../../public/network/NetworkRequest1/NetworkRequest1'

/**
 * 资金明细记录
 * @constructor
 */
const UseCapitalDetailRecordList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [capitalDetailData, setListDetailData] = useState<Array<CapitalListData>>([])//所有数据

  const [menuItem, setMenuItem] = useState<Array<IMiddleMenuItem>>([{ id: '0', title: '全部类型' }]) //所有菜单列表
  const [pageIndex, setPageIndex] = useState(1)//当前第几页
  const [curGroup, setCurGroup] = useState(0)//当前组id
  // const [groups, setGroups] = useState([{ value: 0, label: '全部类型' }])//当前的分组数据

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestListDetailData({ clear: true })
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestListDetailData({ clear: true })
  }, [])

  /**
   * 请求资金明细记录
   * clear: 从头请求
   * selGroup: 指定哪个分类
   * selPage: 指定哪一页
   */

  const requestListDetailData = async ({
                                         clear,
                                         selGroup,
                                         selPage,
                                         startDate,
                                         endDate,
                                       }: IReqCapitalDetail) => {
    //pageIndex为1的时候，不再执行 加载更多操作
    if (!clear && pageIndex == 1) return

    if (clear) {//从第1页开始请求
      setRefreshing(true)
      selPage = 1
    }

    const stDate = !anyEmpty(startDate) ? startDate : '2010-01-01'
    const edDate = !anyEmpty(endDate) ? endDate : new Date().format('yyyy-MM-dd')
    let reqGroup = !anyEmpty(selGroup) ? selGroup : menuItem?.find((item) =>
      item.id == curGroup?.toString())?.id?.toString()
    let reqPage = !anyEmpty(selPage) ? selPage : pageIndex

    console.log('startDate====',startDate);
    console.log('endDate====',endDate);
    

    api.user.fundLogs(stDate,edDate,reqPage,20,reqGroup).useSuccess(({ data }) => {
      const res = {data:data};
      let listData = res?.data?.list
      let cpGroups = res?.data?.groups
     
      console.log('listData====', JSON.stringify(listData));
      ugLog('page==',pageIndex)
        //缓存列表显示选项
        const menu = cpGroups?.map((item) => {
          return (
            ({
              title: `${item?.name}`,
              id: item?.id?.toString(),
            } as IMiddleMenuItem)
          )
        })

        setMenuItem([{ id: '0', title: '全部类型' }, ...menu])
          setListDetailData(listData)

        if (clear) {
          ugLog('clear')
          setPageIndex(reqPage + 1)
          setListDetailData(listData)
        } else {
          //没有更多数据了
          if (arrayEmpty(listData)) {
            ugLog('arrayEmpty')
            setPageIndex(1)
          } else {
            setPageIndex(reqPage + 1)
            ugLog('reqPage==',reqPage)
            setListDetailData([...capitalDetailData, ...listData])
          }
        }
      
    }).useFailure(
      (err,sm)=>{

      }
    ).useCompletion(
      (res,err,sm)=>{
        clear && setRefreshing(false)
      }
    )



    // APIRouter.capital_capitalDetailRecordList({
    //   startDate: stDate,
    //   endDate: edDate,
    //   page: reqPage.toString(),
    //   rows: '20',
    //   group: reqGroup,
    // }).then(({ data: res }) => {
    //   let listData = res?.data?.list
    //   let cpGroups = res?.data?.groups

    //   ugLog('data res=', reqPage, JSON.stringify(res?.data))
    //   if (res?.code == 0) {

    //     //缓存列表显示选项
    //     const menu = cpGroups?.map((item) => {
    //       return (
    //         ({
    //           title: `${item?.name}`,
    //           id: item?.id?.toString(),
    //         } as IMiddleMenuItem)
    //       )
    //     })

    //     setMenuItem([{ id: '0', title: '全部类型' }, ...menu])
    //       setListDetailData(listData)


    //     if (clear) {
    //       setPageIndex(reqPage + 1)
    //       setListDetailData(listData)
    //     } else {
    //       //没有更多数据了
    //       if (arrayEmpty(listData)) {
    //         setPageIndex(1)
    //       } else {
    //         setPageIndex(reqPage + 1)
    //         setListDetailData([...capitalDetailData, ...listData])
    //       }
    //     }

    //   } else {
    //     Toast(res?.msg)
    //   }
    // }).finally(() => {
    //   clear && setRefreshing(false)
    // })
  }

  return {
    menuItem,
    refreshCT,
    curGroup,
    setCurGroup,
    capitalDetailData,
    requestListDetailData,
  }
}

/**
 * 请求参数
 * clear: 从头请求
 * selGroup: 指定哪个分类
 * selPage: 指定哪一页
 * startDate: 开始日期
 * endDate: 结束日期
 */
interface IReqCapitalDetail {
  clear: boolean,
  selGroup?: string,
  selPage?: number,
  startDate?: string,
  endDate?: string,
}

export default UseCapitalDetailRecordList

