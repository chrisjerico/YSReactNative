import { UGSkinType1 } from './js/rn/public/theme/const/UGSkinConf';
import { isTest } from './js/rn/public/config/CodePushKeys'
import AppDefine from './js/rn/public/define/AppDefine';

// 调试环境配置
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => {
    return isTest() // 這邊固定寫isTest()
  }, // 是否是测试环境

  // skinKey: 'GPK版0',
  skinKey: UGSkinType1.威尼斯,
}

// 线上环境配置（这几个站点写死经典模板）
export const appConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  },

  isWNZBottomTabHot: () => AppDefine.inSites('c245,c251') // 威尼斯首页底部官方玩法改热门彩种，信用玩法改中奖排行
}
