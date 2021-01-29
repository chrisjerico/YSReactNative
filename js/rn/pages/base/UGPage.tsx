import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { PageName } from '../../public/navigation/Navigation'
import { getCurrentPage, getCurrentRoute, navigationRef } from '../../public/navigation/RootNavigation'
import { UGThemeConst } from '../../public/theme/const/UGThemeConst'
import { skin1, Skin1 } from '../../public/theme/UGSkinManagers'
import { UGColor } from '../../public/theme/UGThemeColor'
import { deepMergeProps } from '../../public/tools/FUtils'
import { ugLog } from '../../public/tools/UgLog'
import { UGNavigationBar, UGNavigationBarProps } from '../../public/widget/UGNavigationBar'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { Platform, View } from 'react-native'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'

// Props
export interface UGBasePageProps<P extends UGBasePageProps = {}, F = any> {
  // React-Navigation
  navigation?: BottomTabNavigationProp<{}> & StackNavigationProp<{}> & DrawerNavigationProp<{}> // 导航助手
  route?: { name: PageName; key: string, params: F }

  // 提供自定义api给页面使用
  setProps?(props?: P, willRender?: boolean): void // 设置Props并刷新
  setNavbarProps?(props: UGNavigationBarProps): void

  // —————————— 配置UI ——————————
  didFocus?: (p: F) => void // 成为焦点时回调
  didBlur?: () => void // 失去焦点时回调
  backgroundColor?: string // 背景色
  bgGradientColor?: string[] // 背景渐变色
  backgroundImage?: string
  navbarOpstions?: UGNavigationBarProps
}

// HOC
export default (Page: Function) => {
  return class extends React.Component<UGBasePageProps> {
    private unsubscribe: () => void

    constructor(props: UGBasePageProps) {
      super(props)
      const { navigation, route } = props

      // 监听焦点
      let lastParams
      navigation.removeListener('focus', null)
      navigation.addListener('focus', () => {
        const { name, key, params = {} } = this.props.route
        const { didFocus } = UGStore.getPageProps<UGBasePageProps>(key) ?? {}
        console.log('成为焦点', name, didFocus, params)

        if (lastParams !== params) {
          lastParams = params
          didFocus && didFocus(params)
        } else {
          didFocus && didFocus({})
        }
        this.setProps({})
      })
      navigation.removeListener('blur', null)
      navigation.addListener('blur', () => {
        const { name, key } = this.props.route
        const { didBlur } = UGStore.getPageProps<UGBasePageProps>(key) ?? {}
        console.log('失去焦点', name)
        didBlur && didBlur()
      })
      navigation.removeListener('transitionEnd', null)
      navigation.addListener('transitionEnd', (e) => {
        ugLog('当前routes=', e?.data?.closing, navigationRef?.current?.getRootState()?.routes?.length)
        if (e?.data?.closing && navigationRef?.current?.getRootState()?.routes?.length == 1) {
          this._showMainTab()
        }
      })
      // 监听dispatch
      this.unsubscribe = UGStore.subscribe(
        route?.key,
        (() => {
          this.setState({})
        }).bind(this)
      )
    }

    /**
     * 某些模板不需要显示主页TAB
     */
    _showMainTab = () => {
      const {
        mobileTemplateCategory, // 模版分类ID
      } = UGStore.globalProps.sysConf

      if (mobileTemplateCategory == UGThemeConst.黑金) {
        //检查一下Native主页下面的tab是显示还是隐藏
        switch (Platform.OS) {
          case 'ios':
            OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true])
            break
          case 'android':
            ugLog('ug page menu')
            ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, { visibility: 8 })
            break
        }
      } else {
        //检查一下Native主页下面的tab是显示还是隐藏
        switch (Platform.OS) {
          case 'ios':
            OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [false, true])
            break
          case 'android':
            ugLog('ug page menu visible 1')
            ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, { visibility: 0 })
            break
        }
      }
    }

    // 取消监听
    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe()
    }

    setProps<P extends UGBasePageProps>(props: P, willRender = true): void {
      // console.log('setProps, name = ', this.props.route.name, props);
      UGStore.dispatch({ type: 'merge', page: this.props?.route?.key, props: props }, willRender)
    }

    setNavbarProps(navBarProps: UGNavigationBarProps): void {
      const { route: { key } } = this.props
      const props = UGStore.getPageProps<UGBasePageProps>(key) ?? {}
      if (props?.navbarOpstions) {
        props.navbarOpstions = deepMergeProps(props.navbarOpstions, navBarProps)
        this.setState({})
      } else {
        this.setProps({ navbarOpstions: navBarProps })
      }
    }

    render() {
      const { route: { key } } = this.props
      const props = UGStore.getPageProps<UGBasePageProps>(key) ?? {}
      let { backgroundColor = skin1.backgroundColor ?? '#fff', bgGradientColor, backgroundImage, navbarOpstions } = props

      return (
        <LinearGradient colors={bgGradientColor ?? [backgroundColor, backgroundColor]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
          <FastImage source={{ uri: backgroundImage }} style={{ flex: 1 }} resizeMode={'stretch'}>
            {navbarOpstions && !navbarOpstions.hidden && <UGNavigationBar {...navbarOpstions} />}
            <Page
              {...this.props}
              {...props}
              setProps={this.setProps.bind(this)}
              setNavbarProps={this.setNavbarProps.bind(this)}
            />
          </FastImage>
        </LinearGradient>
      ) // navigation={this.props.navigation}
    }
  }
}

// 全局使用的setProps （刷新当前正在显示的页面）
export function setProps<P extends UGBasePageProps>(props?: P, willRender = true): void {
  UGStore.dispatch({ type: 'merge', page: getCurrentRoute()?.key, props: props }, willRender)
}
