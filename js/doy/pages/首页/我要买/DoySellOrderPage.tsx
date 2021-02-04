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
import { DoyButton1 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyCheckBuyAlertCP } from "./cp/DoyCheckBuyAlertCP"

const sc = sc375
const headerColos = ['#1F65E6', '#3581F5']

export const DoySellOrderPage = ({ }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '卖单详情', gradientColor: headerColos } })
  }, [])

  const { current: v } = useRef<DoyCheckBuyAlertCP>({})
  const { themeColor, navBarBgColor } = skin1

  return [<View style={{ flex: 1 }}>
    <LinearGradient colors={headerColos} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: sc(143), paddingHorizontal: sc(16) }}>
      <View style={{ marginTop: sc(8), flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#ffffff44', padding: sc(2), width: sc(60), aspectRatio: 1, borderRadius: sc(6) }}>
          <FastImagePlaceholder source={{ uri: '' }} style={{ flex: 1, borderRadius: sc(4) }} />
        </View>
        <View style={{ marginLeft: sc(16) }} >
          <Text style={{ fontSize: sc(20), fontWeight: '500', color: 'white' }}>夏加尔</Text>
          <Text style={{ fontSize: sc(12), marginTop: sc(8), color: 'white' }}>#4afc2d2</Text>
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
          <Text>出售数量</Text>
          <Text>出售总价</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: sc(9) }}>
          <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(24), aspectRatio: 1 }} />
          <Text style={{ marginLeft: sc(8), fontSize: sc(28), fontWeight: '700' }}>200</Text>
          <View style={{ flex: 1 }} />
          <Text style={{ fontSize: sc(14), fontWeight: '700' }}>¥ 200</Text>
        </View>
      </View>
      <View style={{ marginTop: sc(14), paddingHorizontal: sc(16) }}>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A', marginRight: sc(16), lineHeight: sc(17) }}>挂卖单号</Text>
          <Text style={{ fontSize: sc(12), flex: 1, lineHeight: sc(18) }}>pdstjk3xrzvyc</Text>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A', marginRight: sc(16), lineHeight: sc(17) }}>收款方式</Text>
          <Text style={{ fontSize: sc(12), flex: 1, lineHeight: sc(18) }}>银行卡</Text>
        </View>
        <View style={{ marginTop: sc(10), flexDirection: 'row' }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A', marginRight: sc(16), lineHeight: sc(17) }}>卖方备注</Text>
          <Text style={{ fontSize: sc(12), flex: 1, lineHeight: sc(18) }}>只接受银行卡！！银行卡！！银行卡！！请勿用支付宝转账</Text>
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