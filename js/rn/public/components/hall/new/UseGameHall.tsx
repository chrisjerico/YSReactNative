import * as React from 'react'
import { useEffect, useState } from 'react'
import { ManageBankCardData } from '../../../network/Model/bank/ManageBankCardModel'
import { UGStore } from '../../../../redux/store/UGStore'
import { CapitalConst } from '../const/CapitalConst'

/**
 * 游戏大厅提现
 * @constructor
 */
const UseGameHall = () => {

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

export default UseGameHall

