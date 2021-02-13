import React, { useEffect, useRef, useState } from "react"
import { TextInput, Text, TouchableOpacity, View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SegmentedControl from "rn-segmented-control"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14, DoyText16 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyInRestModeCP } from "./cp/DoyInRestModeCP"

const sc = sc375
const tipsBarColos = ['#FFEDD4', '#FAE4CF']


interface DoyWantSellVars {
  searchReults?: object[]
  isResting?: boolean
}

export const DoyWantSellPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1
  const [segmentedIndex, setSegmentedIndex] = useState(0)
  const [isRestMode, setIsRestMode] = useState(false)
  const { current: v } = useRef<DoyInRestModeCP & DoyWantSellVars>({ searchReults: [{}, {}, {}], isResting: false })

  //setNavbarProps({rightComponent})
  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '我要卖',
        rightComponent: (<FastImagePlaceholder source={{ uri: img_doy('导航栏/休息模式@3x') }} style={{ width: sc(20), aspectRatio: 1 }} onPress={() => {
          setIsRestMode(true)
          v.showInRestModeAlert && v.showInRestModeAlert()
        }} />)
      },
    })
  }, [])

  return [<View style={{ flex: 1 }}>
    {/* 卖单类型 */}
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <SegmentedControl
        tabs={['银行卡(3)', '支付宝(0)', '微信支付(0)']}
        onChange={(idx) => {
          setSegmentedIndex(idx)
        }}
        currentIndex={segmentedIndex}
        segmentedControlBackgroundColor='#1052BE'
        activeSegmentBackgroundColor='#3B7FF1'
        width={AppDefine.width - sc(32)}
        containerStyle={{ height: sc(38), }}
        textStyle={{
          fontWeight: "500",
          fontSize: 14,
        }}
        theme={'DARK'}
      />
    </LinearGradient>
    <View style={{ flex: 1 }}>
      {/* 休息模式 */}
      {isRestMode && <LinearGradient colors={tipsBarColos} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flexDirection: 'row', height: sc(36), paddingHorizontal: sc(16), alignItems: 'center' }}>
        <FastImage source={{ uri: img_doy('休息模式@3x') }} style={{ width: sc(15), aspectRatio: 1 }} resizeMode='contain' />
        <DoyText12 style={{ marginLeft: sc(8), marginTop: sc(1), }}>休息模式中</DoyText12>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={{ paddingHorizontal: sc(8), marginRight: sc(-7), justifyContent: 'center' }} onPress={() => {
          setIsRestMode(false)
        }}>
          <FontAwesome name='close' size={sc(10)} color='#FAE4CF' style={{ width: sc(16), aspectRatio: 1, backgroundColor: '#52575A', paddingTop: sc(2), paddingLeft: sc(4), borderRadius: sc(8), overflow: 'hidden' }} />
        </TouchableOpacity>
      </LinearGradient>}
      {/* 我的卖单 */}
      <List data={v.searchReults} uniqueKey='我要买-订单列表' style={{ padding: sc(16), flex: 1 }} renderItem={(ele) => {
        return <TouchableOpacity style={{ height: sc(60), marginBottom: sc(8), backgroundColor: 'white', borderRadius: sc(4), flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          push(PageName.DoySellOrderPage)
        }}>
          <FastImage source={{ uri: img_doy('卖出@3x') }} style={{ marginLeft: sc(16), width: sc(26), aspectRatio: 1, }} />
          <DoyText14 style={{ marginLeft: sc(16), }}>出售</DoyText14>
          <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), aspectRatio: 1, marginHorizontal: sc(8) }} />
          <DoyText16 bold2>200</DoyText16>
          <View style={{ flex: 1 }} />
          <DoyText12 gray2 style={{ marginRight: sc(8) }}>1分钟前 发布</DoyText12>
          <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(6), aspectRatio: 6 / 10, marginRight: sc(16) }} />
        </TouchableOpacity>
      }} />
    </View>
    <DoyButton1 title='发布挂单' containerStyle={{ marginHorizontal: sc(16), marginBottom: sc(24) }} onPress={() => {
      push(PageName.DoySetSellOrderPage)
    }} />
  </View>,
  <DoyInRestModeCP c_ref={v} onCloseRestModeBtnClick={() => {
    setIsRestMode(false)
  }} />
  ]
}