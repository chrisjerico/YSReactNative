import { getIbbImage, goToUserCenterType, useHtml5Image } from '../../public/tools/tars'

const { getHtml5Image, getHtml5ImagePlatform } = useHtml5Image('http://t132f.fhptcdn.com')

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
    14: getHtml5ImagePlatform('c087', 'zxkf'), // 在线客服 X
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: getHtml5ImagePlatform('c092', 'changlong_logo'), // 长龙助手
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: getHtml5ImagePlatform('c064', 'qqkf'), // QQ客服
    20: getHtml5ImagePlatform('c006', 'kjw'), // 開獎網
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
      logo: getHtml5ImagePlatform('c175', 'tzjl'),
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
      logo: getHtml5ImagePlatform('c054', 'znx'),
      onPress: goToUserCenterType.站内信,
    },
    {
      title: '返回大厅',
      logo: getIbbImage('dM51dH6/gobacklobby'),
      onPress: () => {},
    },
    {
      title: '退出登录',
      logo: getIbbImage('pWfZ2L6/logout'),
      onPress: () => {},
    },
  ],
}

export default config
