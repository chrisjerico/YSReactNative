import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText14 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375

interface DoySearchReultVars {
  list?: object[]
}

export const DoySearchReultPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { current: v } = useRef<DoySearchReultVars>({ list: [{}, {}, {}] })

  //setNavbarProps({rightComponent})
  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '查询结果',
        rightComponent: (<FastImagePlaceholder source={{ uri: img_doy('导航栏/搜索@3x') }} style={{ width: sc(20), aspectRatio: 1, marginRight: sc(7) }} onPress={() => {
          push(PageName.DoySearchOrderPage)
        }} />)
      },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    {/* 订单列表 */}
    <List data={v.list} uniqueKey='我要买-订单列表' style={{ padding: sc(16), flex: 1 }} renderItem={(ele) => {
      return <TouchableOpacity style={{ height: sc(60), marginBottom: sc(8), backgroundColor: 'white', borderRadius: sc(4), flexDirection: 'row', alignItems: 'center', paddingHorizontal: sc(16) }} onPress={() => {
        push(PageName.DoySellOrderPage)
      }}>
        <FastImage source={{ uri: img_doy('卖出@3x') }} style={{ width: sc(26), aspectRatio: 1, }} />
        <View style={{ flex: 1, marginLeft: sc(16), }} >
          <View style={{ flexDirection: 'row' }}>
            <DoyText12 gray2>买入</DoyText12>
            <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), aspectRatio: 1, marginHorizontal: sc(3) }} />
            <DoyText12 bold3>200</DoyText12>
            <DoyText12 gray2 style={{ marginLeft: sc(3) }}>从</DoyText12>
          </View>
          <DoyText14 gray2 style={{ marginTop: sc(4) }}>艾许莉#1qasw2</DoyText14>
        </View>
        <DoyText12 gray2 style={{ marginRight: sc(8) }}>{'交易关闭'}</DoyText12>
        <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(6), aspectRatio: 6 / 10, }} />
      </TouchableOpacity>
    }} ListFooterComponent={<DoyText12 gray2 style={{ marginTop: sc(14), textAlign: 'center', lineHeight: sc(18) }}>{`系统将自动清除超过三个月的交易记录
确保亲的资料安全`}</DoyText12>} />
  </View>
}