import { BottomTabNavigationOptions, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { PageName } from '../../public/navigation/Navigation'
import { navigationRef } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { UGColor } from '../../public/theme/UGThemeColor'
import { deepMergeProps } from '../../public/tools/FUtils'
import { ugLog } from '../../public/tools/UgLog'
import UGNavigationBar, { UGNavigationBarProps } from '../../public/widget/UGNavigationBar'
import { UGStore } from '../../redux/store/UGStore'

// Props
export interface UGBasePageProps<P extends UGBasePageProps = {}, V = {}> {
  // React-Navigation
  navigation?: BottomTabNavigationProp<{}> & StackNavigationProp<{}> & DrawerNavigationProp<{}> // 导航助手
  route?: { name: PageName; params: any }

  // 提供自定义api给页面使用
  setProps?(props?: P, willRender?: boolean): void // 设置Props并刷新
  vars?: V // 获取成员变量

  // —————————— 配置UI ——————————
  didFocus?: (p: UGBasePageProps) => void // 成为焦点时回调
  backgroundColor?: string[] // 背景色
  backgroundImage?: string
  navbarOpstions?: UGNavigationBarProps
  tabbarOpetions?: BottomTabNavigationOptions // 底部标签栏Options

  // —————————— 安卓独有参数 ——————————
  fromNative?: string //当前界面是否由原生打开
}

// HOC
export default (Page: Function) => {
  return (props: UGBasePageProps) => {
    const { route, navigation, tabbarOpetions = { unmountOnBlur: true } } = props ?? {}
    const newProps = useRef<UGBasePageProps>(null)
    const vars = useRef<any>(null)
    const [state, setState] = useState(null)

    // 监听焦点
    let lastParams
    navigation.removeListener('focus', null)
    navigation.addListener('focus', () => {
      const { name, params } = route
      ugLog('成为焦点', name, params)
      if (lastParams !== params) {
        // 跳转时参数设置到props
        lastParams = params
        setProps(params)
      }
      newProps.current?.didFocus && newProps.current?.didFocus(params)
    })
    //
    navigation.addListener('transitionEnd', (e) => {
      if (e.data.closing && navigationRef?.current?.getRootState().routes.length == 1) {
        //检查一下Native主页下面的tab是显示还是隐藏
        switch (Platform.OS) {
          case 'ios':
            OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [false, true])
            break
          case 'android':
            ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, { visibility: 0 })
            break
        }
      }
    })
    // 监听dispatch
    const unsubscribe = UGStore.subscribe(route.name, () => {
      // console.log('渲染' + route.name, newProps.current)
    })

    // 设置props
    const defaultProps: UGBasePageProps = {
      //Android渐变色数量必须 >= 2
      backgroundColor: [UGColor.BackgroundColor1, UGColor.BackgroundColor1],
      navbarOpstions: { hidden: true, gradientColor: Skin1.navBarBgColor },
    }
    newProps.current = deepMergeProps(defaultProps, props)
    newProps.current = deepMergeProps(newProps.current, UGStore.getPageProps(route.name))

    useEffect(() => {
      return unsubscribe
    }, [])

    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => {
          return null
        },
      })
      navigation.jumpTo && navigation.setOptions(tabbarOpetions)
    }, [navigation])

    const setProps = (props: any): void => {
      UGStore.dispatch({ type: 'merge', page: route?.name, props: props })
      newProps.current = deepMergeProps(newProps.current, UGStore.getPageProps(route.name))
      setState({})
    }

    const { backgroundColor = [UGColor.BackgroundColor1, UGColor.BackgroundColor1], backgroundImage = '', navbarOpstions = {} } = newProps?.current ?? {}

    return (
      <LinearGradient colors={backgroundColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <FastImage source={{ uri: backgroundImage }} style={{ flex: 1 }}>
          {!navbarOpstions.hidden && <UGNavigationBar {...navbarOpstions} />}
          <Page {...newProps.current} setProps={setProps} vars={vars.current} />
        </FastImage>
      </LinearGradient>
    )
  }
}
