import { ANHelper } from './ANHelper/ANHelper'
import { Dimensions, PixelRatio, Platform } from 'react-native'
import { OCHelper } from './OCHelper/OCHelper'
import FPrototypes from '../tools/prototype/FPrototypes'
import { UGStore } from '../../redux/store/UGStore'
import { navigationRef } from '../navigation/RootNavigation'

export default class AppDefine {
  static host = 'http://450app.cc' // 接口域名
  static siteId = '未知站点'
  static width = Dimensions.get('window').width
  static height = Dimensions.get('window').height
  static iOS = Platform.OS == 'ios'
  static onePx = 1 / PixelRatio.get()

  static isTest() {
    if (Platform.OS == 'ios') {
      return OCHelper.CodePushKey != '67f7hDao71zMjLy5xjilGx0THS4o4ksvOXqog' && OCHelper.CodePushKey != 'by5lebbE5vmYSJAdd5y0HRIFRcVJ4ksvOXqog'
    }
    return false
  }

  static checkHeaderShowBackButton(callback: (show: boolean) => void) {
    if (Platform.OS != 'ios') return
    OCHelper.call('UGNavigationController.current.viewControllers.count').then((ocCount) => {
      const show = ocCount > 1 || navigationRef?.current?.getRootState().routes.length > 1
      callback(show)
    })
  }

  static setup() {
    // 配置fish拓展方法
    FPrototypes.setupAll()

    // 读取本地缓存到Store
    UGStore.refreshFromLocalData()

    switch (Platform.OS) {
      case 'ios':
        OCHelper.setup()
        break
      case 'android':
        ANHelper.setup()
        break
    }
  }
}
