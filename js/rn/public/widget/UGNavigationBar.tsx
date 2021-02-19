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

const sc = sc375

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
  onBackPress?: () => void
  c_ref?: UGNavigationBar
}

export const UGNavigationBar = (p: UGNavigationBarProps) => {
  const [, setState] = useState({})
  const { current: v } = useRef<{ props: UGNavigationBarProps, internalRender: boolean }>({
    props: p,
    internalRender: false,  // 是否内部渲染
  })
  if (!v.internalRender) {
    v.props = p // 从外部渲染的情况下，直接从外部取值
  }
  v.internalRender = false

  // 参数
  const { hidden, title, leftComponent, back = true, hideUnderline, gradientColor, backgroundColor, backIconColor, onBackPress } = v.props
  const { c_ref } = v.props
  const { style, statusBarProps, containerStyle, centerComponent } = v.props

  const isDoy = skin1?.skitType == 'doyWallet'

  // 配置内部渲染函数
  useEffect(() => {
    c_ref && (c_ref.setNavBarProps = (p) => {
      v.internalRender = true
      v.props = p
      setState({})
    })
  }, [c_ref])

  if (!Object.keys(v.props).filter((k) => k != 'c_ref')?.length || hidden) {
    // console.log('不显示导航条', v.props,);
    return null
  }

  // 渐变色
  let colors = gradientColor
  if (!gradientColor && !backgroundColor) {
    colors = skin1.navBarBgColor
  }

  return <Header
    placement='center'
    {...v.props}
    {...(colors && {
      ViewComponent: LinearGradient,
      linearGradientProps: {
        colors: colors,
        start: { x: 0, y: 1 },
        end: { x: 1, y: 1 },
      },
    })}
    statusBarProps={{ translucent: true, backgroundColor: 'transparent', ...statusBarProps }}
    style={[{ height: sc(100) }, style]}
    containerStyle={[{ paddingTop: useSafeArea()?.top - 2, height: useSafeArea()?.top + sc(45), borderBottomWidth: hideUnderline ? 0 : sc(1) }, containerStyle]}
    centerComponent={{
      text: title,
      style: { color: 'white', fontSize: sc(18), fontWeight: isDoy ? '800' : '400', },
      ...centerComponent,
    }}
    leftComponent={
      <View style={{ flexDirection: 'row' }}>
        <BackButton style={{ height: back ? 40 : 0 }} backIconColor={backIconColor} onBackPress={onBackPress} />
        {leftComponent}
      </View>
    }
  />
}



// 返回按钮
const BackButton = ({ style, backIconColor, onBackPress }: { style: StyleProp<ViewStyle>, backIconColor: string, onBackPress?: () => void }) => {
  const isDoy = skin1?.skitType == 'doyWallet'
  const icon = isDoy ? { name: 'arrowleft', type: 'antdesign', size: sc375(25) } : { name: 'ios-arrow-back', type: 'ionicon' }

  return (
    <Button
      icon={{ ...icon, color: backIconColor ?? 'white' }}
      buttonStyle={Object.assign({ backgroundColor: 'transparent', marginLeft: -8, }, style)}
      onPress={() => {
        onBackPress ? onBackPress() : pop();
      }}
    />
  )
}