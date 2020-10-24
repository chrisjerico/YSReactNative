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
import { TransitionPage } from '../base/TransitionPage'
import UGPage from '../base/UGPage'
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
import WNZGameLobbyPage from '../WNZ/WNZGameLobbyPage'
import WNZHomePage from '../WNZ/WNZHomePage'
import WNZMinePage from '../WNZ/WNZMinePage'
import WNZSignInPage from '../WNZ/WNZSignInPage'
import WNZSignUpPage from '../WNZ/WNZSignUpPage'
import LXBView from '../乐橙/component/minePage/LXBView'
import LCHomePage from '../乐橙/LCHomePage'
import LCMinePage from '../乐橙/LCMinePage'
import LLHomePage from '../利来/LLHomePage'
import { LLLoginPage } from '../利来/LLLoginPage'
import LLMinePage from '../利来/LLMinePage'
import { LLRegisterPage } from '../利来/LLRegisterPage'
import ZLHomePage from '../尊龙/ZLHomePage'
import ZLLoginPage from '../尊龙/ZLLoginPage'
import ZLMinePage from '../尊龙/ZLMinePage'
import ZLRegisterPage from '../尊龙/ZLRegisterPage'
import { JDPromotionListPage } from '../经典/JDPromotionListPage'
import { UpdateVersionPage } from './UpdateVersionPage'

// TabbarController
class TabBarController extends Component<{
  navigation: StackNavigationProp<{}>
}> {
  newProps = {
    hideNavBar: true,
    hideTabBar: true,
  }
  tabBarOptions: BottomTabBarOptions = {}

  constructor(props: any) {
    super(props)
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.props.navigation.setOptions({ headerStyle: { height: 0 } })
  }

  render() {
    const initialName = ExtUGApplication.tabUI()
    ugLog('tab initialName=', initialName)
    return (
      <Router.TabNavigator initialRouteName={initialName} screenOptions={{ tabBarVisible: false }} tabBarOptions={this.tabBarOptions}>
        <Router.TabScreen name={PageName.LXBView} component={UGPage(LXBView)} />
        <Router.TabScreen name={PageName.LCMinePage} component={UGPage(LCMinePage)} />
        <Router.TabScreen name={PageName.LCHomePage} component={UGPage(LCHomePage)} />
        <Router.TabScreen name={PageName.TransitionPage} component={UGPage(TransitionPage)} />
        <Router.TabScreen name={PageName.ZLHomePage} component={UGPage(ZLHomePage)} />
        <Router.TabScreen name={PageName.ZLMinePage} component={UGPage(ZLMinePage)} />
        <Router.TabScreen name={PageName.PromotionListPage} component={UGPage(PromotionListPage)} />
        <Router.TabScreen name={PageName.LHTHomePage} component={UGPage(LHTHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.LHTMinePage} component={UGPage(LHTMinePage)} />
        <Router.TabScreen name={PageName.BZHHomePage} component={UGPage(BZHHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.BZHMinePage} component={UGPage(BZHMinePage)} />
        <Router.TabScreen name={PageName.WNZHomePage} component={UGPage(WNZHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.WNZMinePage} component={UGPage(WNZMinePage)} />
        <Router.TabScreen name={PageName.WNZSignInPage} component={WNZSignInPage} />
        <Router.TabScreen name={PageName.KSHomePage} component={UGPage(KSHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.KSMinePage} component={UGPage(KSMinePage)} />
        <Router.TabScreen name={PageName.JXHHomePage} component={UGPage(JXHHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.JXHMinePage} component={UGPage(JXHMinePage)} />
        <Router.TabScreen name={PageName.BYHomePage} component={UGPage(BYHomePage)} options={{ unmountOnBlur: true }} />
        <Router.TabScreen name={PageName.BYMinePage} component={UGPage(BYMinePage)} />
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UGPage(UpdateVersionPage)} />
        <Router.TabScreen name={PageName.JDPromotionListPage} component={UGPage(JDPromotionListPage)} />
        <Router.TabScreen name={PageName.LLHomePage} component={UGPage(LLHomePage)} />
        <Router.TabScreen name={PageName.LLMinePage} component={UGPage(LLMinePage)} />
        <Router.TabScreen name={PageName.BZHGameLobbyPage} component={BZHGameLobbyPage} />
        <Router.TabScreen name={PageName.WNZGameLobbyPage} component={UGPage(WNZGameLobbyPage)} />
        <Router.TabScreen name={PageName.PromotionPage} component={PromotionPage} />
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
      <Router.StackScreen options={{ headerShown: false }} name={PageName.TrendView} component={UGPage(TrendView)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LLLoginPage} component={UGPage(LLLoginPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LLRegisterPage} component={UGPage(LLRegisterPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLLoginPage} component={UGPage(ZLLoginPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLRegisterPage} component={UGPage(ZLRegisterPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.JDPromotionListPage} component={UGPage(JDPromotionListPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.PromotionListPage} component={UGPage(PromotionListPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.PromotionPage} component={PromotionPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LHTSignInPage} component={LHTSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LHTSignUpPage} component={LHTSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHSignUpPage} component={BZHSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHSignInPage} component={BZHSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.WNZSignInPage} component={WNZSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.WNZSignUpPage} component={WNZSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.WNZMinePage} component={UGPage(WNZMinePage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.KSSignInPage} component={KSSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.KSSignUpPage} component={KSSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.JXHSignInPage} component={JXHSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.JXHSignUpPage} component={JXHSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BYSignInPage} component={BYSignInPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BYSignUpPage} component={BYSignUpPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LottoBetting} component={UGPage(LottoBetting)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLMinePage} component={UGPage(ZLMinePage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LHTPreferencePage} component={LHTPreferencePage} />
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
// NavController
