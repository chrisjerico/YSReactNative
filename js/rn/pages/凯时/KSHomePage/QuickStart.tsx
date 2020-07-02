import { View, Text } from "react-native"
import { useDimensions } from "@react-native-community/hooks"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useRef, useState } from 'react'
import FastImage from "react-native-fast-image"
import Carousel from "react-native-banner-carousel"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import PushHelper from "../../../public/define/PushHelper"
import { BannerModel } from "../../../public/network/Model/BannerModel"
import useGetHomeInfo from "../../../public/hooks/useGetHomeInfo"
const QuickStart = () => {
  const { banner, onlineNum, loading, } = useGetHomeInfo()
  const { width, height } = useDimensions().screen
  return (
    <View >
      <View style={{ width: width - 20, height: 68, paddingBottom: 5, flexDirection: 'row', alignSelf: 'center' }}>
        <LinearGradient colors={["#eb5d4d", "#fb7a24"]} style={{ flex: 1, backgroundColor: "#3a3a41", borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <FastImage style={{ width: 27, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/depositlogo.png" }} />
          <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>存款</Text>
        </LinearGradient>
        <View style={{ flex: 1, borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
          <FastImage style={{ width: 20, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/xima.png" }} />
          <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>额度转换</Text>
        </View>
        <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
          <FastImage style={{ width: 27, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/withdrawlogo.png" }} />
          <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>取款</Text>
        </View>
      </View>
      <View style={{ width: width - 20, height: 135, paddingBottom: 5, flexDirection: 'row', alignSelf: 'center', paddingRight: 10 }}>
        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row', marginBottom: 5 }}>
            <FastImage style={{ width: 20, height: 18 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/lxb.png" }} />
            <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>利息宝</Text>
          </View>
          <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
            <FastImage style={{ width: 20, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/yxdt.png" }} />
            <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>游戏大厅</Text>
          </View>
        </View>
        <View style={{ flex: 2, paddingLeft: 5 }}>
          <Banner bannerData={banner} onlineNum={onlineNum} />
        </View>
      </View>
    </View>
  )
}
const Banner = ({ bannerData, onlineNum = 0 }: { bannerData: BannerModel, onlineNum: number }) => {
  const { width, } = useDimensions().window
  const BannerRef = useRef<Carousel>()
  const [height, setHeight] = useState(100)
  useEffect(() => {
    const timer = setInterval(() => {
      //@ts-ignore
      BannerRef?.current?.gotoNextPage()
    }, 2000);
    return (() => {
      clearInterval(timer)
    })
  }, [bannerData])
  if (bannerData?.data?.list?.length > 0) {
    return (
      <View>

        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          activePageIndicatorStyle={{ backgroundColor: "#fb2464" }}
          pageSize={(width - 25) / 3 * 2}
        >
          {bannerData?.data?.list?.map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage
                  // onLoad={(e) => {
                  //   console.log(e.nativeEvent.height, e.nativeEvent.width, e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))
                  //   setHeight(e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))

                  // }}
                  key={'banner' + index} style={{ width: (width - 25) / 3 * 2, height: 128, borderRadius: 8 }} source={{ uri: res.pic }} >

                </FastImage>
              </TouchableWithoutFeedback>)
          })}
        </Carousel>
        <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
          <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
        </View>
      </View>
    )

  } else {
    return <View style={{ height: (width - 20) / 2, }}></View>
  }

}
export default QuickStart