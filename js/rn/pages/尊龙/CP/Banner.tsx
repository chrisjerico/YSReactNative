import { useDimensions } from "@react-native-community/hooks"
import { BannerModel } from "../../../public/network/Model/BannerModel"
import Carousel from "react-native-banner-carousel"
import { useRef, useState, useEffect } from "react"
import { View, TouchableWithoutFeedback, Text, Dimensions, ViewStyle } from "react-native"
import PushHelper from "../../../public/define/PushHelper"
import FastImage from "react-native-fast-image"
import React from 'react'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const Banner = ({ bannerData, onlineNum = 0, onlineSwitch, size = {
  width: 0, height: 0,
}, style }: {
  bannerData: BannerModel, onlineNum: number, onlineSwitch: number, size: {
    width: number,
    height: number
  },
  style?: ViewStyle
}) => {
  const BannerRef = useRef<Carousel>()
  const [height, setHeight] = useState(100)
  useEffect(() => {
    let timer = null
    if (parseFloat(bannerData?.data?.interval) > 0) {
      timer = setInterval(() => {
        //@ts-ignore
        BannerRef?.current?.gotoNextPage()
      }, parseFloat(bannerData?.data?.interval) * 1000);
    }

    return (() => {
      clearInterval(timer)
    })
  }, [bannerData,])
  if (bannerData?.data?.list?.length > 0) {
    return (
      <View style={{ ...style }}>

        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          pageSize={size.width}
        >
          {bannerData?.data?.list?.map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage onLoad={(e) => {
                  if (!size.height) {
                    setHeight(e.nativeEvent.height * ((size.width) / e.nativeEvent.width))
                  }


                }} key={'banner' + index} style={{ width: size.width, height: size.height ? size.height : height, borderRadius: 10 }} source={{ uri: res.pic }} >

                </FastImage>
              </TouchableWithoutFeedback>)
          })}
        </Carousel>
        {onlineSwitch == 1 ? <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
          <UGText style={{ color: 'white' }}>当前在线:{onlineNum}</UGText>
        </View> : null}

      </View>
    )

  } else {
    return null
  }

}
export default Banner
