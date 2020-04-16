import React, {Component} from 'react';
import {AppRegistry, Platform} from 'react-native';
import {Provider} from 'react-redux';

// Tools
import AppDefine from '../../../public/define/AppDefine';
import FPrototypes from '../../../public/tools/prototype/FPrototypes';
import UGSkinManagers from '../../../public/theme/UGSkinManagers';

// 页面
import UpdateVersionPage from './UpdateVersionPage';
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel';
import {UGStore} from '../../../redux/store/UGStore';
import XBJLoginPage from '../../香槟金/XBJLoginPage';
import XBJRegisterPage from '../../香槟金/XBJRegisterPage';
import XBJMinePage from '../../香槟金/XBJMinePage';
import JDPromotionListPage from '../../经典/JDPromotionListPage';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';
import {PageName} from '../Navigation';
import {Router} from '../Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {setRnPageInfo} from './SetRnPageInfo';
import LoadingPage from '../../base/LoadingPage';
import XBJHomePage from '../../香槟金/XBJHomePage';
import {ActionType} from '../../../redux/store/ActionTypes';

// 配置fish拓展方法
FPrototypes.setupAll();

// TabbarController
class TabBarController extends Component<{navigation: StackNavigationProp<{}>}> {
  newProps = {
    hideNavBar: true,
    hideTabBar: true,
  };
  tabBarOptions: BottomTabBarOptions = {};

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    navigation.setOptions({headerStyle: {height: 0}});
  }
  render() {
    return (
      <Router.TabNavigator initialRouteName={PageName.UpdateVersionPage} screenOptions={{tabBarVisible: false}} tabBarOptions={this.tabBarOptions}>
        <Router.TabScreen name={PageName.UpdateVersionPage} component={UpdateVersionPage} />
        <Router.TabScreen name={PageName.LoadingPage} component={LoadingPage} />
        <Router.TabScreen name={PageName.XBJLoginPage} component={XBJLoginPage} />
        <Router.TabScreen name={PageName.XBJRegisterPage} component={XBJRegisterPage} />
        <Router.TabScreen name={PageName.XBJMinePage} component={XBJMinePage} />
        <Router.TabScreen name={PageName.JDPromotionListPage} component={JDPromotionListPage} />
        <Router.TabScreen name={PageName.XBJHomePage} component={XBJHomePage} options={{unmountOnBlur: false}} />
      </Router.TabNavigator>
    );
  }
}

// NavController
class Root extends Component {
  render() {
    return (
      <Provider store={UGStore.store}>
        <NavigationContainer>
          <Router.StackNavigator headerMode="screen">
            <Router.StackScreen name="Tabbar" component={TabBarController} />
          </Router.StackNavigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

// 注册组件到原生APP（ReactNativeVC）
AppRegistry.registerComponent('Main', () => Root);

// 初始化 AppDefine
AppDefine.setup();

// 获得系统配置信息
{
  function setupSysConf(sysConf: UGSysConfModel) {
    if (sysConf) {
      // 设置当前配置
      UGStore.dispatch({type: ActionType.UpdateSysConf, props: sysConf});

      // 设置皮肤
      UGSkinManagers.updateSkin(sysConf);
    }
    // 配置替换rn的页面
    setRnPageInfo();
  }

  if (Platform.OS == 'ios') {
    AppDefine.ocCall('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
      setupSysConf(sysConf);
    });
    AppDefine.ocBlocks['UGSystemConfigModel.currentConfig'] = (sysConf: UGSysConfModel) => {
      setupSysConf(sysConf);
    };
  }
}
