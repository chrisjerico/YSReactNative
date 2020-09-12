import { PageName } from '../../navigation/Navigation';
import { Router, RouterType } from '../../navigation/Router';
import { Skin1 } from './../../theme/UGSkinManagers';
import { OCHelper } from './OCHelper';
import { Platform } from "react-native";
import { ANHelper } from "../ANHelper/ANHelper";
import { CMD } from "../ANHelper/hp/CmdDefine";

export class RnPageModel {
  static pages: RnPageModel[] = [];
  static getPageName(vcName: PageName) {
    if (Router.getPageRouterType(vcName) != RouterType.None) {
      return vcName;
    } else {
      for (const rpm of this.pages) {
        if (rpm.vcName == vcName) {
          return rpm.rnName;
        }
      }
    }
    return null;
  }

  // 替换oc页面
  vcName?: string; // 要被替换的oc页面类名
  vcName2?: string; // 要替换的oc页面类型
  rnName?: PageName; // rn页面类名
  fd_interactivePopDisabled?: boolean; //是否禁用全屏滑动返回上一页
  fd_prefersNavigationBarHidden?: boolean; // 是否隐藏导航条
  允许游客访问?: boolean;
  允许未登录访问?: boolean;

  // 新增彩种
  gameType?: string; // 彩种类型

  // 新增我的页Item跳转
  userCenterItemCode?: number; // 页面标识
  userCenterItemIcon?: string; // 默认图标URL
  userCenterItemTitle?: string; // 默认标题

  // 新增TabbarItem跳转
  tabbarItemPath?: string; // 页面标识
  tabbarItemIcon?: string; // 默认图标URL
  tabbarItemTitle?: string; // 默认标题

  // 新增linkCategory跳转
  linkCategory?: number; // linkCategory ： 1=彩票游戏；2=真人视讯；3=捕鱼游戏；4=电子游戏；5=棋牌游戏；6=体育赛事；7=导航链接；8=电竞游戏；9=聊天室；10=手机资料栏目
  linkPosition?: number;
}

// 配置需要被替换的oc页面（替换成rn）
export function setRnPageInfo() {
  let pages: Array<RnPageModel> = [];
  // 优惠活动列表页
  pages.push({
    vcName: 'UGPromotionsController',
    rnName: PageName.JDPromotionListPage,
    fd_prefersNavigationBarHidden: true,
    允许游客访问: true,
    允许未登录访问: true,
  });

  let skitType = Skin1.skitType;
  // skitType = '尊龙'; // 測試開發
  console.log("------------------skitType------------------", skitType)
  // if (skitType.indexOf('白曜') != -1) {
  //   pages = pages.concat([
  //     {
  //       // 首页
  //       tabbarItemPath: '/home',
  //       rnName: PageName.VietnamHome,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 登录
  //       vcName: 'UGLoginViewController',
  //       rnName: PageName.VietnamLogin,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 注册
  //       vcName: 'UGRegisterViewController',
  //       rnName: PageName.VietnamRegister,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 我的页
  //       tabbarItemPath: '/user',
  //       vcName: 'UGMineSkinViewController',
  //       rnName: PageName.VietnamMine,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: false,
  //     },
  //   ])
  // }
  // if (skitType.indexOf('凯时') != -1) {
  //   pages = pages.concat([
  //     {
  //       // 首页
  //       tabbarItemPath: '/home',
  //       rnName: PageName.KSHomePage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },

  //     {
  //       // 登录
  //       vcName: 'UGLoginViewController',
  //       rnName: PageName.KSLogin,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 注册
  //       vcName: 'UGRegisterViewController',
  //       rnName: PageName.KSRegister,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 我的页
  //       tabbarItemPath: '/user',
  //       vcName: 'UGMineSkinViewController',
  //       rnName: PageName.KSMine,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: false,
  //     },
  //   ])
  // }

  // // 威尼斯页面
  if (skitType.indexOf('威尼斯') != -1) {
    pages = pages.concat([
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
        // 游戏大厅
        tabbarItemPath: '/lotteryList',
        vcName: 'UGYYLotteryHomeViewController',
        rnName: PageName.WNZGameLobbyPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      }
    ])
  }

  //宝石红页面
  if (skitType.indexOf('宝石红') != -1) {
    pages = pages.concat([
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
      }
    ])
  }

  // // 六合厅页面
  if (skitType.indexOf('六合厅') != -1) {
    pages = pages.concat([
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
    ])
  }

  if (skitType.indexOf('乐橙') != -1) {
    pages = pages.concat([
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
    ])
  }
  // 尊龙模板页面
  if (skitType.indexOf('尊龙') != -1) { //
    pages = pages.concat([
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
        vcName: 'UGPromotionsController',
        rnName: PageName.JDPromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
      {
        vcName: 'UGBalanceConversionController',
        vcName2: 'LineConversionHeaderVC',
        fd_prefersNavigationBarHidden: true,
        允许游客访问: false,
        允许未登录访问: false,
      }
    ]);
  }

  // if (skitType.indexOf('金星黑') != -1) {
  //   pages = pages.concat([
  //     {
  //       // 首页
  //       tabbarItemPath: '/home',
  //       rnName: PageName.GDBHomePage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 登录
  //       vcName: 'UGLoginViewController',
  //       rnName: PageName.GDLoginPage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 注册
  //       vcName: 'UGRegisterViewController',
  //       rnName: PageName.GDRegisterPage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 我的页
  //       tabbarItemPath: '/user',
  //       vcName: 'UGMineSkinViewController',
  //       rnName: PageName.GDBMinePage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: false,
  //     },
  //     {
  //       vcName: 'UGPromotionsController',
  //       rnName: PageName.JDPromotionListPage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     }
  //   ]);
  // }

  RnPageModel.pages = pages;
  // if (Platform.OS == 'ios') {
  OCHelper.call('AppDefine.shared.setRnPageInfos:', [pages]);

}