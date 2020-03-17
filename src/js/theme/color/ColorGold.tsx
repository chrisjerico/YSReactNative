/**
 * 红色模板
 */
import {CommonColors} from "./CommonColors";
import IColor from "./inter/IColor";

export const ColorGold: IColor = {
  ...CommonColors,
  primary: '#9e7e66',     //主题色
  primaryDark: '#866e58',     //主题色加深
  primaryBright: '#ad907a',     //主题色加浅

  secondary: '#927763',      //次主题色

  colorAccent: '#9e7e66',     //突出色，线条，进度条，输入框 等颜色
  colorAccentDark: '#9b7b63',     //突出色加深，线条，进度条，输入框 等颜色
  colorAccentBright: '#ad907a',     //突出色加浅，线条，进度条，输入框 等颜色

  // 主要文本
  colorTitle: '#ffffff',         // 标题色
  colorTitleSecondary: '#ffffff',         // 次标题色

  colorText: '#854d24',            // 主文本色
  colorTextSecondary: '#000000',  // 次文本色
  colorTextNormal: '#999391',  // 普通文本色
  colorTextTint: '#999999',     //提示文本

  // background
  colorBackground: '#a99d91',   //背影色
  colorSecondBackground: '#edebea',   //次背影色
  loadingBackground: '#edebea',   //加载背影色

  // 按钮相关
  colorBtn: '#9e7e66',    //按钮背影色
  colorBtnText: '#854d24',  //按钮文本色

  homeMoney: '#3f5bcd', //主页金额

  //TODO 在这里面扩展
};
