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
    22: getHtml5Image(23, 'center/electronic'), // 电子注单
    23: getHtml5Image(23, 'center/live'), // 真人注单
    24: getHtml5Image(23, 'center/chess'), // 棋牌注单
    25: getHtml5Image(25, 'by'), // 捕鱼注单
    26: getHtml5Image(23, 'center/vr'), // 电竞注单
    27: getHtml5Image(23, 'center/sport'), // 体育注单
    30: getHtml5Image(23, 'center/recharge_record'), // 存款纪录
    31: getHtml5Image(23, 'center/withdraw-order'), // 取款纪录
    32: getHtml5Image(23, 'center/account_bill'), // 资金明细
    33: getHtml5Image(23, 'center/activity_hall'), // 优惠活动
    34: getHtml5Image(23, 'center/my_chat'), // 聊天室
    35: img_assets('invi@2x'), // UCI_我的关注
    36: img_assets('friend'), // UCI_我的动态
    37: img_assets('fans'), // UCI_我的粉丝
  
  },
}

export default config
