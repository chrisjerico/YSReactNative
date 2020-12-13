import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { ugLog } from '../../../tools/UgLog'
import { anyEmpty, anyLength } from '../../../tools/Ext'
import { AllAccountListData, ManageBankCardData } from '../../../network/Model/act/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { UGStore } from '../../../../redux/store/UGStore'

/**
 * 银行卡管理
 * @constructor
 */
const UseManageBankList = () => {

  // const [listData, setListData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  //tab分类数据
  const [categoryData, setCategoryData] = useState<AllAccountListData[]>(null)

  //所有数据
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)
  const systemStore = UGStore.globalProps.sysConf

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
    requestManageBankData(null)
    // requestLogData("0")
  }, [])

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestManageBankData = async (category?: string) => {
    setRefreshing(true)
    APIRouter.user_bankCardList().then(({ data: res }) => {
      setBankCardData(res?.data)
      generateListData(res?.data)
    }).finally(() => {
      setRefreshing(false)
    })
  }

  /**
   * 生成tab数据
   */
  let generateListData = (data?: ManageBankCardData) => {
    if(anyEmpty(data?.allAccountList)) return

    const tabAll: AllAccountListData = {
      type: 0,
      name: '全部',
      data: [],
    }

    data?.allAccountList.map((item, index) => {
      if(!anyEmpty(item.data)) {
        tabAll.data = tabAll.data.concat(item.data)
      }
    })

    setCategoryData([tabAll, ...data?.allAccountList])
  }

  /**
   * 得到图标
   * @param type
   */
  const getBankIcon = (type?: string): {} => {
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
    systemStore,
    categoryData,
    getBankIcon,
    refreshCT,
    bankCardData,
    requestManageBankData,
    // requestLogData,
  }
}

export default UseManageBankList
