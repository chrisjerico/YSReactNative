import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { LanguageContextProvider } from '../../public/context/LanguageContextProvider';
import { PageName } from '../../public/navigation/Navigation';
import { navigationRef } from '../../public/navigation/RootNavigation';
import { Router } from '../../public/navigation/Router';
import { ugLog } from "../../public/tools/UgLog";
import ExtUGApplication from "../../public/tools/ui/ExtUGApplication";
import { UGLoadingCP } from '../../public/widget/UGLoadingCP';
import { TransitionPage } from '../base/TransitionPage';
import UGPage from '../base/UGPage';
import BZHGameLobbyPage from '../BZH/BZHGameLobbyPage';
import BZHHomePage from "../BZH/BZHHomePage";
import BZHMinePage from "../BZH/BZHMinePage";
import BZHRegisterPage from '../BZH/BZHRegisterPage';
import BZHSignInPage from '../BZH/BZHSignInPage';
import LottoBetting from '../common/LottoBetting';
import PromotionListPage from '../common/PromotionListPage';
import LHTHomePage from "../LHT/LHTHomePage";
import LHTMinePage from "../LHT/LHTMinePage";
import LHTPreferencePage from '../LHT/LHTPreferencePage';
import WNZHomePage from '../WNZ/WNZHomePage';
import WNZMinePage from '../WNZ/WNZMinePage';
import LXBView from "../乐橙/component/minePage/LXBView";
import LCHomePage from "../乐橙/LCHomePage";
import LCMinePage from "../乐橙/LCMinePage";
import KSHomePage from '../凯时/KSHomePage';
import KSLogin from '../凯时/KSLoginPage';
import KSMine from '../凯时/KSMinePage';
import KSRegister from '../凯时/KSRegisterPage';
import ZLHomePage from '../尊龙/ZLHomePage';
import ZLLoginPage from '../尊龙/ZLLoginPage';
import ZLMinePage from '../尊龙/ZLMinePage';
import ZLRegisterPage from '../尊龙/ZLRegisterPage';
import { JDPromotionListPage } from '../经典/JDPromotionListPage';
import GameList from '../越南/GameList';
import VietnamHomePage from '../越南/HomePage';
import VietnamLogin from '../越南/LoginPage';
import MinePage from '../越南/MinePage';
import VietnamRegister from '../越南/RegisterPage';
import GDBHomePage from '../金星黑/GDBHomePage';
import GDBMinePage from '../金星黑/GDBMinePage';
import GDLoginPage from '../金星黑/GDLoginPage';
import GDRegisterPage from '../金星黑/GDRegisterPage';
import { XBJHomePage } from '../香槟金/XBJHomePage';
import { XBJLoginPage } from '../香槟金/XBJLoginPage';
import { XBJMinePage } from '../香槟金/XBJMinePage';
import { XBJRegisterPage } from '../香槟金/XBJRegisterPage';
import { UpdateVersionPage } from './UpdateVersionPage';
import WNZSignInPage from '../WNZ/WNZSignInPage';

// TabbarController
class TabBarController extends Component<{
  navigation: StackNavigationProp<{}>,
}> {
  newProps = {
    hideNavBar: true,
    hideTabBar: true,
  }
  tabBarOptions: BottomTabBarOptions = {}

  constructor(props: any) {
    super(props)
    const { navigation } = this.props
    navigation.setOptions({ headerStyle: { height: 0 } })
  }

  render() {
    let initialName = ExtUGApplication.tabUI();
    ugLog('tab initialName=', initialName)

    return (
      <Router.TabNavigator initialRouteName={initialName} screenOptions={{ tabBarVisible: false }}
        tabBarOptions={this.tabBarOptions}>
        <Router.TabScreen name={PageName.LXBView} component={UGPage(LXBView)} />
        <Router.TabScreen name={PageName.VietnamHome} component={UGPage(VietnamHomePage)} />
        <Router.TabScreen name={PageName.LCMinePage} component={UGPage(LCMinePage)} />
        <Router.TabScreen name={PageName.LCHomePage} component={UGPage(LCHomePage)} />
        <Router.TabScreen name={PageName.TransitionPage} component={UGPage(TransitionPage)} />
        <Router.TabScreen name={PageName.XBJLoginPage} component={UGPage(XBJLoginPage)} />
        <Router.TabScreen name={PageName.XBJRegisterPage} component={UGPage(XBJRegisterPage)} />
        <Router.TabScreen name={PageName.XBJMinePage} component={UGPage(XBJMinePage)} />
        <Router.TabScreen name={PageName.XBJHomePage} component={UGPage(XBJHomePage)} />
        <Router.TabScreen name={PageName.ZLHomePage} component={UGPage(ZLHomePage)} />
        <Router.TabScreen name={PageName.ZLMinePage} component={UGPage(ZLMinePage)} />
        <Router.TabScreen name={PageName.PromotionListPage} component={UGPage(PromotionListPage)} />
        <Router.TabScreen name={PageName.LHTHomePage} component={UGPage(LHTHomePage)} />
        <Router.TabScreen name={PageName.LHTMinePage} component={UGPage(LHTMinePage)} />
        <Router.TabScreen name={PageName.BZHHomePage} component={UGPage(BZHHomePage)} />
        <Router.TabScreen name={PageName.BZHMinePage} component={UGPage(BZHMinePage)} />
        <Router.TabScreen name={PageName.GDBHomePage} component={UGPage(GDBHomePage)} />
        <Router.TabScreen name={PageName.GDBMinePage} component={UGPage(GDBMinePage)} />
        <Router.TabScreen name={PageName.WNZHomePage} component={UGPage(WNZHomePage)} />
        <Router.TabScreen name={PageName.WNZMinePage} component={UGPage(WNZMinePage)} />
        <Router.TabScreen name={PageName.KSHomePage} component={UGPage(KSHomePage)} />
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UGPage(UpdateVersionPage)} />
        <Router.TabScreen name={PageName.JDPromotionListPage} component={UGPage(JDPromotionListPage)} />
        <Router.TabScreen name={PageName.VietnamMine} component={UGPage(MinePage)} />
        <Router.TabScreen name={PageName.KSMine} component={UGPage(KSMine)} />
      </Router.TabNavigator>
    );
  }
}

const StackScreens = () => {

  let initialName = ExtUGApplication.stackUI();
  ugLog('stack initialName=', initialName)

  return (
    <Router.StackNavigator initialRouteName={initialName} headerMode={'screen'}>
      <Router.StackScreen name={' '} component={TabBarController} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLLoginPage} component={UGPage(ZLLoginPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLRegisterPage} component={UGPage(ZLRegisterPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.JDPromotionListPage} component={UGPage(JDPromotionListPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.PromotionListPage} component={UGPage(PromotionListPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.GDLoginPage} component={UGPage(GDLoginPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.GDRegisterPage} component={UGPage(GDRegisterPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHRegisterPage} component={UGPage(BZHRegisterPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHSignInPage} component={UGPage(BZHSignInPage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHGameLobbyPage} component={BZHGameLobbyPage} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.WNZSignInPage} component={UGPage(WNZSignInPage)} />

      <Router.StackScreen options={{ headerShown: false }} name={PageName.LottoBetting} component={UGPage(LottoBetting)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLMinePage} component={UGPage(ZLMinePage)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.VietnamLogin} component={UGPage(VietnamLogin)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.VietnamRegister} component={UGPage(VietnamRegister)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.VietnamGameList} component={UGPage(GameList)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.KSLogin} component={UGPage(KSLogin)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.KSRegister} component={UGPage(KSRegister)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.KSMine} component={UGPage(KSMine)} />
      <Router.StackScreen options={{ headerShown: false }} name={PageName.LHTPreferencePage} component={LHTPreferencePage} />
    </Router.StackNavigator >
  )
}

const UGApplication = () => {
  return (
    <LanguageContextProvider>
      <NavigationContainer ref={navigationRef}>
        {StackScreens()}
        <UGLoadingCP />
      </NavigationContainer>
    </LanguageContextProvider>
  )
}
export default UGApplication
// NavController
