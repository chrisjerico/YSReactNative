
import * as React from 'react';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';
import { OCHelper } from '../define/OCHelper/OCHelper';
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
    if (params?.index) {
        OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [params.index]);
    }

}

export function push(...args) {
    try {
        //@ts-ignore
        navigationRef?.current?.dispatch(StackActions.push(...args));
    } catch (error) {

    }

}
export function pop(...args) {
    try {
        navigationRef?.current?.dispatch(StackActions.pop());
    } catch (error) {

    }

}
export function popToRoot() {
    try {
        navigationRef?.current?.dispatch(StackActions.popToTop());
    } catch (error) {

    }

}


export function replace(name: string, params?: any) {
    try {
        navigationRef?.current?.dispatch(StackActions.replace(name, params));
    } catch (error) {

    }

}