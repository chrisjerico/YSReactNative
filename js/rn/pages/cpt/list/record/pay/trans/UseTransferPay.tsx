import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../../public/network/Model/wd/DepositRecordModel'
import APIRouter from '../../../../../../public/network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../../public/tools/Ext'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { PayAisleData, PayAisleListData, PayChannelBean } from '../../../../../../public/network/Model/wd/PayAisleModel'
import { hideLoading, showLoading } from '../../../../../../public/widget/UGLoadingCP'

/**
 * 转账支付
 * @constructor
 */
const UseTransferPay = () => {

  const moneyOption = ['1', '10', '50', '100', '500', '1000', '5000', '10000', '50000', '100000'] //金额选项

  const [inputMoney, setInputMoney] = useState(null) //输入金额
  const [inputName, setInputName] = useState(null) //输入姓名
  const [inputRemark, setInputRemark] = useState(null) //输入备注
  const [selPayChannel, setSelPayChannel] = useState(0) //选择支付渠道

  /**
   * 开始存款
   */
  const requestPayData = async (params: IRechargeOfflineParams) => {
    if (!params?.amount) {
      Toast('请输入金额')
      return
    }

    ugLog('params=', JSON.stringify(params))
    showLoading()
    APIRouter.recharge_transfer(params).then(({ data: res }) => {
      //ugLog('data res=', JSON.stringify(res?.data))
      Toast(res?.msg)
      if (res?.code == 0) {


      }
    }).finally(() => {
      hideLoading()
    })
  }

  return {
    moneyOption,
    inputMoney,
    setInputMoney,
    inputName,
    setInputName,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
    transName,
    requestPayData,
  }
}


const TMP = {
  'bank_name': '姓名: ',
  'payee': '账号: ',
  'bank_account': '银行名称: ',
  'account_address': '支行名称: ',
  'type': 'other',
}

const BNK = {
  'bank_name': '银行名称: ',
  'payee': '收款人: ',
  'bank_account': '银行账号: ',
  'account_address': '开户地址: ',
  'type': 'bank',
}

const LB = {
  'bank_name': '银行名称: ',
  'payee': '收款人: ',
  'bank_account': '聊呗账号: ',
  'account_address': '开户地址: ',
  'type': 'bank',
}

/**
 * 转账提示语
 */
const transName = (payData?: PayAisleListData, payChannelBean?: PayChannelBean): ITransName => {
  let transInfo
  switch (payData?.id) {
    case 'bank_transfer'://"银行卡转账"
    case 'zfbzyhk_transfer'://支付宝转银行卡
    case 'ysf_transfer'://"云闪付扫码"
      transInfo = {
        ...BNK,
        'trans_hint': '请填写实际转账人姓名',
      }
      break
    case 'alipay_transfer'://"支付宝转账"
    case 'alihb_online'://支付宝红包支付
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的支付宝真实姓名',
      }
      break
    case 'tenpay_transfer'://"财付通转账"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的财付通用户昵称',
      }
      break
    case 'wechat_transfer'://"微信转账"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的微信用户昵称',
      }
      break
    case 'yxsm_transfer'://"易信扫码支付"
    case 'wxzfbsm_transfer'://"微信支付宝扫码"
    case 'wxzsm_transfer'://微信赞赏码支付
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的账号',
      }
      break
    case 'yunshanfu_transfer'://云闪付
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的云闪付用户昵称',
      }
      break
    case 'qqpay_transfer'://"QQ钱包转账"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的QQ钱包用户昵称',
      }
      break
    case 'wechat_alipay_transfer'://微信支付宝转账
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的微信支付宝用户昵称',
      }
      break
    case 'jdzz_transfer'://"京东钱包转账"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的京东钱包真实姓名',
      }
      break
    case 'ddhb_transfer'://钉钉红包
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的钉钉真实姓名',
      }
      break
    case 'dshb_transfer'://"多闪红包"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的多闪账号',
      }
      break
    case 'xlsm_transfer'://闲聊扫码
      transInfo = {
        ...TMP,
        'trans_hint': '请填写付款的闲聊账号',
      }
      break
    case 'wxsm_transfer'://"微信扫码"
      transInfo = {
        ...TMP,
        'trans_hint': '请填写微信昵称或商户单号后六位',
      }
      break
    case 'liaobei_transfer'://聊呗转账
      transInfo = {
        ...LB,
        'trans_hint': '请填写付款的聊呗用户昵称',
      }
  }

  //不同类型显示的顺序不一样
  if (transInfo?.type == 'bank') {
    transInfo.bank_name_des = payChannelBean?.address
    transInfo.payee_des = payChannelBean?.domain
    transInfo.bank_account_des = payChannelBean?.account
    transInfo.account_address_des = payChannelBean?.branchAddress
  } else {
    transInfo.bank_name_des = payChannelBean?.domain
    transInfo.payee_des = payChannelBean?.account
    transInfo.bank_account_des = payChannelBean?.address
    transInfo.account_address_des = payChannelBean?.branchAddress
  }

  return transInfo

}

/**
 * 转账提示语
 */
interface ITransName {
  bank_name: string,
  bank_name_des: string,
  payee: string,
  payee_des: string,
  bank_account: string,
  bank_account_des: string,
  account_address: string,
  account_address_des: string,
  trans_hint: string,
  type: string,//银行 还是 其它
}

export default UseTransferPay
export { ITransName }

