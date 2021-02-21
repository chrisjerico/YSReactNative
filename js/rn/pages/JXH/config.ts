import { UGImageHost, useHtml5Image } from '../../Res/icon'
const { getHtml5Image, img_platform, img_mobileTemplate } = useHtml5Image(UGImageHost.test10)

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(18, 'bank'), // 银行卡管理
    4: getHtml5Image(18, 'syb3-1'), // 利息宝
    5: getHtml5Image(18, 'menu-myreco'), // 推荐收益
    6: getHtml5Image(18, 'menu-rule'), // 彩票注单记录
    7: getHtml5Image(18, 'menu-rule'), // 其他注单记录
    8: getHtml5Image(18, 'menu-transfer'), // 额度转换
    9: getHtml5Image(18, 'menu-message'), // 站内信
    10: getHtml5Image(18, 'menu-password'), // 安全中心
    11: getHtml5Image(18, 'task'), // 任务中心
    12: getHtml5Image(18, 'userInf'), // 个人信息
    13: getHtml5Image(18, 'menu-feedback'), // 建议反馈
    14: img_platform('c087', 'zxkf'), // 在线客服 X
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: img_platform('c092', 'changlong_logo'), // 长龙助手
    17: getHtml5Image(18, 'menu-activity'), // 全民竞猜
    18: getHtml5Image(18, 'kj_trend'), // 开奖走势
    19: img_platform('c091', 'qqkf'), // QQ客服
    20: img_platform('c006', 'kjw'), // 開獎網
  },

  homeBg:img_mobileTemplate(18, 'bg-black')
}

export default config
