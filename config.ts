import { isTest } from './js/rn/public/config/CodePushKeys'
// 调试环境配置
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => {
    return isTest() // 這邊固定寫isTest()
  }, // 是否是测试环境

  skinKey: '威尼斯',
}

// 线上环境配置（这几个站点写死经典模板）
export const releaseConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  },
}
