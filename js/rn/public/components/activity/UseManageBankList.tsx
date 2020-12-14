import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'
import { ugLog } from '../../tools/UgLog'
import { anyEmpty, anyLength } from '../../tools/Ext'
import { ManageBankCardData } from '../../network/Model/act/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../Res/icon/Res'

/**
 * 银行卡管理
 * @constructor
 */
const UseManageBankList = () => {

  // const [listData, setListData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  // const [categoryData, setCategoryData] = useState(null)
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setRefreshing(true)
                                      requestManageBankData("0")
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    setRefreshing(true)
    requestManageBankData('0')
    // requestLogData("0")
  }, [])

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestManageBankData = async (category: string) => {
    APIRouter.user_bankCardList().then(({ data: res }) => {
      // setListData(anyLength(res?.data?.allAccountList) ? null : res?.data?.allAccountList[0])
      // setCategoryData(res?.data)
      setBankCardData(res?.data)
      setRefreshing(false)
    })
  }

  // /**
  //  * 请求申请彩金数据
  //  * @param category 分类
  //  */
  // const requestLogData = (category: string) => {
  //   APIRouter.activity_applyWinLog(category).then(({ data: res }) => {
  //     setListData(res?.data)
  //   })
  // }

  /**
   * 得到图标
   * @param type
   */
  const getBankIcon = (type?: string): {} => {
    ugLog('image type=', type == '1')
    if(type == '1') {
      return { uri: Res.bankhl1 }
    } else if(type == '2') {
      return { uri: Res.zfb_icon }
    } else if(type == '3') {
      return { uri: Res.wechatpay_icon }
    } else if(type == '4') {
      return { uri: Res.btc }
    }

    return null

    // switch (type) {
    //   case '1':
    //     return { uri: Res.bankhl1 }
    //   case '2':
    //     return { uri: Res.zfb_icon }
    //   case '3':
    //     return { uri: Res.wechatpay_icon }
    //   case '4':
    //     return { uri: Res.btc }
    //   default:
    //     return null
    // }
  }

  return {
    getBankIcon,
    refreshCT,
    bankCardData,
    requestManageBankData,
    // requestLogData,
  }
}

export default UseManageBankList
