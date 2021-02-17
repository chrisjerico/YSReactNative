import React, { useEffect } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText14, DoyText30 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyWalletRecordDetailPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '收款详情' } })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingVertical: sc(24), alignItems: 'center' }}>
    <TouchableOpacity onPress={() => {
      push(PageName.DoyUserInfoPage)
    }}>
      <FastImagePlaceholder source={{ uri: '' }} style={{ width: sc(46), aspectRatio: 1, borderRadius: sc(4), alignSelf: 'center' }} />
      <View style={{ flexDirection: 'row', marginTop: sc(8) }}>
        <DoyText14>夏加尔#4afc2d</DoyText14>
        <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ marginLeft: sc(8), width: sc(4), height: sc(18) }} resizeMode='contain' />
      </View>
    </TouchableOpacity>
    <DoyText30 bold3 style={{ marginTop: sc(14) }}>+150 DOY</DoyText30>
    <DoyText14 bold3 gray2 style={{ marginTop: sc(4) }}>(150 RMB)</DoyText14>
    <View style={{ marginTop: sc(10), width: '100%', padding: sc(16), backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', borderRadius: sc(4) }}>
      <DoyText14 gray2 style={{ width: '30%' }}>时间</DoyText14>
      <DoyText14 style={{ width: '70%', textAlign: 'right', marginBottom: sc(16) }}>2021/01/22 16:27</DoyText14>
      <DoyText14 gray2 style={{ width: '30%' }}>来源钱包</DoyText14>
      <DoyText14 style={{ width: '70%', textAlign: 'right' }}>0x3d1bdf4834b123a81a5333d3a4980faebb8930c5</DoyText14>
    </View>
  </View>
}