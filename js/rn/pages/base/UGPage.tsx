import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { PageName } from '../../public/navigation/Navigation'
import { getCurrentPage, navigationRef } from '../../public/navigation/RootNavigation'
import { UGThemeConst } from '../../public/theme/const/UGThemeConst'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { UGColor } from '../../public/theme/UGThemeColor'
import { deepMergeProps } from '../../public/tools/FUtils'
import { ugLog } from '../../public/tools/UgLog'
import UGNavigationBar, { UGNavigationBarProps } from '../../public/widget/UGNavigationBar'
import { UGStore } from '../../redux/store/UGStore'

// Props
export interface UGBasePageProps<P extends UGBasePageProps = {}, F = any> {
  // React-Navigation
  navigation?: BottomTabNavigationProp<{}> & StackNavigationProp<{}> & DrawerNavigationProp<{}> // 导航助手
  route?: { name: PageName; params: F }

  // 提供自定义api给页面使用
  setProps?(props?: P, willRender?: boolean): void // 设置Props并刷新

  // —————————— 配置UI ——————————
  didFocus?: (p: F) => void // 成为焦点时回调
  backgroundColor?: string[] // 背景色
  backgroundImage?: string
  navbarOpstions?: UGNavigationBarProps
}

// HOC
export default (Page: Function) => {
  return class extends React.Component<UGBasePageProps> {
    private unsubscribe: () => void
    private newProps: UGBasePageProps = null

    constructor(props: UGBasePageProps) {
      super(props)
      const { navigation, route } = props

      // 监听焦点
      let lastParams
      navigation.removeListener('focus', null)
      navigation.addListener('focus', () => {
        const { name, params = {} } = this.props.route
        const { didFocus } = this.newProps
        console.log('成为焦点', name, params)

        if (lastParams !== params) {
          lastParams = params
          didFocus && didFocus(params)
        } else {
          didFocus && didFocus({})
        }
        this.setProps({})
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
        route.name,
        (() => {
          this.newProps = deepMergeProps(this.newProps, UGStore.getPageProps(route.name))
          this.setState({})
        }).bind(this)
      )

      // 设置props
      const defaultProps: UGBasePageProps = {
        //Android渐变色数量必须 >= 2
        backgroundColor: [UGColor.BackgroundColor1, UGColor.BackgroundColor1],
        navbarOpstions: { hidden: true, gradientColor: Skin1.navBarBgColor },
      }
      this.newProps = deepMergeProps(defaultProps, this.props)
      this.newProps = deepMergeProps(this.newProps, UGStore.getPageProps(route.name))
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

    setProps<P>(props: P, willRender = true): void {
      // console.log('setProps, name = ', this.props.route.name, props);
      UGStore.dispatch({ type: 'merge', page: this.props.route.name, props: props }, willRender)
    }

    render() {
      // console.log('渲染', this.props.route.name);
      let { backgroundColor = [UGColor.BackgroundColor1, UGColor.BackgroundColor1], backgroundImage = '', navbarOpstions = {} } = this.newProps

      return (
        <LinearGradient colors={backgroundColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
          <FastImage source={{ uri: backgroundImage }} style={{ flex: 1 }} resizeMode={'stretch'}>
            {!navbarOpstions.hidden && <UGNavigationBar {...navbarOpstions} />}
            <Page {...this.newProps} setProps={this.setProps.bind(this)} />
          </FastImage>
        </LinearGradient>
      ) // navigation={this.props.navigation}
    }
  }
}

// 全局使用的setProps （刷新当前正在显示的页面）
export function setProps<P extends UGBasePageProps>(props?: P, willRender = true): void {
  UGStore.dispatch({ type: 'merge', page: getCurrentPage(), props: props }, willRender)
}
