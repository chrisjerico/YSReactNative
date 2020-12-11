import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'
import { ugLog } from '../../tools/UgLog'
import { anyEmpty, anyLength } from '../../tools/Ext'
import { ManageBankCardData } from '../../network/Model/act/ManageBankCardModel'

/**
 * 银行卡管理
 * @constructor
 */
const UseManageBankList = () => {

  // const [listData, setListData] = useState(null)
  // const [categoryData, setCategoryData] = useState(null)
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData("0")
    // requestLogData("0")
  },[])

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestManageBankData = async (category: string) => {
    APIRouter.user_bankCardList().then(({ data: res }) => {
      // setListData(anyLength(res?.data?.allAccountList) ? null : res?.data?.allAccountList[0])
      // setCategoryData(res?.data)
      ugLog('requestManageBankData=', res?.data)
      setBankCardData(res?.data)
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

  return {
    bankCardData,
    requestManageBankData,
    // requestLogData,
  }
}

export default UseManageBankList
