import * as React from "react";
import {ReactNode} from "react";
import {BackHandler, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";

import IBasePageProps from "./IBasePageProps";
import IBasePageState from "./IBasePageState";
import {Button, Header} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import UGTheme from "../../theme/UGTheme";
import UGProgressCircle from "../../widget/progress/UGProgressCircle";
import {ReducerStatus} from "../../redux/inter/IReducerState";
import AppDefine from "../../../../js/rn/公共类/AppDefine";
import {checkTrue} from "../../utils/Ext";

/**
 * Arc
 *
 * 基础界面功能，包括：
 * 1，顶部 statusBar
 * 2，顶部titleBar
 * 3，中间内容区域
 *
 */

//取出主题色
const {primary, colorText, colorTitle, colorBackground} = UGTheme.getInstance().currentTheme();
let color = colorTitle;
let backgroundColor = colorBackground;

export default abstract class BasePage<P extends IBasePageProps, S extends IBasePageState> extends React.Component<P, S> {

  constructor(props) {
    super(props);
  }

  /**
   * 绘制中间区域，实际内容
   */
  abstract renderContent(): ReactNode;

  /**
   * 请求数据
   */
  abstract requestData();

  /**
   * 请求重试，根据需要是否重写
   */
  requestRetry() {
    this.requestData();
  };

  /**
   * 绘制顶部 statusBar
   *
   * @private
   */
  renderStatusBar(): ReactNode {
    return (
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
      />
    );
  }

  /**
   * 绘制进度条
   *
   * @private
   */
  _renderLoading(): ReactNode {
    return (
      <View style={_styles.loading}>
        <UGProgressCircle/>
      </View>
    );
  }

  /**
   * 绘制 重试界面
   *
   * @private
   */
  _renderRetry(): ReactNode {
    let status = this.props?.reducerData?.status;
    let msg = '';
    switch (status) {
      case ReducerStatus.FAILED:
        msg = '请求出错，请稍后重试';
        break;
      case ReducerStatus.NO_DATA:
        msg = '当前没有数据';
        break;
      default:
        msg = '没有数据，请稍后重试';
        break;
    }

    return (
      <View style={_styles.retry}>
        <Text style={_styles.retryHintText}>{msg}</Text>
        <Button buttonStyle={_styles.retryButton} title='重试'
                onPress={() => this.requestRetry()}/>
      </View>
    );
  }

  /**
   * 默认点击返回
   */
  clickLeftFunc = () => {
    //当前界面是否由原生打开，原生Android需要做前后台切换操作
    if (checkTrue(this.props?.fromNative)) {
      AppDefine.ocHelper.performSelectors(JSON.stringify({
        type: 'MOVE_TO_BACK',
      }));
    }

    Actions.pop();
  };

  /**
   * 默认点击右键
   */
  clickRightFunc = () => {};

  /**
   * 绘制顶部 header
   */
  renderHeader(): ReactNode {
    //不绘制 header
    if (checkTrue(this.props?.hideHeader)) {
      return this.renderStatusBar();
    }

    //当前界面配置的 title信息
    const title = this.props?.title;

    return (
      <Header
        placement="center"
        backgroundColor={primary}
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent'
        }}
        leftComponent={{
          icon: 'chevron-thin-left',
          type: 'entypo',
          color,
          onPress: this.clickLeftFunc
        }}
        centerComponent={{
          text: title,
          style: {color}
        }}
        rightComponent={{
          icon: 'close',
          color,
          onPress: this.clickRightFunc
        }}
      />
    );
  }

  /**
   * 绘制 加载框 或者 具体内容
   *
   * @private
   */
  _renderContentOrLoading(): ReactNode {
    //根据刷新状态，决定显示刷新界面还是具体内容
    switch (this.props?.reducerData?.status) {
      case ReducerStatus.LOADING:
        return this._renderLoading();
      case ReducerStatus.FAILED:
      case ReducerStatus.NO_DATA:
        return this._renderRetry();
      default:
        return this.renderContent();
    }
    // return checkTrue(this.props?.reducerData?.bLoading) ? this._renderLoading() : this.renderContent();
  }

  /**
   * 绘制整个界面
   */
  render(): ReactNode {
    return (
      <View style={_styles.container}>
        {
          this.renderHeader()
        }
        <SafeAreaView style={
          _styles.safeContainer
        }>
          {
            this._renderContentOrLoading()
          }
        </SafeAreaView>
      </View>
    );
  }

  componentDidMount(): void {
    this.requestData();
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
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
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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
    color: colorText,
    marginBottom: 8,
  },
});
