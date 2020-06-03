import React, {Component} from 'react';
import {ReactNode} from 'react';
import {BackHandler, SafeAreaView, StyleSheet, Text, View, Platform} from 'react-native';

import {Button} from 'react-native-elements';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import {checkTrue} from '../../public/tools/Ext';
import LinearGradient from 'react-native-linear-gradient';
import {UGBasePageProps, UGLoadingType} from './UGBasePageProps';
import {Skin1} from '../../public/theme/UGSkinManagers';
import {UGStore} from '../../redux/store/UGStore';
import {Navigation} from '../../public/navigation/Navigation';
import UGNavigationBar from '../../public/widget/UGNavigationBar';
import {mergeProps} from '../../public/tools/FUtils';
import {OCHelper} from '../../public/define/OCHelper/OCHelper';
import {ANHelper, NativeCommand} from '../../public/define/ANHelper/ANHelper';
import FastImage from 'react-native-fast-image';

/**
 * Arc
 *
 * 基础界面功能，包括：
 * 1，顶部 statusBar
 * 2，顶部titleBar
 * 3，中间内容区域
 *
 */
export default abstract class UGBasePage<P extends UGBasePageProps = UGBasePageProps, S = {}> extends Component<P, S> {
  // 更新Props（给子类调用）
  setProps(props: P | UGBasePageProps) {
    UGStore.dispatch({type: this.props.actType, props: props});
  }

  /**
   * 请求数据
   */
  abstract requestData(): void;

  /**
   * 成为焦点页面
   */
  abstract didFocus(params: P): void;

  /**
   * 绘制中间区域，实际内容
   */
  abstract renderContent(): ReactNode;

  constructor(props) {
    super(props);

    // 配置导航
    {
      const {navigation, navbarOpstions = {}, tabbarOpetions = {}, route} = this.props;
      navigation.removeListener('focus', null);
      navigation.addListener('focus', () => {
        const {name, params} = this.props.route;
        console.log('成为焦点', name, params);
        this.didFocus && this.didFocus(params);
        this.setProps(params);
      });
      navigation.setOptions({header: null});
      if (navigation.push && navigation.jumpTo) {
        Navigation.setNavigation(navigation);
      }
      navigation.pop && navigation.setOptions(navbarOpstions);
      navigation.jumpTo && navigation.setOptions(tabbarOpetions);
      console.log('页面初始化', route.name, navigation.jumpTo, tabbarOpetions);
    }
  }

  componentDidMount(): void {
    console.log('componentDidMount', this.props.route.name);
    this.requestData();
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
  }

  /**
   * 响应 Android物理返回键
   */
  _onBackAndroid = () => {
    this.clickLeftFunc();
    // BackHandler.exitApp();
    return true;
  };

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
  }

  /**
   * 请求重试，根据需要是否重写
   */
  requestRetry() {
    this.requestData();
  }

  /**
   * 默认点击返回
   */
  clickLeftFunc = () => {
    //当前界面是否由原生打开，原生Android需要做前后台切换操作
    if (checkTrue(this.props.fromNative)) {
      ANHelper.call(NativeCommand.MOVE_TO_BACK);
    }

    Navigation.pop();

    if (Platform.OS == 'ios') {
      OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
    } else {
      // TODO 安卓
    }
  };

  /**
   * 默认点击右键
   */
  clickRightFunc = () => {};

  /**
   * 绘制进度条
   *
   * @private
   */
  _renderLoading(): ReactNode {
    return (
      <View style={_styles.loading}>
        <UGProgressCircle />
      </View>
    );
  }

  /**
   * 绘制 重试界面
   *
   * @private
   */
  _renderRetry(): ReactNode {
    const status = this.props.status;
    let msg = '';
    switch (status) {
      case UGLoadingType.Failed:
        msg = '请求出错，请稍后重试';
        break;
      case UGLoadingType.NoData:
        msg = '当前没有数据';
        break;
      default:
        msg = '没有数据，请稍后重试';
        break;
    }

    return (
      <View style={_styles.retry}>
        <Text style={_styles.retryHintText}>{msg}</Text>
        <Button buttonStyle={_styles.retryButton} title="重试" onPress={() => this.requestRetry()} />
      </View>
    );
  }

  /**
   * 绘制顶部 header
   */
  renderHeader(): ReactNode {
    let {navbarOpstions = {}} = this.props;
    if (navbarOpstions.hidden) {
      return null;
    }
    if (!navbarOpstions.backgroundColor) {
      navbarOpstions = mergeProps({gradientColor: Skin1.navBarBgColor}, navbarOpstions);
    }
    return <UGNavigationBar {...navbarOpstions} />;
  }

  /**
   * 绘制 加载框 或者 具体内容
   *
   * @private
   */
  _renderContentOrLoading(): ReactNode {
    //根据刷新状态，决定显示刷新界面还是具体内容
    switch (this.props.status) {
      case UGLoadingType.Loading:
        return this._renderLoading();
      case UGLoadingType.Failed:
      case UGLoadingType.NoData:
        return this._renderRetry();
      default:
        return this.renderContent();
    }
  }

  /**
   * 绘制整个界面
   */
  render(): ReactNode {
    console.log('渲染', this.props.route.name);
    let {backgroundColor = [], backgroundImage = ''} = this.props;
    if (backgroundColor.length < 1) {
      backgroundColor = ['#fff', '#fff'];
    } else if (backgroundColor.length < 2) {
      backgroundColor.push(backgroundColor[0]);
    }
    return (
      <LinearGradient colors={backgroundColor} start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={{flex: 1}}>
        <FastImage source={{uri: backgroundImage}} style={{flex: 1}}>
          {this.renderHeader()}
          <SafeAreaView style={{flex:1}}>{this._renderContentOrLoading()}</SafeAreaView>
        </FastImage>
      </LinearGradient>
    );
  }
}

const _styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retry: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    width: 80,
  },
  retryHintText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 15,
  },
});
