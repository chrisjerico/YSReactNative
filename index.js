import { AppRegistry, YellowBox } from 'react-native'
import AppDefine from './js/rn/public/define/AppDefine'
import { name as appName } from './app.json'
import UGApplication from './js/rn/pages/router/UGApplication'
if (__DEV__) {
  import('./js/rn/public/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  )
}
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.', // TODO: Remove when fixed
])
// 初始化APP配置
AppDefine.setup()

// 注册组件到原生APP
AppRegistry.registerComponent(appName, () => UGApplication)
