
import * as React from 'react';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';
import { OCHelper } from '../define/OCHelper/OCHelper';
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
    OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [params?.index ?? 0]);
}

export function push(...args) {
    //@ts-ignore
    navigationRef.current?.dispatch(StackActions.push(...args));
}
export function pop(...args) {
    navigationRef.current?.dispatch(StackActions.pop());
}
export function popToRoot() {
    navigationRef.current?.dispatch(StackActions.popToTop());
}