import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import UGApplication from './js/rn/pages/router/UGApplication'
import AppDefine from './js/rn/public/define/AppDefine'
if (__DEV__) {
  import('./js/rn/public/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  )
}

// 初始化APP配置
AppDefine.setup()

// 注册组件到原生APP
AppRegistry.registerComponent(appName, () => UGApplication)
