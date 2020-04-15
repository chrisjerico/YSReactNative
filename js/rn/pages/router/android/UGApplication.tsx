import * as React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';
import codePush from 'react-native-code-push';
import CodePush from 'react-native-code-push';
import AppRouter from './AppRouter';
import {Toast} from '../../../public/tools/ToastUtils';
import {UGStore} from '../../../redux/store/UGStore';

/**
 * Arc
 *
 * 应用程序入口
 */
class UGApplication extends React.Component {
  constructor(props) {
    super(props);
    //初始化颜色模板
    // UGTheme.getInstance().changeTheme(SiteConfig.c199.name);
  }

  render(): React.ReactNode {
    return (
      <Provider store={UGStore.store}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    );
  }

  componentDidMount(): void {
    this.syncImmediate();
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync({installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true}, this.codePushState.bind(this), this.codePushProgress.bind(this));
  }

  codePushState(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        Toast('正在检测新版本...');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        Toast('进行升级中...');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        Toast('等待用户操作...');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        Toast('正在替换升级中...');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        Toast('已经是最新版本了...');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        Toast('用户取消了升级...');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        Toast('已经升级，重新后会是最新版本');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        Toast('未知错误');
        break;
    }
  }

  codePushProgress(progress) {
    Toast('progress=' + progress);
  }
}

let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};
export default CodePush(codePushOptions)(UGApplication);
