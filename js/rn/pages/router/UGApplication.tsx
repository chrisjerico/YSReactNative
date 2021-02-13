import { NavigationContainer } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { Component } from 'react'
import CodePush from 'react-native-code-push'
import { AlipayProfitView } from '../../public/components/alipay/AlipayProfitView'
import { AlipayTransferRecordView } from '../../public/components/alipay/AlipayTransferRecordView'
import { AlipayTransferView } from '../../public/components/alipay/AlipayTransferView'
import { AlipayView } from '../../public/components/alipay/AlipayView'
import { FeedbackRecordView } from '../../public/components/FeedbackRecordView'
import { FeedbackSubmitView } from '../../public/components/FeedbackSubmitView'
import { FeedbackView } from '../../public/components/FeedbackView'
import { SupFeedbackSubmitView } from '../../public/components/SupFeedbackSubmitView'
import { TransferRecordView } from '../../public/components/transfer/TransferRecordView'
import { TransferTKLMainView } from '../../public/components/transfer/TransferTKLMainView'
import { TransferView } from '../../public/components/transfer/TransferView'
import TrendView from '../../public/components/TrendView'
import Game3rdView from '../../public/components/Game3rdView'
import { PageName } from '../../public/navigation/Navigation'
import { navigationRef } from '../../public/navigation/RootNavigation'
import { Router } from '../../public/navigation/Router'
import { ugLog } from '../../public/tools/UgLog'
import ExtUGApplication from '../../public/tools/ui/ExtUGApplication'
import { UGLoadingCP } from '../../public/widget/UGLoadingCP'
import AddBankPage from '../bank/add/AddBankPage'
import ManageBankListPage from '../bank/list/ManageBankListPage'
import ActivityRewardPage from '../base/ActivityRewardPage'
import LotteryHistoryPage from '../base/LotteryHistoryPage'
import PromotionPage from '../base/PromotionPage'
import SafeCenterPage from '../base/SafeCenterPage'
import SeriesLobbyPage from '../base/SeriesLobbyPage'
import { TransitionPage } from '../base/TransitionPage'
import UGPage from '../base/UGPage'
import UserInfoPage from '../base/UserInfoPage'
import UserMessagePage from '../base/UserMessagePage'
import BYHomePage from '../BY/BYHomePage'
import BYMinePage from '../BY/BYMinePage'
import BYSignInPage from '../BY/BYSignInPage'
import BYSignUpPage from '../BY/BYSignUpPage'
import BZHGameLobbyPage from '../BZH/BZHGameLobbyPage'
import BZHHomePage from '../BZH/BZHHomePage'
import BZHMinePage from '../BZH/BZHMinePage'
import BZHSignInPage from '../BZH/BZHSignInPage'
import BZHSignUpPage from '../BZH/BZHSignUpPage'
import LottoBetting from '../common/LottoBetting'
import PromotionListPage from '../common/PromotionListPage'
import CapitalPage from '../cpt/list/CapitalPage'
import OnlinePayPage from '../cpt/list/record/pay/online/OnlinePayPage'
import TransferPayPage from '../cpt/list/record/pay/trans/TransferPayPage'
import FreedomHallPage from '../hall/fd/FreedomHallPage'
import GameLobbyPage from '../hall/GameLobbyPage'
import TwoLevelGames from '../hall/TwoLevelGames'
import GameHallPage from '../hall/new/GameHallPage'
import JXHHomePage from '../JXH/JXHHomePage'
import JXHMinePage from '../JXH/JXHMinePage'
import JXHSignInPage from '../JXH/JXHSignInPage'
import JXHSignUpPage from '../JXH/JXHSignUpPage'
import KSHomePage from '../KS/KSHomePage'
import KSMinePage from '../KS/KSMinePage'
import KSSignInPage from '../KS/KSSignInPage'
import KSSignUpPage from '../KS/KSSignUpPage'
import LHTHomePage from '../LHT/LHTHomePage'
import LHTMinePage from '../LHT/LHTMinePage'
import LHTPreferencePage from '../LHT/LHTPreferencePage'
import LHTSignInPage from '../LHT/LHTSignInPage'
import LHTSignUpPage from '../LHT/LHTSignUpPage'
import WNZHomePage from '../WNZ/WNZHomePage'
import WNZMinePage from '../WNZ/WNZMinePage'
import WNZSignInPage from '../WNZ/WNZSignInPage'
import WNZSignUpPage from '../WNZ/WNZSignUpPage'
import LEFHomePage from '../乐FUN/LEFHomePage'
import LEFMinePage from '../乐FUN/LEFMinePage'
import LEFSignInPage from '../乐FUN/LEFSignInPage'
import LEFSignUpPage from '../乐FUN/LEFSignUpPage'
import LCHomePage from '../乐橙/LCHomePage'
import LCLoginPage from '../乐橙/LCLoginPage'
import LCMinePage from '../乐橙/LCMinePage'
import LCRegisterPage from '../乐橙/LCRegisterPage'
import LLHomePage from '../利来/LLHomePage'
import { LLLoginPage } from '../利来/LLLoginPage'
import LLMinePage from '../利来/LLMinePage'
import { LLRegisterPage } from '../利来/LLRegisterPage'
import ZLHomePage from '../尊龙/ZLHomePage'
import ZLLoginPage from '../尊龙/ZLLoginPage'
import ZLMinePage from '../尊龙/ZLMinePage'
import ZLRegisterPage from '../尊龙/ZLRegisterPage'
import { JDPromotionListPage } from '../经典/JDPromotionListPage'
import JDFeedBackPage from '../经典/建议反馈/JDFeedBackPage'
import JDSigInPage from '../经典/签到/JDSigInPage'
import { XBJLoginPage } from '../香槟金/XBJLoginPage'
import { XBJMinePage } from '../香槟金/XBJMinePage'
import { XBJRegisterPage } from '../香槟金/XBJRegisterPage'
import HJGameCategoryPage from '../黑金/cate/HJGameCategoryPage'
import HJHomePage from '../黑金/HJHomePage'
import HJLoginPage from '../黑金/HJLoginPage'
import HJMinePage from '../黑金/HJMinePage'
import HJRegisterPage from '../黑金/HJRegisterPage'
import { UpdateVersionPage } from './UpdateVersionPage'
import BtcPayPage from '../cpt/list/record/pay/btc/BtcPayPage'
import JDRedEnveloperPage from '../经典/红包扫雷/JDRedEnveloperPage'
import JDAgentPage from '../经典/申请代理/JDAgentPage'
import SetPasswordPage from '../base/pwd/SetPasswordPage'
import ForgetPasswordPage from '../base/pwd/ft/ForgetPasswordPage'

import { TransferLineView } from '../../public/components/transfer/TransferLineView'
import BtcTutorialPage from '../cpt/list/record/tt/BtcTutorialPage'
import BetLotteryPage from '../bet/BetLotteryPage'
import JDPromotionCodeListPage from '../经典/邀请码/JDPromotionCodeListPage'
import JDRecommendedIncomePage from '../经典/推荐收益/JDRecommendedIncomePage'
import JDSegmentPage from '../经典/邀请码/JDSegmentPage'
import EmptyPage from '../common/ep/EmptyPage'
import { OnlineService } from '../../public/components/OnlineService'
import JDChangLongPage from '../经典/长龙助手/JDChangLongPage'
import JDBetRecordDetailPage from '../经典/长龙助手/JDBetRecordDetailPage'
import JDBetDetailPage from '../经典/下注明细/JDBetDetailPage'
import JDHomePage from '../经典/首页、我的页、登录、注册/JDHomePage'

import OtherRecord from '../../public/components/OtherRecord'
import JDLotterySecondPage from '../经典/系列界面/JDLotterySecondPage'
import JDDayDetailPage from '../经典/下注明细/下注明细(已结算)/JDDayDetailPage'
import { DoyLoginPage } from '../../../doy/pages/启动页/DoyLoginPage'
import { DoyRegisterPage1 } from '../../../doy/pages/启动页/DoyRegisterPage1'
import { DoyMinePage } from '../../../doy/pages/我的/DoyMinePage'
import { DoyNickNamePage } from '../../../doy/pages/我的/个人资料/DoyNickNamePage'
import { DoyPhoneNumberPage } from '../../../doy/pages/我的/个人资料/DoyPhoneNumberPage'
import { DoySelfIntroductionPage } from '../../../doy/pages/我的/个人资料/DoySelfIntroductionPage'
import { DoyUserInfoEditPage } from '../../../doy/pages/我的/个人资料/DoyUserInfoEditPage'
import { DoyUserInfoPage } from '../../../doy/pages/我的/个人资料/DoyUserInfoPage'
import { DoyChangeLoginPwdPage } from '../../../doy/pages/我的/修改密码/DoyChangeLoginPwdPage'
import { DoyChangePayPwdPage } from '../../../doy/pages/我的/修改密码/DoyChangePayPwdPage'
import { DoyMyCommentPage } from '../../../doy/pages/我的/我的评价/DoyMyCommentPage'
import { DoyPaymentChannlPage } from '../../../doy/pages/我的/收付款方式/DoyPaymentChannlPage'
import { DoyChatDetailPage } from '../../../doy/pages/聊聊/DoyChatDetailPage'
import { DoyChatListPage } from '../../../doy/pages/聊聊/DoyChatListPage'
import { DoyNoticeListPage } from '../../../doy/pages/通知/DoyNoticeListPage'
import { DoyNoticeOrderFeedbackPage } from '../../../doy/pages/通知/DoyNoticeOrderFeedbackPage'
import { DoyNoticeOrderPage } from '../../../doy/pages/通知/DoyNoticeOrderPage'
import { DoyNoticeSentSuccessPage } from '../../../doy/pages/通知/DoyNoticeSentSuccessPage'
import { DoyHomePage } from '../../../doy/pages/首页/首页/DoyHomePage'
import { DoyMyOrderPage } from '../../../doy/pages/首页/我的订单/DoyMyOrderPage'
import { DoySearchOrderPage } from '../../../doy/pages/首页/我的订单/DoySearchOrderPage'
import { DoySearchReultPage } from '../../../doy/pages/首页/我的订单/DoySearchReultPage'
import { DoyNotifySellerPage } from '../../../doy/pages/首页/我要买/DoyNotifySellerPage'
import { DoyPendingPaymentPage } from '../../../doy/pages/首页/我要买/DoyPendingPaymentPage'
import { DoySellOrderPage } from '../../../doy/pages/首页/我要买/DoySellOrderPage'
import { DoyWantBuyPage } from '../../../doy/pages/首页/我要买/DoyWantBuyPage'
import { DoySellOrderConfirmPage } from '../../../doy/pages/首页/我要卖/DoySellOrderConfirmPage'
import { DoySetSellOrderPage } from '../../../doy/pages/首页/我要卖/DoySetSellOrderPage'
import { DoyWantSellPage } from '../../../doy/pages/首页/我要卖/DoyWantSellPage'
import { DoyReceiveCurrencyPage } from '../../../doy/pages/首页/打币收币/DoyReceiveCurrencyPage'
import { DoyTransferCurrencyPage } from '../../../doy/pages/首页/打币收币/DoyTransferCurrencyPage'
import { DoyTransferSuccessPage } from '../../../doy/pages/首页/打币收币/DoyTransferSuccessPage'
import { DoyScanPage } from '../../../doy/pages/首页/扫一扫/DoyScanPage'
import { DoyWalletRecordDetailPage } from '../../../doy/pages/首页/钱包记录/DoyWalletRecordDetailPage'
import { DoyWalletRecordListPage } from '../../../doy/pages/首页/钱包记录/DoyWalletRecordListPage'
import { DoyWalletRecordSearchPage } from '../../../doy/pages/首页/钱包记录/DoyWalletRecordSearchPage'
import { DoyPaymentEditPage } from '../../../doy/pages/我的/收付款方式/DoyPaymentEditPage'
import { DoyRegisterPage2 } from '../../../doy/pages/启动页/DoyRegisterPage2'
import { DoyLaunchPage } from '../../../doy/pages/启动页/DoyLaunchPage'
import JDPromoteDetailPage from '../经典/优惠详情/JDPromoteDetailPage'
import WebPage from '../common/web/WebPage'
import { Platform } from 'react-native'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'


/**
 * 所有界面
 */
const pageComponents: { [key in PageName]?: Function } = {
  // ———————————— 测试页面 —————————————
  JDSegmentPage,
  // ———————————— 通用页面 —————————————
  TransitionPage, //过渡页
  PromotionListPage, //优惠活动列表
  JDPromotionListPage, //优惠活动列表
  PromotionPage, //优惠活动
  GameLobbyPage,  // 游戏大厅主页-默认
  TwoLevelGames,//二级游戏分类
  OtherRecord,//其他投注记录（真人、棋牌、电子、体育、捕鱼、电竞）
  Game3rdView,//游戏
  // 彩票大厅-分组
  GameHallPage, // 彩票大厅-新版
  FreedomHallPage, //彩票大厅-自由版
  SeriesLobbyPage, // 游戏大厅二级页面（xx系列游戏列表）
  TrendView, //开奖走势
  ManageBankListPage, //银行卡管理（我的提款账户列表）
  CapitalPage, //存款取款资金明细
  SetPasswordPage, //设置资金密码
  ForgetPasswordPage, //忘记密码
  AddBankPage, //添加提款账户
  LottoBetting, //下注页（未完成）
  UserMessagePage, //站内信
  UserInfoPage, // 用户信息页
  SafeCenterPage, //安全中心
  ActivityRewardPage, //申请彩金
  LotteryHistoryPage, //彩票投注记录
  JDSigInPage, //签到
  JDFeedBackPage, //建议反馈
  OnlinePayPage, //在线支付
  TransferPayPage, //银行支付
  EmptyPage, //空界面
  BetLotteryPage, //彩票下注
  WebPage, //网页
  BtcPayPage, //虚拟币支付
  BtcTutorialPage, //虚拟币教程
  AlipayView, //利息宝
  AlipayTransferView, //利息宝额度转
  AlipayTransferRecordView, //利息宝记录
  AlipayProfitView, //利息宝收益
  FeedbackView, //建议反馈
  FeedbackSubmitView, //提交反馈
  FeedbackRecordView, //反馈记录
  SupFeedbackSubmitView, //建议反馈记录反馈
  TransferRecordView, //额度转页记录
  JDAgentPage,//申请代理
  JDRedEnveloperPage,//红包扫雷
  TransferView, //额度转页-经典版
  TransferLineView, //额度转页-天空蓝版
  TransferTKLMainView, //额度转页-新版
  JDRecommendedIncomePage,//推荐收益
  JDPromotionCodeListPage,//邀请码
  JDChangLongPage,//长龙主页
  JDBetRecordDetailPage,//长龙注单详情
  JDBetDetailPage,//下注明细
  OnlineService,//在线客服
  JDLotterySecondPage,//2级系列游戏
  JDDayDetailPage,//下注明细明细
  JDPromoteDetailPage,//优惠列表详情
  // ———————————— 模板页面 —————————————

  JDHomePage,// 经典-首页

  LCMinePage, //乐橙-我的页
  LCHomePage, //乐橙-首页
  LCLoginPage, //乐橙-登录
  LCRegisterPage, //乐橙-注册

  LEFMinePage, //乐FUN-我的页
  LEFHomePage, //乐FUN-首页
  LEFSignInPage, //乐FUN-登录
  LEFSignUpPage, //乐FUN-注册

  WNZHomePage, //威尼斯-首页
  WNZMinePage, //威尼斯-我的页
  WNZSignInPage, //威尼斯-登录
  WNZSignUpPage, //威尼斯-注册

  KSHomePage, //凯时-首页
  KSMinePage, //凯时-我的页
  KSSignInPage, //凯时-登录
  KSSignUpPage, //凯时-注册

  JXHSignInPage, //金星黑-登录
  JXHHomePage, //金星黑-首页
  JXHMinePage, //金星黑-我的页
  JXHSignUpPage, //金星黑-注册

  HJHomePage, //黑金-主页
  HJLoginPage, //黑金-登录
  HJRegisterPage, //黑金-注册
  HJMinePage, //黑金-我的
  HJGameCategoryPage, //黑金分类条目

  XBJLoginPage, //香槟金-登录
  XBJRegisterPage, //香槟金-注册
  XBJMinePage, //香槟金-我的页

  ZLHomePage, //尊龙-主页
  ZLMinePage, //尊龙-我的
  ZLLoginPage, //尊龙-登录
  ZLRegisterPage, //尊龙-注册

  LHTHomePage, //六合厅-首页
  LHTMinePage, //六合厅-我的页
  LHTSignInPage, //六合厅-登录
  LHTSignUpPage, //六合厅-注册
  LHTPreferencePage, //六合厅-首页彩种偏好设置

  BYSignInPage, //白曜-登录
  BYSignUpPage, //白曜-注册
  BYHomePage, //白曜-首页
  BYMinePage, //白曜-我的页

  BZHHomePage, //宝石红-首页
  BZHMinePage, //宝石红-我的页
  BZHGameLobbyPage, //宝石红-游戏大厅
  BZHSignUpPage, //宝石红-注册
  BZHSignInPage, //宝石红-登录

  LLHomePage, //利来-首页
  LLMinePage, //利来-我的页
  LLLoginPage, //利来-登录
  LLRegisterPage, //利来-注册

  // Doy钱包
  DoyLaunchPage,  // doy启动页
  DoyLoginPage,//doy登录页
  DoyRegisterPage1,//doy注册步骤1
  DoyRegisterPage2,//doy注册步骤2
  DoyNickNamePage,//doy修改昵称
  DoyPhoneNumberPage,//doy修改手机号
  DoySelfIntroductionPage,//doy
  DoyUserInfoEditPage,//doy编辑个人资料
  DoyUserInfoPage,//doy个人资料
  DoyChangeLoginPwdPage,//doy修改登录密码
  DoyChangePayPwdPage,//doy修改支付密码
  DoyMyCommentPage,//doy我的评论
  DoyPaymentChannlPage,//doy收付款方式
  DoyPaymentEditPage,//doy编辑收付款方式
  DoyMinePage,//doy我的页
  DoyChatDetailPage,//doy聊天页
  DoyChatListPage,//doy聊天列表
  DoyNoticeListPage,//doy通知列表
  DoyNoticeOrderFeedbackPage,//doy通知评价卖方
  DoyNoticeOrderPage,//doy通知订单页
  DoyNoticeSentSuccessPage,//doy通知doy支付成功页
  DoyMyOrderPage,//doy我的订单
  DoySearchOrderPage,//doy查询订单
  DoySearchReultPage,//doy订单查询结果
  DoyNotifySellerPage,//doy告诉卖方
  DoyPendingPaymentPage,//doy待付款
  DoySellOrderPage,//doy卖方订单
  DoyWantBuyPage,//doy我想买
  DoySellOrderConfirmPage,//doy确认卖单设置
  DoySetSellOrderPage,//doy设置卖单
  DoyWantSellPage,//doy我想卖
  DoyReceiveCurrencyPage,//doy收币
  DoyTransferCurrencyPage,//doy打币
  DoyTransferSuccessPage,//doy打币成功
  DoyScanPage,//doy扫一扫
  DoyWalletRecordDetailPage,//doy钱包记录详情
  DoyWalletRecordListPage,//doy钱包记录列表
  DoyWalletRecordSearchPage,//doy钱包记录查询
  DoyHomePage,
}

// TabbarController
class TabBarController extends Component<{ navigation: StackNavigationProp<{}> }> {
  shouldComponentUpdate() {
    return false
  }
  componentDidMount() {
    CodePush.notifyAppReady()
    this.props.navigation.setOptions({ headerStyle: { height: 0 } })
  }
  render() {
    let initialName = null
    switch (Platform.OS) {//暂时保留 兼容旧版本 以后可以删除
      case 'android':
        initialName = ExtUGApplication.tabUI()
        ugLog('tab initialName=', initialName)
        break;
    }

    return (
      <Router.TabNavigator initialRouteName={initialName} screenOptions={{ tabBarVisible: false }} tabBarOptions={{}}>
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UGPage(UpdateVersionPage)} />
        {Object.keys(pageComponents).map((key) => {
          // ugLog('tab page key=', key)
          return <Router.TabScreen name={key} key={key} component={UGPage(pageComponents[key])} />
        })}
      </Router.TabNavigator>
    )
  }
}

const StackScreens = () => {
  let initialName = null
  switch (Platform.OS) {//暂时保留 兼容旧版本 以后可以删除
    case 'android':
      initialName = ExtUGApplication.stackUI()
      ugLog('stack initialName=', initialName)
      break;
  }

  return (
    <Router.StackNavigator initialRouteName={initialName} headerMode={'screen'}>
      <Router.StackScreen name={' '} component={TabBarController} />
      {Object.keys(pageComponents)
        .filter((value) => value.indexOf('Home') <= 0) //过滤掉首页
        .map((key) => {
          // ugLog('stack page key=', key)
          return <Router.StackScreen options={{ headerShown: false }} name={key} key={key} component={UGPage(pageComponents[key])} />
        })}
    </Router.StackNavigator>
  )
}

const UGApplication = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      {StackScreens()}
      <UGLoadingCP />
    </NavigationContainer>
  )
}
export default UGApplication
