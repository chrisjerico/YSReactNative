import React, { Component } from 'react';
import { Header, HeaderProps, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { deepMergeProps } from '../tools/FUtils';
import {Platform, View, ViewProps} from 'react-native';
import {  } from '../navigation/Navigation';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { pop } from '../navigation/RootNavigation';

export interface UGNavigationBarProps extends HeaderProps {
  hidden?: boolean; // 隐藏导航条
  back?: boolean; // 是否显示返回按钮
  title?: string; // 标题
  gradientColor?: string[]; // 背景渐变色
  hideUnderline?: boolean; // 隐藏下划线
  leftComponent?: React.ReactElement<{}>;
}

export default class UGNavigationBar extends Component<UGNavigationBarProps> {
  newProps: UGNavigationBarProps = {
    placement: 'center',
    statusBarProps: {
      translucent: true,
      backgroundColor: 'transparent',
    },
  };

  // 返回按钮
  BackButton({ style }: ViewProps) {
    return (
      <Button
        icon={{ name: 'ios-arrow-back', type: 'ionicon', color: 'white' }}
        buttonStyle={[{ backgroundColor: 'transparent', marginLeft: -8 }, style]}
        onPress={() => {
          pop();
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
              break;
            case 'android':

              break;
          }
        }}
      />
    );
  }

  render() {
    let props: UGNavigationBarProps = Object.assign(this.newProps, this.props);

    // 标题
    if (props.title) {
      Object.assign(props, { centerComponent: { text: props.title, style: { color: 'white', fontSize: 18 } } });
    }
    // 左侧按钮
    props.leftComponent = (
      <View style={{ flexDirection: 'row' }}>
        <this.BackButton style={{ height: this.props.back ? 40 : 0 }} />
        {this.props.leftComponent}
      </View>
    );
    // 隐藏下划线
    if (props.hideUnderline) {
      props = deepMergeProps(props, { containerStyle: { borderBottomWidth: 0 } });
    }

    // 渐变色
    if (props.gradientColor) {
      props = deepMergeProps(props, { ViewComponent: LinearGradient, linearGradientProps: { colors: props.gradientColor, start: { x: 0, y: 1 }, end: { x: 1, y: 1 } } });
    }
    return <Header {...props} />;
  }
}
