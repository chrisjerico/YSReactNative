import { goToUserCenterType } from '../../public/tools/tars'
import { UGImageHost, useHtml5Image } from '../../Res/icon'

const { getHtml5Image, img_platform, img_assets } = useHtml5Image(UGImageHost.t132f)

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(23, 'center/bank'), // 银行卡管理
    4: getHtml5Image(23, 'center/yeb'), // 利息宝
    5: getHtml5Image(23, 'center/my_lottery'), // 推荐收益
    6: getHtml5Image(23, 'center/cp'), // 彩票注单记录
    7: getHtml5Image(23, 'center/chase'), // 其他注单记录
    8: getHtml5Image(23, 'center/transfer'), // 额度转换
    9: getHtml5Image(23, 'center/message'), // 站内信
    10: getHtml5Image(23, 'center/person_summary'), // 安全中心
    11: getHtml5Image(23, 'center/my_redenvelope'), // 任务中心
    12: getHtml5Image(23, 'center/user_info'), // 个人信息
    13: getHtml5Image(7, 'zhmx'), // 建议反馈
    14: img_platform('c087', 'zxkf'), // 在线客服 X
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: img_platform('c092', 'changlong_logo'), // 长龙助手
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: img_platform('c091', 'qqkf'), // QQ客服
    20: img_platform('c006', 'kjw'), // 開獎網
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
  menus: [
    {
      title: '充值',
      logo: getHtml5Image(7, 'cz'),
      onPress: goToUserCenterType.存款,
    },
    {
      title: '提现',
      logo: getHtml5Image(7, 'tx'),
      onPress: goToUserCenterType.取款,
    },
    {
      title: '额度转换',
      logo: getHtml5Image(7, 'edzh'),
      onPress: goToUserCenterType.额度转换,
    },
    {
      title: '投注记录',
      logo: img_platform('c175', 'tzjl'),
      onPress: goToUserCenterType.彩票注单记录,
    },
    {
      title: '开奖结果',
      logo: getHtml5Image(7, 'kaijiang_c'),

      onPress: goToUserCenterType.开奖结果,
    },
    {
      title: '账户管理',
      logo: getHtml5Image(10, 'center/menu-account'),
      onPress: goToUserCenterType.资金明细,
    },
    {
      title: '站内短信',
      logo: img_platform('c054', 'znx'),
      onPress: goToUserCenterType.站内信,
    },
    {
      title: '返回大厅',
      logo: img_assets('shouye'),
      onPress: () => {},
    },
    {
      title: '退出登录',
      logo: getHtml5Image(25, 'tc_r'),
      onPress: () => {},
    },
  ],
}

export default config
