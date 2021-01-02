import * as React from 'react'
import APIRouter from '../../../../public/network/APIRouter'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../../public/tools/ToastUtils'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import md5 from 'blueimp-md5'
import { useState } from 'react'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 忘记密码
 * @constructor
 */
const UseForgetPassword = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const [bankCard, setBankCard] = useState(null) //银行卡
  const [phoneNumber, setPhoneNumber] = useState(null) //请输入手机号
  const [smsNumber, setSmsNumber] = useState(null) //请输入手机号验证码
  const [fundPassword, setFundPassword] = useState(null) //设置资金密码
  const [firstImage, setFirstImage] = useState(null) //设置第一张图片
  const [secondImage, setSecondImage] = useState(null) //设置第2张图片

  /**
   * 绑定密码
   */
  const bindPassword = async () => {
    if (systemInfo?.coinPwdAuditOptionAry?.includes('bank') &&
      anyEmpty(bankCard)) {
      Toast('请填写银行卡号')
      return
    } else if (systemInfo?.coinPwdAuditOptionAry?.includes('mobile') &&
      anyEmpty(phoneNumber)) {
      Toast('请填写手机号')
      return
    } else if (anyEmpty(fundPassword)) {
      Toast('请输入您的4位数字提款密码')
      return
    } else if (systemInfo?.coinPwdAuditOptionAry?.includes('id') &&
      (anyEmpty(firstImage) || anyEmpty(secondImage))) {
      Toast('请上传身份证的正反面图片')
      return
    }

    showLoading()
    const result = await APIRouter.user_applyCoinPwd({
      bankNo: bankCard,
      coinpwd: fundPassword,
      mobile: phoneNumber,
      smsCode: smsNumber,
      identityPathDot: `${firstImage},${secondImage}`
    })

    hideLoading()

    Toast(result?.data?.msg)
    ugLog('result?.data = ', result?.data)
    if (result?.data?.code == 0) {

    }

    return result?.data?.code
  }

  /**
   * 发送短信验证码
   */
  const sendSmsCode = () => {
    if (systemInfo?.coinPwdAuditOptionAry?.includes('mobile') &&
      anyEmpty(phoneNumber)) {
      Toast('请填写手机号')
      return
    }

    showLoading()
    APIRouter.secure_smsCaptcha(phoneNumber, 'changeCoinPwd').then(res => {
      ugLog('result?.data = ', res?.data)
      Toast(res?.data?.msg)
      if (res?.data?.code == 0) {

      }

    }).finally(() => {
      hideLoading()
    })
  }

  return {
    userInfo,
    systemInfo,
    bankCard,
    setBankCard,
    phoneNumber,
    setPhoneNumber,
    smsNumber,
    setSmsNumber,
    fundPassword,
    setFundPassword,
    firstImage,
    setFirstImage,
    secondImage,
    setSecondImage,
    bindPassword,
    sendSmsCode,
  }
}

export default UseForgetPassword
