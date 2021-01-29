import { Image, ImageBackground, ImageBackgroundProps, ImageProps, StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import FastImage, { FastImageProperties } from "react-native-fast-image";
import { img_assets } from "../../../Res/icon";

interface ImagePlaceholder {
  placeholderURL?: string,
  placeholderStyle?: ImageBackgroundProps
}

export const ImagePlaceholder = (props: ImageProps & ImagePlaceholder) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);
  const { style, placeholderStyle }: any = props
  const { placeholderURL = img_assets('placeholder', 'jpg') } = props

  return <View>
    {shwoDefaultImage && <ImageBackground style={[style, { position: 'absolute' }, placeholderStyle]} resizeMode='cover' source={{ uri: placeholderURL }} />}
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
  </View>
}



export const FastImagePlaceholder = (props: FastImageProperties & ImagePlaceholder) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);
  const { style, placeholderStyle }: any = props
  const { placeholderURL = img_assets('placeholder', 'jpg') } = props

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
      {shwoDefaultImage && <ImageBackground style={[{ flex: 1 }, placeholderStyle]} resizeMode='cover' source={{ uri: placeholderURL }} />}
    </FastImage>
  )
}
