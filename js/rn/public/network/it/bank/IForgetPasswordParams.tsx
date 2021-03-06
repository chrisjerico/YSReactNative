/**
 * 忘记密码
 * bankNo 银行卡号
 * coinpwd 密码
 * mobile 手机号
 * smsCode 验证码
 * identityPathDot 身份证正反面图片
 */
interface IForgetPasswordParams {
  bankNo?: string
  coinpwd?: string
  mobile?: string
  smsCode?: string
  identityPathDot?: string
}
