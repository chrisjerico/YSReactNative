import { UGStore } from '../../../redux/store/UGStore'
import { LoginTo, Necessity, PasswordStrength, RankingListType } from '../../models/Enum'
import { stringToNumber } from '../../tools/tars'

interface UseSys {
  defaultUserCenterLogos?: DefaultUserCenterLogos
}

interface DefaultUserCenterLogos {
  1: string // 存款
  2: string // 取款
  3: string // 银行卡管理
  4: string // 利息宝
  5: string // 推荐收益
  6: string // 彩票注单记录
  7: string // 其他注单记录
  8: string // 额度转换
  9: string // 站内信
  10: string // 安全中心
  11: string // 任务中心
  12: string // 个人信息
  13: string // 建议反馈
  14: string // 在线客服
  15: string // 活动彩金
  16: string // 长龙助手
  17: string // 全民竞猜
  18: string // 开奖走势
  19: string // QQ客服
}

const getOption = (reg: string) => {
  switch (reg) {
    case '0':
      return Necessity.隱藏
    case '1':
      return Necessity.选填
    case '2':
      return Necessity.必填
    default:
      return Necessity.隱藏
  }
}

const getPasswordStrength = (pass_limit: string) => {
  switch (pass_limit) {
    case '0':
      return PasswordStrength.不限制
    case '1':
      return PasswordStrength.数字字母
    case '2':
      return PasswordStrength.数字字母字符
    default:
      return PasswordStrength.不限制
  }
}

const useSysInfo = ({ defaultUserCenterLogos }: UseSys) => {
  const sysStore = UGStore.globalProps.sys
  const sysInfo = {
    ...sysStore,
    showCoupon: sysStore?.m_promote_pos == '1' ? true : false,
    rankingListType: sysStore?.rankingListSwitch ? (sysStore?.rankingListSwitch == 1 ? RankingListType.中奖排行榜 : RankingListType.投注排行榜) : RankingListType.不顯示,
    midBannerTimer: stringToNumber(sysStore?.adSliderTimer),
    loginTo: stringToNumber(sysStore?.login_to) ? LoginTo.首页 : LoginTo.我的页,
    showSign: sysStore.checkinSwitch == '1' ? true : false,
    necessity: {
      recommendGuy: getOption(sysStore?.hide_reco),
      name: getOption(sysStore?.reg_name),
      fundPassword: getOption(sysStore?.reg_fundpwd),
      qq: getOption(sysStore?.reg_qq),
      wx: getOption(sysStore?.reg_wx),
      phoneNumber: getOption(sysStore?.reg_phone),
      email: getOption(sysStore?.reg_email),
      agentButton: sysStore?.agentRegbutton == '1' ? Necessity.必填 : Necessity.隱藏,
      slideCode: sysStore?.reg_vcode == 2 ? Necessity.必填 : Necessity.隱藏,
      sms: sysStore?.smsVerify == '1' ? Necessity.必填 : Necessity.隱藏,
    },
    userCenterItems:
      sysStore?.userCenter
        ?.map((item) => {
          const { code, sorts, logo } = item ?? {}
          return Object.assign({}, item, {
            code: stringToNumber(code),
            sorts: stringToNumber(sorts),
            logo: (logo?.length == 0 || !logo ? defaultUserCenterLogos?.[stringToNumber(code)] : logo) ?? '',
          })
        })
        ?.filter((item) => item.code <= 20) ?? [],
    passwordLimit: {
      strength: getPasswordStrength(sysStore?.pass_limit),
      maxLength: stringToNumber(sysStore?.pass_length_max),
      minLength: stringToNumber(sysStore?.pass_length_min),
    },
    currency: sysStore?.currency == 'CNY' ? 'RMB' : sysStore?.currency,
  }
  return {
    sysInfo,
  }
}

export default useSysInfo
