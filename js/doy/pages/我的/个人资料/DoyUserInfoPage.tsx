import React, { useEffect } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText20, DoyText12, DoyText14, DoyText28, DoyButton1 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyStarCP } from "./cp/DoyStarCP"

const sc = sc375

export const DoyUserInfoPage = ({ setProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1

  useEffect(() => {
    setProps({ navbarOpstions: { title: ' ' } })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8), alignItems: 'center' }}>
      <View style={{ backgroundColor: '#ffffff44', padding: sc(2), width: sc(60), aspectRatio: 1, borderRadius: sc(6) }}>
        <FastImagePlaceholder source={{ uri: '' }} style={{ flex: 1, borderRadius: sc(4) }} />
      </View>
      <DoyText20 bold1 white style={{ marginTop: sc(18) }}>Adam#71bs8c</DoyText20>
      <DoyText12 white style={{ marginTop: sc(8), }}>这里是签名</DoyText12>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: sc(60) }} />
    </LinearGradient>
    <View style={{ marginTop: sc(-44), marginHorizontal: sc(16), backgroundColor: 'white', height: sc(106), padding: sc(16), borderRadius: sc(4), flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
      <DoyText14 gray2 style={{ width: '40%' }}>平均打币</DoyText14>
      <DoyText14 style={{ width: '60%', textAlign: 'right' }}>21秒内</DoyText14>
      <DoyText14 gray2 style={{ width: '40%' }}>买币评价</DoyText14>
      <View style={{ width: '60%', alignItems: 'flex-end', paddingTop: sc(-1) }}>
        <DoyStarCP selectedStarCnt={4} size={sc(12)} space={sc(4)} />
      </View>
      <DoyText14 gray2 style={{ width: '40%' }}>买币评价</DoyText14>
      <View style={{ width: '60%', alignItems: 'flex-end', paddingTop: sc(-1) }}>
        <DoyStarCP selectedStarCnt={4} size={sc(12)} space={sc(4)} />
      </View>
    </View>
  </View>
}