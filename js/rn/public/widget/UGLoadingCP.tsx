import React, { Component, useState, useEffect } from 'react'
import LinearGradient from "react-native-linear-gradient"
import AppDefine from "../define/AppDefine"
import { View, Text, StyleSheet, Platform } from "react-native"
import FastImage from "react-native-fast-image"
import { Skin1 } from "../theme/UGSkinManagers"
import { Button, Icon } from "react-native-elements"
import Animated, { Easing } from 'react-native-reanimated'
import { Res } from '../../Res/icon/Resources'
import { TouchableOpacity } from 'react-native-gesture-handler'


export enum UGLoadingType {
  Message,// 文本提示
  Loading,// 转圈
  Success,// 打勾
  Error,// ❌
  Reload,// 加载失败，点击重试
}

export class UGLoadingProps {
  type: UGLoadingType;
  text?: string;
  backgroundColor?: string[];// 支持渐变色
  pointerEvents?: boolean; // 点击穿透
  reloadClick?: () => void
  setHideLoading?: (hideLoading: () => void) => void

  static shared: UGLoadingProps;
}

let hideLoadingFunc = undefined;

// 在当前页面显示Loading
export function showMessage(text?: string) {
  showHUD({ type: UGLoadingType.Message, text: text, pointerEvents:true });
}
export function showLoading(text?: string, backgroundColor?: string[]) {
  showHUD({ type: UGLoadingType.Loading, text: text, backgroundColor: backgroundColor });
}
export function showSuccess(text?: string) {
  showHUD({ type: UGLoadingType.Success, text: text });
}
export function showError(text?: string) {
  showHUD({ type: UGLoadingType.Error, text: text });
}
export function showReload(text?: string, backgroundColor?: string[], reloadClick?: () => void) {
  showHUD({ type: UGLoadingType.Reload, text: text, backgroundColor: backgroundColor, reloadClick: reloadClick });
}
export function showHUD(props: UGLoadingProps) {
  console.log(props?.text);
  UGLoadingProps.shared = { ...props, setHideLoading: (func) => { hideLoadingFunc = func; } }
  refreshLoadingFunc();
}

// 隐藏当前页面Loading
export function hideLoading() {
  switch (Platform.OS) {
    case 'ios':
      hideLoadingFunc && hideLoadingFunc();
      break;
    case 'android':
      UGLoadingProps.shared = null
      refreshLoadingFunc();
      break;
  }
}



// ——————————————————————————————————————————————————————————————————————————————————————————
let refreshLoadingFunc: Function;
export class UGLoadingCP extends Component {
  constructor(p) {
    super(p);
    refreshLoadingFunc = (() => {
      this.setState({});
    }).bind(this);
  }
  render() {
    if (UGLoadingProps.shared) {
      return <UGLoadingCP1 {...UGLoadingProps.shared} />
    }
    return null;
  }
}


let lastProps: UGLoadingProps;

export const UGLoadingCP1 = (props: UGLoadingProps) => {
  const { type, text, backgroundColor = ['transparent', 'transparent'], reloadClick, setHideLoading, pointerEvents } = props;
  const [zIndex, setZIndex] = useState(0);
  const fadeInOpacity = new Animated.Value(0);
  const hideLoading = () => {
    Animated.timing(fadeInOpacity, { toValue: 0, duration: 250, easing: Easing.linear }).start();// 淡出
    setTimeout(() => { lastProps === props && setZIndex(-999); }, 250) // 开启点击穿透
    UGLoadingProps.shared = undefined;
  };

  // 显示新样式（重新初始化）
  if (lastProps !== props) {
    lastProps = props;
    setZIndex(0);
  }

  // 初始化
  useEffect(() => {
    Animated.timing(fadeInOpacity, { toValue: 1, duration: 250, easing: Easing.linear }).start(); // 淡入
    setHideLoading(hideLoading);

    switch (type) {
      case UGLoadingType.Message:
      case UGLoadingType.Success:
      case UGLoadingType.Error:
        setTimeout(() => { lastProps === props && hideLoading(); }, 3000);
      case UGLoadingType.Loading:
        setTimeout(() => { lastProps === props && hideLoading(); }, 20000);
      default: ;
    }
  }, [lastProps]);

  return (
    <Animated.View style={[{ position: 'absolute', zIndex: zIndex, width: AppDefine.width, height: AppDefine.height}, { opacity: fadeInOpacity }]} pointerEvents={pointerEvents ? 'none' : 'auto'}>
      <LinearGradient colors={backgroundColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1, justifyContent: 'center' }} >
        <View style={{ marginHorizontal: 30, marginTop: -50, backgroundColor: '#eee', alignSelf: 'center', borderRadius: 10, padding: 13 }} >
          {type == UGLoadingType.Loading && <FastImage style={[styles.icon, { width: 50, height: 50 }]} source={Res.加载中} />}
          {type == UGLoadingType.Success && <FastImage style={[styles.icon, { width: 30, height: 30 }]} source={Res.加载成功} />}
          {type == UGLoadingType.Error && <FastImage style={[styles.icon, { width: 30, height: 30 }]} source={Res.加载失败} />}
          {text && <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, lineHeight: 18 }} >{text}</Text>}
          {type == UGLoadingType.Reload && (
            <Button
              buttonStyle={{ margin: 10, marginTop: 18, marginBottom: 0, paddingHorizontal: 18, backgroundColor: Skin1.themeColor, borderRadius: 8 }}
              titleStyle={{ fontSize: 16 }}
              title='点击重试'
              onPress={reloadClick}
            />
          )}
          {type == UGLoadingType.Reload && (
            <View style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: -7, marginLeft: 30 }} >
              <TouchableOpacity containerStyle={[{ width: 44, height: 44 }, { overflow: 'hidden' }]} onPress={hideLoading}>
                <Icon size={30} type='antdesign' name="closecircleo" color='black' containerStyle={{ alignSelf: 'flex-end', marginRight: -7, backgroundColor: '#eee', borderRadius: 15 }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 20, marginTop: 8, marginBottom: 15, alignSelf: 'center',
  },
});
