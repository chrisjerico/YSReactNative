import React, { useEffect } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TextInput } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { setProps, UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText13, DoyText14, DoyText16, DoyTextInput1 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../../public/Button之类的基础组件/DoyDropDownPicker"

const sc = sc375
const tipsBarColos = ['#FFEDD4', '#FAE4CF']

export const DoySetSellOrderPage = ({ }: UGBasePageProps) => {

  const { textColor1 } = skin1

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
    {/* 配置项 */}
    <View style={{ paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
        <DoyText14 style={{ width: '48.5%' }}>出售DOY数量</DoyText14>
        <DoyText14 style={{ width: '48.5%' }}>出售单价</DoyText14>
        <DoyDropDownPicker1 zIndex={20} outerViewStyle={{ width: '48.5%' }} items={getDoyDropDownPickerItems(['选择数量', '1', '2', '3'])} defaultValueAtIndex={0} />
        <DoyTextInput1 leftComponent={<DoyText16 bold3 style={{ marginRight: sc(5) }}>RMB</DoyText16>} bold3 style={{ width: '48.5%', fontSize: sc(16), }} >1</DoyTextInput1>
        {/* 设置收款方式 */}
        <DoyText14 style={{ marginTop: sc(20), width: '100%' }}>设置收款方式</DoyText14>
        <DoyDropDownPicker1 items={getDoyDropDownPickerItems(['银行卡', '支付宝', '微信支付',])} defaultValueAtIndex={0} />
        <DoyText14 style={{ marginTop: sc(20), width: '100%' }}>备注</DoyText14>
        <DoyTextInput1 style={{ fontSize: sc(16) }} />
        {/* 分割线 */}
        <View style={{ height: sc(1), backgroundColor: '#0000000d', width: AppDefine.width, marginTop: sc(20), marginBottom: sc(18), marginLeft: sc(-16) }} />
        {/* 限制条件 */}
        <DoyText14 style={{ width: '32%', }}>注册天数(天)</DoyText14>
        <DoyText14 style={{ width: '32%' }}>评价(星)</DoyText14>
        <DoyText14 style={{ width: '32%' }}>成功交易(笔)</DoyText14>
        <View style={{ backgroundColor: 'white', width: '32%', height: sc(46), borderRadius: sc(4), marginTop: sc(12), alignItems: 'center', flexDirection: 'row', paddingHorizontal: sc(16) }}>
          <TextInput style={{ flex: 1, fontSize: sc(16), fontWeight: '700' }} >1</TextInput>
          <DoyText16 gray2>以上</DoyText16>
        </View>
        <View style={{ backgroundColor: 'white', width: '32%', height: sc(46), borderRadius: sc(4), marginTop: sc(12), alignItems: 'center', flexDirection: 'row', paddingHorizontal: sc(16) }}>
          <TextInput style={{ flex: 1, fontSize: sc(16), fontWeight: '700' }} >1</TextInput>
          <DoyText16 gray2>以上</DoyText16>
        </View>
        <View style={{ backgroundColor: 'white', width: '32%', height: sc(46), borderRadius: sc(4), marginTop: sc(12), alignItems: 'center', flexDirection: 'row', paddingHorizontal: sc(16) }}>
          <TextInput style={{ flex: 1, fontSize: sc(16), fontWeight: '700' }} >1</TextInput>
          <DoyText16 gray2>以上</DoyText16>
        </View>
      </View>
      {/* 提示 */}
      <DoyText12 gray2 style={{ paddingHorizontal: sc(8), lineHeight: sc(14), marginTop: sc(23) }} >{`符合您设定限制的买方才能看见并购买。

提醒您：严苛的限制条件可能使您成交的速度较慢，请斟酌使用。`}</DoyText12>
      <DoyButton1 title='预览挂单' containerStyle={{ marginTop: sc(22) }} onPress={() => {
        push(PageName.DoySellOrderConfirmPage)
      }} />
    </View>
  </View>
}