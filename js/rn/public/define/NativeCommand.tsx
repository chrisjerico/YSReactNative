/**
 * 原生交互枚举type
 */
export const NativeCommand = {
  OPEN_PAGE: 'OPEN_PAGE',       //打开界面
  UNIVERSAL: 'UNIVERSAL',       //万能函数
  MOVE_TO_BACK: 'MOVE_TO_BACK',        //移动当前 Activity 到后台
  APP_THEME_COLOR: 'UGSkinManagers.currentSkin.navBarBgColor.hexString',        //设置主题色
  RN_PAGES: 'AppDefine.shared.setRnPageInfos:',        //rn的界面
  APP_HOST: 'AppDefine.shared.Host',       //交互，拿到 host
  APP_SITE: 'AppDefine.shared.SiteId',     //交互，拿到 site
  ENCRYPTION: 'CMNetwork.encryptionCheckSign:',     //加密参数
  ENCRYPTION_PARAMS: 'ENCRYPTION_PARAMS',     //加密参数
  ASK_FOR_TOKEN: 'ASK_FOR_TOKEN',    //得到 token
  ASK_FOR_TOKEN_AND_RSA: 'ASK_FOR_TOKEN_AND_RSA',    //得到 token和rsa
}
