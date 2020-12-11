import { Platform } from 'react-native'
import { isTest } from './js/rn/public/config/CodePushKeys'
import { OCHelper } from './js/rn/public/define/OCHelper/OCHelper'


// 调试环境配置
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => {
    return true
  }, // 是否是测试环境

  skinKey: '乐橙',
}


// 线上环境配置（这几个站点写死经典模板）
export const releaseConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  }
}



