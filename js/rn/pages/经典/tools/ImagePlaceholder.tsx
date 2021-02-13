import { Image, ImageBackground, ImageBackgroundProps, ImageProps, StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import FastImage, { FastImageProperties, ImageStyle } from "react-native-fast-image";
import { img_assets } from "../../../Res/icon";
import LinearGradient from "react-native-linear-gradient";
import { TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

type PlaceholderImageType = '默认' | '彩票'
interface PlaceholderProps {
  placeholderURL?: string,// 占位图
  placeholderImageType?: PlaceholderImageType  // 占位图
  placeholderGradientColor?: string[] // 占位渐变色
  placeholderStyle?: StyleProp<ImageStyle>// 占位元素样式

  containerStyle?: StyleProp<ViewStyle>// 父元素样式
  children?: any // 支持子元素
  onPress?: () => void //点击事件
}

function getPlaceholderImage(type: PlaceholderImageType) {
  switch (type) {
    case '彩票':
      return img_assets('load')
    default:
      // 默认占位图
      return img_assets('placeholder', 'jpg')
  }
}


export const ImagePlaceholder = (props: ImageProps & PlaceholderProps) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);

  const { style } = props
  const { placeholderURL, placeholderImageType, placeholderGradientColor, placeholderStyle, children, onPress, containerStyle } = props
  const placeholderImage = placeholderURL ?? getPlaceholderImage(placeholderImageType)

  // 并列显示两个absolute的占位元素
  const cp = <>
    {shwoDefaultImage && placeholderGradientColor && <LinearGradient colors={placeholderGradientColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={[style, { position: 'absolute' }, placeholderStyle]} />}
    {shwoDefaultImage && !placeholderGradientColor && <ImageBackground style={[style, { position: 'absolute' }, placeholderStyle]} resizeMode='cover' source={{ uri: placeholderImage }} />}
    <Image
      {...props}
      onError={(err) => {
        setShwoDefaultImage(true)
        props?.onError && props?.onError(err)
      }}
      onLoad={(event) => {
        setShwoDefaultImage(false)
        props?.onLoad && props?.onLoad(event)
      }}
    />
  </>

  if (children || onPress || containerStyle) {
    return (
      <TouchableOpacity onPress={onPress} style={[{}, containerStyle]} >
        {cp}
        {children && <View style={{ position: 'absolute', width: '100%', height: '100%' }}>{children}</View>}
      </TouchableOpacity>
    )
  }
  return cp;
}


export const FastImagePlaceholder = (props: FastImageProperties & PlaceholderProps) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);

  const { placeholderURL, placeholderImageType, placeholderGradientColor, placeholderStyle, children, onPress, containerStyle } = props
  const placeholderImage = placeholderURL ?? getPlaceholderImage(placeholderImageType)

  const { current: v } = React.useRef({
    opacity: new Animated.Value(1),
  });

  // FastImage包含两个占位元素
  const cp = (
    <FastImage
      {...props}
      onError={() => {
        setShwoDefaultImage(true)
        props?.onError && props?.onError()
      }}
      onLoad={(event) => {
        setShwoDefaultImage(false)
        props?.onLoad && props?.onLoad(event)
      }}
    >
      {shwoDefaultImage && placeholderGradientColor && <LinearGradient colors={placeholderGradientColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={[{ position: 'absolute', width: '100%', height: '100%' }, placeholderStyle]} />}
      {shwoDefaultImage && !placeholderGradientColor && <FastImage style={[{ position: 'absolute', width: '100%', height: '100%' }, placeholderStyle]} resizeMode='cover' source={{ uri: placeholderImage }} />}
      {children}
    </FastImage>
  )

  if (onPress || containerStyle) {
    return (
      <TouchableNativeFeedback onPress={onPress} onPressIn={() => {
        Animated.timing(v.opacity, { toValue: 0.2, duration: 75, easing: Easing.linear }).start(); // 半透明
      }} onPressOut={() => {
        Animated.timing(v.opacity, { toValue: 1, duration: 75, easing: Easing.linear }).start();// 不透明
      }} >
        <Animated.View style={[{ opacity: v.opacity }, containerStyle]}>
          {cp}
        </Animated.View>
      </TouchableNativeFeedback >
    )
  }
  return cp
}
