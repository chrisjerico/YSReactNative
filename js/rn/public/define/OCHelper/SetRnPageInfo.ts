import {Router, RouterType} from '../../navigation/Router';
import {Skin1} from '../../theme/UGSkinManagers';
import {PageName} from '../../navigation/Navigation';
import AppDefine from '../AppDefine';
import {OCHelper} from './OCHelper';

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

  // 香槟金模板页面
  if (Skin1.skitType.indexOf('香槟金') != -1) {
    pages = pages.concat([
      {
        // 首页
        tabbarItemPath: '/home',
        rnName: PageName.XBJHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
      },
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
        rnName: PageName.XBJMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
      },
    ]);
  }

  RnPageModel.pages = pages;
  OCHelper.call('AppDefine.shared.setRnPageInfos:', [pages]);
}
