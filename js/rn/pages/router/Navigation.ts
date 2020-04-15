import {RouterType, Router} from './Router';
import {UGBasePageProps} from '../base/UGBasePageProps';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';

export enum PageName {
  LoadingPage = 'LoadingPage',
  XBJLoginPage = 'XBJLoginPage',
  XBJRegisterPage = 'XBJRegisterPage',
  XBJMinePage = 'XBJMinePage',
  JDPromotionListPage = 'JDPromotionListPage',
  XBJHomePage = 'XBJHomePage',
  UpdateVersionPage = 'UpdateVersionPage',
}

export class Navigation {
  // 当前存活的页面（第一个页面是Tabbar的当前页面）
  static pages: PageName[] = [PageName.UpdateVersionPage];

  private static navigation: StackNavigationProp<{[x: string]: object}> & BottomTabNavigationProp<{[x: string]: object}>;
  static setNavigation(navigation) {
    if (!this.navigation) {
      this.navigation = navigation;
    }
  }

  // 去新的导航页
  static push<P extends UGBasePageProps>(page: PageName, props?: P): boolean {
    return this.smartNavigate(RouterType.Stack, page);
  }

  // 回到上一页
  static pop() {
    if (this.navigation && this.pages.length > 1) {
      this.navigation.pop();
      this.pages.pop();
    }
  }

  // 切换标签页
  static jump(page: PageName): boolean {
    return this.smartNavigate(RouterType.Tab, page);
  }

  // 智能跳转
  static smartNavigate(priorityType: RouterType, page: PageName, props?: object): boolean {
    if (!this.navigation) return false;
    const routerType = Router.getPageRouterType(page, priorityType);
    switch (routerType) {
      case RouterType.Stack: {
        console.log('跳转到堆栈页面');
        console.log(page);
        this.navigation.push(page, props);
        this.pages.push(page);
        return true;
      }
      case RouterType.Tab: {
        console.log('跳转到底部标签页面');
        console.log(page);
        this.navigation.jumpTo(page, props);
        this.pages[0] = page;
        return true;
      }
      case RouterType.Drawer: {
        console.log('跳转到侧边栏页面');
        console.log(page);
        return true;
      }
    }
    return false;
  }
}
