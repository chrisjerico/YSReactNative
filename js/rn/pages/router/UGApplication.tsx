import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PageName } from '../../public/navigation/Navigation';
import { navigationRef } from '../../public/navigation/RootNavigation';
import { Router } from '../../public/navigation/Router';
import { UGStore } from '../../redux/store/UGStore';
import TransitionPage from '../base/TransitionPage';
import LXBView from "../乐橙/component/minePage/LXBView";
import LCHomePage from "../乐橙/LCHomePage";
import LCMinePage from "../乐橙/LCMinePage";
import LHTHomePage from "../六合厅/LHTHomePage";
import LHTMinePage from "../六合厅/LHTMinePage";
import WNZHomePage from '../威尼斯/WNZHomePage';
import WNZMinePage from '../威尼斯/WNZMinePage';
import BZHHomePage from "../宝石红/BZHHomePage";
import BZHMinePage from "../宝石红/BZHMinePage";
import BZHRegisterPage from '../宝石红/BZHRegisterPage';
import BZHSignInPage from '../宝石红/BZHSignInPage';
import ZLHomeMine from '../尊龙/ZLHomeMine';
import ZLHomePage from '../尊龙/ZLHomePage';
import ZLLoginPage from '../尊龙/ZLLoginPage';
import ZLRegisterPage from '../尊龙/ZLRegisterPage';
import ZHTYHomePage from "../综合体育/ZHTYHomePage";
import ZHTYLoginPage from '../综合体育/ZHTYLoginPage';
import ZHTYMinePage from '../综合体育/ZHTYMinePage';
import ZHTYRegisterPage from '../综合体育/ZHTYRegisterPage';
import GDBHomePage from '../金星黑/GDBHomePage';
import GDLoginPage from '../金星黑/GDLoginPage';
import XBJHomePage from '../香槟金/XBJHomePage';
import XBJLoginPage from '../香槟金/XBJLoginPage';
import XBJMinePage from '../香槟金/XBJMinePage';
import XBJRegisterPage from '../香槟金/XBJRegisterPage';
import UpdateVersionPage from './UpdateVersionPage';
import GDRegisterPage from '../金星黑/GDRegisterPage';
import JDPromotionListPage from '../经典/JDPromotionListPage';
import PromotionListPage from '../common/PromotionListPage';

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
    return (
      <Router.TabNavigator initialRouteName={PageName.UpdateVersionPage} screenOptions={{ tabBarVisible: false }}
        tabBarOptions={this.tabBarOptions}>
        <Router.TabScreen name={PageName.LXBView} component={LXBView} />
        <Router.TabScreen name={PageName.LCMinePage} component={LCMinePage} />
        <Router.TabScreen name={PageName.LCHomePage} component={LCHomePage} />
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UpdateVersionPage} />
        <Router.TabScreen name={PageName.TransitionPage} component={TransitionPage} />
        <Router.TabScreen name={PageName.XBJLoginPage} component={XBJLoginPage} />
        <Router.TabScreen name={PageName.XBJRegisterPage} component={XBJRegisterPage} />
        <Router.TabScreen name={PageName.XBJMinePage} component={XBJMinePage} />
        <Router.TabScreen name={PageName.XBJHomePage} component={XBJHomePage} />
        <Router.TabScreen name={PageName.ZHTYLoginPage} component={ZHTYLoginPage} />
        <Router.TabScreen name={PageName.ZHTYRegisterPage} component={ZHTYRegisterPage} />
        <Router.TabScreen name={PageName.ZHTYMinePage} component={ZHTYMinePage} />
        <Router.TabScreen name={PageName.ZLHomePage} component={ZLHomePage} />
        <Router.TabScreen name={PageName.ZLMinePage} component={ZLHomeMine} />
        <Router.TabScreen name={PageName.JDPromotionListPage} component={JDPromotionListPage} />
        <Router.TabScreen name={PageName.PromotionListPage} component={PromotionListPage} />
        <Router.TabScreen name={PageName.ZHTYHomePage} component={ZHTYHomePage} />
        <Router.TabScreen name={PageName.LHTHomePage} component={LHTHomePage} />
        <Router.TabScreen name={PageName.LHTMinePage} component={LHTMinePage} />
        <Router.TabScreen name={PageName.BZHHomePage} component={BZHHomePage} />
        <Router.TabScreen name={PageName.BZHMinePage} component={BZHMinePage} />
        <Router.TabScreen name={PageName.GDBHomePage} component={GDBHomePage} />
        <Router.TabScreen name={PageName.WNZHomePage} component={WNZHomePage} />
        <Router.TabScreen name={PageName.WNZMinePage} component={WNZMinePage} />
      </Router.TabNavigator>
    );
  }
}

const UGApplication = () => {
  return (
    <Provider store={UGStore.store}>
      <NavigationContainer ref={navigationRef}>
        <Router.StackNavigator headerMode={'screen'}>
          <Router.StackScreen name={'Tabbar'} component={TabBarController} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLLoginPage} component={ZLLoginPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.ZLRegisterPage} component={ZLRegisterPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.JDPromotionListPage} component={JDPromotionListPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.PromotionListPage} component={PromotionListPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.GDLoginPage} component={GDLoginPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.GDRegisterPage} component={GDRegisterPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHSignInPage} component={BZHSignInPage} />
          <Router.StackScreen options={{ headerShown: false }} name={PageName.BZHRegisterPage} component={BZHRegisterPage} />
        </Router.StackNavigator>
      </NavigationContainer>
    </Provider>
  )
}
export default UGApplication
// NavController
