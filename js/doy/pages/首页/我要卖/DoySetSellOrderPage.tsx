import React, { useEffect } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { setProps, UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText13, DoyText14 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375
const tipsBarColos = ['#FFEDD4', '#FAE4CF']

export const DoySetSellOrderPage = ({ }: UGBasePageProps) => {
  useEffect(() => {
    setProps({
      navbarOpstions: { title: '设置卖单内容' },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={tipsBarColos} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flexDirection: 'row', height: sc(36), paddingHorizontal: sc(16), alignItems: 'center' }}>
      <DoyText12>钱包可用余额</DoyText12>
      <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), height: sc(14), marginHorizontal: sc(4) }} />
      <DoyText13 bold3 style={{ marginTop: sc(1), }}>30910</DoyText13>
    </LinearGradient>
    <View style={{ paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <View>

      </View>
      <DoyText14>设置收款方式</DoyText14>

    </View>
  </View>
}