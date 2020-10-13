import { Platform } from "react-native";
import { OCHelper } from "./js/rn/public/define/OCHelper/OCHelper";


// 调试环境配置
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => { // 是否测试环境
    if (Platform.OS == 'ios') {
      return OCHelper.CodePushKey != '67f7hDao71zMjLy5xjilGx0THS4o4ksvOXqog' && OCHelper.CodePushKey != 'by5lebbE5vmYSJAdd5y0HRIFRcVJ4ksvOXqog';
    }
    return false;
  },

  skinKey: '六合厅',
}


// 线上环境配置（这几个站点写死经典模板）
export const releaseConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  }
}



