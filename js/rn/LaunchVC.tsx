import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Tools
import AppDefine, {ProfileScreenNavigationProp} from './公共类/AppDefine';
import UGSysConfModel from './Model/全局/UGSysConfModel';
import UGSkinManagers, {Skin1} from './公共类/UGSkinManagers';

// 页面
import UpdateVersionVC from './UpdateVersionVC';
import HomePageVC from './模板/默认/HomePageVC';
import XBJMineVC from './模板/香槟金/XBJMineVC';
import XBJLoginVC from './模板/香槟金/XBJLoginVC';
import UGPromotionsController from './模板/默认/UGPromotionsController';
import XBJRegisterVC from './模板/香槟金/XBJRegisterVC';
import FPrototypes from './公共类/FPrototypes';
import {color} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';

// 配置fish拓展方法
FPrototypes.setupAll();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoadingVC() {
  AppDefine.navController?.setOptions({
    title: '',
    headerLeft: () => (
      <Button
        icon={{name: 'chevron-left', size: 32, color: 'white'}}
        iconContainerStyle={{marginLeft: -2}}
        buttonStyle={{backgroundColor: 'transparent'}}
        onPress={() => {
          if (AppDefine.navController.canGoBack()) {
            AppDefine.navController.goBack();
          } else {
            AppDefine.ocCall('UGNavigationController.current.popViewControllerAnimated:', [true]);
          }
        }}
      />
    ),
  });

  return (
    <LinearGradient style={{flex: 1}} colors={Skin1.bgColor}>
      <Text style={{marginTop: AppDefine.height * 0.4, textAlign: 'center', fontSize: 18, color: Skin1.textColor1}}>正在加载中...</Text>
    </LinearGradient>
  );
}

// TabbarController
class TabBarController extends Component<{navigation?: ProfileScreenNavigationProp}> {
  constructor(props) {
    super(props);
    var {navigation} = this.props;
    AppDefine.navController = navigation;
  }
  render() {
    var {navigation} = this.props;
    AppDefine.navController = navigation;

    return (
      <Tab.Navigator initialRouteName="UpdateVersionVC" screenOptions={{tabBarVisible: false}}>
        <Tab.Screen name="UpdateVersionVC" component={UpdateVersionVC} options={{}} />
        <Tab.Screen name="LoadingVC" component={LoadingVC} options={{unmountOnBlur: true}} />
        <Tab.Screen name="XBJLoginVC" component={XBJLoginVC} options={{unmountOnBlur: true}} />
        <Tab.Screen name="XBJRegisterVC" component={XBJRegisterVC} options={{unmountOnBlur: true}} />
        <Tab.Screen name="XBJMineVC" component={XBJMineVC} options={{unmountOnBlur: true}} />
        <Tab.Screen name="UGPromotionsController" component={UGPromotionsController} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
    );
  }
}

// NavController
class Root extends Component {
  render() {
    return (
      <NavigationContainer ref={AppDefine.navigationRef}>
        <Stack.Navigator headerMode="screen">
          <Stack.Screen name="Tabbar" component={TabBarController} options={{headerStyle: {backgroundColor: Skin1.navBarBgColor[0]}, headerTintColor: 'white'}} />
        </Stack.Navigator>
      </NavigationContainer>
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
      Object.assign(UGSysConfModel.current, sysConf);
      // 设置皮肤
      Object.assign(Skin1, UGSkinManagers.sysConf());
    }
    // 配置替换rn的页面
    AppDefine.setRnPageInfo();
  }
  AppDefine.ocCall('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
    setupSysConf(sysConf);
  });
  AppDefine.ocBlocks['UGSystemConfigModel.currentConfig'] = (sysConf: UGSysConfModel) => {
    setupSysConf(sysConf);
  };
}
