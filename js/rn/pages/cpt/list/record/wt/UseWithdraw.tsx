import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import md5 from 'blueimp-md5'
import { UGStore } from '../../../../../redux/store/UGStore'
import { ManageBankCardData } from '../../../../../public/network/Model/bank/ManageBankCardModel'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import FastImage from 'react-native-fast-image'
import { getBankIcon } from '../../../../bank/list/UseManageBankList'
import { ugLog } from '../../../../../public/tools/UgLog'

/**
 * 银行卡管理
 * @constructor
 */
const UseWithdraw = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  //所有数据
  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null)


  /**
   * 请求银行列表数据
   */
  const requestManageBankData = async () => {
    APIRouter.user_bankCardList().then(({ data: res }) => {
      let actData = res?.data
      //ugLog('requestManageBankData data res=', JSON.stringify(res?.data))

      if(anyEmpty(actData?.allAccountList)) return

      actData.allAccountList = actData?.allAccountList?.filter((item) => item.isshow)
      actData.allAccountList?.map((item) => {

      })

      setBankCardData(actData)

      // let accountTypes = actData.allAccountList.map(
      //   (item, index) =>
      //     ({
      //       label: item.name, value: item.type, icon: () => <FastImage source={getBankIcon(item.type.toString())}
      //                                                                  resizeMode={'contain'}
      //                                                                  style={_styles.bank_name_icon}/>,
      //     }))
      // !anyEmpty(bankList) && setAccountItems(accountTypes)


    }).finally(() => {
    })
  }

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData()
  }, [])


  return {
    userInfo,
    systemInfo,
    bankCardData,
  }
}

export default UseWithdraw
