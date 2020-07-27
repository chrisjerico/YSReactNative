import React, { Component } from 'react'
import {  PageName } from '../../public/navigation/Navigation'
import { UGStore, IGlobalState } from '../../redux/store/UGStore'
import { UGColor } from '../../public/theme/UGThemeColor'
import { deepMergeProps } from '../../public/tools/FUtils'
import { BottomTabNavigationProp, BottomTabNavigationOptions, } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import UGNavigationBar, { UGNavigationBarProps } from '../../public/widget/UGNavigationBar'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import AppDefine from '../../public/define/AppDefine'
import { Button } from 'react-native-elements'
import { UGLoadingProps, UGLoadingType, UGLoadingCP } from '../../public/widget/UGLoadingCP'


// Props
export interface UGBasePageProps<P extends UGBasePageProps = {}, V = {}> {
  // React-Navigation
  navigation?: BottomTabNavigationProp<{}> & StackNavigationProp<{}> & DrawerNavigationProp<{}>; // 导航助手
  route?: { name: PageName, params: any };

  // 提供自定义api给页面使用
  setProps?(props?: P): void;// 设置Props并刷新
  vars?: V;// 获取成员变量
  showLoading?(params: UGLoadingProps): void;
  hideLoading?(): void;
  setDidFocus?(func: (p: UGBasePageProps) => void): void;// 成为焦点时回调

  // —————————— 配置UI ——————————
  backgroundColor?: string[]; // 背景色
  backgroundImage?: string;
  navbarOpstions?: UGNavigationBarProps;
  tabbarOpetions?: BottomTabNavigationOptions; // 底部标签栏Options

  // —————————— 安卓独有参数 ——————————
  fromNative?: string; //当前界面是否由原生打开
}

// HOC
export default (Page: Function) => {
  return class extends React.Component<UGBasePageProps> {
    private newProps: UGBasePageProps = null
    private unsubscribe: () => void;
    private vars: { [x: string]: any } = {};
    private loadingParams: UGLoadingProps

    constructor(props: UGBasePageProps) {
      super(props)
      const {
        navigation,
        tabbarOpetions = { unmountOnBlur: true },
        route,
      } = props

      console.log('页面初始化', route.name)

      // 配置导航
      {
        navigation.setOptions({ header: (props) => { return null; } })
        navigation.jumpTo && navigation.setOptions(tabbarOpetions)
      }

      // 监听
      let didFocus: (p: UGBasePageProps) => void;
      {
        let lastParams;
        navigation.removeListener('focus', null)
        navigation.addListener('focus', () => {
          const { name, params } = this.props.route
          console.log('成为焦点', name, params)
          if (lastParams !== params) {
            // 跳转时参数设置到props
            lastParams = params;
            this.setProps(params);
          }
          // 回调
          didFocus && didFocus(params);
        })
        // 监听dispatch
        this.unsubscribe = UGStore.subscribe(route.name, (() => {
          this.newProps = deepMergeProps(this.newProps, UGStore.globalProps[route.name + 'Props']);
          this.setState({});
        }).bind(this));
      }

      // 设置props
      let hideLoading: () => void;
      const defaultProps: UGBasePageProps = {
        // api
        showLoading: ((lm: UGLoadingProps) => {
          this.loadingParams = {
            ...lm, setHideLoading: (func) => {
              hideLoading = func;
            }
          };
          this.setState({});
        }).bind(this),
        hideLoading: (() => {
          hideLoading && hideLoading();
        }),
        setDidFocus: ((func) => {
          didFocus = func;
        }),

        // 默认UI
        backgroundColor: [UGColor.BackgroundColor1],
        navbarOpstions: { hidden: true, gradientColor: Skin1.navBarBgColor },
      };
      this.newProps = deepMergeProps(defaultProps, this.props)
      this.newProps = deepMergeProps(this.newProps, UGStore.globalProps[route.name + 'Props']);
    }

    // 取消监听
    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    setProps<P>(props: P): void {
      // console.log('setProps, name = ', this.props.route.name, props);
      UGStore.dispatch({ type: 'merge', page: this.props.route.name, props: props })
    }

    render() {
      console.log('渲染', this.props.route.name);
      let { backgroundColor = [], backgroundImage = '', navbarOpstions = {} } = this.newProps;

      return (
        <LinearGradient colors={backgroundColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
          <FastImage source={{ uri: backgroundImage }} style={{ flex: 1 }}>
            {!navbarOpstions.hidden && <UGNavigationBar {...navbarOpstions} />}
            <Page {...this.newProps} setProps={this.setProps.bind(this)} vars={this.vars} />
          </FastImage>
          {this.loadingParams && <UGLoadingCP {...this.loadingParams} />}
        </LinearGradient>
      )
    }
  }
}
