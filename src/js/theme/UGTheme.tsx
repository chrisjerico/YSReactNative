import {ThemeColorConfig} from "./config/ThemeColorConfig";
import {SiteConfig} from "../site/SiteConfig";
import IColor from "./color/inter/IColor";
import {UGThemeProvider} from "./provider/UGThemeProvider";

/**
 * 主题操作
 */
export default class UGTheme {

  static _instance: UGTheme;
  static getInstance(): UGTheme {
    if(this._instance == null) {
      this._instance = new UGTheme();
    }
    return this._instance;
  }

  constructor() {
    this.changeTheme(SiteConfig.c199.name)
  }

  _theme: IColor;   //当前的主题
  _themeProvider: object;   //当前的主题控件库

  /**
   * 得到对应站点的主题
   *
   * @param site 站点
   */
  changeTheme(site: string) {
    this._theme = ThemeColorConfig[site];
    this._themeProvider = UGThemeProvider(this._theme);
  }

  /**
   * 当前的主题颜色
   */
  currentTheme(): IColor {
    return this._theme;
  }

  currentThemeProvider(): object {
    return this._themeProvider;
  }

}
