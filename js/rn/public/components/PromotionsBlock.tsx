import { View, FlatList, TouchableWithoutFeedback, Text } from "react-native"
import React, { useState } from 'react'
import useGetHomeInfo from "../hooks/useGetHomeInfo"
import usePopUpView from "../hooks/usePopUpView"
import FastImage, { FastImageProperties } from "react-native-fast-image"
import AppDefine from "../define/AppDefine"
import AutoHeightWebView from "react-native-autoheight-webview"
import { useDimensions } from "@react-native-community/hooks"
const PromotionsBlock = () => {
  const { couponListData, } = useGetHomeInfo(['system_promotions'])
  const [selectId, setSelectedId] = useState(-1)
  const { onPopViewPress } = usePopUpView()
  const { width, height } = useDimensions().screen
  return (
    <FlatList style={{ marginTop: 10 }} data={couponListData?.data?.list?.filter((res, index) => index < 5)} renderItem={({ item, index }) => {
      return <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
          debugger
          if (selectId == index) {
            setSelectedId(-1)
          } else {
            setSelectedId(index)
          }
        })}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'black' }}>{item.title}</Text>
            <FastImageAutoHeight source={{ uri: item.pic }} />
          </View>
        </TouchableWithoutFeedback>

        {selectId == index ? <AutoHeightWebView
          style={{ width: width - 20, backgroundColor: 'white' }}
          // scalesPageToFit={true}
          viewportContent={'width=device-width, user-scalable=no'}
          source={{
            html: `<head>
                      <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                      <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                      <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
                    </head>` +
              `<script>
                      window.onload = function () {
                        window.location.hash = 1;
                        document.title = document.body.scrollHeight;
                      }
                    </script>`+ item.content
          }}></AutoHeightWebView> : null
        }

      </View >
    }} />
  )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  const { cardMargin, marginHorizontal } = usePopUpView()
  return (
    <FastImage {...props} style={[props.style, { height: picHeight }]} onLoad={(e) => {
      setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
    }} />
  )
}
export default PromotionsBlock