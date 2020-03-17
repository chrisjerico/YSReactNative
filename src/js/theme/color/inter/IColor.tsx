/**
 * 颜色模板
 */
export default interface IColor {
  white: string,
  black: string,
  grey: string,
  transparent: string,

  // BEGIN: primary, secondary 以及这些颜色 控件会使用到, 不实现，默认使用控件自己的颜色
  grey0?: string,
  grey1?: string,
  grey2?: string,
  grey3?: string,
  grey4?: string,
  grey5?: string,
  greyOutline?: string,
  searchBg?: string,
  success?: string,
  error?: string,
  warning?: string,
  divider?: string,
  // END: 控件模板会用到这些颜色

  primary: string,     //主题色
  primaryDark: string,   //主题色加深
  primaryBright: string,    //主题色加浅

  secondary: string,     //次主题色

  colorAccent: string,   //突出色，线条，进度条，输入框 等颜色
  colorAccentDark: string,   //突出色加深，线条，进度条，输入框 等颜色
  colorAccentBright: string,    //突出色加浅，线条，进度条，输入框 等颜色

  // 主要文本
  colorTitle: string,        // 标题色
  colorTitleSecondary: string,        // 次标题色

  colorText: string,           // 主文本色
  colorTextSecondary: string,  // 次文本色
  colorTextNormal: string,  // 普通文本色
  colorTextTint: string,    //提示文本

  // background
  colorBackground: string,   //背影色
  colorSecondBackground: string,   //次背影色
  loadingBackground: string,   //加载背影色

  // 按钮相关
  colorBtn: string,   //按钮背影色
  colorBtnText: string,  //按钮文本色

  homeMoney: string, //主页金额
}
