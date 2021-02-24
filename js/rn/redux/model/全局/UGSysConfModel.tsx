// 代理申请信息
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { anyEmpty } from '../../../public/tools/Ext'
import { img_assets } from '../../../Res/icon'
import { UGStore } from '../../store/UGStore'


export interface InviteCodeConfigModel {
  codeSwith?: string
  displayWord?: string
  canGenNum?: string
  canUseNum?: string
  randomSwitch?: string
  randomLength?: string
  noticeSwitch?: string //邀请码说明栏开关
  noticeText?: string   //邀请码说明栏文字

}

export interface UGAgentApplyInfo {
  username: string // 用户名
  qq: string // qq
  mobile: string // 手机号
  applyReason: string // 申请理由
  reviewResult: string // 拒绝的理由
  reviewStatus: number // 0 未提交  1 待审核  2 审核通过 3 审核拒绝
  isAgent: boolean // 是否是代理  true 是   false 否
}

// 底部Tab按钮
export class UGTabbarItem {
  path: string //界面
  icon: string //图标
  name: string //标题
  sort: number //排序
  status: boolean //1=显示建设中页面；0=正常显示
  isHot: boolean
  icon_hot: string //热门图片路径
}

export enum UGUserCenterType {
  存款 = 1,
  取款 = 2,
  银行卡管理 = 3,
  利息宝 = 4,
  推荐收益 = 5,
  彩票注单记录 = 6,
  其他注单记录 = 7,
  额度转换 = 8,
  站内信 = 9,
  安全中心 = 10,
  任务中心 = 11,
  个人信息 = 12,
  建议反馈 = 13,
  在线客服 = 14,
  活动彩金 = 15,
  长龙助手 = 16,
  全民竞猜 = 17,
  开奖走势 = 18,
  QQ客服 = 19,
  开奖网 = 20,
  未结注单 = 21,
  电子注单 = 22,
  真人注单 = 23,
  棋牌注单 = 24,
  捕鱼注单 = 25,
  电竞注单 = 26,
  体育注单 = 27,
  UG注单 = 28,
  存款纪录 = 30,
  取款纪录 = 31,
  资金明细 = 32,
  优惠活动 = 33,
  聊天室 = 34,
  真人大厅 = 42,
  棋牌大厅 = 43,
  电子大厅 = 44,
  体育大厅 = 45,
  电竞大厅 = 46,
  路珠 = 55,
  // 自定义（从100+开始写，前面的都是后台定制的）
  彩票大厅 = 47,
  捕鱼大厅 = 48,
  每日签到 = 102,
  登出 = 103,
  游戏大厅 = 104,
  我的页 = 105,
  登录页 = 106,
  注册页 = 107,
  开奖结果 = 109,
  砸金蛋 = 110,
  刮刮乐 = 111,
  任务弹窗 = 112,
  即时注单 = 113,
}

// 我的页功能按钮
export class UGUserCenterItem {
  code: UGUserCenterType
  logo?: string
  name?: string
  isDefaultLogo?: boolean
  user_center_category: string //分类ID

  // 默认图标
  static defaultLogos: { [x: number]: string } = {
    1: img_assets('chongzhi@2x'), // 存款
    2: img_assets('tixian@2x'), // 取款
    3: img_assets('yinhangqia@2x'), // 银行卡管理
    4: img_assets('lixibao'), // 利息宝
    5: img_assets('shouyisel'), // 推荐收益
    6: img_assets('zdgl@2x'), // 彩票注单记录
    7: img_assets('zdgl@2x'), // 其他注单记录
    8: img_assets('change@2x'), // 额度转换
    9: img_assets('zhanneixin@2x'), // 站内信
    10: img_assets('ziyuan@2x'), // 安全中心
    11: img_assets('renwuzhongxin'), // 任务中心
    12: img_assets('gerenzhongxinxuanzhong'), // 个人信息
    13: img_assets('yijian'), // 建议反馈
    14: img_assets('zaixiankefu@2x'), // 在线客服
    15: img_assets('zdgl@2x'), // 活动彩金
    16: img_assets('changlong@2x'), // 长龙助手
    17: img_assets('menu-activity'), // 全民竞猜
    18: img_assets('kj_trend'), // 开奖走势
    19: img_assets('usrCenter_qq'), // QQ客服
    20: img_assets('center_kaijiang@2x'), // UCI_开奖网
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

  }

  constructor(props: UGUserCenterItem) {
    Object.assign(this, props)
    // 设置默认图标
    if (anyEmpty(this.logo) || this.logo?.indexOf('http') == -1) {
      this.logo = UGUserCenterItem.defaultLogos[props.code]
      this.isDefaultLogo = true
    }
  }
}

// 六合发帖价格范围
export class LHPriceModel { }

// 系统配置Model
export default class UGSysConfModel {
  // 过滤掉已关闭的功能
  static getUserCenterItems() {
    const {
      sysConf: { userCenter = [] },
      userInfo: { hasActLottery, yuebaoSwitch },
    } = UGStore.globalProps
    const temp = userCenter?.map((uci) => {
      if (!hasActLottery && uci.code == UGUserCenterType.活动彩金) return
      if (!yuebaoSwitch && uci.code == UGUserCenterType.利息宝) return
      return new UGUserCenterItem(uci)
    })
    return temp.filter((ele) => ele)
  }
  static updateFromNetwork(completed?: () => void) {
    return api.system.config().useSuccess(({ data }, sm) => {
      sm.noShowErrorHUD = true
      console.log('系统配置数据：', data);

      UGStore.dispatch({ type: 'merge', sysConf: data })
      completed && completed()
    }).promise
  }

  zxkfUrl2?: string // 在线客服2
  zxkfUrl?: string // 在线客服
  minWithdrawMoney?: string // 最低提款金额
  maxWithdrawMoney?: string // 最高提款金额
  closeregreason?: string // 关闭注册功能提示内容
  missionName?: string // 哇咔豆
  missionBili?: string
  isIntToMoney?: string // 积分开关0=关闭；1=开启；
  missionSwitch?: string // 1=关闭；0=开启；任务中心
  myreco_img?: string // 1=关闭；0=开启；
  checkinSwitch?: string // 0=关闭；1=开启签到开关
  mkCheckinSwitch?: string // 0=开启；1=关闭 补签开关：
  agent_m_apply?: string // 允许会员中心申请代理
  mobile_logo?: string // 首页navBar 图片
  agentRegbutton?: string // 是否开启代理注册，0=关闭；1=开启
  oftenLoginArea?: string // 1=关闭；0=开启； 常用登录地
  mobileTemplateBackground?: string // 配色方案
  mobileTemplateCategory?: string // 模板号      9 简约
  mobileTemplateLhcStyle?: string // 六合配色方案
  mobileTemplateStyle?: string // 新年红 简约 香槟金 配色方案
  mobileGameHall?: '0' | '1' | '2' //彩票大厅类型，0默认，1新版，2自由版
  picTypeshow?: string//彩票大厅是否显示分类栏
  webName?: string // 首页底部文字   网址名称*/;
  serviceQQ1?: string // QQ客服q1
  serviceQQ2?: string // QQ客服q2
  appPopupWechatNum?: string // 微信客服号
  appPopupWechatImg?: string // 微信客服二维码
  appPopupQqNum?: string // QQ客服号
  appPopupQqImg?: string // 微信客服二维码
  domainBindAgentId?: string // 如果这个属性大于0，则在注册邀请人输入框填入改ID，且无法更改
  homeTypeSelect?: string // 是否开启前台分类
  chatRoomName?: string // 聊天室名称
  chatMinFollowAmount?: string // 聊天室跟注最小金额*/
  chaseNumber?: string // 是否开启跟注
  easyRememberDomain?: string // 易记域名*/
  chatLink?: string // 聊天的链接*/
  mBonsSwitch?: boolean // 俸禄开关开启。0 为开启， 1 为 关闭
  missionPopUpSwitch?: '0' | '1' // 首页是否显示任务浮窗

  switchCoinPwdSms?: string // 资金密码开启短信验证
  switchCoinPwd?: string // 是否打开忘记密码
  coinPwdAuditOptionAry?: Array<string> //忘记密码有哪些选项 mobile, bank, id
  chatShareBetMinAmount?: string /**<   聊天室 注单分享最小金额限制*/
  // 邀请码
  inviteCode?: InviteCodeConfigModel
  // 注册页
  hide_reco?: '0' | '1' | '2' // 代理人 0不填，1选填，2必填
  inviteCodeSwitch?: '0' | '1' | '2' // 邀请码开关 0不填，1选填，2必填
  inviteWord?: string // 邀请码文案
  reg_name?: '0' | '1' | '2' // 真实姓名 0不填，1选填，2必填
  reg_fundpwd?: '0' | '1' | '2' // 取款密码 0不填，1选填，2必填
  reg_qq?: '0' | '1' | '2' // QQ 0不填，1选填，2必填
  reg_wx?: '0' | '1' | '2' // 微信 0不填，1选填，2必填
  reg_phone?: '0' | '1' | '2' // 手机 0不填，1选填，2必填
  reg_email?: '0' | '1' | '2' // 邮箱 0不填，1选填，2必填
  reg_vcode?: '0' | '1' | '2' // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
  pass_limit?: '0' | '1' | '2' // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
  pass_length_min?: string // 注册密码最小长度
  pass_length_max?: string // 注册密码最大长度
  smsVerify?: '0' | '1' // 手机短信验证

  rankingListSwitch?: 0 | 1 // 是否显示中奖/投注排行榜
  googleVerifier?: boolean // 是否开启google 验证
  recharge?: boolean // 上级充值开关
  allowreg?: boolean // 是否开启注册功能。
  allowMemberCancelBet?: boolean // 是否允许会员撤单，1允许 0不允许
  m_promote_pos?: boolean // 优惠活动显示在首页还是内页，1首页，0内页
  yuebaoSwitch?: boolean // //利息宝开关
  yuebaoName?: string // 利息宝名字
  chatFollowSwitch?: boolean // 是否允许聊天室跟注
  switchBindVerify?: number // 新增提款账号時，校验取款密码
  //推荐收益-会员管理-充值
  switchAgentRecharge?: boolean // 给下级会员充值开关
  nameAgentRecharge?: string

  lhcdocMiCard?: boolean // 六合彩开奖咪牌(默认状态)开关
  lhcdocLotteryStr?: string // 六合彩预备开奖文字
  lhcPriceList?: Array<LHPriceModel> // 六合发帖价格范围

  mobileMenu?: Array<UGTabbarItem> // 底部Tab按钮
  userCenter?: Array<UGUserCenterItem> // 我的页功能按钮

  chatRoomSwitch?: boolean //聊天室开关
  switchBalanceChannel?: string //余额提款开关
  balanceChannelStartTime?: string //开关时间段
  balanceChannelEndTime?: string //开关时间段
  balanceChannelPrompt?: string //余额提款关闭提示语
  switchYuebaoChannel?: string //利息宝开关
  yuebaoChannelStartTime?: string //开关时间段
  yuebaoChannelEndTime?: string //开关时间段
  yuebaoChannelPrompt?: string //利息宝关闭提示语

  activeReturnCoinStatus?: boolean// 是否開啟拉條模式
  activeReturnCoinRatio?: number// 拉條最大值

  switchShowFriendReferral?: '0' | '1' //是否显示首页推荐好友 0不显示，1显示
  showNavigationBar?: '0' | '1'   //首页推荐好友显示在前还是后 1 前 0 后
  popup_type: '0' | '1'//公告  0直接弹窗，1登录后弹出

  // 登陸頁
  loginVCode?: boolean // 登录增加了滑动验证码配置  默认开
  login_to?: '0' | '1'
  adSliderTimer?: number
  appDownloadUrl?: string
  // 我的頁
  userCenterItems?: Array<userCenterItems>
  userCenterCategoryList: [{ id: number, name: string }]//个人中心页分类列表
  frontend_agent_add_member?: '0' | '1' // 推荐收益页添加会员功能  0关闭，1开启
}

interface userCenterItems {
  bmImgName: string
  code: number
  defaultImgName: string
  isDefaultLogo: boolean
  isLoading: boolean
  lhImgName: string
  logo: string
  name: string
}

