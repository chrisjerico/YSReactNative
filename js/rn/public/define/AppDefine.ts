import { ANHelper } from './ANHelper/ANHelper';
import { Dimensions, Platform } from 'react-native';
import { OCHelper } from './OCHelper/OCHelper';
import FPrototypes from '../tools/prototype/FPrototypes';
import { UGStore } from '../../redux/store/UGStore';

export default class AppDefine {
  static host = 'http://c91398.com'; // 接口域名
  static siteId = '未知站点';
  static width = Dimensions.get('window').width;
  static height = Dimensions.get('window').height;
  static iOS = Platform.OS == 'ios';

  static setup() {
    // 配置fish拓展方法
    FPrototypes.setupAll();

    // 读取本地缓存到Store
    UGStore.refreshFromLocalData();

    // 原生交互相关配置
    if (Platform.OS == 'ios') {
      OCHelper.setup();
    } else {
      ANHelper.setup();
    }
  }
}
