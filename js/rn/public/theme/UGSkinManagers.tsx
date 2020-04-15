import {UGThemeColor} from './UGThemeColor';
import {XBJThemeColor} from './colors/XBJThemeColor';
import {JDThemeColor} from './colors/JDThemeColor';
import {JYThemeColor} from './colors/JYThemeColor';
import {LHThemeColor} from './colors/LHThemeColor';
import {XNHThemeColor} from './colors/XNHThemeColor';
import {OtherThemeColor} from './colors/OtherThemeColor';
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel';
import chroma from 'chroma-js';
import FUtils from '../tools/FUtils';

export default class UGSkinManagers extends UGThemeColor {
  static allThemeColor: {[x: string]: UGThemeColor} = {
    ...JDThemeColor, // 经典
    ...JYThemeColor, // 简约
    ...LHThemeColor, // 六合
    ...XBJThemeColor, // 香槟金
    ...XNHThemeColor, // 新年红
    ...OtherThemeColor, // 其他
  };

  // 更新皮肤
  static updateSkin(sysConf: UGSysConfModel) {
    const {
      mobileTemplateCategory, // 模版分类ID
      mobileTemplateBackground, // 模板ID（经典）
      mobileTemplateStyle, // 模版ID（新年红 简约 香槟金）
      mobileTemplateLhcStyle, // 模板ID（六合）
    } = sysConf;
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
    };
    let key = dict[mobileTemplateCategory];
    // key = '香槟金7';
    let theme = {...new UGThemeColor(), ...this.allThemeColor[key]};
    theme.themeColor = theme.themeColor ?? chroma.scale(theme.navBarBgColor)(0.5).hex();
    theme.themeDarkColor = theme.themeDarkColor ?? chroma(theme.themeColor).darken().hex();
    theme.themeLightColor = theme.themeLightColor ?? chroma(theme.themeColor).brighten().hex();
    console.log(theme.themeColor);
    console.log(theme.themeDarkColor);
    console.log(theme.themeLightColor);

    let skin = new UGSkinManagers();
    Object.assign(skin, Skin1);
    Object.assign(skin, theme);
    if (!FUtils.isExactlyEqual(skin, Skin1)) {
      Object.assign(Skin1, skin);
      console.log('当前为皮肤：' + skin.skitString);
    }
  }
}

export let Skin1 = new UGSkinManagers();
