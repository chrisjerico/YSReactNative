import * as React from 'react'
import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { anyEmpty } from '../../../tools/Ext'
import { AllAccountListData, ManageBankCardData } from '../../../network/Model/bank/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import { Res } from '../../../../Res/icon/Res'
import { UGStore } from '../../../../redux/store/UGStore'
import { hideLoading, showLoading } from '../../../widget/UGLoadingCP'
import { Toast } from '../../../tools/ToastUtils'
import { CapitalConst } from '../const/CapitalConst'

/**
 * 存款提现
 * @constructor
 */
const UseCapitalList = () => {

  const [refreshing, setRefreshing] = useState(false)

  //tab分类数据
  const [categoryData, setCategoryData] = useState<Array<string>>(null)

  //所有数据
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    setCategoryData(Object.values(CapitalConst))
    // requestLogData("0")
  }, [])

  return {
    systemInfo,
    userInfo,
    categoryData,
    bankCardData,
  }
}

export default UseCapitalList

