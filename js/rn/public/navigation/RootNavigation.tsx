
import * as React from 'react';
import { StackActions, NavigationContainerRef, TabActions } from '@react-navigation/native';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { PageName } from './Navigation';
import { Router, RouterType } from './Router';
export const navigationRef = React.createRef<NavigationContainerRef>();



export function navigate<P>(page: PageName, props?: P & { index?: number }): boolean {
    if (props?.index) {
        OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [props.index]);
    }
    return goFirstTransitionPage(page, props);
}

export function push<P extends object>(page: PageName, props?: P) {
    goFirstTransitionPage(page, props, RouterType.Stack);
}

export function jumpTo<P extends object>(page: PageName, props?: P) {
    goFirstTransitionPage(page, props, RouterType.Tab);
}

export function pop() {
    try {
        navigationRef?.current?.dispatch(StackActions.pop());
    } catch (error) { }
}

export function popToRoot() {
    try {
        navigationRef?.current?.dispatch(StackActions.popToTop());
    } catch (error) { }
}

// 获取当前页面
export function getCurrentPage(): PageName {
    const { name } = navigationRef.current?.getCurrentRoute();
    // @ts-ignore
    return name;
}

export function replace(name: string, params?: any) {
    try {
        navigationRef?.current?.dispatch(StackActions.replace(name, params));
    } catch (error) {

    }
}
// 复杂页面第一次初始化会卡顿，先去过渡页再切换（优化用户体验）
function goFirstTransitionPage(page: PageName, props: object, action?: RouterType): boolean {
    if (Router.getPageRouterType(page) === RouterType.None) {
        console.log('查无此页面', page);
        return false;
    }
    if (getCurrentPage() === page) {
        console.log('页面已存在', page);
        return false;
    }

    try {
        if (Router.getPageRouterTypes(page).length < 2 || action == RouterType.Stack || action == RouterType.Tab) {
            if (getCurrentPage() == PageName.TransitionPage) {
                if (action == RouterType.Stack) {
                    navigationRef?.current?.dispatch(StackActions.replace(page, props));
                } else {
                    popToRoot();
                    navigationRef?.current?.dispatch(TabActions.jumpTo(page, props));
                }
            } else {
                if (action == RouterType.Stack) {
                    navigationRef?.current?.dispatch(StackActions.push(PageName.TransitionPage, { pushTo: page, props: props }));
                } else {
                    popToRoot();
                    navigationRef?.current?.dispatch(TabActions.jumpTo(PageName.TransitionPage, { jumpTo: page, props: props }));
                }
            }
        } else {
            navigationRef.current?.navigate(page, props);
        }
    } catch (e) { }
    return true;
}