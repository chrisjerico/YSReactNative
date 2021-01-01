import * as React from 'react'
import APIRouter from '../../../../public/network/APIRouter'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../../public/tools/ToastUtils'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import md5 from 'blueimp-md5'
import { useState } from 'react'

/**
 * 忘记密码
 * @constructor
 */
const UseForgetPassword = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const [bankCard, setBankCard] = useState(null) //银行卡
  const [phoneNumber, setPhoneNumber] = useState(null) //请输入手机号
  const [fundPassword, setFundPassword] = useState(null) //设置资金密码
  const [firstImage, setFirstImage] = useState(null) //设置第一张图片
  const [secondImage, setSecondImage] = useState(null) //设置第2张图片

  /**
   * 绑定密码
   */
  const bindPassword = async () => {
    if (anyEmpty(bankCard)) {
      Toast('请填写银行卡号')
      return
    } else if (anyEmpty(fundPassword)) {
      Toast('请输入您的4位数字提款密码')
      return
    }

    showLoading()
    const result = await APIRouter.user_applyCoinPwd({
      bankNo: bankCard,
      coinpwd: fundPassword,
      mobile: phoneNumber,
      identityPathDot: ''
    })

    hideLoading()

    if (result?.data?.code == 0) {
      Toast('设置密码成功')

      userInfo.hasFundPwd = true
      UGStore.dispatch({ type: 'merge', userInfo: { hasFundPwd: true } })
      UGStore.save()

    } else {
      Toast(result?.data?.msg)
    }

    return result?.data?.code
  }

  return {
    userInfo,
    systemInfo,
    bankCard,
    setBankCard,
    fundPassword,
    setFundPassword,
    firstImage,
    setFirstImage,
    secondImage,
    setSecondImage,
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

export default UseForgetPassword
