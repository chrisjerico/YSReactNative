import chroma from 'chroma-js'
import { devConfig, releaseConfig } from '../../../../config'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import AppDefine from '../define/AppDefine'
import { skinColors, UGSkinColor } from './const/UGSkinColor'
import { skinStyles, UGSkinStyle } from './const/UGSkinStyle'
import { skinConfig, st, UGSkinConf, UGSkinType, UGSkinType1 } from './const/UGSkinConf'
import { updateOcSkin } from './OCSkinManager'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export default class UGSkinManagers {
  static once = false

  // 更新皮肤
  static async updateSkin(sysConf: UGSysConfModel) {
    let skinType = this.getSkinTypeString(sysConf)
    console.log('sysConf的模板：', skinType)

    // 单站写死模板
    skinType = releaseConfig.skinKeys[AppDefine.siteId] ?? skinType
    // 本地调试模板
    if (devConfig.isDebug) {
      devConfig?.skinKey && (skinType = devConfig?.skinKey)
    }
    // 这里必须写两遍（因为第一遍时 getter 取的 skin1 值是空的）
    skin1 = Skin1 = this.getSkinValue(skinType)
    skin1 = Skin1 = this.getSkinValue(skinType)
    // console.log('rnSkinColor = ', skin1);
    console.log('当前为皮肤：' + skinType)
    await updateOcSkin()
  }

  // 从sysConf获取对应模板名
  static getSkinTypeString(sysConf: UGSysConfModel): string {
    const {
      mobileTemplateCategory, // 模版分类ID
      mobileTemplateBackground, // 模板ID（经典）
      mobileTemplateStyle, // 模版ID（新年红 简约 香槟金）
      mobileTemplateLhcStyle, // 模板ID（六合）
    } = sysConf

    for (const k1 in skinConfig.mobileTemplateCategory) {
      const mtc = skinConfig.mobileTemplateCategory[k1]
      const mtb = skinConfig.mobileTemplateBackground[k1]
      const mts = skinConfig.mobileTemplateStyle[k1]

      if (mtc == mobileTemplateCategory) {
        if (!mtb || mtb == mobileTemplateBackground) {
          if (!mts || mts == mobileTemplateStyle) {
            return k1
          }
        }
      }
    }
    return undefined
  }

  // 根据模板名获取当前模板信息
  static getSkinValue(skit: string) {
    const tmp: any = {}
    const skin: UGCurrentSkinValue = tmp

    function addParams(target, source) {
      for (const k in source) {
        const obj: st<any> = source[k]
        if (Object.keys(obj).filter((v) => v == UGSkinType1.默认)?.length) {
          target[k] = obj[skit] ?? obj.默认
        } else {
          addParams(target[k] = {}, obj)
        }
      }
    }
    addParams(skin, skinColors)
    addParams(skin, skinConfig)
    addParams(skin, skinStyles)

    skin.themeColor = skin.themeColor ?? chroma.scale(skin.navBarBgColor)(0.5).hex()
    skin.themeDarkColor = skin.themeDarkColor ?? chroma(skin.themeColor).darken().hex()
    skin.themeLightColor = skin.themeLightColor ?? chroma(skin.themeColor).brighten().hex()
    skin.bgTextColor = chroma(skin.bgColor[0]).luminance() > 0.5 ? '#999' : 'white'
    return skin
  }

  static convertToSkinType(data) {
    function convert(target) {
      for (const k1 in target) {
        const obj: st<any> = target[k1]
        if (Object.keys(obj).filter((k2) => k2 == UGSkinType1.默认)?.length) {
          target[k1] = new UGSkinType(obj)
        } else {
          convert(obj)
        }
      }
    }
    convert(data)
  }
}


// 当前皮肤信息
type UGCurrentSkinValue = UGSkinColor<string, string[]> & UGSkinConf<string, number, boolean> & UGSkinStyle<ViewStyle | TextStyle | ImageStyle>
const tmp: any = {}
export let skin1: UGCurrentSkinValue = tmp
export let Skin1 = skin1


// 初始化所有皮肤的配置信息
if (!UGSkinManagers.once) {
  UGSkinManagers.once = true
  UGSkinManagers.convertToSkinType(skinConfig)
  UGSkinManagers.convertToSkinType(skinColors)
  UGSkinManagers.convertToSkinType(skinStyles)
}
