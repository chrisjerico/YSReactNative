import React, {Component} from 'react';
import {AppRegistry, Platform, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {Button, ThemeProvider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// Tools
import AppDefine from '../../../public/define/AppDefine';
import FPrototypes from '../../../public/tools/prototype/FPrototypes';
import UGSkinManagers, {Skin1} from '../../../public/theme/UGSkinManagers';

// // 页面
import UpdateVersionVC from './UpdateVersionVC';
import XBJMineVC from '../../香槟金/XBJMineVC';
import XBJRegisterVC from '../../香槟金/XBJRegisterVC';
import XBJLoginVC from '../../香槟金/XBJLoginVC';
import UGPromotionsController from '../../经典/UGPromotionsController';
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {configureStore} from '../../../../../src/js/redux/store/Store';
import HomePage from '../../../../../src/js/pages/main/home/HomePage';

// 配置fish拓展方法
FPrototypes.setupAll();

function LoadingVC() {
  return (
    <LinearGradient style={{flex: 1}} colors={Skin1.bgColor}>
      <Text style={{marginTop: AppDefine.height * 0.4, textAlign: 'center', fontSize: 18, color: Skin1.textColor1}}>正在加载中...</Text>
    </LinearGradient>
  );
}

// NavController
class Root extends Component {
  renderLeftButton() {
    return (
      <Button
        buttonStyle={{backgroundColor: 'transparent'}}
        icon={{name: 'ios-arrow-back', size: 30, type: 'ionicon', color: 'white'}}
        onPress={() => {
          AppDefine.ocCall('UGNavigationController.current.popViewControllerAnimated:', [true]);
        }}
      />
    );
  }

  render() {
    return (
      <Provider store={configureStore}>
        <ThemeProvider>
          <Router>
            <Stack navigationBarStyle={{backgroundColor: Skin1.navBarBgColor[0]}} tintColor="white">
              <Scene key="UpdateVersionVC" component={UpdateVersionVC} renderLeftButton={this.renderLeftButton} />
              <Scene key="XBJLoginVC" component={XBJLoginVC} hideNavBar />
              <Scene key="XBJRegisterVC" component={XBJRegisterVC} hideNavBar />
              <Scene key="XBJMineVC" component={XBJMineVC} title="我的" renderLeftButton={this.renderLeftButton} />
              <Scene key="LoadingVC" component={LoadingVC} renderLeftButton={this.renderLeftButton} />
              <Scene key="UGPromotionsController" component={UGPromotionsController} title="优惠活动" renderLeftButton={this.renderLeftButton} />
              <Scene key="HomePage" component={HomePage} hideNavBar />
            </Stack>
          </Router>
        </ThemeProvider>
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
      Object.assign(UGSysConfModel.current, sysConf);
      // 设置皮肤
      Object.assign(Skin1, UGSkinManagers.sysConf());
    }
    // 配置替换rn的页面
    AppDefine.setRnPageInfo();
  }

  if (Platform.OS == 'ios') {
    AppDefine.ocCall('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
      setupSysConf(sysConf);
    });
  }
  AppDefine.ocBlocks['UGSystemConfigModel.currentConfig'] = (sysConf: UGSysConfModel) => {
    setupSysConf(sysConf);
  };
}
