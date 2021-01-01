import * as React from 'react'
import APIRouter from '../../../../public/network/APIRouter'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGStore } from '../../../../redux/store/UGStore'
import { Toast } from '../../../../public/tools/ToastUtils'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import md5 from 'blueimp-md5'

/**
 * 忘记密码
 * @constructor
 */
const UseForgetPassword = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

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
        Toast('设置密码成功')

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
