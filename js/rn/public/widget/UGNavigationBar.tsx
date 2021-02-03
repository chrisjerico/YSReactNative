import React, { useState } from 'react'
import { Component, ReactElement, useEffect, useRef } from 'react'
import { Header, HeaderProps, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { deepMergeProps } from '../tools/FUtils'
import { Platform, StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { pop } from '../navigation/RootNavigation'
import { useSafeArea } from 'react-native-safe-area-context'
import { skin1 } from '../theme/UGSkinManagers'
import { sc375 } from '../tools/Scale'


export interface UGNavigationBar {
  setNavBarProps?: (props: UGNavigationBarProps) => void
}

// 声明Porps
export interface UGNavigationBarProps extends HeaderProps {
  hidden?: boolean; // 隐藏导航条
  back?: boolean; // 是否显示返回按钮
  backIconColor?: string // 返回按钮颜色
  title?: string; // 标题
  gradientColor?: string[]; // 背景渐变色
  hideUnderline?: boolean; // 隐藏下划线
  leftComponent?: ReactElement<any>;
  c_ref?: UGNavigationBar
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
  const { current: v } = useRef<UGNavigationBarProps>(defaultProps)
  Object.assign(v, props)

  const { title, c_ref, leftComponent, back = true, hideUnderline, gradientColor, backgroundColor, backIconColor } = props
  const [, setState] = useState({})

  useEffect(() => {
    c_ref && (c_ref.setNavBarProps = (p) => {
      Object.assign(v, deepMergeProps(v, p))
      setState({})
    })
  }, [c_ref])

  // 标题
  if (title) {
    Object.assign(v, {
      centerComponent: {
        text: title,
        style: { color: 'white', fontSize: 18 },
      },
    })
  }
  // 左侧按钮
  v.leftComponent = (
    <View style={{ flexDirection: 'row' }}>
      <BackButton style={{ height: back ? 40 : 0 }} backIconColor={backIconColor} />
      {leftComponent}
    </View>
  )
  // 隐藏下划线
  if (hideUnderline) {
    Object.assign(v, deepMergeProps(v, { containerStyle: { borderBottomWidth: 0 }, }))
  }

  // 渐变色
  if (!gradientColor && !backgroundColor) {
    Object.assign(v, deepMergeProps(v, {
      ViewComponent: LinearGradient,
      linearGradientProps: {
        colors: skin1.navBarBgColor,
        start: { x: 0, y: 1 },
        end: { x: 1, y: 1 },
      },
    }))
  }

  return <Header {...v} style={{ height: 100 }} containerStyle={{ paddingTop: useSafeArea()?.top - 2, height: useSafeArea()?.top + 45 }} />
}



// 返回按钮
const BackButton = ({ style, backIconColor }: { style: StyleProp<ViewStyle>, backIconColor: string }) => {
  const isDoy = skin1?.skitType?.indexOf('doyWallet')
  const icon = !isDoy ? { name: 'arrowleft', type: 'antdesign', size: sc375(25) } : { name: 'ios-arrow-back', type: 'ionicon' }
  return (
    <Button
      icon={{ ...icon, color: backIconColor ?? 'white' }}
      buttonStyle={Object.assign({ backgroundColor: 'transparent', marginLeft: -8, }, style)}
      onPress={() => {
        pop();
      }}
    />
  )
}