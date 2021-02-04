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
import { DoyButton1 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375
const headerColos = ['#1F65E6', '#3581F5']

export const DoyNotifySellerPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '通知卖方', gradientColor: headerColos }, bgGradientColor: headerColos })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingTop: sc(10) }}>
    <View style={{ backgroundColor: 'white', height: sc(324), borderRadius: sc(4), overflow: 'hidden' }}>
      <Text style={{ backgroundColor: '#E3EEFF', height: sc(28), textAlign: 'center', paddingTop: sc(8), fontSize: sc(12), color: '#19202C' }}>告知卖方您已付款，以便卖方查收款项</Text>
      <View style={{ padding: sc(24), flex: 1 }}>
        <Text style={{ fontSize: sc(14), color: '#19202C', marginLeft: sc(1) }}>付款时间</Text>
        <Text style={{ fontSize: sc(15), color: '#19202C', fontWeight: '700', backgroundColor: '#F7F7F9', height: sc(46), paddingTop: sc(15), paddingLeft: sc(16), marginTop: sc(12), borderRadius: sc(4), overflow: 'hidden' }}>2021/01/26 15:30</Text>
        <Text style={{ fontSize: sc(14), color: '#19202C', marginLeft: sc(1), marginTop: sc(24) }}>转账单号后六位</Text>
        <Text style={{ fontSize: sc(15), color: '#19202C', fontWeight: '700', backgroundColor: '#F7F7F9', height: sc(46), paddingTop: sc(15), paddingLeft: sc(16), marginTop: sc(12), borderRadius: sc(4), overflow: 'hidden' }}>AKSIX3</Text>
        <View style={{ flex: 1 }} />
        <DoyButton1 title='发送' onPress={() => { }} />
      </View>
    </View>
    <Text style={{ textAlign: 'center', color: 'white', fontSize: sc(12), lineHeight: sc(18), marginTop: sc(23) }}>{`提醒您付款后若无完成通知
卖方有权取消交易`}</Text>
  </View>
}