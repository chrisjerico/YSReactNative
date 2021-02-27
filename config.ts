import { UGSkinType1 } from './js/rn/public/theme/const/UGSkinConf'
import { isTest } from './js/rn/public/config/CodePushKeys'
import AppDefine from './js/rn/public/define/AppDefine'

// 调试环境配置1
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => {
    return isTest() // 這邊固定寫isTest()
  }, // 是否是测试环境


  // skinKey: UGSkinType1.威尼斯,
  skinKey: UGSkinType1.经典1蓝,
  // skinKey: UGSkinType1.GPK0黑,
  // skinKey: UGSkinType1.香槟金0金,
  // skinKey: UGSkinType1.六合资料,
  // skinKey: UGSkinType1.宝石红

}

// 线上环境配置（这几个站点写死经典模板）
export const appConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  },

  isWNZBottomTabHot: () => AppDefine.inSites('c245,c251,c108'), // 威尼斯首页底部官方玩法改热门彩种，信用玩法改中奖排行
  isBgColorForMoneyVC: () => AppDefine.inSites('c134,test29'), // /**< 存款页面进去的底色为bg色   */
  isHomeWhiteBorder: () => AppDefine.inSites('c213,c012'), // 首页游戏cell加白边
  isHomeShowLXB: () => AppDefine.inSites('c035'),// 首页是否显示利息宝图标
  isShowOneLevel: () => AppDefine.inSites('c085'), //推荐收益只显示一级，
  isHideButtion: () => AppDefine.inSites('c085,c084'), //推荐收益隐藏邀请码，
  isTJXXStyle2: () => AppDefine.inSites('c085'), //推荐信息第2种展示样式（全展示）
}
