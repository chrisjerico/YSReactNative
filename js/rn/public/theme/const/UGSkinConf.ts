import { skin1 } from './../UGSkinManagers';
// 所有模板
export class UGSkinType<T> {
  默认: T = null
  经典1蓝?: T = null
  经典2红?: T = null
  经典3金?: T = null
  经典4绿?: T = null
  经典5褐?: T = null
  经典6淡蓝?: T = null
  经典7深蓝?: T = null
  经典8紫?: T = null
  经典9深红?: T = null
  经典10橘黄?: T = null
  经典11橘红?: T = null
  经典12星空蓝?: T = null
  经典13紫?: T = null
  经典14粉?: T = null
  经典15淡蓝?: T = null
  经典16深紫?: T = null
  经典17金黄?: T = null
  经典18天空灰?: T = null
  经典19忧郁蓝?: T = null
  经典20科技绿?: T = null
  经典21黑?: T = null
  经典22白?: T = null
  新年红?: T = null
  石榴红?: T = null
  六合资料?: T = null
  GPK0黑?: T = null
  GPK1金?: T = null
  金沙?: T = null
  火山橙?: T = null
  香槟金0金?: T = null
  香槟金1黑?: T = null
  香槟金2紫?: T = null
  香槟金3红?: T = null
  香槟金4浅蓝?: T = null
  香槟金5绿?: T = null
  香槟金6蓝?: T = null
  香槟金7小红?: T = null
  香槟金8白?: T = null
  简约0蓝?: T = null
  简约1红?: T = null
  简约2黑?: T = null
  TG?: T = null
  红包0默认?: T = null
  红包1白?: T = null
  红包2红?: T = null
  红包3紫?: T = null
  红包4蓝?: T = null
  综合体育?: T = null
  BET0默认?: T = null
  BET1棕色?: T = null
  六合厅?: T = null
  尊龙?: T = null
  豪华?: T = null
  金星黑?: T = null
  乐橙?: T = null
  利来?: T = null
  宝石红?: T = null
  凯时?: T = null
  威尼斯?: T = null
  六合厅资料?: T = null
  天空蓝?: T = null
  白曜?: T = null
  摩登红?: T = null
  黑金?: T = null
  钴蓝?: T = null
  乐FUN?: T = null
  蔚蓝?: T = null
  新世纪?: T = null
  越南?: T = null
  kikimall?: T = null
  doyWallet?: T = null

  //必须要 = null 或 = undefined（才能获取到key名，也就是模板名）
  constructor(props?: UGSkinType<T>) {
    if (!props) return this

    // 从props初始化
    for (const k in props) {
      const { get, value } = Object.getOwnPropertyDescriptor(props, k)
      if (get) {
        Object.defineProperty(this, k, { get });
      } else {
        this[k] = value
      }
    }

    // 若不存在值就取默认的
    for (const k1 in this) {
      const hasKey = Object.keys(props).filter((k2) => k1 == k2)?.length
      if (!hasKey) {
        Object.defineProperty(this, k1, { get: function () { return this.默认 } });
      }
    }
  }
}
export type st<T> = UGSkinType<T>
// 所有模板的名称
export const UGSkinType1 = (() => {
  const empty = new UGSkinType()
  const skitTypes: UGSkinType<string> = { 默认: null }
  for (const k in empty) {
    skitTypes[k] = k
  }
  return skitTypes
})()


export interface UGSkinConf<String, Number, Boolean> {
  skitType: String // 皮肤类型 String
  mobileTemplateCategory: Number // 模板
  mobileTemplateBackground: Number // 背景图
  mobileTemplateStyle: Number // 风格
  isBlack: Boolean // 是否是黑色主题
  is23: Boolean// 是否是经典23黑模板
}

export const skinConfig: UGSkinConf<st<string>, st<number>, st<boolean>> = {
  skitType: UGSkinType1,
  mobileTemplateCategory: {
    默认: null,
    经典1蓝: 0,
    经典2红: 0,
    经典3金: 0,
    经典4绿: 0,
    经典5褐: 0,
    经典6淡蓝: 0,
    经典7深蓝: 0,
    经典8紫: 0,
    经典9深红: 0,
    经典10橘黄: 0,
    经典11橘红: 0,
    经典12星空蓝: 0,
    经典13紫: 0,
    经典14粉: 0,
    经典15淡蓝: 0,
    经典16深紫: 0,
    经典17金黄: 0,
    经典18天空灰: 0,
    经典19忧郁蓝: 0,
    经典20科技绿: 0,
    经典21黑: 0,
    经典22白: 0,
    新年红: 2,
    石榴红: 3,
    六合资料: 4,
    GPK0黑: 5,
    GPK1金: 5,
    金沙: 6,
    火山橙: 7,
    香槟金0金: 8,
    香槟金1黑: 8,
    香槟金2紫: 8,
    香槟金3红: 8,
    香槟金4浅蓝: 8,
    香槟金5绿: 8,
    香槟金6蓝: 8,
    香槟金7小红: 8,
    香槟金8白: 8,
    简约0蓝: 9,
    简约1红: 9,
    简约2黑: 9,
    综合体育: 12,
    六合厅: 14,
    尊龙: 16,
    金星黑: 18,
    乐橙: 19,
    利来: 20,
    宝石红: 21,
    威尼斯: 23,
    天空蓝: 25,
    白曜: 26,
    摩登红: 27,
    黑金: 28,
    乐FUN: 30,
  },
  mobileTemplateBackground: {
    默认: null,
    经典1蓝: 1,
    经典2红: 2,
    经典3金: 3,
    经典4绿: 4,
    经典5褐: 5,
    经典6淡蓝: 6,
    经典7深蓝: 7,
    经典8紫: 8,
    经典9深红: 9,
    经典10橘黄: 10,
    经典11橘红: 11,
    经典12星空蓝: 12,
    经典13紫: 13,
    经典14粉: 14,
    经典15淡蓝: 15,
    经典16深紫: 16,
    经典17金黄: 17,
    经典18天空灰: 18,
    经典19忧郁蓝: 19,
    经典20科技绿: 20,
    经典21黑: 23,
    经典22白: 22,
  },
  mobileTemplateStyle: {
    默认: null,
    新年红: 0,
    GPK0黑: 0,
    GPK1金: 1,
    香槟金0金: 0,
    香槟金1黑: 1,
    香槟金2紫: 2,
    香槟金3红: 3,
    香槟金4浅蓝: 4,
    香槟金5绿: 5,
    香槟金6蓝: 6,
    香槟金7小红: 7,
    香槟金8白: 8,
    简约0蓝: 0,
    简约1红: 1,
    简约2黑: 2,
  },
  isBlack: {
    默认: false,
    GPK0黑: true,
    香槟金1黑: true,
    尊龙: true,
  },
  is23: { 默认: false },
}
