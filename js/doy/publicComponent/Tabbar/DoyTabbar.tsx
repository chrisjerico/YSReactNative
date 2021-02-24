import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { View } from "react-native-animatable"
import { Button } from "react-native-elements"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { jumpTo } from "../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_doy } from "../../../rn/Res/icon"
import { DoyText10 } from "../Button之类的基础组件/DoyButton"

const sc = sc375

interface DoyTabbar {
  selectedIndex?: number
}

const icons = [
  {
    title: '首页',
    selected: img_doy('标签栏/首页_已激活@3x'),
    unSelect: img_doy('标签栏/首页_未激活@3x'),
  }, {
    title: '通知',
    selected: img_doy('标签栏/通知_已激活@3x'),
    unSelect: img_doy('标签栏/通知_未激活@3x'),
  }, {
    title: '聊聊',
    selected: img_doy('标签栏/聊聊_已激活@3x'),
    unSelect: img_doy('标签栏/聊聊_未激活@3x'),
  }, {
    title: '我的',
    selected: img_doy('标签栏/我的_已激活@3x'),
    unSelect: img_doy('标签栏/我的_未激活@3x'),
  },
]

export const DoyTabbar = (p: DoyTabbar) => {
  const { selectedIndex } = p
  const items = icons?.map((ele, idx) => {
    const { title, selected, unSelect } = ele
    const uri = selectedIndex == idx ? selected : unSelect
    return <TouchableNativeFeedback onPress={() => {
      switch (idx) {
        default:
        case 0:
          jumpTo(PageName.DoyHomePage)
          break
        case 1:
          jumpTo(PageName.DoyNoticeListPage)
          break
        case 2:
          jumpTo(PageName.DoyChatListPage)
          break
        case 3:
          jumpTo(PageName.DoyMinePage)
          break
      }
    }}>
      <View style={{ alignItems: 'center', flex: 1 }}  >
        <FastImage source={{ uri }} style={{ width: sc(24), aspectRatio: 1 }} resizeMode='contain' />
        <DoyText10 bold1 style={{ marginTop: sc(6), color: selectedIndex == idx ? '#1F65E6' : '#8E929A' }}>{title}</DoyText10>
      </View>
    </TouchableNativeFeedback>
  })
  return <View style={[{ flexDirection: 'row', backgroundColor: '#fff', paddingTop: sc(6), paddingBottom: sc(4) }]}>
    {items}
  </View >
}