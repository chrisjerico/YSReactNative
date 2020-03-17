/**
 * 红色模板
 */
import {CommonColors} from "./CommonColors";
import IColor from "./inter/IColor";

export const ColorBlue: IColor = {
  ...CommonColors,
  primary: '#0000ff',     //主题色
  primaryDark: '#0000ff',     //主题色加深
  primaryBright: '#0000ff33',     //主题色加浅

  secondary: '#0000aa',      //次主题色

  colorAccent: '#0000ff',     //突出色，线条，进度条，输入框 等颜色
  colorAccentDark: '#0000ff',     //突出色加深，线条，进度条，输入框 等颜色
  colorAccentBright: '#0000ff',     //突出色加浅，线条，进度条，输入框 等颜色

  // 主要文本
  colorTitle: '#ffffff',         // 标题色
  colorTitleSecondary: '#ffffff',         // 次标题色

  colorText: '#333333',            // 主文本色
  colorTextSecondary: '#666666',  // 次文本色
  colorTextNormal: '#999391',  // 普通文本色
  colorTextTint: '#999999',     //提示文本

  // background
  colorBackground: '#f2f2f2',   //背影色
  colorSecondBackground: '#edebea',   //次背影色
  loadingBackground: '#edebea',   //加载背影色

  // 按钮相关
  colorBtn: '#0000ff',    //按钮背影色
  colorBtnText: '#0000ff',  //按钮文本色

  homeMoney: '#3f5bcd', //主页金额

  //TODO 在这里面扩展
};
