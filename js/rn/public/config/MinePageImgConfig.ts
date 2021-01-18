import { UGImageHost, useHtml5Image } from '../tools/tars'
const { getHtml5Image } = useHtml5Image(UGImageHost.test10)

export const MinePageImgConfig = {
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(3, 'center/bank'), // 银行卡管理
    4: getHtml5Image(3, 'center/syb3'), // 利息宝
    5: getHtml5Image(3, 'center/menu-myreco'), // 推荐收益
    6: getHtml5Image(3, 'center/menu-rule-1'), // 彩票注单记录
    7: getHtml5Image(3, 'center/menu-account'), // 其他注单记录
    8: getHtml5Image(3, 'center/menu-transfer'), // 额度转换
    9: getHtml5Image(3, 'center/menu-notice'), // 站内信
    10: getHtml5Image(3, 'center/menu-password'), // 安全中心
    11: getHtml5Image(3, 'center/task'), // 任务中心
    12: getHtml5Image(3, 'center/userInf'), // 个人信息
    13: getHtml5Image(3, 'center/menu-feedback'), // 建议反馈
    14: getHtml5Image(3, 'center/menu-feedback'), // 在线客服
    15: getHtml5Image(3, 'center/money'), // 活动彩金
    16: getHtml5Image(3, 'center/menu-feedback'), // 长龙助手
    17: getHtml5Image(3, 'center/menu-activity'), // 全民竞猜
    18: 'http://test61d.fhptcdn.com/images/kj_trend.png', // 开奖走势
    19: getHtml5Image(3, 'center/menu-feedback'), // QQ客服
    20: getHtml5Image(3, 'center/menu-feedback'), // 開獎網
  },
}

