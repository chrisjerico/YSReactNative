import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
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
import { DoyText12, DoyText14 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyStarCP } from "../个人资料/cp/DoyStarCP"

const sc = sc375

export const DoyMyCommentPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1
  const [segmentedIndex, setSegmentedIndex] = useState(0)
  const { current: v } = useRef({ list: [{}, {}, {}] })

  useEffect(() => {
    setProps({
      navbarOpstions: { title: '我的评价', },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    {/* 卖单类型 */}
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <SegmentedControl
        tabs={['买币评价', '卖币评价']}
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
    <View style={{ flexDirection: 'row', paddingHorizontal: sc(32), justifyContent: 'space-between', marginTop: sc(16) }}>
      <DoyText14>{segmentedIndex ? '您的卖币评分' : '您的买币评分'}</DoyText14>
      <DoyStarCP selectedStarCnt={4} size={sc(12)} space={sc(4)} />
    </View>
    {/* 订单列表 */}
    <List data={v.list} uniqueKey='我的评价' style={{ padding: sc(16), flex: 1 }} renderItem={(ele) => {
      return <TouchableOpacity style={{ height: sc(66), marginBottom: sc(8), backgroundColor: 'white', borderRadius: sc(4), flexDirection: 'row', alignItems: 'center', paddingHorizontal: sc(16) }} onPress={() => {
        push(PageName.DoySellOrderPage)
      }}>
        <FastImagePlaceholder source={{ uri: '' }} style={{ width: sc(42), aspectRatio: 1, borderRadius: sc(4) }} />
        <View style={{ flex: 1, marginLeft: sc(16), }} >
          <View style={{ flexDirection: 'row' }}>
            <DoyText14>夏加尔#4afc2d</DoyText14>
            <DoyStarCP selectedStarCnt={4} size={sc(12)} space={sc(4)} containerStyle={{ marginLeft: sc(8) }} />
          </View>
          <DoyText12 gray1 style={{ marginTop: sc(8) }}>付款超快速的好买家。</DoyText12>
        </View>
        <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(6), aspectRatio: 6 / 10, }} />
      </TouchableOpacity>
    }} />
  </View>
}