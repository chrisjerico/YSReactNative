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
import { BankConst } from '../../../../bank/const/BankConst'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { BankDetailListData, BankDetailListModel } from '../../../../../public/network/Model/bank/BankDetailListModel'

/**
 * 银行卡管理
 * @constructor
 */
const UseWithdraw = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const [bankCardData, setBankCardData] = useState<ManageBankCardData>(null) //所有数据
  const [bankInfoParamList, setBankInfoParamList] = useState<Array<BankInfoParam>>(null) //所有数据组合的新列表
  const [menuItem, setMenuItem] = useState<Array<IMiddleMenuItem>>(null) //所以菜单列表
  const [curBank, setCurBank] = useState<BankInfoParam>(null) //选择了银行、微信、支付宝、虚拟币里面的哪个
  const [btcDetailData, setBtcDetailData] = useState<Array<BankDetailListData>>(null) //虚拟币类型
  const [withdrawType, setWithdrawType] = useState(0) //当前 余额取款 0 还是 余额宝取款 1
  const [newRate, setNewRate] = useState(1) //新计算的汇率
  const [newUsd, setNewUsd] = useState(1) //新计算的1比1美元
  const [btcMoney, setBtcMoney] = useState(0) //btc金额
  const [inputMoney, setInputMoney] = useState(null) //取款金额


  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData()
  }, [])

  useEffect(() =>{
    //切换标签刷新汇率
    requestBankDetailData(BankConst.BTC)
  }, [withdrawType])

  useEffect(() =>{
    rateMoney()
  }, [btcDetailData, curBank])

  useEffect(() => {
    //只有虚拟币才计算
    if(curBank?.type != BankConst.BTC) {
      setBtcMoney(0)
      return
    }
    const money = Math.round(inputMoney * 100 * newRate) / 100
    setBtcMoney(money)
  }, [inputMoney])

  /**
   * 请求增加银行和虚拟币类型数据
   * @param category 定义在 BankConst
   */
  const requestBankDetailData = async (category?: string) => {
    APIRouter.user_bankInfoList(category).then(({ data: res }) => {
      //ugLog('requestBankDetailData=', JSON.stringify(res?.data))
      if (res?.code == 0) {
        setBtcDetailData(res?.data)
      } else {
        Toast(res?.msg)
      }
    })
  }

  /**
   * 计算当前的汇率
   * 汇率 * ( 1 + 浮动汇率 / 100 ) = 结果
   * 为保证精度不丢失，对数据放大 10000倍 再缩小
   */
  const rateMoney = () => {
    if(curBank?.type != BankConst.BTC) return
    //当前是哪个币
    //ugLog('rateMoney curBank=', JSON.stringify(curBank))
    const curBtc = btcDetailData?.find((item) => item.code == curBank?.bankCode)
    //ugLog('curbtc=', JSON.stringify(curBtc))
    if (curBtc?.code == 'CGP') {
      setNewRate(1)
      setNewUsd(1)
    } else {

      // const convertRate = Number(channel?.currencyRate) //原始汇率
      const floatRate = Number(curBtc?.rate) //浮动汇率
      let newRate = Math.round((Number(curBtc?.currencyRate) * 10000) * (100 + floatRate))
      newRate /= 10000 * 100

      if(newRate <= 0) return 1

      setNewRate(newRate)

      let usd = Math.round(100 / newRate)/100
      //ugLog('1比1美元 汇率=', curBtc?.currencyRate, newRate, usd)
      setNewUsd(usd)
    }
  }

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


    })
  }


  return {
    userInfo,
    systemInfo,
    bankCardData,
    bankInfoParamList,
    menuItem,
    curBank,
    setCurBank,
    withdrawType,
    setWithdrawType,
    newUsd,
    btcMoney,
    inputMoney,
    setInputMoney,
  }
}

export default UseWithdraw
