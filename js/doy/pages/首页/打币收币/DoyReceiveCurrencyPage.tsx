import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import SegmentedControl from "rn-segmented-control"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy, img_platform } from "../../../../rn/Res/icon"
import { DoyText12, DoyText14, DoyText16, DoyTextInput1 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyReceiveCurrencyPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1

  //setNavbarProps({rightComponent})
  useEffect(() => {
    setProps({
      navbarOpstions: { title: '收币', },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(14) }}>
      <DoyText12 style={{ color: '#ffffffcc' }}>Adam 的DOY钱包地址</DoyText12>
      <View style={{ flexDirection: 'row', marginTop: sc(10) }}>
        <DoyText16 white bold1 style={{ flex: 1 }}>0x3d1bdf4834b123a81a5333d3a4980faebb8930c9</DoyText16>
        <FastImagePlaceholder source={{ uri: img_doy('复制@3x') }} style={{ width: sc(20), aspectRatio: 1, }} containerStyle={{ padding: sc(15), marginRight: sc(-16), alignSelf: 'flex-end', }} onPress={() => {

        }} />
      </View>
      <View style={{ marginTop: sc(15), backgroundColor: 'white', borderRadius: sc(4), alignSelf: 'center', width: sc(161), height: sc(187), overflow: 'hidden' }}>
        <View style={{ padding: sc(8), flexDirection: 'row', justifyContent: 'space-between', }}>
          <DoyText12 style={{ color: themeColor }}>使用DOY扫码</DoyText12>
          <DoyText12 style={{ color: themeColor }}>———</DoyText12>
          <FastImage source={{ uri: img_doy('注册页 logo@3x') }} style={{ width: sc(15), aspectRatio: 1 }} />
        </View>
        <FastImagePlaceholder source={{ uri: img_platform('c006', 'apple_qrcode', 'jpg') }} style={{ marginTop: sc(-7), width: '100%', aspectRatio: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} >
          <FastImage source={{ uri: img_doy('二维码logo') }} style={{ width: sc(40), aspectRatio: 1 }} />
        </FastImagePlaceholder>
      </View>
      <View style={{ marginTop: sc(24), width: '100%', height: sc(1), backgroundColor: '#0000002a' }} />
      <DoyText12 textAlignCenter style={{ color: '#ffffff99', marginTop: sc(16) }}>若发送其他类型至此位置，将会造成资产永久丢失。</DoyText12>
    </LinearGradient>
    <View style={{ paddingHorizontal: sc(16), marginVertical: sc(24) }}>
      <DoyText14>接收数量</DoyText14>
      <DoyTextInput1 bold3 style={{ fontSize: sc(16) }} rightComponent={<DoyText16 bold3 gray2>DOY</DoyText16>} />
    </View>
  </View>
}