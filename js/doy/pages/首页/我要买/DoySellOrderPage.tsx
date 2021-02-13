import React, { useEffect, useRef } from "react"
import { TextInput, TouchableOpacity, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { setProps, UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14, DoyText20, DoyText28 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyCheckBuyAlertCP } from "./cp/DoyCheckBuyAlertCP"

const sc = sc375

export const DoySellOrderPage = ({ }: UGBasePageProps) => {
  const { current: v } = useRef<DoyCheckBuyAlertCP>({})
  const { themeColor, navBarBgColor } = skin1

  useEffect(() => {
    setProps({ navbarOpstions: { title: '卖单详情' } })
  }, [])

  return [<View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: sc(60) }}>
        <View style={{ backgroundColor: '#ffffff44', padding: sc(2), width: sc(60), aspectRatio: 1, borderRadius: sc(6) }}>
          <FastImagePlaceholder source={{ uri: '' }} style={{ flex: 1, borderRadius: sc(4) }} />
        </View>
        <View style={{ marginLeft: sc(16) }} >
          <DoyText20 bold1 white>夏加尔</DoyText20>
          <DoyText12 white style={{ marginTop: sc(8), }}>#4afc2d2</DoyText12>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginTop: sc(-15), flexDirection: 'row' }}>
          <FastImage source={{ uri: img_doy('星星@3x') }} style={{ width: sc(8), aspectRatio: 1, marginRight: sc(2) }} />
          <FastImage source={{ uri: img_doy('星星@3x') }} style={{ width: sc(8), aspectRatio: 1, marginRight: sc(2) }} />
          <FastImage source={{ uri: img_doy('星星@3x') }} style={{ width: sc(8), aspectRatio: 1, marginRight: sc(2) }} />
          <FastImage source={{ uri: img_doy('星星@3x') }} style={{ width: sc(8), aspectRatio: 1, marginRight: sc(2) }} />
          <FastImage source={{ uri: img_doy('星星_未激活(深)@3x') }} style={{ width: sc(8), aspectRatio: 1 }} />
        </View>
      </View>
    </LinearGradient>
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
          <DoyText12 gray2 style={{ marginRight: sc(16), lineHeight: sc(17) }}>挂卖单号</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>pdstjk3xrzvyc</DoyText12>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <DoyText12 gray2 style={{ marginRight: sc(16), lineHeight: sc(17) }}>收款方式</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>银行卡</DoyText12>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <DoyText12 gray2 style={{ marginRight: sc(16), lineHeight: sc(17) }}>卖方备注</DoyText12>
          <DoyText12 style={{ flex: 1, lineHeight: sc(18) }}>只接受银行卡！！银行卡！！银行卡！！请勿用支付宝转账</DoyText12>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <DoyButton1 title='购买' containerStyle={{ marginBottom: sc(24) }} onPress={() => {
        v.showCheckBuyAlert && v.showCheckBuyAlert()
      }} />
    </View>
  </View>,
  <DoyCheckBuyAlertCP c_ref={v} />
  ]
}