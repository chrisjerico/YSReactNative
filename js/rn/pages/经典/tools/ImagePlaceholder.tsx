import { Image, ImageBackground, ImageBackgroundProps, ImageProps, StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import FastImage, { FastImageProperties, ImageStyle } from "react-native-fast-image";
import { img_assets } from "../../../Res/icon";
import LinearGradient from "react-native-linear-gradient";

type PlaceholderImageType = '默认占位图' | '彩票占位图'
interface PlaceholderProps {
  placeholderURL?: string,// 占位图
  placeholderImageType?: PlaceholderImageType  // 占位图
  placeholderGradientColor?: string[] // 占位渐变色
  placeholderStyle?: StyleProp<ImageStyle>
  children?: any
}

function getPlaceholderImage(type: PlaceholderImageType) {
  switch (type) {
    case '彩票占位图':
      return img_assets('load')
    default:
      // 默认占位图
      return img_assets('placeholder', 'jpg')
  }
}


export const ImagePlaceholder = (props: ImageProps & PlaceholderProps) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);

  const { placeholderURL, placeholderImageType, placeholderGradientColor, style, placeholderStyle } = props
  const placeholderImage = placeholderURL ?? getPlaceholderImage(placeholderImageType)

  return <>
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
}


// 建议使用 FastImagePlaceholder
export const FastImagePlaceholder = (props: FastImageProperties & PlaceholderProps) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);

  const { placeholderURL, placeholderImageType, placeholderGradientColor, style, placeholderStyle, children } = props
  const placeholderImage = placeholderURL ?? getPlaceholderImage(placeholderImageType)

  return (
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
}
