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

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setRefreshing(true)
                                      requestManageBankData('0')
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData(null)
    setCategoryData(Object.values(CapitalConst))
    // requestLogData("0")
  }, [])

  /**
   * 请求账户类型数据
   * @param category 分类
   */
  const requestManageBankData = async (category?: string) => {
    setRefreshing(true)
    APIRouter.user_bankCardList().then(({ data: res }) => {
      let actData = res?.data
      if(anyEmpty(actData?.allAccountList)) return

      actData.allAccountList = actData?.allAccountList?.filter((item) => item.isshow)
      setBankCardData(actData)
    }).finally(() => {
      setRefreshing(false)
    })
  }

  /**
   * 绑定实名
   * @param fullName 真名
   * @param callBack
   */
  const bindRealName = async (fullName?: string, callBack?: () => void) => {
    if (anyEmpty(fullName)) return

    showLoading()
    APIRouter.user_bindRealName({ fullName: fullName }).then((result) => {
      if (result?.data?.code == 0) {
        userInfo.fullName = fullName
        UGStore.dispatch({type: 'merge', userInfo: { fullName: fullName }});
        UGStore.save();
        callBack && callBack()

      } else {
        Toast(result?.data?.msg)
      }
    }).finally(() => {
      hideLoading()
    })
  }

  return {
    systemInfo,
    userInfo,
    categoryData,
    refreshCT,
    bankCardData,
    requestManageBankData,
    bindRealName,
  }
}

export default UseCapitalList

