import React from 'react'
import { Component, ReactElement, useEffect, useRef } from 'react'
import { Header, HeaderProps, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { deepMergeProps } from '../tools/FUtils'
import { Platform, View, ViewProps } from 'react-native'
import { pop } from '../navigation/RootNavigation'
import { useSafeArea } from 'react-native-safe-area-context'

// 声明Porps
export interface UGNavigationBarProps extends HeaderProps {
  hidden?: boolean; // 隐藏导航条
  back?: boolean; // 是否显示返回按钮
  title?: string; // 标题
  gradientColor?: string[]; // 背景渐变色
  hideUnderline?: boolean; // 隐藏下划线
  leftComponent?: ReactElement<any>;
}

// 默认Props
const defaultProps: UGNavigationBarProps = {
  placement: 'center',
  statusBarProps: {
    translucent: true,
    backgroundColor: 'transparent',
  },
}

export const UGNavigationBar = (props: UGNavigationBarProps) => {
  let p: UGNavigationBarProps = Object.assign({}, defaultProps, props)

  // 标题
  if (props.title) {
    Object.assign(p, {
      centerComponent: {
        text: props.title,
        style: { color: 'white', fontSize: 18 },
      },
    })
  }
  // 左侧按钮
  p.leftComponent = (
    <View style={{ flexDirection: 'row' }}>
      <BackButton style={{ height: props.back ? 40 : 0 }} />
      {props.leftComponent}
    </View>
  )
  // 隐藏下划线
  if (props.hideUnderline) {
    p = deepMergeProps(p, { containerStyle: { borderBottomWidth: 0 }, })
  }

  // 渐变色
  if (props.gradientColor) {
    p = deepMergeProps(p, {
      ViewComponent: LinearGradient,
      linearGradientProps: {
        colors: props.gradientColor,
        start: { x: 0, y: 1 },
        end: { x: 1, y: 1 },
      },
    })
  }
  
  return <Header {...p} style={{ height: 100 }} containerStyle={{ paddingTop: useSafeArea()?.top-2, height: useSafeArea()?.top + 45 }} />
}



// 返回按钮
const BackButton = ({ style }: ViewProps) => {
  return (
    <Button
      icon={{ name: 'ios-arrow-back', type: 'ionicon', color: 'white' }}
      buttonStyle={Object.assign({ backgroundColor: 'transparent', marginLeft: -8, }, style)}
      onPress={() => {
        pop();
      }}
    />
  )
}