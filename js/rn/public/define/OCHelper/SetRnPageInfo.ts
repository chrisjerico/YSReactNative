import { Platform } from 'react-native'
import { releaseConfig } from '../../../../../config'
import { PageName } from '../../navigation/Navigation'
import { Router, RouterType } from '../../navigation/Router'
import AppDefine from '../AppDefine'
import { devConfig } from './../../../../../config'
import { Skin1 } from './../../theme/UGSkinManagers'
import { OCHelper } from './OCHelper'

// 配置需要被替换的oc页面（替换成rn）
export async function setRnPageInfo() {
  let pages: Array<RnPageModel> = []

  let skitType = Skin1.skitType
  skitType = releaseConfig.skinKeys[AppDefine.siteId] ?? skitType
  console.log('------------------skitType------------------', skitType)

  // 本地编译
  if (devConfig.isDebug) {
    devConfig?.skinKey && (skitType = devConfig?.skinKey) // 測試開發
    pages.push({
      vcName: 'UGWriteMessageViewController',
      rnName: PageName.JDWriteMessagePage,
      fd_prefersNavigationBarHidden: true,
      允许游客访问: true,
      允许未登录访问: true,
    })
    
  }

  // 测试环境（未上线的内容）
  if (devConfig.isTest()) {
    // ezer
    if (Skin1.skitType.indexOf('利来') != -1) {
      pages = pages.concat(LLPages)
    }
    if (skitType.indexOf('乐橙') != -1) {
      pages = pages.concat(LCPages)
    }
    // tars
    if (skitType.indexOf('宝石红') != -1) {
      pages = pages.concat(BSHPages)
    }
    if (skitType.indexOf('六合厅') != -1) {
      pages = pages.concat(LHTPages)
    }
    if (skitType.indexOf('金星黑') != -1) {
      pages = pages.concat(JXHPages)
    }
    if (skitType.indexOf('白曜') != -1) {
      pages = pages.concat(BYPages)
    }
    if (skitType.indexOf('凯时') != -1) {
      pages = pages.concat(KSPages)// [pages addObjectsFromArray:多个页面]
    }

    //建议反馈
    pages.push({
      vcName: 'UGFeedBackController',
      rnName: PageName.JDFeedBackPage,
      fd_prefersNavigationBarHidden: true,
      允许游客访问: true,
      允许未登录访问: true,
    })
    
  }

  // —————————————————— 以下为已上线内容 ————————————————————————
  // 签到页
  pages.push({
    tabbarItemPath:'/Sign',
    vcName: 'UGSigInCodeViewController',
    rnName: PageName.JDSigInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  })

  // 优惠活动列表页
  pages.push({
    vcName: 'UGPromotionsController',
    rnName: PageName.JDPromotionListPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  })

  // 虚拟币充值教程
  if (AppDefine.siteId != 'c012') {
    pages.push({
      vcName: 'HelpDocViewController',
      rnName: PageName.JDVirtualCurrencyTutorialPage,
      fd_prefersNavigationBarHidden: true,
      允许游客访问: true,
      允许未登录访问: true,
    })
  }

  // 开奖走势页
  pages.push({
    rnName: PageName.TrendView,
    userCenterItemCode: 18,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  })

  if (skitType.indexOf('尊龙') != -1) {
    pages = pages.concat(ZLPages)
  }
  if (skitType.indexOf('宝石红') != -1) {
    pages = pages.concat(BSHPages)
  }
  if (skitType.indexOf('香槟金') != -1) {
    pages = pages.concat(XBJPages)
  }
  if (skitType.indexOf('威尼斯') != -1) {
    pages = pages.concat(WNSPages)
  }
  // 替换原生页面
  RnPageModel.pages = pages
  switch (Platform.OS) {
    case 'ios':
      await OCHelper.call('AppDefine.shared.setRnPageInfos:', [pages])
      await OCHelper.call('AppDefine.shared.setImageHost:', ['https://appstatic.guolaow.com'])
      break
    case 'android':
      break
  }
}

// 香槟金
const XBJPages = [
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.XBJLoginPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 注册
    vcName: 'UGRegisterViewController',
    rnName: PageName.XBJRegisterPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.XBJMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
]

// 尊龙模板页面
const ZLPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.ZLHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.ZLLoginPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 注册
    vcName: 'UGRegisterViewController',
    rnName: PageName.ZLRegisterPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.ZLMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    vcName: 'UGBalanceConversionController',
    vcName2: 'LineConversionHeaderVC',
    fd_prefersNavigationBarHidden: true,
    允许游客访问: false,
    允许未登录访问: false,
  },
]

// 乐橙模板
const LCPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.LCHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.LCMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.LCLoginPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

// 利来
const LLPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.LLHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.LLMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.LLLoginPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

// 六合厅
const LHTPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.LHTHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.LHTMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.LHTSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
]

// 宝石红
const BSHPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.BZHHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.BZHMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.BZHSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 游戏大厅
    tabbarItemPath: '/lotteryList',
    vcName: 'UGYYLotteryHomeViewController',
    rnName: PageName.BZHGameLobbyPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]
// 威尼斯
const WNSPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.WNZHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.WNZMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.WNZSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

// 凯时
const KSPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.KSHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.KSMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.KSSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

// 金星黑
const JXHPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.JXHHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.JXHMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.JXHSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

// 白曜
const BYPages = [
  {
    // 首页
    tabbarItemPath: '/home',
    rnName: PageName.BYHomePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    // 我的页
    tabbarItemPath: '/user',
    vcName: 'UGMineSkinViewController',
    rnName: PageName.BYMinePage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: false,
  },
  {
    // 登录
    vcName: 'UGLoginViewController',
    rnName: PageName.BYSignInPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
  {
    vcName: 'UGPromotionsController',
    rnName: PageName.PromotionPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  },
]

export class RnPageModel {
  static pages: RnPageModel[] = []
  static getPageName(vcName: PageName) {
    if (Router.getPageRouterType(vcName) != RouterType.None) {
      return vcName
    }
    for (const rpm of this.pages) {
      if (rpm.vcName == vcName) {
        return rpm.rnName
      }
    }
    return null
  }

  // 替换oc页面
  vcName?: string // 要被替换的oc页面类名
  vcName2?: string // 要替换的oc页面类型
  rnName?: PageName // rn页面类名
  fd_interactivePopDisabled?: boolean //是否禁用全屏滑动返回上一页
  fd_prefersNavigationBarHidden?: boolean // 是否隐藏导航条
  允许游客访问?: boolean
  允许未登录访问?: boolean

  // 新增彩种
  gameType?: string // 彩种类型

  // 新增我的页Item跳转
  userCenterItemCode?: number // 页面标识
  userCenterItemIcon?: string // 默认图标URL
  userCenterItemTitle?: string // 默认标题

  // 新增TabbarItem跳转
  tabbarItemPath?: string // 页面标识
  tabbarItemIcon?: string // 默认图标URL
  tabbarItemTitle?: string // 默认标题

  // 新增linkCategory跳转
  linkCategory?: number // linkCategory ： 1=彩票游戏；2=真人视讯；3=捕鱼游戏；4=电子游戏；5=棋牌游戏；6=体育赛事；7=导航链接；8=电竞游戏；9=聊天室；10=手机资料栏目
  linkPosition?: number
}
