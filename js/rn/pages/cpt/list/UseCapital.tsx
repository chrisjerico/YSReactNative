import * as React from 'react'
import { useEffect, useState } from 'react'
import { ManageBankCardData } from '../../../public/network/Model/bank/ManageBankCardModel'
import { UGStore } from '../../../redux/store/UGStore'
import { CapitalConst } from '../const/CapitalConst'
import APIRouter from '../../../public/network/APIRouter'
import { Data } from '../../../public/network/Model/YueBaoStatModel'
import { Data as UserData } from '../../../public/network/Model/UserInfoModel'
import UGUserModel from '../../../redux/model/全局/UGUserModel'

/**
 * 存款提现
 * @constructor
 */
const UseCapital = () => {

  const [refreshing, setRefreshing] = useState(false)

  //tab分类数据
  const [categoryData, setCategoryData] = useState<Array<string>>(null)

  //所有数据
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)

  //余额宝数据
  const [yueBaoData, setYueBaoData] = useState<Data>(null)

  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const userInfo = UGStore.globalProps.userInfo //个人信息

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    setCategoryData(Object.values(CapitalConst))
    requestYueBao()
  }, [])

  /**
   * 刷新余额和个人信息
   */
  const requestYueBao = () => {
    APIRouter.yuebao_stat().then(({data: res}) => {
      if (res?.code == 0) {
        setYueBaoData(res?.data)
      }
    })

    UGUserModel.updateFromNetwork()
  }

  return {
    systemInfo,
    userInfo,
    categoryData,
    bankCardData,
    yueBaoData,
    requestYueBao,
  }
}

export default UseCapital

