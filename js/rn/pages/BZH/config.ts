import { UGImageHost, useHtml5Image } from '../../Res/icon'
const { getHtml5Image, img_platform, img_assets } = useHtml5Image(UGImageHost.test10)

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(21, 'cqk'), // 存款
    2: getHtml5Image(21, 'tx'), // 取款
    3: getHtml5Image(23, 'center/bank'), // 银行卡管理
    4: getHtml5Image(21, 'center/syb3'), // 利息宝
    5: getHtml5Image(21, 'center/menu-myreco'), // 推荐收益
    6: getHtml5Image(21, 'center/menu-rule-1'), // 彩票注单记录
    7: getHtml5Image(21, 'center/menu-account'), // 其他注单记录
    8: img_assets('BZH/transferMoney'), // 额度转换
    9: getHtml5Image(21, 'center/menu-notice'), // 站内信
    10: getHtml5Image(21, 'center/menu-password'), // 安全中心
    11: getHtml5Image(21, 'center/task'), // 任务中心
    12: getHtml5Image(21, 'center/userInf'), // 个人信息
    13: getHtml5Image(21, 'center/menu-feedback'), // 建议反馈
    14: img_assets('BZH/service'), // 在线客服
    15: getHtml5Image(21, 'center/money'), // 活动彩金
    16: img_assets('BZH/long'), // 长龙助手
    17: getHtml5Image(21, 'center/menu-activity'), // 全民竞猜
    18: getHtml5Image(21, 'center/kj_trend'), // 开奖走势
    19: img_assets('BZH/qq'), // QQ客服
    20: img_assets('BZH/award'), // 開獎網
  },
}

export default config
