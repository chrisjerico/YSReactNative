import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import md5 from 'blueimp-md5'
import { UGStore } from '../../../../../redux/store/UGStore'
import { BankInfoParam, ManageBankCardData } from '../../../../../public/network/Model/bank/ManageBankCardModel'
import APIRouter from '../../../../../public/network/APIRouter'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import FastImage from 'react-native-fast-image'
import { getBankIcon } from '../../../../bank/list/UseManageBankList'
import { ugLog } from '../../../../../public/tools/UgLog'
import { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'

/**
 * 银行卡管理
 * @constructor
 */
const UseWithdraw = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null) //所有数据
  const [bankInfoParamList, setBankInfoParamList] = useState<Array<BankInfoParam>>(null) //所以数据组合的新列表
  const [menuItem, setMenuItem] = useState<Array<IMiddleMenuItem>>(null) //所以菜单列表


  /**
   * 请求银行列表数据
   */
  const requestManageBankData = async () => {
    APIRouter.user_bankCardList().then(({ data: res }) => {
      let actData = res?.data
      //ugLog('requestManageBankData data res=', JSON.stringify(res?.data))

      if (anyEmpty(actData?.allAccountList)) return

      //过滤不显示的
      actData.allAccountList = actData?.allAccountList?.filter((item) => item.isshow)

      let bankItems = new Array<BankInfoParam>()
      actData?.allAccountList?.map(
        (bkItem, index) =>
          bkItem?.data?.map((item) => {
            item.parentTypeName = bkItem?.name
            return item
          }),
      ).map((item) =>
        bankItems = [...bankItems, ...item],
      )

      setBankInfoParamList(bankItems)

      const menu = bankItems?.map((item) => {
        return (
          ({
            title: `${item.parentTypeName} (${item.bankName}, ${item.ownerName})`,
            subTitle: `${item.bankCard}`,
            icon: getBankIcon(item.type.toString())?.uri,
          })
        )
      })
      setMenuItem(menu)

      //
      // let bankItems = []
      // bankCardData?.allAccountList?.map(
      //   (bkItem, index) =>
      //     bkItem?.data?.map((item) => {
      //       item.parentTypeName = bkItem?.name
      //       return (
      //         ({
      //           title: `${bkItem.name} (${item.bankName}, ${item.ownerName})`,
      //           subTitle: `${item.bankCard}`,
      //           id: `${bkItem.name} (${item.bankName}, ${item.bankCard}, ${item.ownerName})`,
      //           icon: getBankIcon(item.type.toString())?.uri,
      //         })
      //       )
      //     }),
      // ).map((item) =>
      //   bankItems = [...bankItems, ...item],
      // )
      // // ugLog('bankItems=', bankItems)
      // if (!anyEmpty(bankItems)) {
      //   setCurBank(bankItems[0])
      //   // refMenu?.current?.toggleMenu()
      // }
      //
      //
      // setBankItems(bankItems)


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
    bankInfoParamList,
    menuItem,
  }
}

export default UseWithdraw
