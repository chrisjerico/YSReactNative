import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SegmentedControl from "rn-segmented-control"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { pop, push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText14, DoyText16, DoyButton1 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../../publicComponent/Button之类的基础组件/DoyDropDownPicker"

const sc = sc375

export const DoyWalletRecordSearchPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1
  const [segmentedIndex, setSegmentedIndex] = useState(0)

  useEffect(() => {
    setProps({
      navbarOpstions: { title: '查询条件', },
    })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <SegmentedControl
        tabs={['全部', '收款', '付款']}
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
    <View style={{ flex: 1, paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText14>日期</DoyText14>
      <DoyDropDownPicker1 items={getDoyDropDownPickerItems(['2021/01/26', '2021/01/27', '2021/01/28', '2021/01/29'])} defaultValueAtIndex={0} />
      <View style={{ flex: 1 }} />
      <DoyButton1 title='查询' onPress={() => {
        pop()
      }} />
    </View>
  </View>
}