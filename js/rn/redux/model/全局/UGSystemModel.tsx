export interface InviteCode {
  canGenNum: string
  canUseNum: string
  displayWord: string
  switch: string
}

export interface LhcPriceList {
  alias: string
  id: string
  priceMax: string
  priceMin: string
}

export interface MobileMenu {
  icon: string
  icon_hot: string
  isHot: number
  name: string
  path: string
  sort: string
  status: number
}

export interface Platform {
  facebook: boolean
  google: boolean
  twitter: boolean
}

export interface Oauth {
  platform: Platform
  switch: boolean
}

export interface UserCenter {
  category: string
  code: string
  id: string
  link_url: string
  logo: string
  name: string
  parent_id: string
  show_list_style: string
  site_id: string
  site_ids: string
  sorts: string
  status: string
  user_center_category: string //分类ID
}

export default interface UGSystemModel {
  0: string
  activeReturnCoinRatio: number
  activeReturnCoinStatus: boolean
  adSliderTimer: string
  agentRegbutton: string
  agent_m_apply: string
  allowMemberCancelBet: boolean
  allowreg: string
  announce_first: string
  apiHost: string
  apiHosts: string[]
  appDownloadUrl: string
  appPopupQqImg: string
  appPopupQqNum: string
  appPopupWechatImg: string
  appPopupWechatNum: string
  appSelectType: string
  appdownloadbar: string
  autoTransferLimit: number
  balanceDecimal: number
  betAmountIsDecimal: boolean
  chaseNumber: string
  chatFollowSwitch: boolean
  chatLink: string
  chatRoomName: string
  chatRoomServer: string
  chatRoomSwitch: boolean
  chatShareBetMinAmount: string
  mobileGameHall?: '0' | '1' | '2' //彩票大厅类型，0默认，1新版，2自由版
  picTypeshow: string//风格tab打开还是关闭
  checkinSwitch: string
  closeregreason: string
  coinPwdAuditOptionAry: string[]
  curLangCode: string
  currency: string
  domainBindAgentId: number
  easyRememberDomain: string
  googleVerifier: boolean
  hide_reco: string
  host: string
  inviteCode: InviteCode
  inviteCodeSwitch: string
  inviteWord: string
  iosRelease: boolean
  isIntToMoney: string
  lhcPriceList: LhcPriceList[]
  lhcdocMiCard: boolean
  loginVCode: boolean
  login_to: string
  mBonsSwitch: string
  m_promote_pos: string
  maxWithdrawMoney: string
  minWithdrawMoney: string
  missionBili: string
  missionName: string
  missionSwitch: string
  mkCheckinSwitch: string
  mobileMenu: MobileMenu[]
  mobileTemplateBackground: string
  mobileTemplateCategory: string
  mobileTemplateGpkStyle: string
  mobileTemplateHBStyle: string
  mobileTemplateLhcStyle: string
  mobileTemplateStyle: string
  mobile_logo: string
  myreco_img: string
  oauth: Oauth
  oftenLoginArea: string
  page_title: string
  pass_length_max: string
  pass_length_min: string
  pass_limit: string
  popup_announce: string
  popup_hour: string
  popup_tab: string[]
  popup_type: string
  rankingListSwitch: number
  reg_email: string
  reg_fundpwd: string
  reg_name: string
  reg_phone: string
  reg_qq: string
  reg_vcode: string
  reg_wx: string
  selectNumber: string
  serviceQQ1: string
  serviceQQ2: string
  shortCut: string
  shortCutIcon: string
  showNavigationBar: string
  smsVerify: string
  switchAgentRecharge: boolean
  switchAutoTransfer: boolean
  switchCoinPwd: string
  switchShowActivityCategory: boolean
  switchShowFriendReferral: string
  userCenter: UserCenter[]
  webName: string
  yuebaoName: string
  yuebaoSwitch?: boolean ////利息宝开关
  znxNotify: string
  zxkfUrl: string
  zxkfUrl2: string
  appVersion: string
  mobileHomeGameTypeSwitch: boolean
  userCenterCategoryList: [{ id: number, name: string }]//个人中心页分类列表
}
