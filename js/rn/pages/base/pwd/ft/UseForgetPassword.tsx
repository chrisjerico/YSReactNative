import * as React from 'react'
import APIRouter from '../../../../public/network/APIRouter'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../../public/tools/ToastUtils'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import md5 from 'blueimp-md5'
import { useEffect, useState } from 'react'
import { ugLog } from '../../../../public/tools/UgLog'
import { pop } from '../../../../public/navigation/RootNavigation'

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
  const [firstImage, setFirstImage] = useState<IUploadIdentify>(null) //设置第一张图片
  const [secondImage, setSecondImage] = useState<IUploadIdentify>(null) //设置第2张图片
  const [countDown, setCountDown] = useState(-1) //倒计时次数
  const [startCount, setStartCount] = useState(false) //是否开始倒计时

  /**
   * 倒计时
   */
  useEffect(() => {
    let timer
    if(startCount) {
      timer = setInterval(()=>{
        setCountDown( n => {
          if (n <= 0) {
            setStartCount(false)
            clearInterval(timer)
          }

          return n - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [startCount])

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
      (firstImage == null || secondImage == null)) {
      Toast('请上传身份证的正反面图片')
      return
    }

    showLoading()
    const result = await APIRouter.user_applyCoinPwd({
      bankNo: bankCard,
      coinpwd: fundPassword,
      mobile: phoneNumber,
      smsCode: smsNumber,
      identityPathDot: `${firstImage?.path},${secondImage?.path}`
    })

    hideLoading()

    if (result?.data?.code == 0) {
      Toast('提交成功，请等待审核...')
      pop()
    } else {
      Toast(result?.data?.msg)
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
        setSmsNumber(null)
        setCountDown(60)
        setStartCount(true)
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
    countDown,
    startCount,
    bindPassword,
    sendSmsCode,
  }
}

export default UseForgetPassword
