/**
 * @Description: 交互命令
 *
 * @author Arc
 * @date 2020/8/6
 */
export enum CMD {
  INIT_DOMAIN = 'INIT_DOMAIN', //初始化 Domain
  INIT_PAGES = 'INIT_PAGES', //初始化哪些界面需要替换
  PAGE_PARAMS = 'PAGE_PARAMS', //得到这个界面的参数
  OPEN_PAGE = 'OPEN_PAGE', //打开界面
  OPEN_RIGHT_MENU = 'OPEN_RIGHT_MENU', //打开右侧界面
  LAUNCH_GO = 'LAUNCH_GO', //启动页功能
  OPEN_WEB = 'OPEN_WEB', //打开web
  OPEN_NAVI_PAGE = 'OPEN_NAVI_PAGE', //打开导航界面
  OPEN_RED_BAD = 'OPEN_RED_BAD', //打开红包
  OPEN_ROULETTE = 'OPEN_ROULETTE', //打开大转盘界面
  OPEN_NOTICE = 'OPEN_NOTICE', //打开通知界面
  OPEN_POP_NOTICE = 'OPEN_POP_NOTICE', //打开弹窗口通知界面
  OPEN_COUPON = 'OPEN_COUPON', //打开优惠券
  LOG_OUT = 'LOG_OUT', //退出登录
  STATUS_BAR_SHOW = 'STATUS_BAR_SHOW', //显示RN StatusBar
  UNIVERSAL = 'UNIVERSAL', //万能函数
  MOVE_TO_BACK = 'MOVE_TO_BACK', //移动当前 Activity 到后台
  FINISH_ACTIVITY = 'FINISH_ACTIVITY',        //关闭activity
  APP_THEME_COLOR = 'UGSkinManagers.currentSkin.navBarBgColor.hexString', //设置主题色
  RN_PAGES = 'AppDefine.shared.setRnPageInfos:', //rn的界面
  CURRENT_PAGE = 'CURRENT_PAGE', //当前的界面
  VISIBLE_MAIN_TAB = 'VISIBLE_MAIN_TAB', //显示隐藏主页tab, 0 = VISIBLE, 4 = INVISIBLE, 8 = GONE
  APP_HOST = 'AppDefine.shared.Host', //交互，拿到 host
  APP_SITE = 'AppDefine.shared.SiteId', //交互，拿到 site
  SITE_ENCRYPTION = 'SITE_ENCRYPTION', //当前站点是否加密
  ENCRYPTION = 'CMNetwork.encryptionCheckSign:', //加密参数
  ENCRYPTION_PARAMS = 'ENCRYPTION_PARAMS', //加密参数
  ASK_SALARY = 'ASK_SALARY', //领取封路
  ASK_MINE_ITEMS = 'ASK_MINE_ITEMS', //个人信息item
  ASK_FOR_TOKEN = 'ASK_FOR_TOKEN', //得到 token
  ASK_FOR_TOKEN_AND_RSA = 'ASK_FOR_TOKEN_AND_RSA', //得到 token和rsa
  ACCESS_TOKEN = 'ACCESS_TOKEN', //得到 access token
  SAVE_DATA = 'SAVE_DATA',      //存储数据
  LOAD_DATA = 'LOAD_DATA'      //加载数据
}

/**
 * 打开界面参数
 */
export const OPEN_PAGE_PMS = {
  LaunchActivity: {//启动页
    toActivity: true,
    packageName: 'com.phoenix.lotterys.main',
    className: 'LaunchActivity'
  },
  LoginActivity: {//登录界面
    toActivity: true,
    packageName: 'com.phoenix.lotterys.my.activity',
    className: 'LoginActivity'
  },
  RegeditActivity: {//注册界面
    toActivity: true,
    packageName: 'com.phoenix.lotterys.my.activity',
    className: 'RegeditActivity'
  }
}
