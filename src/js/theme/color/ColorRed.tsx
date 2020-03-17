/**
 * 红色模板
 */
import {CommonColors} from "./CommonColors";
import IColor from "./inter/IColor";

export const ColorRed: IColor = {
  ...CommonColors,
  primary: '#ff0000',     //主题色
  primaryDark: '#ff0000',     //主题色加深
  primaryBright: '#ff000033',     //主题色加浅

  secondary: '#aa0000',      //次主题色

  colorAccent: '#880000',     //突出色，线条，进度条，输入框 等颜色
  colorAccentDark: '#ff0000',     //突出色加深，线条，进度条，输入框 等颜色
  colorAccentBright: '#330000',     //突出色加浅，线条，进度条，输入框 等颜色

  // 主要文本
  colorTitle: '#ffffff',         // 标题色
  colorTitleSecondary: '#ffffff',         // 次标题色

  colorText: '#333333',            // 主文本色
  colorTextSecondary: '#666666',  // 次文本色
  colorTextTint: '#999999',     //提示文本

  // background
  colorBackground: '#eeeeee',   //背影色

  // 按钮相关
  colorBtn: '#ff0000',    //按钮背影色
  colorBtnText: '#ff0000',  //按钮文本色

  //TODO 在这里面扩展
};
