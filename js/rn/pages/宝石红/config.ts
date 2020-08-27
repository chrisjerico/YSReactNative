import { useHtml5Image } from '../../public/tools/tars'
const { getHtml5Image } = useHtml5Image()

const config = {
  defaultProfileToolLogos: [
    getHtml5Image(21, 'cqk'),
    getHtml5Image(21, 'tx'),
    getHtml5Image(21, 'hbdz-icon'),
    getHtml5Image(21, 'zxkf'),
  ],
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(23, 'bank'), // 银行卡管理
    4: getHtml5Image(21, '/center/syb3'), // 利息宝
    5: getHtml5Image(21, 'center/menu-myreco'), // 推荐收益
    6: 'https://i.ibb.co/vYzZYx5/zdgl-2x.png', // 彩票注单记录
    7: 'https://i.ibb.co/vYzZYx5/zdgl-2x.png', // 其他注单记录
    8: getHtml5Image(23, 'transfer'), // 额度转换
    9: getHtml5Image(21, 'center/menu-notice'), // 站内信
    10: 'https://i.ibb.co/CQY7GdL/ziyuan-2x.png', // 安全中心
    11: getHtml5Image(21, 'center/task'), // 任务中心
    12: getHtml5Image(21, 'center/userInf'), // 个人信息
    13: getHtml5Image(7, 'rule'), // 建议反馈
    14: 'https://i.ibb.co/T0VMxJV/zaixiankefu-2x.png', // 在线客服
    15: getHtml5Image(21, 'center/money'), // 活动彩金
    16: 'https://i.ibb.co/0ZjBxJY/changlong-2x.png', // 长龙助手
    17: getHtml5Image(21, 'center/menu-activity'), // 全民竞猜
    18: 'http://test20.6yc.com/images/kj_trend.png', // 开奖走势
    19: 'https://i.ibb.co/7t3Cb6S/usr-Center-qq.png', // QQ客服
    20: getHtml5Image(21, 'center/kj_trend')
  }
}

export default config