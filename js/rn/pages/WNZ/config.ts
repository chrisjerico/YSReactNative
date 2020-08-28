import { useHtml5Image, getIbbImage } from "../../public/tools/tars"
const { getHtml5Image } = useHtml5Image('http://test20.6yc.com')

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
    14: getIbbImage('DtPJymN/online-Service'), // 在线客服 X
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: getIbbImage('TkNkFK8/changlong'), // 长龙助手 X
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: getIbbImage('FBLBM0C/qq-Service'), // QQ客服 X
    20: getIbbImage('4gLtWb1/kjw') // 開獎網 X
  }
}

export default config