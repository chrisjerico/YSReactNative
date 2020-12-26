import { useEffect, useState } from 'react'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import { anyEmpty, anyLength, arrayLength } from '../../../public/tools/Ext'
import { AllAccountListData, ManageBankCardData } from '../../../public/network/Model/bank/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP'
import { Toast } from '../../../public/tools/ToastUtils'
import { pop } from '../../../public/navigation/RootNavigation'
import { BankConst } from '../const/BankConst'

/**
 * 银行卡管理
 * @constructor
 */
const UseManageBankList = () => {

  const [refreshing, setRefreshing] = useState(false)

  //tab分类数据
  const [categoryData, setCategoryData] = useState<AllAccountListData[]>(null)

  //所有数据
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setRefreshing(true)
                                      requestManageBankData(null)
                                    }}/>

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData(null)
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

      actData?.allAccountList?.map((item) => {
        //0和null不限制
        // ugLog('Number(item.number)=', Number(item.number), item.number)
        if (Number(item.number) <= 0) {
          item.number = '999'
        } else if(arrayLength(item.data) > Number(item.number)) {
          //避免在全部里面数量计算出现偏差
          item.number = arrayLength(item.data).toString()
        }
        // ugLog('Number(item.number)2=', item.name, Number(item.number), item.number, arrayLength(item.data), arrayLength(item.data) < Number(item.number))
      })

      actData.allAccountList = actData?.allAccountList?.filter((item) => item.isshow)

      setBankCardData(actData)
      generateListData(actData)
    }).finally(() => {
      setRefreshing(false)
    })
  }

  /**
   * 生成tab数据
   */
  let generateListData = (data?: ManageBankCardData) => {
    let actListData = data?.allAccountList
    if (anyEmpty(actListData)) return

    const tabAll: AllAccountListData = {
      type: 0,
      isshow: true,
      number: '0',
      name: '全部',
      data: [],
    }

    actListData?.map((item, index) => {
      if (!anyEmpty(item.data)) {

        tabAll.data = tabAll.data.concat(item.data)
        tabAll.number = (Number(tabAll.number) + Number(item.number)).toString()

        //ugLog('tabNumber2=', tabAll.number, item.number)
      }
    })

    setCategoryData([tabAll, ...actListData])
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

/**
 * 得到图标
 * @param type
 */
const getBankIcon = (type?: string): {} => {
  switch (type) {
    case BankConst.BANK:
      return { uri: Res.bankhl1 }
    case BankConst.ALI:
      return { uri: Res.zfb_icon }
    case BankConst.WX:
      return { uri: Res.wechatpay_icon }
    case BankConst.BTC:
      return { uri: Res.btc }
    default:
      return null
  }
}

export default UseManageBankList
export { getBankIcon }

