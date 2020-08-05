
import * as React from 'react';
import { StackActions, NavigationContainerRef, TabActions } from '@react-navigation/native';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { PageName } from './Navigation';
import { Router, RouterType } from './Router';
import {Platform} from "react-native";
import {ANHelper, NativeCommand} from "../define/ANHelper/ANHelper";
import {ugLog} from "../tools/UgLog";
export const navigationRef = React.createRef<NavigationContainerRef>();


export function navigate<P>(page: PageName, props?: P & { index?: number }): boolean {
    if (props?.index) {
        switch (Platform.OS) {
            case "ios":
                OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [props.index]);
                break;
        }
    }
    return goFirstTransitionPage(page, props);
}

export function push<P extends object>(page: PageName, props?: P): boolean {
    return goFirstTransitionPage(page, props, RouterType.Stack);
}

export function jumpTo<P extends object>(page: PageName, props?: P): boolean {
    return goFirstTransitionPage(page, props, RouterType.Tab);
}

export function pop() {
    const canPop = navigationRef?.current?.getRootState().routes.length > 1;
    canPop && navigationRef?.current?.dispatch(StackActions.pop());
}

export function popToRoot() {
    const canPop = navigationRef?.current?.getRootState().routes.length > 1;
    canPop && navigationRef?.current?.dispatch(StackActions.popToTop());
}

// 获取当前页面
export function getCurrentPage(): PageName {
    if (navigationRef?.current?.getCurrentRoute) {
        const { name } = navigationRef?.current?.getCurrentRoute();
        // @ts-ignore
        return name;
    }
    return undefined;
}

export function replace(name: string, params?: any) {
    try {
        navigationRef?.current?.dispatch(StackActions.replace(name, params));
    } catch (error) {

    }
}
// 复杂页面第一次初始化会卡顿，先去过渡页再切换（优化用户体验）
function goFirstTransitionPage(page: PageName, props: object, action?: RouterType): boolean {
    action = Router.getPageRouterType(page, action);

    if (action === RouterType.None) {
        console.log('查无此页面', page);
        return false;
    }
    if (getCurrentPage() === page) {
        console.log('页面已存在', page);
        return false;
    }

    //检查一下Native主页下面的tab是否隐藏了
    switch (Platform.OS) {
        case "android":
            ANHelper.callAsync(NativeCommand.VISIBLE_MAIN_TAB, {visibility: 8});
            break;
    }

    try {
        if (getCurrentPage() == PageName.TransitionPage) {
            console.log('跳转到', page);
            if (action == RouterType.Stack) {
                navigationRef?.current?.dispatch(StackActions.replace(page, props));
            } else {
                popToRoot();
                navigationRef?.current?.dispatch(TabActions.jumpTo(page, props));
            }
        } else {
            console.log('跳转到过渡页');
            if (action == RouterType.Stack) {
                navigationRef?.current?.dispatch(StackActions.push(page, props));
            } else {
                popToRoot();
                navigationRef?.current?.dispatch(TabActions.jumpTo(PageName.TransitionPage, { jumpTo: page, props: props }));
            }
        }
    } catch (e) {
        ugLog("error=", e)
    }

    return true;
}
