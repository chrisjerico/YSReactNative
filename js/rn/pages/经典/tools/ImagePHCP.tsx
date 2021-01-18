import { Image, ImageStyle, StyleProp, View } from "react-native";
import * as React from "react";
import { scale } from "../../../public/tools/Scale";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface ImagePHCP {
  style?: StyleProp<ImageStyle>;
  url?: string          //图片地址
  imgW?: number      //
  imgH?: number  //icon 是否显示    
}
export const ImagePHCP = (props: ImagePHCP) => {

  let [shwoDefaultImage, setShwoDefaultImage] = React.useState(true);
  return   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  <Image
    style={[{ width: props.imgW, height: props.imgH,  },props.style]}
    source={{
      uri: props.url,
      // uri: 'https://appstatic.guolaow.com/web/images/zxkf.png'

    }}
    onError={() => {
      // console.log('onError:true');
      setShwoDefaultImage(true)
    }}
    onLoad={() => {
      // console.log('成功加载');
      setShwoDefaultImage(false)
    }}
  />

  <View style={{ position: 'absolute', width: props.imgW, height: props.imgH,justifyContent: 'center', alignItems: 'center' }}>
    {shwoDefaultImage && <FontAwesome
      name={'file-picture-o'}
      color={'#808080'}
      size={scale(props.imgW)}
    />}
  </View>
</View>
}
