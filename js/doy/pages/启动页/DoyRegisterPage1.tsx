import React, { useEffect, useRef } from "react"
import { Alert, TextInput, View, Text } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import AntDesign from "react-native-vector-icons/AntDesign"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import UGTextField from "../../../rn/public/widget/UGTextField"
import { img_doy } from "../../../rn/Res/icon"
import { DoyButton1, DoyText14, DoyText20 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../publicComponent/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1 } from "../../publicComponent/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyRegisterPage1 = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { current: v } = useRef({
    phone: ''
  })

  useEffect(() => {
    setProps({ navbarOpstions: { backgroundColor: 'tansparent', backIconColor: 'black' } })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(24), paddingVertical: sc(10) }}>
    <View style={{ alignItems: 'center', paddingTop: sc(30), paddingBottom: sc(40) }}>
      <FastImage source={{ uri: img_doy('注册页 logo@3x') }} style={{ marginBottom: sc(24), width: sc(90), aspectRatio: 1 }} />
      <DoyText20 bold2 >欢迎注册DOY</DoyText20>
    </View>
    <View style={{ flexDirection: 'row', zIndex: 1, backgroundColor: 'white', borderRadius: sc(4), }}>
      <DoyDropDownPicker1
        items={getDoyDropDownPickerItems(['+86', '+63'], [img_doy('简体中文@3x'), img_doy('简体中文@3x')], { width: sc(24), height: sc(16), marginRight: sc(3) })}
        defaultValueAtIndex={0}
        outerViewStyle={{ width: sc(100), marginLeft: sc(5), }}
        containerStyle={{ marginTop: 0 }}
      />
      <DoyTextInput1 placeholder='请输入手机号' onlyInteger maxLength={11} style={{ flex: 1, marginTop: 0, paddingLeft: sc(7) }} onChangeText={(text) => {
        v.phone = text;
      }} />
    </View>
    <DoyButton1 title='下一步' containerStyle={{ marginTop: sc(32) }} onPress={() => { push(PageName.DoyRegisterPage2, { phone: v.phone }) }} />
  </View>
}