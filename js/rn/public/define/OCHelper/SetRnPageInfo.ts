import { PageName } from '../../navigation/Navigation';
import { Router, RouterType } from '../../navigation/Router';
import { Skin1 } from '../../theme/UGSkinManagers';
import { OCHelper } from './OCHelper';

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
  vcName?: string; // oc页面类名
  rnName: PageName; // rn页面类名
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

  console.log("------------------Skin1.skitType------------------", Skin1.skitType)
  alert("幹------是有沒有進codePush拉")
  if (Skin1.skitType.indexOf('凯时') != -1) {
    pages = pages.concat([
      {
        // 首页
        tabbarItemPath: '/home',
        rnName: PageName.KSHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
      // {
      //   // 我的页
      //   tabbarItemPath: '/user',
      //   rnName: PageName.WNZMinePage,
      //   fd_prefersNavigationBarHidden: true,
      //   允许游客访问: true,
      //   允许未登录访问: false,
      // },
    ])
  }

  //威尼斯页面
  if (Skin1.skitType.indexOf('威尼斯') != -1) {
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
        rnName: PageName.WNZMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
    ])
  }

  //宝石红页面
  if (Skin1.skitType.indexOf('宝石红') != -1) {
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
    ])
  }

  // 六合厅页面
  if (Skin1.skitType.indexOf('六合厅') != -1) {
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
        rnName: PageName.LHTMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
    ])
  }

  if (Skin1.skitType.indexOf('乐橙') != -1) {
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
        rnName: PageName.LCMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
    ])
  }
  //尊龙模板页面
  if (Skin1.skitType.indexOf('尊龙') != -1) { // 
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
        rnName: PageName.ZLMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
      {
        vcName: 'UGPromotionsController',
        rnName: PageName.PromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      }
    ]);
  }

  if (Skin1.skitType.indexOf('金星黑') != -1) {
    pages = pages.concat([
      {
        // 首页
        tabbarItemPath: '/home',
        rnName: PageName.GDBHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
      {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: PageName.GDLoginPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
      {
        // 注册
        vcName: 'UGRegisterViewController',
        rnName: PageName.GDRegisterPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
      {
        // 我的页
        tabbarItemPath: '/user',
        rnName: PageName.GDBMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
    ]);
  }

  // 综合体育页面
  // if (Skin1.skitType.indexOf('综合体育') != -1) {
  //   pages = pages.concat([
  //     // {
  //     //   // 首页
  //     //   tabbarItemPath: '/home',
  //     //   rnName: PageName.ZHTYHomePage,
  //     //   fd_prefersNavigationBarHidden: true,
  //     //   允许游客访问: true,
  //     //   允许未登录访问: true,
  //     // },
  //     {
  //       // 登录
  //       vcName: 'UGLoginViewController',
  //       rnName: PageName.ZHTYLoginPage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 注册
  //       vcName: 'UGRegisterViewController',
  //       rnName: PageName.ZHTYRegisterPage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: true,
  //     },
  //     {
  //       // 我的页
  //       tabbarItemPath: '/user',
  //       rnName: PageName.ZHTYMinePage,
  //       fd_prefersNavigationBarHidden: true,
  //       允许游客访问: true,
  //       允许未登录访问: false,
  //     },
  //   ]);
  // }

  RnPageModel.pages = pages;
  OCHelper.call('AppDefine.shared.setRnPageInfos:', [pages]);
}
