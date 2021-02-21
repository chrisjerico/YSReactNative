import { img_assets, UGImageHost, useHtml5Image } from '../../Res/icon'

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
    21: img_assets('zdgl@2x'), // UCI_未结注单
    22: img_assets('zdgl@2x'), // UCI_电子注单
    23: img_assets('zdgl@2x'), // UCI_真人注单
    24: img_assets('zdgl@2x'), // UCI_棋牌注单 
    25: img_assets('zdgl@2x'), // UCI_捕鱼注单
    26: img_assets('zdgl@2x'), // UCI_电竞注单
    27: img_assets('zdgl@2x'), // UCI_体育注单
    28: img_assets('zdgl@2x'), // UCI_UG注单
    29: img_assets('zdgl@2x'), // UCI_已结注单
    30: img_assets('chongzhi@2x'), // UCI_充值纪录
    31: img_assets('chongzhi@2x'), // UCI_提现纪录
    32: img_assets('chongzhi@2x'), // UCI_资金明细
    33: img_assets('zdgl@2x'), // UCI_活动大厅
    34: img_assets('weChat_icon'), // 聊天室
    35: img_assets('invi@2x'), // UCI_我的关注
    36: img_assets('friend'), // UCI_我的动态
    37: img_assets('fans'), // UCI_我的粉丝

  },
}

