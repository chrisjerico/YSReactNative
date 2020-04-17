import {AppRegistry} from 'react-native';
import AppDefine from './js/rn/public/define/AppDefine';
import {name as appName} from './app.json';
import UGApplication from './js/rn/pages/router/UGApplication';

// 初始化APP配置
AppDefine.setup();

// 注册组件到原生APP
AppRegistry.registerComponent(appName, () => UGApplication);
