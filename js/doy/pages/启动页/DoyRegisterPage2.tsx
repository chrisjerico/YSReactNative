import React, { useEffect, useRef } from "react"
import { Alert, TextInput, Text, View } from "react-native"
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
interface DoyRegisterVars {
  pwd?: string
}

export const DoyRegisterPage2 = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { backgroundColor: 'tansparent', backIconColor: 'black' } })
  }, [])

  const { current: v } = useRef<DoyRegisterVars>({})
  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, paddingHorizontal: sc(24) }}>
    <Text style={{ marginTop: sc(15), fontSize: sc(20), fontWeight: '500' }}>验证码已发送至号码</Text>
    <Text style={{ marginTop: sc(7), fontSize: sc(20), fontWeight: '600' }}>+86 15512345678</Text>
    <Text style={{ marginTop: sc(35), fontSize: sc(14) }}>短信验证码</Text>
    <UGTextField
      type='doy验证码'
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />
    <Text style={{ marginTop: sc(20), fontSize: sc(14) }}>设置登录密码</Text>
    <UGTextField
      type='doy密码'
      placeholder='八位数以上英文数字混合'
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />
    <Text style={{ marginTop: sc(20), fontSize: sc(14) }}>设置昵称</Text>
    <UGTextField
      type='doy密码'
      placeholder='显示钱包内的昵称'
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />

    <DoyButton1 title='完成' containerStyle={{ marginTop: sc(32) }} onPress={() => {
      push(PageName.DoyHomePage)
    }} />
  </View>
}