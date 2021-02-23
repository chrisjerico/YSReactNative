import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { payType } from "../../../publicClass/network/api/api_order"
import { DoyText20, DoyText12, DoyText14, DoyText28, DoyButton1 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375

interface RouterParams {
  order: {
    num: string,
    payType: payType,
    regDay: string,
    commentNum: string,
    sucNum: string,
    remark: string,
  }
}

export const DoySellOrderConfirmPage = ({ setProps, route }: UGBasePageProps<{}, RouterParams>) => {
  const { current: v } = useRef({})
  const { themeColor, navBarBgColor } = skin1

  const { params: { order } } = route
  const { } = order

  useEffect(() => {
    setProps({ navbarOpstions: { title: '卖单确认' } })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8 + 27) }} />
    <View style={{ marginTop: sc(-44), paddingHorizontal: sc(16), flex: 1 }}>
      <View style={{ backgroundColor: 'white', height: sc(88), padding: sc(16), borderRadius: sc(4) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <DoyText14>出售数量</DoyText14>
          <DoyText14>出售总价</DoyText14>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: sc(9) }}>
          <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(24), aspectRatio: 1 }} />
          <DoyText28 bold3 style={{ marginLeft: sc(8), }}>200</DoyText28>
          <View style={{ flex: 1 }} />
          <DoyText14 bold3>¥ 200</DoyText14>
        </View>
      </View>
      <View style={{ marginTop: sc(14), paddingHorizontal: sc(16) }}>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <DoyText12 gray2 style={{ lineHeight: sc(17), width: sc(66) }}>收款方式</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>银行卡</DoyText12>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <DoyText12 gray2 style={{ lineHeight: sc(17), width: sc(66) }}>备注</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>这里是备注内容</DoyText12>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <DoyText12 gray2 style={{ lineHeight: sc(17), width: sc(66) }}>下单限制</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>注册天数10天以上、评估3星以上、成功买卖1笔以上</DoyText12>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <DoyButton1 title='确认' containerStyle={{ marginBottom: sc(24) }} onPress={() => {

      }} />
    </View>
  </View>
}