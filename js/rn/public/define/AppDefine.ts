import { ANHelper } from './ANHelper/ANHelper';
import { Dimensions, Platform } from 'react-native';
import { OCHelper } from './OCHelper/OCHelper';
import FPrototypes from '../tools/prototype/FPrototypes';
import { UGStore } from '../../redux/store/UGStore';

export default class AppDefine {
  static host = 'http://450app.cc'; // 接口域名
  static siteId = '未知站点';
  static width = Dimensions.get('window').width;
  static height = Dimensions.get('window').height;
  static iOS = Platform.OS == 'ios';

  static setup() {
    // 配置fish拓展方法
    FPrototypes.setupAll();

    // 读取本地缓存到Store
    UGStore.refreshFromLocalData();

    switch (Platform.OS) {
      case 'ios':
        OCHelper.setup();
        break;
      case 'android':
        ANHelper.setup();
        break;
    }
  }
}
