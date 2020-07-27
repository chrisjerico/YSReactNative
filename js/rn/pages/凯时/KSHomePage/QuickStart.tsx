import { View, Text, TouchableOpacity } from "react-native"
import { useDimensions } from "@react-native-community/hooks"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useRef, useState } from 'react'
import FastImage from "react-native-fast-image"
import Carousel from "react-native-banner-carousel"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import PushHelper from "../../../public/define/PushHelper"
import { BannerModel } from "../../../public/network/Model/BannerModel"
import useGetHomeInfo from "../../../public/hooks/useGetHomeInfo"
import { UGUserCenterType } from "../../../redux/model/全局/UGSysConfModel"
import Banner from "../../尊龙/CP/Banner"
const QuickStart = () => {
  const { banner, onlineNum, onlineSwitch, } = useGetHomeInfo()
  const { width, height } = useDimensions().screen
  return (
    <View >
      <View style={{ width: width - 20, height: 68, paddingBottom: 5, flexDirection: 'row', alignSelf: 'center' }}>
        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.存款)
        }}>
          <LinearGradient colors={["#eb5d4d", "#fb7a24"]} style={{ backgroundColor: "#3a3a41", borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: "100%" }}>
            <FastImage style={{ width: 27, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/depositlogo.png" }} />
            <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>存款</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
        }}>
          <View style={{ flex: 1, borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
            <FastImage style={{ width: 20, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/xima.png" }} />
            <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>额度转换</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.取款)
        }}>
          <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
            <FastImage style={{ width: 27, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/withdrawlogo.png" }} />
            <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>取款</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: width - 20, height: 135, paddingBottom: 5, flexDirection: 'row', alignSelf: 'center', paddingRight: 10 }}>
        <View style={{ flex: 1, }}>
          <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.利息宝)
          }}>
            <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row', marginBottom: 5 }}>
              <FastImage style={{ width: 20, height: 18 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/lxb.png" }} />
              <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>利息宝</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.游戏大厅)
          }}>
            <View style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3a3a41", flexDirection: 'row' }}>
              <FastImage style={{ width: 20, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/yxdt.png" }} />
              <Text style={{ fontSize: 14, color: "white", marginLeft: 5 }}>游戏大厅</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, paddingLeft: 5 }}>


          <Banner onlineSwitch={onlineSwitch} size={{ width: (width - 25) / 3 * 2, height: 128 }} bannerData={banner} onlineNum={onlineNum} />
        </View>
      </View>
    </View>
  )
}
export default QuickStart