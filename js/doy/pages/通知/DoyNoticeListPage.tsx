import React, { useEffect } from "react"
import { View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../rn/public/tools/Scale"
import List from "../../../rn/public/views/tars/List"
import { DoyText12, DoyText14 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyTabbar } from "../../publicComponent/Tabbar/DoyTabbar"


const sc = sc375

export const DoyNoticeListPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '交易通知', back: false } })
  }, [])

  return <View style={{ flex: 1 }}>
    <List uniqueKey='交易通知List' style={{ padding: sc(16) }} data={[{}, {}, {}]} renderItem={(ele) => {
      return <TouchableOpacity style={{ backgroundColor: 'white', padding: sc(16), borderRadius: sc(4), marginBottom: sc(8), flexDirection: 'row', flexWrap: 'wrap' }} onPress={() => {
        push(PageName.DoyNoticeOrderPage)
      }}>
        <DoyText14 bold1 style={{ width: '70%' }}>交易成立，等待付款。</DoyText14>
        <DoyText12 bold3 gray1 style={{ width: '30%', textAlign: 'right' }}>01/22 16:23</DoyText12>
        <DoyText12 gray1 style={{ marginTop: sc(12) }}>卖家: 夏加尔 #4afc2d</DoyText12>
      </TouchableOpacity>
    }} />
    <DoyTabbar selectedIndex={1} />
  </View>
}