import AppDefine from "../../../public/define/AppDefine"
import PushHelper, { UGLinkPositionType } from "../../../public/define/PushHelper"
import { SeriesId, GameType } from "../../../public/models/Enum"
import { PageName } from "../../../public/navigation/Navigation"
import { navigate, push } from "../../../public/navigation/RootNavigation"
import { skinColors } from "../../../public/theme/const/UGSkinColor"
import { goToUserCenterType } from "../../../public/tools/tars"
import { UGStore } from "../../../redux/store/UGStore"
import { useHtml5Image, UGImageHost, img_platform } from "../../../Res/icon"

const { getHtml5Image, img_assets } = useHtml5Image(UGImageHost.t132f)
const { isTest = false, uid = '' } = UGStore.globalProps.userInfo

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
    14: img_assets('wnz/service'), // 在线客服
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: img_assets('wnz/long'), // 长龙助手
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: img_assets('wnz/qq'), // QQ客服
    20: img_assets('wnz/award'), // 開獎網
    22: getHtml5Image(23, 'center/electronic'), // 电子注单
    23: getHtml5Image(23, 'center/live'), // 真人注单
    24: getHtml5Image(23, 'center/chess'), // 棋牌注单
    25: getHtml5Image(23, 'center/chase'), // 捕鱼注单
    26: getHtml5Image(23, 'center/vr'), // 电竞注单
    27: getHtml5Image(23, 'center/sport'), // 体育注单
    30: getHtml5Image(23, 'center/recharge_record'), // 存款纪录
    31: getHtml5Image(23, 'center/withdraw-order'), // 取款纪录
    32: getHtml5Image(23, 'center/account_bill'), // 资金明细
    33: getHtml5Image(23, 'center/activity_hall'), // 优惠活动
    34: getHtml5Image(23, 'center/my_chat'), // 聊天室
  },
  getDefaultMenus() {
    if (AppDefine.inSites('h005')) {
      return [
        { title: '返回首页', subId: UGLinkPositionType.返回首页, icon: img_assets('home') },
        { title: '站内信', subId: UGLinkPositionType.站内信, icon: img_assets('zhanneixin@2x') },
        { title: '优惠活动', subId: UGLinkPositionType.优惠活动, icon: img_assets('礼品-(1)') },
        { title: '退出登录', subId: UGLinkPositionType.退出登录, icon: img_assets('tuichudenglu@2x') },
        { title: '当前版本号', subId: UGLinkPositionType.当前版本号, icon: img_assets('banbenhao') },
      ]
    }

    let menus = [
      { title: '返回首页', subId: UGLinkPositionType.返回首页, icon: img_assets('home') },
      { title: '即时注单', subId: UGLinkPositionType.即时注单, icon: img_assets('gw') },
      { title: '今日输赢', subId: UGLinkPositionType.今日输赢, icon: img_assets('qk1') },
      { title: '投注记录', subId: UGLinkPositionType.投注记录, icon: img_assets('zdgl@2x') },
      { title: '开奖记录', subId: UGLinkPositionType.开奖记录, icon: img_assets('kaijiangjieguo@2x') },
      { title: '长龙助手', subId: UGLinkPositionType.长龙助手, icon: img_assets('changlong@2x'), isHot: true },
      { title: '利息宝', subId: UGLinkPositionType.利息宝, icon: img_assets('lixibao'), isHot: true },
      { title: '站内信', subId: UGLinkPositionType.站内信, icon: img_assets('zhanneixin@2x') },
      { title: '退出登录', subId: UGLinkPositionType.退出登录, icon: img_assets('tuichudenglu@2x') },
      { title: '当前版本号', subId: UGLinkPositionType.当前版本号, icon: img_assets('banbenhao') },
    ]
    const { yuebaoSwitch } = UGStore.globalProps?.userInfo
    if (yuebaoSwitch == false) {
      menus = menus.filter((ele) => ele.title != '利息宝')
    }
    return menus
  },
}

export default config
