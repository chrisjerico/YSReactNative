import chroma from 'chroma-js'
import { Platform } from 'react-native'
import { devConfig, releaseConfig } from '../../../../config'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import AppDefine from '../define/AppDefine'
import { NSValue } from '../define/OCHelper/OCBridge/OCCall'
import { OCHelper } from '../define/OCHelper/OCHelper'
import FUtils from '../tools/FUtils'
import { BYThemeColor } from './colors/BYThemeColor'
import { BZHThemeColor } from './colors/BZHThemeColor'
import { JDThemeColor } from './colors/JDThemeColor'
import { JXHThemeColor } from './colors/JXHThemeColor'
import { JYThemeColor } from './colors/JYThemeColor'
import { KSThemeColor } from './colors/KSThemeColor'
import { LCThemeColor } from './colors/LCThemeColor'
import { LHThemeColor } from './colors/LHThemeColor'
import { LLThemeColor } from './colors/LLThemeCololr'
import { OtherThemeColor } from './colors/OtherThemeColor'
import { WNZThemeColor } from './colors/WNZThemeColor'
import { XNHThemeColor } from './colors/XNHThemeColor'
import { ZLThemeColor } from './colors/ZLThemeColor'
import { UGThemeColor } from './UGThemeColor'

export default class UGSkinManagers extends UGThemeColor {
  static allThemeColor: { [x: string]: UGThemeColor } = {
    ...JDThemeColor, // 经典
    ...JYThemeColor, // 简约
    ...XNHThemeColor, // 新年红
    ...ZLThemeColor, //尊龙
    ...LCThemeColor, //乐橙
    ...LLThemeColor, // 利来
    ...BZHThemeColor, // 宝石红
    ...WNZThemeColor, // 威尼斯
    ...LHThemeColor, // 六合
    ...JXHThemeColor, // 金星黑
    ...KSThemeColor, // 凯时
    ...BYThemeColor, // 白曜
    ...OtherThemeColor, // 其他
  }

  // 更新皮肤
  static async updateSkin(sysConf: UGSysConfModel) {
    const {
      mobileTemplateCategory, // 模版分类ID
      mobileTemplateBackground, // 模板ID（经典）
      mobileTemplateStyle, // 模版ID（新年红 简约 香槟金）
      mobileTemplateLhcStyle, // 模板ID（六合）
    } = sysConf
    let dict = {
      0: `经典${mobileTemplateBackground}`,
      2: `新年红${mobileTemplateStyle}`,
      3: '石榴红',
      4: `六合资料${mobileTemplateLhcStyle}`,
      5: '黑色模板',
      6: '金沙主题',
      7: '火山橙',
      8: `香槟金${mobileTemplateStyle}`,
      9: `简约模板${mobileTemplateStyle}`,
      12: '综合体育',
      14: '六合厅',
      16: '尊龙',
      18: '金星黑',
      19: '乐橙',
      20: '利来',
      22: '凯时',
      21: '宝石红',
      23: '威尼斯',
      25: '天空蓝',
      26: `白曜`,
      277: `越南`,//这个值 要与 后台站点一致
      27: `摩登红`,
      28: `黑金`,
    }
    console.log('pi fu =', mobileTemplateCategory)
    let key = dict[mobileTemplateCategory]
    key = releaseConfig.skinKeys[AppDefine.siteId] ?? key
    if (devConfig.isDebug) {
      devConfig?.skinKey && (key = devConfig?.skinKey)
    }
    let theme = { ...new UGThemeColor(), ...this.allThemeColor[key] }
    theme.themeColor = theme.themeColor ?? chroma.scale(theme.navBarBgColor)(0.5).hex()
    theme.themeDarkColor = theme.themeDarkColor ?? chroma(theme.themeColor).darken().hex()
    theme.themeLightColor = theme.themeLightColor ?? chroma(theme.themeColor).brighten().hex()
    theme.bgTextColor = chroma(theme.bgColor[0]).hex() == '#ffffff' ? '#999' : 'white'
    let skin = new UGSkinManagers()
    Object.assign(skin, Skin1)
    Object.assign(skin, theme)
    if (!FUtils.isExactlyEqual(skin, Skin1)) {
      Skin1 = skin
      console.log('当前为皮肤：' + skin.skitString, skin)
    }
    await this.updateOcSkin()
  }

  // 应用主题色到iOS原生代码
  static async updateOcSkin() {
    const skin = Skin1
    if (Platform.OS != 'ios') {
      return
    }
    // 已上线模板
    const isOnlineSkin = (
      skin.skitType.indexOf('尊龙') != -1 ||
      skin.skitType.indexOf('香槟金') != -1 ||
      skin.skitType.indexOf('宝石红') != -1
    );
    const ok = devConfig.isDebug || devConfig.isTest() || isOnlineSkin
    if (!ok) return

    //
    await OCHelper.call('UGSkinManagers.currentSkin.setValuesWithDictionary:', [skin])
    for (const k in skin) {
      if (k.toLowerCase().indexOf('color') != -1) {
        const v: string | string[] = skin[k]
        const key = `_${k}`
        if (v instanceof Array) {
          // 渐变色
          const c1 = chroma(v[0]).hex().slice(0, 7)
          const a1 = chroma(v[0]).alpha()
          const c2 = chroma(v[1]).hex().slice(0, 7)
          const a2 = chroma(v[1]).alpha()
          await OCHelper.call('UGSkinManagers.currentSkin.setValue:forKey:', [
            {
              selectors: 'UIColor.colorWithPatternImage:',
              args1: [
                {
                  selectors: 'UIImage.gradientImageWithBounds:andColors:andGradientType:',
                  args1: [
                    NSValue.CGRectMake(0, 0, AppDefine.width, AppDefine.height),
                    [
                      {
                        selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
                        args1: [c1],
                        args2: [a1],
                      },
                      {
                        selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
                        args1: [c2],
                        args2: [a2],
                      },
                    ],
                    1,
                  ],
                },
              ],
            },
            key,
          ])
        } else {
          // 非渐变色
          const c = chroma(v).hex().slice(0, 7)
          const a = chroma(v).alpha()
          await OCHelper.call('UGSkinManagers.currentSkin.setValue:forKey:', [
            {
              selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
              args1: [c],
              args2: [a],
            },
            key,
          ])
        }
      }
    }
    // 刷新标签栏、导航条
    await OCHelper.call('UGTabbarController.shared.setTabbarStyle')
    // 刷新状态栏
    await OCHelper.call('UGTabbarController.shared.view.viewWithTagString:.setBackgroundColor:', ['状态栏背景View', { selectors: 'UGSkinManagers.currentSkin.navBarBgColor' }])

    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationWithSkinSuccess'])
  }
}

export let Skin1 = new UGSkinManagers()
