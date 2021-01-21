import { AxiosResponse } from 'axios'
import { Linking, Platform } from 'react-native'
import SlideCodeModel from '../../redux/model/other/SlideCodeModel'
import { ANHelper } from '../define/ANHelper/ANHelper'
import { CMD } from '../define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { UGStore } from './../../redux/store/UGStore'
import { CachePolicyEnum, httpClient } from './httpClient'
import { ActivityWinApplyListModel } from './Model/ActivityWinApplyListModel'
import { BalanceModel } from './Model/BalanceModel'
import { BankDetailListModel } from './Model/bank/BankDetailListModel'
import { ManageBankCardModel } from './Model/bank/ManageBankCardModel'
import { BannerModel } from './Model/BannerModel'
import { FloatADModel } from './Model/FloatADModel'
import { GoldenEggListModel } from './Model/GoldenEggListModel'
import { HomeADModel } from './Model/HomeADModel'
import { HomeGamesModel } from './Model/HomeGamesModel'
import { GameUrlModel, HomeRecommendModel, TwoLevelGame } from './Model/HomeRecommendModel'
import { LhcdocCategoryListModel } from './Model/LhcdocCategoryListModel'
import { LoginModel } from './Model/LoginModel'
import { LottoGamesModel, UGNextIssueModel } from './Model/LottoGamesModel'
import { NormalModel } from './Model/NormalModel'
import { NoticeModel } from './Model/NoticeModel'
import { OnlineModel } from './Model/OnlineModel'
import { PromotionsModel } from './Model/PromotionsModel'
import { RankListModel } from './Model/RankListModel'
import { RedBagDetailActivityModel } from './Model/RedBagDetailActivityModel'
import { RegisterModel } from './Model/RegisterModel'
import { ScratchListModel } from './Model/ScratchListModel'
import { SystemAvatarListModel } from './Model/SystemAvatarListModel'
import { SystemConfigModel } from './Model/SystemConfigModel'
import { TaskChangeAvatarModel } from './Model/TaskChangeAvatarModel'
import { TicketHistoryModel } from './Model/TicketHistoryModel'
import { TurntableListModel } from './Model/TurntableListModel'
import { UserChangeFundPwdModel } from './Model/UserChangeFundPwdModel'
import { UserChangeLoginPwdModel } from './Model/UserChangeLoginPwdModel'
import { UserInfoModel } from './Model/UserInfoModel'
import { UserMsgListModel } from './Model/UserMsgListModel'
import { CapitalDetailModel } from './Model/wd/CapitalDetailModel'
import { DepositRecordModel } from './Model/wd/DepositRecordModel'
import { WithdrawalRecordModel } from './Model/wd/WithdrawalRecordModel'
import { YueBaoStatModel } from './Model/YueBaoStatModel'
import { ugLog } from '../tools/UgLog'
import { Toast } from '../tools/ToastUtils'
import { HallGameModel } from './Model/game/HallGameModel'
import { PayAisleModel } from './Model/wd/PayAisleModel'
import AppDefine from '../define/AppDefine'
import { NewRateModel } from './Model/wd/NewRateModel'
import { NextIssueModel } from './Model/lottery/NextIssueModel'
import { PlayOddDetailModel } from './Model/lottery/PlayOddDetailModel'
import PushHelper from '../define/PushHelper'
import { LotteryHistoryModel } from './Model/lottery/LotteryHistoryModel'
import { anyEmpty } from '../tools/Ext'
import { IBetLotteryParams } from './it/bet/IBetLotteryParams'

//api 統一在這邊註冊
//httpClient.["method"]<DataModel>
export interface UserReg {
  inviter?: string // 推荐人ID
  usr?: string // 账号
  pwd?: string // 密码
  fundPwd?: string // 取款密码
  fullName?: string // 真实姓名
  qq?: string // QQ号
  wx?: string // 微信号
  phone?: string // 手机号
  smsCode?: string // 短信验证码
  imgCode?: string // 字母验证码,
  'slideCode[nc_sid]'?: string
  'slideCode[nc_token]'?: string
  'slideCode[nc_sig]'?: string
  email?: string // 邮箱
  regType: 'user' | 'agent' // 用户注册 或 代理注册,
  device?: string
  accessToken?: string
  slideCode?: any
}

class APIRouter {
  static activity_applyWinLog = async () => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.get<any>('c=activity&a=applyWinLog&token=' + tokenParams)
  }

  static ticket_history = async () => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.get<TicketHistoryModel>('c=ticket&a=history&category=lottery&status=1&endDate=&startDate=2020-12-16&rows=20&token=' + tokenParams + '&page=1')
  }

  static user_changeFundPwd = async ({ oldPwd, newPwd }) => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.post<UserChangeFundPwdModel>('c=user&a=changeFundPwd', {
      old_pwd: oldPwd,
      new_pwd: newPwd,
      token: tokenParams,
    })
  }

  static user_changeLoginPwd = async ({ oldPwd, newPwd }) => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.post<UserChangeLoginPwdModel>('c=user&a=changeLoginPwd', {
      old_pwd: oldPwd,
      new_pwd: newPwd,
      token: tokenParams,
    })
  }

  static activity_winApplyList = async () => {
    return httpClient.get<ActivityWinApplyListModel>('c=activity&a=winApplyList')
  }

  static user_deleteMsgAll = async () => {
    return httpClient.post<any>('c=user&a=deleteMsgAll')
  }

  static user_readMsgAll = async () => {
    return httpClient.get<any>('c=user&a=readMsgAll')
  }

  static user_readMsg = async (id: string) => {
    return httpClient.post<any>('c=user&a=readMsg', {
      id,
    })
  }

  static user_msgList = async (page: number = 1) => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }

    return httpClient.get<UserMsgListModel>('c=user&a=msgList&rows=20&type=&page=' + page + tokenParams)
  }

  static game_homeRecommend = async () => {
    return httpClient.get<HomeRecommendModel>('c=game&a=homeRecommend')
  }

  static game_realGameTypes = async (gameId: string, searchText: string) => {
    let tokenParams = await APIRouter.encryptGetParams({
      search_text: searchText,
      id: gameId,
    })

    return httpClient.get<TwoLevelGame>('c=game&a=realGameTypes' + tokenParams)
  }

  static real_gotoGame = async (id) => {
    let params = await APIRouter.encryptGetParams({
      id: id
    })
    ugLog("params: " + params)
    return httpClient.get<GameUrlModel>('c=real&a=gotoGame' + params)
  }
  
  /**
   * 首頁遊戲資料
   */
  static game_homeGames = async () => {
    return httpClient.get<HomeGamesModel>('c=game&a=homeGames')
  }
  /**
   * 輪播圖
   */
  static system_banners = async () => {
    return httpClient.get<BannerModel>('c=system&a=banners')
  }
  /**
   * 跑馬燈
   */
  static notice_latest = async () => {
    return httpClient.get<NoticeModel>('c=notice&a=latest')
  }
  /**
   * 優惠活動
   */
  static system_promotions = async () => {
    return httpClient.get<PromotionsModel>('c=system&a=promotions')
  }
  static user_info = async () => {
    let token = null
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        token = user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        token = pms?.token
        break
    }
    if (token) {
      const tokenParams = Platform.OS == 'ios' ? 'token=' + token : token
      return httpClient.get<UserInfoModel>('c=user&a=info&' + tokenParams)
    } else {
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
      return Promise.reject('使用者未登入，拒絕更新使用者資料')
    }
  }

  static user_guestLogin = async () => {
    return httpClient.post<LoginModel>('c=user&a=guestLogin', {
      usr: '46da83e1773338540e1e1c973f6c8a68',
      pwd: '46da83e1773338540e1e1c973f6c8a68',
    })
  }

  /**
   * 银行卡和虚拟币等信息
   */
  static user_bankCardList = async (): Promise<AxiosResponse<ManageBankCardModel>> => {
    if (UGStore.globalProps.userInfo?.isTest) {
      Toast('请登录')
      return null
    }

    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams += '&token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams += '&token=' + pms?.token
        break
    }

    return httpClient.get<ManageBankCardModel>('c=user&a=bankCard&' + tokenParams)
  }

  /**
   * 银行卡和虚拟币等信息
   * category: 定义在 BankConst
   */
  static user_bankInfoList = async (category: string): Promise<AxiosResponse<BankDetailListModel>> => {
    if (UGStore.globalProps.userInfo?.isTest) {
      Toast('请登录')
      return null
    }

    let tokenParams = await APIRouter.encryptGetParams({
      status: 0,
      type: category,
    })

    return httpClient.get<BankDetailListModel>('c=system&a=bankList' + tokenParams)
  }

  /**
   * 在线存款
   */
  static recharge_onlinePay = async (params: IRechargeOnlineParams): Promise<AxiosResponse<NormalModel>> => {
    if (UGStore.globalProps.userInfo?.isTest) {
      Toast('请登录')
      return null
    }

    //ugLog('recharge_onlinePay=', JSON.stringify(params))
    return httpClient.post<NormalModel>('c=recharge&a=onlinePay', params)
  }

  /**
   * 离线存款
   */
  static recharge_transfer = async (params: IRechargeOfflineParams): Promise<AxiosResponse<NormalModel>> => {
    if (UGStore.globalProps.userInfo?.isTest) {
      Toast('请登录')
      return null
    }

    //ugLog('recharge_onlinePay=', JSON.stringify(params))
    return httpClient.post<NormalModel>('c=recharge&a=transfer', params)
  }

  /**
   * 跳转在线存款
   * @param params
   */
  static open_onlinepay = async (params: IRechargeOnlineParams) => {
    // ugLog('pay url params=', JSON.stringify(params))

    let tokenParams = await APIRouter.encryptGetParams(params)

    let url = AppDefine?.host + '/wjapp/api.php?c=recharge&a=payUrl' + tokenParams

    // ugLog('pay url=', url)
    Linking.openURL(url)
  }

  /**
   * 余额提现申请
   *
   */
  static withdraw_apply = async (params: IRequestWithdrawParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=withdraw&a=apply', params)
  }

  /**
   * 利息宝提现申请
   *
   */
  static yuebao_transferToBank = async (params: IRequestWithdrawParams): Promise<AxiosResponse<NormalModel>> => {
    // ugLog('transferToBank=', JSON.stringify(params))
    return httpClient.post<NormalModel>('c=yuebao&a=transferToBank', params)
  }

  /**
   * 利息宝转入转出
   *
   */
  static yuebao_transfer = async (params: IYueBao2YuEParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=yuebao&a=transfer', params)
  }

  /**
   * 银行卡和虚拟币等信息
   *
   */
  static user_addBank = async (params: IAddBankParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=user&a=bindBank', params)
  }

  /**
   * 绑定实名
   * @param params 真名
   * fullName: 真名
   */
  static user_bindRealName = async (params: IBindRealNameParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=user&a=profileName', params)
  }

  /**
   * 绑定密码
   * login_pwd: 登录密码
   * fund_pwd: 取款密码
   */
  static user_bindPwd = async (params: IBindPasswordParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=user&a=addFundPwd', params)
  }

  /**
   * 忘记密码
   */
  static user_applyCoinPwd = async (params: IForgetPasswordParams): Promise<AxiosResponse<NormalModel>> => {
    return httpClient.post<NormalModel>('c=user&a=applyCoinPwd', params)
  }

  /**
   * 存款记录
   * startDate 开始日期
   * endDate 结束日期
   * page 第几页
   * rows 每页多少条
   */
  static capital_rechargeRecordList = async (params: IDepositRecordListParams): Promise<AxiosResponse<DepositRecordModel>> => {

    let tokenParams = await APIRouter.encryptGetParams(params)

    return httpClient.get<DepositRecordModel>('c=recharge&a=logs' + tokenParams)
  }

  /**
   * 支付通道
   * startDate 开始日期
   * endDate 结束日期
   * page 第几页
   * rows 每页多少条
   */
  static capital_rechargeCashier = async (): Promise<AxiosResponse<PayAisleModel>> => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }

    return httpClient.get<PayAisleModel>('c=recharge&a=cashier&' + tokenParams)
  }

  /**
   * 取款记录
   * startDate 开始日期
   * endDate 结束日期
   * page 第几页
   * rows 每页多少条
   */
  static capital_withdrawalRecordList = async (params: IDepositRecordListParams): Promise<AxiosResponse<WithdrawalRecordModel>> => {

    let tokenParams = await APIRouter.encryptGetParams(params)

    return httpClient.get<WithdrawalRecordModel>('c=withdraw&a=logs' + tokenParams)
  }

  /**
   * 资金明细记录
   * startDate 开始日期
   * endDate 结束日期
   * page 第几页
   * rows 每页多少条
   */
  static capital_capitalDetailRecordList = async (params: ICapitalDetailParams): Promise<AxiosResponse<CapitalDetailModel>> => {

    let tokenParams = await APIRouter.encryptGetParams(params)

    return httpClient.get<CapitalDetailModel>('c=user&a=fundLogs&' + tokenParams)
  }

  static activity_redBagDetail = async () => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }

    return httpClient.get<RedBagDetailActivityModel>('c=activity&a=redBagDetail&' + tokenParams)
  }
  static activity_turntableList = async () => {
    if (UGStore.globalProps.userInfo?.isTest) {
      return {}
    }
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }

    return httpClient.get<TurntableListModel>('c=activity&a=turntableList&' + tokenParams)
  }

  static activity_goldenEggList = async () => {
    if (UGStore.globalProps.userInfo?.isTest) {
      return {}
    }
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.get<GoldenEggListModel>('c=activity&a=goldenEggList&' + tokenParams)
  }

  static activity_scratchList = async () => {
    if (UGStore.globalProps.userInfo?.isTest) {
      return {}
    }
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }
    return httpClient.get<ScratchListModel>('c=activity&a=scratchList&' + tokenParams)
  }

  /**
   * 实时汇率
   */
  static system_currencyRate = async (params: ICurrencyRateParams): Promise<AxiosResponse<NewRateModel>> => {

    let tokenParams = await APIRouter.encryptGetParams(params)

    return httpClient.get<NewRateModel>('c=system&a=currencyRate' + tokenParams)
  }

  static system_mobileRight = async () => {
    return httpClient.get<any>('c=system&a=mobileRight')
  }

  static system_floatAds = async () => {
    return httpClient.get<FloatADModel>('c=system&a=floatAds')
  }
  static system_rankingList = async () => {
    return httpClient.get<RankListModel>('c=system&a=rankingList')
  }
  static user_login = async ({ usr, pwd, ggCode, slideCode, fullName, device }: { usr: string; pwd: string; ggCode?: string; slideCode?: SlideCodeModel; fullName?: string; device: 2 | 3 }) => {
    try {
      const slideCodeParams = {
        'slideCode[nc_sid]': slideCode?.nc_csessionid,
        'slideCode[nc_sig]': slideCode?.nc_value,
        'slideCode[nc_token]': slideCode?.nc_token,
      }
      const params = { usr, pwd, ggCode, ...slideCodeParams, fullName, device }
      return httpClient.post<LoginModel>('c=user&a=login', params, {
        noToken: true,
      } as any)
    } catch (error) {
      throw error
    }
  }
  static user_balance_token = async () => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = 'token=' + user?.token
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = 'token=' + pms?.token
        break
    }

    return httpClient.get<BalanceModel>('c=user&a=balance&' + tokenParams)
  }
  static system_onlineCount = async () => {
    return httpClient.get<OnlineModel>('c=system&a=onlineCount')
  }
  static user_logout = async () => {
    let tokenParams = {}
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = {
          token: user?.token,
        }
        break
      case 'android':
        tokenParams = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        break
    }

    return httpClient.post<any>('c=user&a=logout', tokenParams)
  }

  static getTrendData = async (id: string) => {
    return httpClient.get(`c=game&a=lotteryHistory`, {
      params: {
        id: id,
        rows: '200',
      },
    })
  }

  static secure_imgCaptcha = async () => {
    let accessToken = ''
    switch (Platform.OS) {
      case 'ios':
        accessToken = await OCHelper.call('OpenUDID.value')
        break
      case 'android':
        accessToken = await ANHelper.callAsync(CMD.ACCESS_TOKEN)
        break
    }
    return httpClient.get('c=secure&a=imgCaptcha', {
      params: {
        accessToken: accessToken,
      },
    })
  }

  static secure_smsCaptcha = async (phone, action?) => {
    return httpClient.post('c=secure&a=smsCaptcha', {
      phone,
      action,
    })
  }

  static system_config = async () => {
    return httpClient.get<SystemConfigModel>('c=system&a=config')
  }

  static user_reg = async (params: UserReg) => {
    try {
      let accessToken = ''
      switch (Platform.OS) {
        case 'ios':
          accessToken = await OCHelper.call('OpenUDID.value')
          break
        case 'android':
          accessToken = await ANHelper.callAsync(CMD.ACCESS_TOKEN)
          break
      }
      return httpClient.post<RegisterModel>(
        'c=user&a=reg',
        {
          ...params,
          device: '3',
          accessToken: accessToken,
        },
        {
          noToken: true,
        } as any,
      )
    } catch (error) {
      throw error
    }
  }

  static lhcdoc_categoryList = async () => {
    return httpClient.get<LhcdocCategoryListModel>('c=lhcdoc&a=categoryList')
  }

  static lhcdoc_lotteryNumber = async () => {
    return httpClient.get('c=lhcdoc&a=lotteryNumber')
  }

  /**
   * 彩票下注，普通彩票
   */
  static game_bet = async (params: IBetLotteryParams): Promise<AxiosResponse<NormalModel>> => {
    //ugLog('recharge_onlinePay=', JSON.stringify(params))
    return httpClient.post<NormalModel>(params.isTest ? 'c=user&a=guestBet' : 'c=user&a=bet', params)
  }

  /**
   * 下一期开奖信息
   * id 游戏 id
   */
  static game_nextIssue = async (id: string): Promise<AxiosResponse<NextIssueModel>> => {

    let tokenParams = await APIRouter.encryptGetParams({
      id,
    })

    return httpClient.get<NextIssueModel>('c=game&a=nextIssue' + tokenParams)
  }

  /**
   * 彩票详情
   * id 游戏 id
   */
  static game_playOdds = async (id: string): Promise<AxiosResponse<PlayOddDetailModel>> => {

    let tokenParams = await APIRouter.encryptGetParams({
      id,
    })

    return httpClient.get<PlayOddDetailModel>('c=game&a=playOdds' + tokenParams)
  }

  /**
   * 游戏开奖记录
   */
  static game_lotteryHistory = async (params: IGameHistory): Promise<AxiosResponse<LotteryHistoryModel>> => {
    ugLog('game_lotteryHistory=', JSON.stringify(params))
    let tokenParams = await APIRouter.encryptGetParams(params)
    return httpClient.get<LotteryHistoryModel>('c=game&a=lotteryHistory' + tokenParams)
  }

  /**
   * 游戏大厅数据
   */
  static game_lotteryGames = async (): Promise<AxiosResponse<LottoGamesModel>> => {
    //@ts-ignore
    return httpClient.get<LottoGamesModel>('c=game&a=lotteryGames', {
      //@ts-ignore
      isEncrypt: false,
      cachePolicy: CachePolicyEnum?.cacheByTime,
      expiredTime: 3,
    })
  }

  /**
   * 游戏大厅数据
   */
  static game_lotteryHallGames = async (): Promise<AxiosResponse<HallGameModel>> => {
    return httpClient.get<HallGameModel>('c=game&a=lotteryGames')
  }

  // static game_playOdds = async (id: string): Promise<AxiosResponse<PlayOddDataModel>> => {
  //   return httpClient.get('c=game&a=playOdds&id=' + id, {
  //     //@ts-ignore
  //     isEncrypt: false,
  //   })
  // }

  static system_avatarList = async () => {
    return httpClient.get<SystemAvatarListModel>('c=system&a=avatarList')
  }

  static task_changeAvatar = async (filename: string) => {
    let tokenParams = {}
    switch (Platform.OS) {
      case 'ios':
        let user = await OCHelper.call('UGUserModel.currentUser')
        tokenParams = {
          token: user?.token,
          filename,
        }
        break
      case 'android':
        let pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS)
        tokenParams = {
          ...pms,
          filename,
        }
        break
    }
    return httpClient.post<TaskChangeAvatarModel>('c=task&a=changeAvatar', tokenParams)
  }

  static system_homeAds = async () => {
    return httpClient.get<HomeADModel>('c=system&a=homeAds')
  }
  static language_getLanguagePackage = async (lanCode: string) => {
    return httpClient.get('c=language&a=getLanguagePackage&languageCode=' + lanCode, {
      //@ts-ignore
      isEncrypt: false,
    })
  }
  static language_getConfigs = async () => {
    return httpClient.get('c=language&a=getConfigs')
  }
  static yuebao_stat = async () => {
    return httpClient.get<YueBaoStatModel>('c=yuebao&a=stat')
  }

  /**
   * 加密 GET 参数
   * @param params
   */
  static encryptGetParams = async (params?: any) => {
    let tokenParams = ''
    switch (Platform.OS) {
      case 'ios':
        //TODO iOS 完成 params 加密转换
        let temp = {}
        //过滤掉 null 或 "",
        for (let paramsKey in params) {
          if (!anyEmpty(params[paramsKey])) {
            temp[paramsKey] = params[paramsKey]
          }
        }
        temp['checkSign'] = 1
        let paramsJM = await  OCHelper.call('CMNetwork.encryptionCheckSign:', [temp])
        var str = JSON.stringify(paramsJM); 
        tokenParams = str;
        break
      case 'android':
        const pms = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, {
          params,
        })
        for (let key in pms) {
          tokenParams += '&' + key + '=' + pms[key]
        }
        break
    }
    //ugLog('APIRouter encryptParams=', JSON.stringify(params))
    return tokenParams
  }
}

export default APIRouter
