import React, { useEffect } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { popToRoot } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText14, DoyText28, DoyText30, DoyText35 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyTransferSuccessPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: ' ', back: false } })
  }, [])

  return <View style={{ flex: 1, paddingVertical: sc(24), paddingHorizontal: sc(16) }}>
    <FastImage source={{ uri: img_doy('卖出@3x') }} style={{ width: sc(46), aspectRatio: 1, alignSelf: 'center', }} resizeMode='contain' />
    <DoyText14 textAlignCenter style={{ marginTop: sc(16) }}>已送出</DoyText14>
    <DoyText30 bold3 textAlignCenter style={{ marginTop: sc(8) }}>100 DOY</DoyText30>
    <View style={{ marginTop: sc(13), backgroundColor: 'white', height: sc(46), borderRadius: sc(4), paddingHorizontal: sc(16), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
      <DoyText14 gray2>收款方</DoyText14>
      <DoyText14>玛瑞亚#9a8c7v</DoyText14>
    </View>
    <View style={{ flex: 1 }} />
    <DoyButton1 title='好的' onPress={() => {
      popToRoot()
    }} />
  </View>
}