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

  return <View>
    {shwoDefaultImage && <Image style={[style, { position: 'absolute' }]} resizeMode='cover' source={{ uri: placeholderURL }} />}
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
  const style: any = props?.style
  const { placeholderURL = img_assets('placeholder', 'jpg') } = props

  return <View>
    {shwoDefaultImage && <FastImage style={[style, { position: 'absolute' }]} resizeMode='cover' source={{ uri: placeholderURL }} />}
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
  </View>
}
