import React, { useEffect } from "react"
import { View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy, img_platform } from "../../../../rn/Res/icon"
import { DoyButton1 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375
const headerColos = ['#1F65E6', '#3581F5']

export const DoyPendingPaymentPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '待付款', gradientColor: headerColos }, bgGradientColor: headerColos })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingTop: sc(10) }}>
    <View style={{ backgroundColor: 'white', height: sc(502), borderRadius: sc(4), overflow: 'hidden' }}>
      <Text style={{ backgroundColor: '#E3EEFF', height: sc(28), textAlign: 'center', paddingTop: sc(6), fontSize: sc(12), color: '#19202C' }}>订单 123uyguy13vu 已经成立</Text>
      <Text style={{ marginTop: sc(16), textAlign: 'center', fontSize: sc(12), color: '#19202C' }}>倒计时</Text>
      <Text style={{ textAlign: 'center', fontSize: sc(40), fontWeight: '600', color: '#DC550C' }}>14:19</Text>
      {/* 二维码 */}
      <FastImagePlaceholder source={{ uri: img_platform('c006', 'apple_qrcode', 'jpg') }} style={{ marginTop: sc(15), width: sc(160), aspectRatio: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} >
        <FastImage source={{ uri: img_doy('注册页 logo@3x') }} style={{ width: sc(40), aspectRatio: 1 }} />
      </FastImagePlaceholder>
      <View style={{ padding: sc(24), paddingTop: sc(10), flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sc(13) }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A' }}>付款方式</Text>
          <Text style={{ fontSize: sc(12), }}>支付宝</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sc(13) }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A' }}>账户姓名</Text>
          <Text style={{ fontSize: sc(12), }}>王霸胆</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sc(13) }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A' }}>应付金额</Text>
          <Text style={{ fontSize: sc(12), }}>2,000 RMB  (2,000DOY)</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: sc(13) }}>
          <Text style={{ fontSize: sc(12), color: '#8E929A' }}>卖方留言</Text>
          <Text style={{ fontSize: sc(12), }}>延迟付款一定负评哦，谢谢。</Text>
        </View>
        <View style={{ flex: 1 }} />
        <DoyButton1 title='通知已付款' onPress={() => { push(PageName.DoyNotifySellerPage) }} />
      </View>
    </View>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: sc(12), lineHeight: sc(18), marginBottom: sc(10) }}>{`提醒您付款后若无完成通知
卖方有权取消交易`}</Text>
    </View>
  </View>
}