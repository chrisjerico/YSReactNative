import FastImage, {FastImageProperties} from "react-native-fast-image";
import React, {useState} from "react";
import {anyEmpty} from "../Ext";
import usePopUpView from "../../hooks/usePopUpView";
import AppDefine from "../../define/AppDefine";

/**
 * Arc
 *
 * 扩展图片工具类
 */


//自动适配图片宽度
export const FastImageAutoWidth = (props: FastImageProperties) => {
  const width = anyEmpty(props.style?.width) ? 210 : props.style?.width;
  const [picWidth, setPicWidth] = useState(width);

  return (
    <FastImage {...props} style={[props.style, {width: picWidth}]} onLoad={(e) => {
      //console.log(props.style?.height / e.nativeEvent.height * e.nativeEvent.width, e.nativeEvent.width)
      setPicWidth(props.style?.height / e.nativeEvent.height * e.nativeEvent.width)
    }}/>
  )
}

export const FastImageAutoHeight = (props: FastImageProperties) => {
  const height = anyEmpty(props.style?.height) ? 100 : props.style?.height;
  const [picHeight, setPicHeight] = useState(height)
  const {cardMargin, marginHorizontal} = usePopUpView()
  return (
    <FastImage {...props} style={[props.style, {height: picHeight}]} onLoad={(e) => {
      setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
    }}/>
  )
}
