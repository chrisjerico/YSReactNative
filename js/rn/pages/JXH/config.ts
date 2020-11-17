import { useHtml5Image, getIbbImage } from '../../public/tools/tars'
const { getHtml5Image } = useHtml5Image('http://test10.6yc.com/')

const config = {
  defaultUserCenterLogos: {
    1: getIbbImage('gZj6n42/money'), // 存款
    2: getIbbImage('gZj6n42/money'), // 取款
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
    14: getIbbImage('VjcSg8s/service'), // 在线客服
    15: getIbbImage('gmVTZvM/activity'), // 活动彩金
    16: getIbbImage('4YGRLbs/long'), // 长龙助手
    17: getHtml5Image(18, 'menu-activity'), // 全民竞猜
    18: getIbbImage('dt5ShBG/award'), // 开奖走势
    19: getIbbImage('NV1DZ3M/qq'), // QQ客服
    20: getIbbImage('qRBq508/kjw'), // 開獎網
  },
}

export default config
