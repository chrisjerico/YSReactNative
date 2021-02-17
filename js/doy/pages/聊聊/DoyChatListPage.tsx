import React, { useEffect, useRef } from "react"
import { Alert, View } from "react-native"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import List from "../../../rn/public/views/tars/List"
import { img_doy } from "../../../rn/Res/icon"
import { DoyText12, DoyText14 } from "../../public/Button之类的基础组件/DoyButton"
import { DoyTabbar } from "../../public/Tabbar/DoyTabbar"
import { DoyChatFilterAlertCP } from "./cp/DoyChatFilterAlertCP"

const sc = sc375

export const DoyChatListPage = ({ setProps }: UGBasePageProps) => {

  const { current: v } = useRef<DoyChatFilterAlertCP>({})

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '聊聊', back: false,
        rightComponent: (<FastImagePlaceholder source={{ uri: img_doy('筛选@3x') }} style={{ width: sc(20), aspectRatio: 1, marginRight: sc(7) }} onPress={() => {
          v.showChatFilterAlert && v.showChatFilterAlert()
        }} />)
      }
    })
  }, [])

  return [<View style={{ flex: 1 }}>
    <List uniqueKey='聊天列表' style={{ padding: sc(16) }} data={[{}, {}]} renderItem={({ item, index }) => {
      return <TouchableOpacity style={{ flexDirection: 'row', marginBottom: sc(24) }} onPress={() => {
        push(PageName.DoyChatDetailPage)
      }} >
        <FastImagePlaceholder source={{ uri: '' }} style={{ width: sc(42), aspectRatio: 1, borderRadius: sc(4) }} />
        <View style={{ flex: 1, paddingVertical: sc(4), justifyContent: 'space-between', marginHorizontal: sc(8) }}>
          <DoyText12 bold3 gray1>玛瑞亚#3b8dcd</DoyText12>
          <DoyText14 bold3>请问您是否已向我完成汇款呢？</DoyText14>
        </View>
        <View style={{ paddingVertical: sc(4), justifyContent: 'space-between' }}>
          <DoyText12 bold3 gray1>01/22 16:27</DoyText12>
          <View style={{ flexDirection: 'row' }}>
            <DoyText12 bold1 gray2>购买</DoyText12>
            <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(12), aspectRatio: 1, marginHorizontal: sc(4) }} />
            <DoyText12 bold3 gray2>200</DoyText12>
          </View>
        </View>
      </TouchableOpacity>
    }} ListFooterComponent={<DoyText12 gray2 textAlignCenter style={{ lineHeight: sc(18), marginTop: sc(15) }}>{`系统将自动清除超过三个月的交易聊聊记录
确保您的资料安全`}</DoyText12>} />
    <DoyTabbar selectedIndex={2} />
  </View>,
  <DoyChatFilterAlertCP c_ref={v} onPress={(idx) => {
    console.log('idx = ', idx);
  }} />
  ]
}