/**
 * 支付通道
 */
export interface PayAisleModel {
  code?: number
  msg?: string
  data?: PayAisleData
}

export interface PayAisleData {
  payment?: PayAisleListData[]
  quickAmount?: Array<string>
  depositPrompt?: string
  transferPrompt?: string
  rechargePopUpAlarmSwitch?: string //存款提示语是否打开
  rechargePopUpAlarmMsg?: string //存款提示语
}

export interface PayAisleListData {
  id?: string //alipay_online
  code?: string
  name?: string //支付宝转账
  sort?: string
  prompt?: string //"尊敬的会员为确保支付成功率，建议金额不要为10的整数倍！"
  tip?: string //<font color="#FF00FF">建议您转账金额带</font>
  prompt_pc?: string //"尊敬的会员为确保支付成功率，建议金额不要为10的整数倍！"
  copy_prompt?: string //"浏览器不支持复制,点击“复制”后请使用Ctrl+C或者鼠标右键菜单 "
  bank_sort_icon?: string
  type?: string
  recharge_alarm?: string //充值提示
  bankPayPrompt?: string //银行提示
  channel?: Array<PayChannelBean> //银行提示
  quickAmount?: string //银行提示
}

export interface PayChannelBean {
  id?: string
  account?: string
  payeeName?: string
  qrcode?: string
  domain?: string
  address?: string
  name?: string
  onlineType?: string
  rechType?: string
  branchAddress?: string
  para?: PayParaBean
  isSelect?: boolean
  maximum?: string
  mininum?: string
  fcomment?: string
  currencyRate?: string
}

export interface PayParaBean {
  fixedAmount?: string
  bankList?: Array<PayBankListBean>
}

export interface PayBankListBean {
  code?: string
  name?: string
  isSelect?: boolean
}
