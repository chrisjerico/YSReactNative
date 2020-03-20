/**
 * 原生交互枚举type
 */
export enum NativeCommand {
  OPEN_PAGE,       //打开界面
  UNIVERSAL,       //万能函数
  MOVE_TO_BACK,        //移动当前 Activity 到后台
  APP_THEME_COLOR,        //设置主题色
  RN_PAGES,        //rn的界面
  APP_HOST,       //交互，拿到 host
  APP_SITE,     //交互，拿到 site
  ENCRYPTION,     //加密参数
  ASK_FOR_TOKEN,    //得到 token
  ASK_FOR_TOKEN_AND_RSA,    //得到 token和rsa
}
