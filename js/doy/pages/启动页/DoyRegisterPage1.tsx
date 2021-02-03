import React, { useEffect } from "react"
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
import { DoyButton1 } from "../../public/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyRegisterPage1 = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { backgroundColor: 'tansparent', backIconColor: 'black' } })
  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, paddingHorizontal: sc(24) }}>
    <View style={{ alignItems: 'center', paddingTop: sc(30), paddingBottom: sc(40) }}>
      <FastImage source={{ uri: img_doy('注册页 logo@3x') }} style={{ marginBottom: sc(24), width: sc(90), aspectRatio: 1 }} />
      <Text style={{ fontSize: sc(20), fontWeight: '600' }}>欢迎注册DOY</Text>
    </View>
    <View style={{ backgroundColor: 'white', height: sc(46), borderRadius: sc(4), alignContent: 'center', alignItems: 'center', paddingHorizontal: sc(16), flexDirection: 'row' }}>
      <FastImage source={{ uri: img_doy('简体中文@3x') }} style={{ width: sc(24), height: sc(16) }} />
      <Text style={{ marginLeft: sc(8), fontSize: sc(14), fontWeight: '600' }}>+86</Text>
      <AntDesign name='caretdown' size={sc(8)} color='#b2b2b2' style={{ marginLeft: sc(8) }} />
      <TextInput placeholder='请输入手机号' style={{ flex: 1, marginLeft: sc(24), fontSize: sc(14) }} />
    </View>
    <DoyButton1 title='下一步' containerStyle={{ marginTop: sc(32) }} onPress={() => { push(PageName.DoyRegisterPage2) }} />
  </View>
}