import { RouterType, Router } from './Router';
import { UGBasePageProps } from '../../pages/base/UGBasePageProps';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';

export enum PageName {
  TransitionPage = 'TransitionPage',
  XBJLoginPage = 'XBJLoginPage',
  XBJRegisterPage = 'XBJRegisterPage',
  XBJMinePage = 'XBJMinePage',
  JDPromotionListPage = 'JDPromotionListPage',
  XBJHomePage = 'XBJHomePage',
  UpdateVersionPage = 'UpdateVersionPage',
  ZHTYHomePage = 'ZHTYHomePage',
  ZHTYLoginPage = 'ZHTYLoginPage',
  ZHTYRegisterPage = 'ZHTYRegisterPage',
  ZHTYMinePage = 'ZHTYMinePage',
  ZLHomePage = 'ZLHomePage',
  ZLLoginPage = 'ZLLoginPage'
}

export class Navigation {
  // 当前存活的页面（第一个页面是Tabbar的当前页面）
  static pages: PageName[] = [PageName.UpdateVersionPage];

  private static navigation: StackNavigationProp<{ [x: string]: any }> & BottomTabNavigationProp<{ [x: string]: any }>;
  static setNavigation(navigation) {
    if (!this.navigation) {
      this.navigation = navigation;
    }
  }

  // 去新的导航页
  static push<P extends UGBasePageProps>(page: PageName, props?: P, transition: boolean = true): boolean {
    return this.smartNavigate(RouterType.Stack, page, undefined, transition);
  }

  // 回到上一页
  static pop() {
    if (this.navigation && this.pages.length > 1) {
      this.navigation.pop();
      this.pages.pop();
    }
  }

  // 切换标签页
  static jump<P>(page: PageName, props?: P, transition: boolean = true): boolean {
    return this.smartNavigate(RouterType.Tab, page, props, transition);
  }

  // 智能跳转
  static smartNavigate<P>(priorityType: RouterType, page: PageName, props?: P, transition: boolean = true): boolean {
    if (!this.navigation) return false;
    const routerType = Router.getPageRouterType(page, priorityType);
    switch (routerType) {
      case RouterType.Stack: {
        this.navigation.push(page, props);
        this.pages.push(page);
        return true;
      }
      case RouterType.Tab: {
        if (!transition || page == PageName.TransitionPage || this.pages[0] == PageName.TransitionPage) {
          this.pages[0] = page;
          this.navigation.jumpTo(page, props);
          console.log('跳转到', page);
        } else {
          this.pages[0] = PageName.TransitionPage;
          this.navigation.jumpTo(PageName.TransitionPage, { jumpTo: page, props: props });
          console.log('跳转到过渡页');
        }
        return true;
      }
      case RouterType.Drawer: {
        return true;
      }
    }
    return false;
  }
}
