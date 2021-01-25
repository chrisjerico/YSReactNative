import { Image, ImageBackground, ImageProps, StyleProp, View, ViewStyle } from "react-native";
import * as React from "react";
import FastImage, { FastImageProperties } from "react-native-fast-image";
import { img_assets } from "../../../Res/icon";

interface ImagePlaceholder {
  placeholderURL?: string,
}

export const ImagePlaceholder = (props: ImageProps & ImagePlaceholder) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);
  const style: any = props?.style
  const { placeholderURL = img_assets('placeholder', 'jpg') } = props

  return <ImageBackground style={style} resizeMode='cover' source={{ uri: shwoDefaultImage ? placeholderURL : undefined }}>
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
  </ImageBackground>
}



export const FastImagePlaceholder = (props: FastImageProperties & ImagePlaceholder) => {
  const [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);
  const style: any = props?.style
  const { placeholderURL = img_assets('placeholder', 'jpg') } = props

  return <ImageBackground style={style} resizeMode='cover' source={{ uri: shwoDefaultImage ? placeholderURL : undefined }}>
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
    />
  </ImageBackground>
}
