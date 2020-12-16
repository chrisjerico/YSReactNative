import { useEffect, useState } from 'react'
import APIRouter from '../../../network/APIRouter'
import { ugLog } from '../../../tools/UgLog'
import { anyEmpty, anyLength, arrayLength } from '../../../tools/Ext'
import { ManageBankCardData } from '../../../network/Model/bank/ManageBankCardModel'
import { RefreshControl } from 'react-native'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { BankDetailListData, BankDetailListModel } from '../../../network/Model/bank/BankDetailListModel'
import { BankConst } from '../const/BankConst'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../tools/ToastUtils'
import { hideLoading, showLoading } from '../../../widget/UGLoadingCP'
import md5 from 'blueimp-md5'
import { pop } from '../../../navigation/RootNavigation'

/**
 * 银行卡管理
 * @constructor
 */
const UseAddBank = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  /**
   * 银行账户类似
   */
  const [bankDetailData, setBankDetailData] = useState<BankDetailListModel>(null)

  /**
   * 虚拟币类型
   */
  const [btcDetailData, setBtcDetailData] = useState<BankDetailListModel>(null)

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
   * 请求增加银行和虚拟币类型数据
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

  /**
   * 添加银行卡或者虚拟币账户
   *
   *  参数含义备注在 IAddAccount
   *
   * @param curAccountType
   * @param curBankID
   * @param curBtcID
   * @param curChainValue
   * @param bankAddr
   * @param bankNumber
   * @param bankPassword
   * @param btcAddr
   * @param wxAccount
   * @param wxPhone
   * @param aliAccount
   */
  const addBankAccount = ({
                            curAccountType,
                            curBankID,
                            curBtcID,
                            curChainValue,
                            bankAddr,
                            bankNumber,
                            bankPassword,
                            btcAddr,
                            wxAccount,
                            wxPhone,
                            aliAccount,
                            callBack,
                          }: IAddAccount) => {
    let params = null

    switch (curAccountType.toString()) {
      case BankConst.BANK:
        if (anyEmpty(bankAddr)) {
          Toast('请输入您的银行卡开户行地址')
          return
        } else if (anyEmpty(bankNumber)) {
          Toast('请输入您的银行卡卡号')
          return
        } else if (systemInfo?.switchBindVerify == 1) {
          if (anyEmpty(bankPassword)) {
            Toast('请输入取款密码')
            return
          }
        } else {
          params = {
            type: curAccountType,
            bank_id: curBankID,
            bank_card: bankNumber,
            bank_addr: bankAddr,
            pwd: anyEmpty(bankPassword) ? null : md5(bankPassword),
            owner_name: userInfo?.fullName,
          }
        }
        break
      case BankConst.BTC:
        if (anyEmpty(btcAddr)) {
          Toast('请输入您的虚拟币收款钱包地址')
          return
        } else {
          params = {
            type: curAccountType,
            bank_id: curBtcID,
            bank_card: btcAddr,
            bank_addr: curChainValue,
          }
        }
        break
      case BankConst.WX:
        if (anyEmpty(wxAccount)) {
          Toast('请输入微信号')
          return
        } else if (!anyEmpty(wxPhone) && anyLength(wxPhone) < 11) {
          Toast('请输入11位手机号码')
          return
        } else {
          params = {
            type: curAccountType,
            bank_card: wxAccount,
            bank_addr: wxPhone,
          }
        }
        break
      case BankConst.ALI:
        if (anyEmpty(aliAccount)) {
          Toast('请输入您的支付宝账号')
          return
        } else {
          params = {
            type: curAccountType,
            bank_card: aliAccount,
          }
        }
        break
    }

    if (anyEmpty(params)) return

    showLoading()
    APIRouter.user_addBank(params).then((result) => {
      if (result?.data?.code == 0) {
        callBack && callBack()
        pop()
      } else {
        Toast(result?.data?.msg)
      }
    }).finally(() => {
      hideLoading()
    })

  }


  /**
   * 绑定密码
   * @param fullName 真名
   * @param callBack
   */
  const bindPassword = async ({
                                login_pwd,
                                fund_pwd,
                                fund_pwd2,
                                callBack,
                              }: IBindPassword) => {
    if (anyEmpty(login_pwd)) {
      Toast('请填写密码(至少6位数字加字母组合)')
      return
    } else if (anyEmpty(fund_pwd)) {
      Toast('请输入您的4位数字提款密码')
      return
    } else if (fund_pwd != fund_pwd2) {
      Toast('两次输入提款密码不一致')
      return
    }

    showLoading()
    APIRouter.user_bindPwd({
      login_pwd: md5(login_pwd),
      fund_pwd: md5(fund_pwd),
    }).then((result) => {
      if (result?.data?.code == 0) {
        userInfo.hasFundPwd = true
        UGStore.dispatch({ type: 'merge', userInfo: { hasFundPwd: true } })
        UGStore.save()
        callBack && callBack()

      } else {
        Toast(result?.data?.msg)
      }
    }).finally(() => {
      hideLoading()
    })
  }

  return {
    userInfo,
    systemInfo,
    bankDetailData,
    btcDetailData,
    bankDetailItems,
    btcDetailItems,
    requestBankDetailData,
    addBankAccount,
    bindPassword,
  }
}

/**
 * 绑定密码
 */
interface IBindPassword {
  login_pwd?: string, //登录密码
  fund_pwd?: string, //取款密码
  fund_pwd2?: string, //取款密码
  callBack?: () => void //成功回调
}

/**
 * 添加账户参数
 */
interface IAddAccount {
  curAccountType?: string, //账户类型 选择了银行、微信、支付宝、虚拟币
  curBankID?: string, //选择了哪个银行
  curBtcID?: string, //选择了哪个虚拟币
  curChainValue?: string, //选择了哪个链
  bankAddr?: string, //请输入您的银行卡开户地址
  bankNumber?: string, //请输入您的银行卡卡号
  bankPassword?: string, //请输入取款密码
  btcAddr?: string, //请输入您的虚拟币收款钱包地址
  wxAccount?: string, //请输入微信号
  wxPhone?: string, //请输入微信所绑定手机号
  aliAccount?: string, //请输入您的支付宝账号
  callBack?: () => void //成功回调
}

export default UseAddBank
