import React, { useState } from "react"
import { Platform, StyleProp, View, ViewStyle } from "react-native"
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker"
import { ImageStyle } from "react-native-fast-image"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { UGColor } from "../../../rn/public/theme/UGThemeColor"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_doy } from "../../../rn/Res/icon"

const sc = sc375

export function getDoyDropDownPickerItems(titles: string[], icons?: string[], iconStyle?: StyleProp<ImageStyle>) {
  return titles?.map((v, i) => ({
    label: v,
    value: v,
    icon: !icons?.[i] ? undefined : () => <FastImagePlaceholder
      source={{ uri: icons?.[i] }}
      style={[{ width: sc(20), aspectRatio: 1 }, iconStyle]}
      resizeMode='contain'
    />
  }))
}

interface DoyDropDownPickerProps extends DropDownPickerProps {
  outerViewStyle?: StyleProp<ViewStyle>
  defaultValueAtIndex?: number
  backgroundColor?: string
  zIndex?: number
}

export const DoyDropDownPicker1 = (p: DoyDropDownPickerProps) => {
  const { style, containerStyle, labelStyle, dropDownStyle, itemStyle, items, defaultValue } = p
  const { outerViewStyle, defaultValueAtIndex, backgroundColor = 'white', zIndex = 10 } = p
  const { textColor1 } = skin1
  const [showUpArrow, setShowUpArrow] = useState(false)

  return <View style={[{ ...(Platform.OS !== 'android' && { zIndex: zIndex, }), width: '100%', }, outerViewStyle]}>
    <DropDownPicker
      {...p}
      style={[{ flex: undefined, borderColor: 'transparent', paddingHorizontal: sc(10), height: sc(46), backgroundColor: backgroundColor }, style]}
      containerStyle={[{ marginTop: sc(12), }, containerStyle]}
      dropDownStyle={[{
        borderColor: 'transparent', marginTop: sc(15), paddingVertical: sc(10),
        shadowColor: '#ddd', shadowRadius: sc(3), shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1,
        backgroundColor: backgroundColor
      }, dropDownStyle]}
      labelStyle={[{ fontSize: sc(14), fontWeight: '700', color: textColor1, marginTop: sc(2) }, labelStyle]}
      itemStyle={[{ paddingHorizontal: sc(7), paddingVertical: sc(10), justifyContent: 'flex-start', }, itemStyle]}
      onOpen={() => { setShowUpArrow(true) }}
      onClose={() => { setShowUpArrow(false) }}
      defaultValue={items?.[defaultValueAtIndex]?.value ?? defaultValue}
    />
    {showUpArrow && <AntDesign name='caretup' color={backgroundColor} style={{
      height: sc(7), marginBottom: sc(-7), aspectRatio: 2, left: sc(8), top: sc(7),
      shadowColor: '#ccc', shadowRadius: sc(2), shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1,
    }} />}
  </View>
}
