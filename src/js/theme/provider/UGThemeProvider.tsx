import IColor from "../color/inter/IColor";

/**
 * 根据当前的主题，生成相应的控件库主题
 *
 * @param theme 当前主题
 * @constructor
 */
export const UGThemeProvider = (theme: IColor) => {

  return {
    colors: {
      ...theme
    },
  };
};
