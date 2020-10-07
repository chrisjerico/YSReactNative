import { useHtml5Image, getIbbImage } from '../../public/tools/tars'
const { getHtml5Image } = useHtml5Image('http://test10.6yc.com/')

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(5, 'ck'), // 存款
    2: getHtml5Image(22, 'withdrawlogo'), // 取款
    3: getHtml5Image(5, 'menu-bankaccount'), // 银行卡管理
    4: getHtml5Image(5, 'syb1'), // 利息宝
    5: getHtml5Image(5, 'menu-myreco'), // 推荐收益
    6: getHtml5Image(5, 'ugBetList'), // 彩票注单记录
    7: getHtml5Image(5, 'menu-record'), // 其他注单记录
    8: getHtml5Image(5, 'menu-transfer'), // 额度转换
    9: getHtml5Image(5, 'menu-message'), // 站内信
    10: getHtml5Image(5, 'menu-modifypwd'), // 安全中心
    11: getHtml5Image(5, 'menu-task'), // 任务中心
    12: null, // 个人信息
    13: getHtml5Image(5, 'menu-feedback'), // 建议反馈
    14: getHtml5Image(5, 'menu-service'), // 在线客服
    15: getHtml5Image(5, 'winApply'), // 活动彩金
    16: getIbbImage('Twnz2tK/changlong'), // 长龙助手
    17: getHtml5Image(5, 'guessingIco'), // 全民竞猜
    18: getHtml5Image(5, 'kj_trend'), // 开奖走势
    19: getIbbImage('pw7LqkR/qq'), // QQ客服
    20: getIbbImage('qRBq508/kjw'), // 開獎網
  },
}

export default config