import React, { useEffect, useRef } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { setProps, UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText20, DoyText12, DoyText14, DoyText28, DoyButton1, DoyText13, DoyText16, DoyTextInput1 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoySearchOrderPage = ({ }: UGBasePageProps) => {

  const { textColor1 } = skin1

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '查询订单',
        rightComponent: (<Button title='重置' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => { }} />)
      },
    })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingVertical: sc(24), }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <DoyText14 style={{ width: '100%' }}>交易数量</DoyText14>
      <DoyTextInput1 bold3 style={{ width: '44%' }}>100</DoyTextInput1>
      <View style={{ height: sc(2), width: sc(9), marginTop: sc(33), backgroundColor: '#979797', }} />
      <DoyTextInput1 bold3 style={{ width: '44%' }}>100000</DoyTextInput1>
      <DoyText14 style={{ width: '100%', marginTop: sc(20) }}>成立时间</DoyText14>

    </View>
    <View style={{ flex: 1 }} />
    <DoyButton1 title='查询' onPress={() => {
      push(PageName.DoySearchReultPage)
    }} />
  </View>
}