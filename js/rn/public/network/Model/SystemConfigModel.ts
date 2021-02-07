export interface SystemConfigModel {
  code: number;
  msg: string;
  data?: Data;
  info: Info;
}

export interface Info {
  sqlList: string[];
  debug: Debug;
  traceBack: TraceBack;
  runtime: string;
}

export interface TraceBack {
  loader: string;
  initDi: string;
  settings?: any;
  access?: any;
  dispatch?: any;
}

export interface Debug {
  file: string;
  line: number;
  code: number;
}

export interface LhcPriceList {
  alias: string;
  id: string;
  priceMax: string;
  priceMin: string;
}

export interface MobileMenu {
  icon: string;
  icon_hot: string;
  isHot: number;
  name: string;
  path: string;
  sort: number;
  status: number;
}

export interface UserCenter {
  category: string;
  code: string;
  id: string;
  logo: string;
  name: string;
  show_list_style: string;
  site_id: string;
  site_ids: string;
  sorts: string;
  status: string;
}

export interface Data {
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

  adSliderTimer: string;
  agentRegbutton: string;
  agent_m_apply: string;
  allowMemberCancelBet: boolean;
  allowreg: string;
  announce_first: string;
  apiHost: string;
  apiHosts: string[];
  appDownloadUrl: string;
  appPopupQqImg: string;
  appPopupQqNum: string;
  appPopupWechatImg: string;
  appPopupWechatNum: string;
  appdownloadbar: string;
  autoTransferLimit: number;
  betAmountIsDecimal: boolean;
  chaseNumber: string;
  chatFollowSwitch: boolean;
  chatLink: string;
  chatMinFollowAmount: string;
  chatRoomName: string;
  chatRoomServer: string;
  chatRoomSwitch: boolean;
  checkinSwitch: string;
  closeregreason: string;
  domainBindAgentId: number;
  easyRememberDomain: string;
  googleVerifier: boolean;
  hide_reco: string;
  host: string;
  iosRelease: boolean;
  isIntToMoney: string;
  lhcPriceList: LhcPriceList[];
  lhcdocMiCard: boolean;
  loginVCode: boolean;
  login_to: string;
  m_promote_pos: string;
  maxWithdrawMoney: string;
  minWithdrawMoney: string;
  missionBili: string;
  missionName: string;
  missionSwitch: string;
  mkCheckinSwitch: string;
  mobileMenu: MobileMenu[];
  mobileTemplateBackground: string;
  mobileTemplateCategory: string;
  mobileTemplateGpkStyle: string;
  mobileTemplateHBStyle: string;
  mobileTemplateLhcStyle: string;
  mobileTemplateStyle: string;
  mobile_logo: string;
  myreco_img: string;
  oftenLoginArea: string;
  page_title: string;
  pass_length_max: string;
  pass_length_min: string;
  pass_limit: string;
  popup_announce: string;
  popup_hour: string;
  popup_type: string;
  rankingListSwitch: number;
  reg_email: string;
  reg_fundpwd: string;
  reg_name: string;
  reg_phone: string;
  reg_qq: string;
  reg_vcode: string;
  reg_wx: string;
  selectNumber: string;
  serviceQQ1: string;
  serviceQQ2: string;
  shortCut: string;
  shortCutIcon: string;
  smsVerify: string;
  switchAgentRecharge: boolean;
  switchAutoTransfer: boolean;
  switchShowActivityCategory: boolean;
  userCenter: UserCenter[];
  webName: string;
  yuebaoName: string;
  yuebaoSwitch: boolean; //利息宝开关
  znxNotify: string;
  zxkfUrl: string;
  zxkfUrl2: string;
}
