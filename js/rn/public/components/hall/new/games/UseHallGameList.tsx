import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../network/Model/wd/HallGameModel'
import APIRouter from '../../../../../network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../tools/Ext'
import { ugLog } from '../../../../../tools/UgLog'
import { Toast } from '../../../../../tools/ToastUtils'

/**
 * 游戏大厅列表
 * @constructor
 */
const UseHallGameList = () => {

  const [refreshing, setRefreshing] = useState(false)

  const [gameData, setGameData] = useState<Array<GameListData>>([])//所有数据

  const [pageIndex, setPageIndex] = useState(1)//当前第几页

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestGameData({ clear: true, selPage: 1 })
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestGameData({ clear: true, selPage: 1 })
  }, [])

  /**
   * 请求存款记录
   * clear: 从头请求
   * selPage: 指定哪一页
   */
  const requestGameData = async ({clear,
                                      selPage}: IGameList) => {
    //pageIndex为1的时候，不再执行加载更多
    if(!clear && pageIndex == 1) return

    clear && setRefreshing(true)
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
          setGameData(listData)
        } else {
          //没有更多数据了
          if (arrayEmpty(listData)) {
            setPageIndex(1)
          } else {
            setPageIndex(reqPage + 1)
            setGameData([...gameData, ...listData])
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
    gameData,
    requestGameData,
  }
}

/**
 * 请求参数
 * clear: 从头请求
 * selPage: 指定哪一页
 */
interface IGameList {
  clear: boolean,
  selPage?: number,
}

export default UseHallGameList

