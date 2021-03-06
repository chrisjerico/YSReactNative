import { img_assets } from '../../Res/icon/index';
import { EdgeInsets } from 'react-native-safe-area-context';
import { YueBaoStatModel } from './../network/Model/YueBaoStatModel';
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
  static safeArea: EdgeInsets
  static iOS = Platform.OS == 'ios'
  static onePx = 1 / PixelRatio.get()
  static defaultAvatar = img_assets('money-2')

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


  /**
   * 判断站点（多个站点用英文逗号隔开）
   * @param site
   */
  static inSites(sites?: string): boolean {
    return !!sites?.toLowerCase().split(',').filter((v) => v == AppDefine.siteId?.toLowerCase()).length
  }
}
