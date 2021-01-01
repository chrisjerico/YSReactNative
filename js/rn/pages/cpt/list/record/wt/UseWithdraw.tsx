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
import { hideLoading, showLoading } from '../../../../../public/widget/UGLoadingCP'
import { pop } from '../../../../../public/navigation/RootNavigation'

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
  const [bankPassword, setBankPassword] = useState(null) //请输入您的提款密码
  const [showAddBank, setShowAddBank] = useState(false) //是否显示添加银行卡等帐户


  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestManageBankData()
  }, [])

  /**
   * 切换标签刷新汇率
   */
  useEffect(() => {
    requestBankDetailData(BankConst.BTC)
  }, [withdrawType])

  /**
   * 根据当前选项计算汇率
   */
  useEffect(() => {
    rateMoney()
  }, [btcDetailData, curBank])

  useEffect(() => {
    //只有虚拟币才计算
    if (curBank?.type != BankConst.BTC) {
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
    if (curBank?.type != BankConst.BTC) return
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

      if (newRate <= 0) return 1

      setNewRate(newRate)

      let usd = Math.round(100 / newRate) / 100
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
      ugLog('requestManageBankData data 2 res=', JSON.stringify(actData))

      if (anyEmpty(actData?.allAccountList)) return

      //过滤不显示的
      actData.allAccountList = actData?.allAccountList?.filter((item) => item.isshow)


      ugLog('requestManageBankData actData.allAccountList=', JSON.stringify(actData.allAccountList))

      let bankItems = new Array<BankInfoParam>()
      actData?.allAccountList?.map(
        (bkItem, index) =>
          bkItem?.data == null ?
            [] :
            bkItem?.data?.map((item) => {
              item.parentTypeName = bkItem?.name
              return item
            }),
      )?.map((item) =>
        bankItems = [...bankItems, ...item],
      )

      setBankInfoParamList(bankItems)

      ugLog('requestManageBankData bankItems=', JSON.stringify(bankItems))
      setShowAddBank(anyEmpty(bankItems))

      //缓存列表显示选项
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
      setBankCardData(actData)

    })
  }

  /**
   * 请求余额提现到银行卡
   */
  const confirmWithdraw = async () => {
    if (anyEmpty(inputMoney)) {
      Toast('请输入金额')
      return
    } else if (anyEmpty(bankPassword)) {
      Toast('请输入密码')
      return
    }

    showLoading()
    const res = await APIRouter.withdraw_apply({
      money: inputMoney,
      pwd: md5(bankPassword),
      id: curBank?.id,
      virtual_amount: curBank?.type != BankConst.BTC ? '' : btcMoney?.toString(),
    }).then(({ data: res }) => res)
    hideLoading()
    Toast(res?.msg)

    return res?.code
  }

  /**
   * 请求余额宝 转到 余额
   */
  const yueBao2YuE = async () => {
    if (anyEmpty(inputMoney)) {
      Toast('请输入金额')
      return
    } else if (anyEmpty(bankPassword)) {
      Toast('请输入密码')
      return
    }

    showLoading()
    const res = await APIRouter.yuebao_transfer({
      money: inputMoney,
      pwd: md5(bankPassword),
      inOrOut: 'out',
    }).then(({ data: res }) => res)
    hideLoading()
    Toast(res?.msg)

    return res?.code
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
    bankPassword,
    setBankPassword,
    showAddBank,
    requestManageBankData,
    confirmWithdraw,
    yueBao2YuE,
  }
}

export default UseWithdraw
