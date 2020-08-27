import { getHtml5Image } from '../../public/tools/tars'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const config = {
  defaultProfileToolLogos: [
    getHtml5Image(21, 'cqk'),
    getHtml5Image(21, 'tx'),
    getHtml5Image(21, 'hbdz-icon'),
    getHtml5Image(21, 'zxkf'),
  ],
  defaultFeatureLogos: {
    4: getHtml5Image(21, '/center/syb3'), //利息寶
    17: getHtml5Image(21, 'center/menu-activity'), // 全民競猜
    5: getHtml5Image(21, 'center/menu-myreco'), // 推薦收益
    12: getHtml5Image(21, 'center/userInf'), // 會員訊息
    10: getHtml5Image(21, 'center/menu-password'), //安全中心
    11: getHtml5Image(21, 'center/task'), // 任務中心
    9: getHtml5Image(21, 'center/menu-notice'), // 站內信
    20: getHtml5Image(21, 'center/kj_trend'), // 開獎網
    15: getHtml5Image(21, 'center/menu-rule-1') // 活動彩金
  }
}

export default config
