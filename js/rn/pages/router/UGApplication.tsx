import { BottomTabBarOptions } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { Component } from 'react'
import TrendView from '../../public/components/TrendView'
import { PageName } from '../../public/navigation/Navigation'
import { navigationRef } from '../../public/navigation/RootNavigation'
import { Router } from '../../public/navigation/Router'
import { ugLog } from '../../public/tools/UgLog'
import ExtUGApplication from '../../public/tools/ui/ExtUGApplication'
import { UGLoadingCP } from '../../public/widget/UGLoadingCP'
import PromotionPage from '../base/PromotionPage'
import SafeCenterPage from '../base/SafeCenterPage'
import SeriesLobbyPage from '../base/SeriesLobbyPage'
import { TransitionPage } from '../base/TransitionPage'
import UGPage from '../base/UGPage'
import UserInfoPage from '../base/UserInfoPage'
import UserMessagePage from '../base/UserMessagePage'
import ActivityRewardPage from '../base/ActivityRewardPage'
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
import LXBView from '../乐橙/component/minePage/LXBView'
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
import { JDVirtualCurrencyTutorialPage } from '../经典/JDVirtualCurrencyTutorialPage'
import { XBJLoginPage } from '../香槟金/XBJLoginPage'
import { XBJMinePage } from '../香槟金/XBJMinePage'
import { XBJRegisterPage } from '../香槟金/XBJRegisterPage'
import HJGameCategoryPage from '../黑金/cate/HJGameCategoryPage'
import HJHomePage from '../黑金/HJHomePage'
import HJLoginPage from '../黑金/HJLoginPage'
import HJMinePage from '../黑金/HJMinePage'
import HJRegisterPage from '../黑金/HJRegisterPage'
import { UpdateVersionPage } from './UpdateVersionPage'
import CodePush from 'react-native-code-push'
import LotteryHistoryPage from '../base/LotteryHistoryPage'
import ManageBankListComponent from '../../public/components/bank/list/ManageBankListComponent'
import AddBankComponent from '../../public/components/bank/add/AddBankComponent'
import CapitalPage from '../cpt/list/CapitalPage'
import GameHallPage from '../hall/new/GameHallPage'
import FreedomHallPage from '../hall/fd/FreedomHallPage'
import JDSigInPage from '../经典/签到/JDSigInPage'
import JDFeedBackPage from '../经典/建议反馈/JDFeedBackPage'
import JDWriteMessagePage from '../经典/建议反馈/JDWriteMessagePage'

const pageComponents: [PageName, React.ComponentType<any>][] = [

  // ———————————— 通用页面 —————————————

  [PageName.LXBView, UGPage(LXBView)],//利息宝
  [PageName.JDVirtualCurrencyTutorialPage, UGPage(JDVirtualCurrencyTutorialPage)],//虚拟币充值教程
  [PageName.TransitionPage, UGPage(TransitionPage)],//过渡页
  [PageName.PromotionListPage, UGPage(PromotionListPage)],//优惠活动列表
  [PageName.JDPromotionListPage, UGPage(JDPromotionListPage)],//优惠活动列表
  [PageName.PromotionPage, PromotionPage],//优惠活动
  [PageName.GameHallPage, UGPage(GameHallPage)],///彩票大厅页（样式三）
  [PageName.FreedomHallPage, UGPage(FreedomHallPage)],//自由大厅页
  [PageName.SeriesLobbyPage, UGPage(SeriesLobbyPage)],// 游戏大厅二级页面（xx系列游戏列表）
  [PageName.TrendView, UGPage(TrendView)],//开奖走势
  [PageName.ManageBankListComponent, UGPage(ManageBankListComponent)],//银行卡管理（我的提款账户列表）
  [PageName.CapitalPage, UGPage(CapitalPage)],//存款取款资金明细
  [PageName.AddBankComponent, UGPage(AddBankComponent)],//添加提款账户
  [PageName.LottoBetting, UGPage(LottoBetting)],//下注页（未完成）
  [PageName.UserMessagePage, UGPage(UserMessagePage)],//站内信
  [PageName.UserInfoPage, UGPage(UserInfoPage)],// 用户信息页
  [PageName.SafeCenterPage, UGPage(SafeCenterPage)],//安全中心
  [PageName.ActivityRewardPage, UGPage(ActivityRewardPage)],//申请彩金
  [PageName.LotteryHistoryPage, UGPage(LotteryHistoryPage)],//彩票投注记录
  [PageName.JDSigInPage, UGPage(JDSigInPage)],//签到
  [PageName.JDFeedBackPage, UGPage(JDFeedBackPage)],//建议反馈
  [PageName.JDWriteMessagePage, UGPage(JDWriteMessagePage)],//建议反馈 提交

  // ———————————— 模板页面 —————————————

  [PageName.LCMinePage, UGPage(LCMinePage)],//乐橙-我的页
  [PageName.LCHomePage, UGPage(LCHomePage)],//乐橙-首页
  [PageName.LCLoginPage, UGPage(LCLoginPage)],//乐橙-登录
  [PageName.LCRegisterPage, UGPage(LCRegisterPage)],//乐橙-注册

  [PageName.LEFMinePage, UGPage(LEFMinePage)],//乐FUN-我的页
  [PageName.LEFHomePage, UGPage(LEFHomePage)],//乐FUN-首页
  [PageName.LEFSignInPage, UGPage(LEFSignInPage)],//乐FUN-登录
  [PageName.LEFSignUpPage, UGPage(LEFSignUpPage)],//乐FUN-注册

  [PageName.WNZHomePage, UGPage(WNZHomePage)],//威尼斯-首页
  [PageName.WNZMinePage, UGPage(WNZMinePage)],//威尼斯-我的页
  [PageName.WNZSignInPage, WNZSignInPage],//威尼斯-登录
  [PageName.WNZSignUpPage, WNZSignUpPage],//威尼斯-注册

  [PageName.KSHomePage, UGPage(KSHomePage)],//凯时-首页
  [PageName.KSMinePage, UGPage(KSMinePage)],//凯时-我的页
  [PageName.KSSignInPage, KSSignInPage],//凯时-登录
  [PageName.KSSignUpPage, KSSignUpPage],//凯时-注册

  [PageName.JXHSignInPage, JXHSignInPage],//金星黑-登录
  [PageName.JXHHomePage, UGPage(JXHHomePage)],//金星黑-首页
  [PageName.JXHMinePage, UGPage(JXHMinePage)],//金星黑-我的页
  [PageName.JXHSignUpPage, JXHSignUpPage],//金星黑-注册

  [PageName.HJHomePage, UGPage(HJHomePage)],//黑金-主页
  [PageName.HJLoginPage, UGPage(HJLoginPage)],//黑金-登录
  [PageName.HJRegisterPage, UGPage(HJRegisterPage)],//黑金-注册
  [PageName.HJMinePage, UGPage(HJMinePage)],//黑金-我的
  [PageName.HJGameCategoryPage, UGPage(HJGameCategoryPage)],//黑金分类条目

  [PageName.XBJLoginPage, UGPage(XBJLoginPage)],//香槟金-登录
  [PageName.XBJRegisterPage, UGPage(XBJRegisterPage)],//香槟金-注册
  [PageName.XBJMinePage, UGPage(XBJMinePage)],//香槟金-我的页

  [PageName.ZLHomePage, UGPage(ZLHomePage)], //尊龙-主页
  [PageName.ZLMinePage, UGPage(ZLMinePage)], //尊龙-我的
  [PageName.ZLLoginPage, UGPage(ZLLoginPage)],//尊龙-登录
  [PageName.ZLRegisterPage, UGPage(ZLRegisterPage)],//尊龙-注册

  [PageName.LHTHomePage, UGPage(LHTHomePage)],//六合厅-首页
  [PageName.LHTMinePage, UGPage(LHTMinePage)],//六合厅-我的页
  [PageName.LHTSignInPage, LHTSignInPage],//六合厅-登录
  [PageName.LHTSignUpPage, LHTSignUpPage],//六合厅-注册
  [PageName.LHTPreferencePage, LHTPreferencePage],//六合厅-首页彩种偏好设置

  [PageName.BYSignInPage, BYSignInPage],//白曜-登录
  [PageName.BYSignUpPage, BYSignUpPage],//白曜-注册
  [PageName.BYHomePage, UGPage(BYHomePage)], //白曜-首页
  [PageName.BYMinePage, UGPage(BYMinePage)],//白曜-我的页

  [PageName.BZHHomePage, UGPage(BZHHomePage)],//宝石红-首页
  [PageName.BZHMinePage, UGPage(BZHMinePage)],//宝石红-我的页
  [PageName.BZHGameLobbyPage, BZHGameLobbyPage],//宝石红-游戏大厅
  [PageName.BZHSignUpPage, BZHSignUpPage],//宝石红-注册
  [PageName.BZHSignInPage, BZHSignInPage],//宝石红-登录

  [PageName.LLHomePage, UGPage(LLHomePage)],//利来-首页
  [PageName.LLMinePage, UGPage(LLMinePage)],//利来-我的页
  [PageName.LLLoginPage, UGPage(LLLoginPage)],//利来-登录
  [PageName.LLRegisterPage, UGPage(LLRegisterPage)],//利来-注册

]





// TabbarController
class TabBarController extends Component<{ navigation: StackNavigationProp<{}> }> {
  shouldComponentUpdate() { return false }
  componentDidMount() {
    CodePush.notifyAppReady()
    this.props.navigation.setOptions({ headerStyle: { height: 0 } })
  }
  render() {
    const initialName = ExtUGApplication.tabUI()
    ugLog('tab initialName=', initialName)
    return (
      <Router.TabNavigator initialRouteName={initialName} screenOptions={{ tabBarVisible: false }} tabBarOptions={{}}>
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UGPage(UpdateVersionPage)} />
        {pageComponents.map(({ 0: page, 1: component }) => {
          return <Router.TabScreen name={page} component={component} />
        })}
      </Router.TabNavigator>
    )
  }
}

const StackScreens = () => {
  const initialName = ExtUGApplication.stackUI()
  ugLog('stack initialName=', initialName)
  return (
    <Router.StackNavigator initialRouteName={initialName} headerMode={'screen'}>
      <Router.StackScreen name={' '} component={TabBarController} />
      {pageComponents.map(({ 0: page, 1: component }) => {
        if (page.indexOf('Home') == -1) {
          return <Router.StackScreen options={{ headerShown: false }} name={page} component={component} />
        }
      }).filter((v) => {
        if (v) return v;
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
