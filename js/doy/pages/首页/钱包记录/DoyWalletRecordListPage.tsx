import React, { useEffect } from "react"
import { TextInput, View } from "react-native"
import FastImage from "react-native-fast-image"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText13, DoyText14, DoyText15 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375
const tipsBarColos = ['#FFEDD4', '#FAE4CF']

export const DoyWalletRecordListPage = ({ setProps }: UGBasePageProps) => {

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '钱包记录',
        rightComponent: (<FastImagePlaceholder source={{ uri: img_doy('导航栏/搜索@3x') }} style={{ width: sc(20), aspectRatio: 1, marginRight: sc(7) }} onPress={() => {
          push(PageName.DoyWalletRecordSearchPage)
        }} />)
      },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={tipsBarColos} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flexDirection: 'row', height: sc(36), paddingHorizontal: sc(16), alignItems: 'center' }}>
      <DoyText12>钱包可用余额</DoyText12>
      <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), height: sc(14), marginHorizontal: sc(4) }} />
      <DoyText13 bold3 style={{ marginTop: sc(1), }}>30910</DoyText13>
    </LinearGradient>
    <View style={{ paddingVertical: sc(16), paddingHorizontal: sc(32), flexDirection: 'row' }}>
      <DoyText14 gray2 style={{ width: '42%' }}>异动</DoyText14>
      <DoyText14 gray2>对象</DoyText14>
    </View>
    <FlatList
      style={{ margin: sc(16), marginTop: sc(-4), backgroundColor: 'white', borderRadius: sc(4), flex: 1, }}
      data={[{}, {}, {}, {}, {},]}
      renderItem={({ item, index }) => {
        return <TouchableOpacity style={{ height: sc(56), paddingTop: sc(12), paddingHorizontal: sc(16), flexWrap: 'wrap' }} onPress={() => {
          push(PageName.DoyWalletRecordDetailPage)
        }}>
          <DoyText12 gray2 bold2 style={{ width: '42%', }}>2021/01/26 16:42</DoyText12>
          <DoyText15 bold3 style={{ marginTop: sc(2) }}>-0.2</DoyText15>
          <DoyText12 gray2 bold2 style={{ width: '55%' }}>付款到</DoyText12>
          <DoyText15 bold2 style={{ marginTop: sc(3) }}>老虎#c5608b</DoyText15>
          <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(6), height: '100%', marginTop: sc(-5) }} resizeMode='contain' />
          <View style={{ position: 'absolute', marginLeft: sc(16), bottom: 0, width: '100%', height: sc(1), backgroundColor: '#EFF1F5' }} />
        </TouchableOpacity>
      }}
    />
  </View >
}