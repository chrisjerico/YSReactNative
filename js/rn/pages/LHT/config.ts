import { UGImageHost, useHtml5Image } from '../../Res/icon'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const { getHtml5Image, img_platform } = useHtml5Image(UGImageHost.test5)

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(3, 'center/bank'), // 银行卡管理
    4: getHtml5Image(3, 'syb3'), // 利息宝
    5: getHtml5Image(null, 'lhc/menu-myreco'), // 推荐收益
    6: getHtml5Image(3, 'center/menu-rule-1'), // 彩票注单记录
    7: getHtml5Image(3, 'center/menu-rule'), // 其他注单记录
    8: getHtml5Image(3, 'center/menu-transfer'), // 额度转换
    9: getHtml5Image(3, 'center/menu-notice'), // 站内信
    10: getHtml5Image(3, 'center/menu-password'), // 安全中心
    11: getHtml5Image(3, 'center/task'), // 任务中心
    12: getHtml5Image(3, 'center/userInf'), // 个人信息
    13: getHtml5Image(3, 'center/menu-feedback'), // 建议反馈
    14: img_platform('c087', 'zxkf'), // 在线客服 X
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: img_platform('c092', 'changlong_logo'), // 长龙助手
    17: getHtml5Image(3, 'center/menu-activity'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: img_platform('c091', 'qqkf'), // QQ客服
    20: img_platform('c006', 'kjw'), // 開獎網
  },
  preferences: [
    {
      gameId: LotteryType.重庆时时彩,
      title: '重庆时时彩',
      selected: false,
      logo: 'cqssc',
      gameType: 'cqssc',
      des: '全天59期',
    },
    {
      gameId: LotteryType.七星彩,
      title: '七星彩',
      selected: false,
      logo: 'qxc',
      gameType: 'qxc',
      des: '全天59期',
    },
    {
      gameId: LotteryType.PK10牛牛,
      title: 'PK10牛牛',
      selected: false,
      logo: 'pk10nn',
      gameType: 'pk10nn',
      des: '全天59期',
    },
    {
      gameId: LotteryType.福彩3D,
      title: '福彩3D',
      selected: true,
      logo: 'fc3d',
      gameType: 'fc3d',
      des: '全天59期',
    },
    {
      gameId: LotteryType.大乐透,
      title: '大乐透',
      selected: true,
      logo: 'dlt',
      gameType: 'dlt',
      des: '全天59期',
    },
    {
      gameId: LotteryType.幸运飞艇,
      title: '幸运飞艇',
      selected: false,
      logo: 'xyft',
      gameType: 'xyft',
      des: '全天180期',
    },
    {
      gameId: LotteryType['北京赛车(PK10)'],
      title: '北京赛车(PK10)',
      selected: true,
      logo: 'bjpk10',
      gameType: 'pk10',
      des: '全天44期',
    },
    {
      gameId: LotteryType.pc蛋蛋,
      title: 'pc蛋蛋',
      selected: true,
      logo: 'pcdd',
      gameType: 'pcdd',
      des: '全天179期',
    },
    {
      gameId: LotteryType.香港六合彩,
      title: '香港六合彩',
      selected: true,
      logo: 'lhc',
      gameType: 'lhc',
      des: '一周开三期',
    },
    {
      gameId: null,
      title: '长龙资讯',
      selected: true,
      logo: 'clzx',
      gameType: 'clzx',
      des: '长龙助手',
    },
    {
      gameId: null,
      title: '开奖网',
      selected: true,
      logo: 'lmzs',
      gameType: 'lmzs',
      des: '开奖网',
    },
    {
      gameId: null,
      title: '红包',
      selected: true,
      logo: 'hongbao',
      gameType: 'hongbao',
      des: '抢红包',
    },
  ],
  bottomTools: [
    {
      logo: getHtml5Image(14, 'lxkf'),
      userCenterType: UGUserCenterType.在线客服,
    },
    {
      logo: getHtml5Image(14, 'lts'),
      userCenterType: UGUserCenterType.聊天室,
    },
    {
      logo: getHtml5Image(14, 'appDownload'),
    },
  ],
  moreLottery: [
    {
      gameId: null,
      gameType: 'more',
      title: '更多彩种',
      des: '好挣好玩',
      logo: 'gdcz',
      selected: true,
    },
  ],
  profileButtons: [
    {
      title: '我要充值',
      logo: getHtml5Image(14, 'cz'),
      userCenterType: UGUserCenterType.存款,
    },
    {
      title: '马上提现',
      logo: getHtml5Image(14, 'tx'),
      userCenterType: UGUserCenterType.取款,
    },
    {
      title: '资金明细',
      logo: getHtml5Image(14, 'zjmx'),
      userCenterType: UGUserCenterType.资金明细,
    },
  ],
  noticeLogo: getHtml5Image(14, 'notice'),
  homeHeaderRightLogo: getHtml5Image(14, 'top_yhhd'),
  advertisementLogo: getHtml5Image(14, 'banner', 'gif'),
  lotteryLogo: getHtml5Image(14, 'tjzx'),
  balanceLogo: getHtml5Image(14, 'yue'),
  customerServiceLogo: getHtml5Image(14, 'zxkf'),
  homeGameLeftIcon: getHtml5Image(14, 'hot_icon'),
  homeGameRightIcon: getHtml5Image(14, 'cai_icon'),
}

export default config
