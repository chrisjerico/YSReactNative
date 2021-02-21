import React, { useEffect } from "react"
import { View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_platform, img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14, DoyText15 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../../publicComponent/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1 } from "../../../publicComponent/Button之类的基础组件/DoyTextInput"

const sc = sc375
const dateList = ['2021/01/26 15:30', '2021/01/26 14:00', '2021/01/26 14:30', '2021/01/26 15:00', '2021/01/26 15:30']

export const DoyNotifySellerPage = ({ setProps }: UGBasePageProps) => {
  const { navBarBgColor, textColor1 } = skin1
  useEffect(() => {
    setProps({ navbarOpstions: { title: '通知卖方' }, bgGradientColor: navBarBgColor })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingTop: sc(10) }}>
    <View style={{ backgroundColor: 'white', height: sc(324), borderRadius: sc(4), overflow: 'hidden' }}>
      <DoyText12 style={{ backgroundColor: '#E3EEFF', height: sc(28), textAlign: 'center', paddingTop: sc(8), }}>告知卖方您已付款，以便卖方查收款项</DoyText12>
      <View style={{ padding: sc(24), flex: 1 }}>
        <DoyText14 style={{ marginLeft: sc(1) }}>付款时间</DoyText14>
        <DoyDropDownPicker1 backgroundColor='#F7F7F9' labelStyle={{ fontSize: sc(15) }} items={getDoyDropDownPickerItems(dateList)} defaultValueAtIndex={0} />
        <DoyText14 style={{ marginLeft: sc(1), marginTop: sc(24) }}>转账单号后六位</DoyText14>
        <DoyTextInput1 bold3 style={{ fontSize: sc(15), backgroundColor: '#F7F7F9', }}>AKSIX3</DoyTextInput1>
        <View style={{ flex: 1 }} />
        <DoyButton1 title='发送' onPress={() => { }} />
      </View>
    </View>
    <DoyText12 white style={{ textAlign: 'center', lineHeight: sc(18), marginTop: sc(23) }}>{`提醒您付款后若无完成通知
卖方有权取消交易`}</DoyText12>
  </View>
}