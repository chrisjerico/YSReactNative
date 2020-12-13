import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { ugLog } from '../../../tools/UgLog'
import { anyEmpty, anyLength, arrayLength } from '../../../tools/Ext'
import { ManageBankCardData } from '../../../network/Model/act/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { BankDetailListData, BankDetailListModel } from '../../../network/Model/bank/BankDetailListModel'
import { BankConst } from '../const/BankConst'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../tools/ToastUtils'
import { hideLoading, showLoading } from '../../../widget/UGLoadingCP'

/**
 * 银行卡管理
 * @constructor
 */
const UseAddBank = () => {

  /**
   * 用户信息
   */
  const userInfo = UGStore.globalProps.userInfo

  /**
   * 银行账户类似
   */
  const [bankDetailData, setBankDetailData] = useState<BankDetailListModel>(null)

  /**
   * 虚拟币类型
   */
  const [btcDetailData, setBtcDetailData] = useState<BankDetailListModel>(null)

  /**
   * 链类型
   */
  const [chainData, setChainData] = useState<[string]>(null)

  /**
   * 银行有哪些
   */
  const [bankDetailItems, setBankDetailItems] = useState(null)

  /**
   * 虚拟币有哪些
   */
  const [btcDetailItems, setBtcDetailItems] = useState(null)

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestBankDetailData(BankConst.BANK)
    requestBankDetailData(BankConst.BTC)
    // requestLogData("0")
  }, [])

  /**
   * 请求申请彩金数据
   * @param category 定义在 BankConst
   */
  const requestBankDetailData = async (category?: string) => {
    APIRouter.user_bankInfoList(category).then(({ data: res }) => {
      if (category == BankConst.BANK) {
        setBankDetailData(res)
        !anyEmpty(res?.data) && setBankDetailItems(res?.data?.map(
          (item, index) =>
            ({ label: item.name, value: item.id })))

      } else if (category == BankConst.BTC) {
        setBtcDetailData(res)
        !anyEmpty(res?.data) && setBtcDetailItems(res?.data?.map(
          (item, index) =>
            ({ label: item.name, value: item.id })))

      }
    }).finally(() => {
    })
  }


// * @param accountType 银行卡或者虚拟币账户
//   * @param subType 哪个银行
//   * @param addr 地址
//   * @param cardNumber 卡号
//   * @param chain 链地址
//   * @param wxNumber 微信账号
//   * @param phone 手机账号
//   * @param aliNumber 阿里账户

  /**
   * 添加银行卡或者虚拟币账户
   *
   * @param accountType 账户类型
   * @param bankParams 银行相关参数
   * @param btcParams 虚拟币相关参数
   * @param wxParams 微信相关参数
   * @param aliParams 阿里相关参数
   */
  const addBankAccount = (accountType?: string, //账户类型
                          bankParams?: {
                            bank_id?: string,//哪个银行
                            bank_card?: string, //银行卡号
                            bank_addr?: string, //地址
                            pwd?: string, //密码
                          },
                          btcParams?: {
                            bank_id?: string,//哪种币
                            bank_card?: string, //虚拟币收款地址
                            bank_addr?: string, // 链地址
                          },
                          wxParams?: {
                            bank_card?: string, //微信号
                            bank_addr?: string, //微信手机号
                          },
                          aliParams?: {
                            bank_card?: string, //阿里账号
                          }) => {
    let params = null

    switch (accountType) {
      case BankConst.BANK:
        if (anyEmpty(bankParams?.bank_addr)) {
          Toast('请输入您的银行卡开户行地址')
          return
        } else if (anyEmpty(bankParams?.bank_card)) {
          Toast('请输入您的银行卡卡号')
          return
        } else {
          params = {
            type: accountType,
            owner_name: userInfo?.fullName,
            ...bankParams,
          }
        }
        break
      case BankConst.BTC:
        if (anyEmpty(bankParams?.bank_card)) {
          Toast('请输入您的虚拟币收款钱包地址')
          return
        } else {
          params = {
            type: accountType,
            ...btcParams,
          }
        }
        break
      case BankConst.WX:
        if (anyEmpty(bankParams?.bank_card)) {
          Toast('请输入微信号')
          return
        } else if (!anyEmpty(wxParams?.bank_addr) && anyLength(wxParams?.bank_addr) < 11) {
          Toast('请输入11位手机号码')
          return
        } else {
          params = {
            type: accountType,
            bank_card: wxParams.bank_card,
            bank_addr: wxParams.bank_addr,
          }
        }
        break
      case BankConst.ALI:
        if (anyEmpty(bankParams?.bank_card)) {
          Toast('请输入您的支付宝账号')
          return
        } else {
          params = {
            type: accountType,
            bank_card: aliParams?.bank_card,
          }
        }
        break
    }

    if (!anyEmpty(params)) return

    showLoading()
    APIRouter.user_addBank(params).then((result) => {

    }).finally(() => {
      hideLoading()
    })

  }

  return {
    userInfo,
    bankDetailData,
    btcDetailData,
    bankDetailItems,
    btcDetailItems,
    requestBankDetailData,
  }
}

export default UseAddBank
