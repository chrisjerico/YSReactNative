import React, { useEffect, useRef, useState } from "react"
import { View, Text, Alert } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TextInput } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import AntDesign from "react-native-vector-icons/AntDesign"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { showLoading, showReload } from "../../../rn/public/widget/UGLoadingCP"
import UGTextField from "../../../rn/public/widget/UGTextField"
import { img_doy } from "../../../rn/Res/icon"

const sc = sc375


interface DoyLoginVars {
  pwd?: string
}

export const DoyLoginPage = ({ }: UGBasePageProps) => {
  const [isPwd, setIsPwd] = useState(false)

  const { current: v } = useRef<DoyLoginVars>({})

  useEffect(() => {

  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, paddingHorizontal: sc(24) }}>
    <FastImage source={{ uri: img_doy('登录页logo@3x') }} style={{ marginTop: sc(116), marginBottom: sc(24), width: sc(147), height: sc(36) }} />
    <View style={{ backgroundColor: 'white', height: sc(46), borderRadius: sc(4), alignContent: 'center', alignItems: 'center', paddingHorizontal: sc(16), flexDirection: 'row' }}>
      <FastImage source={{ uri: img_doy('简体中文@3x') }} style={{ width: sc(24), height: sc(16) }} />
      <Text style={{ marginLeft: sc(8), fontSize: sc(14), fontWeight: '600' }}>+86</Text>
      <AntDesign name='caretdown' size={sc(8)} color='#b2b2b2' style={{ marginLeft: sc(8) }} />
      <TextInput placeholder='请输入手机号' style={{ flex: 1, marginLeft: sc(24), fontSize: sc(14) }} />
    </View>
    {isPwd && <UGTextField
      type='doy密码'
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />}
    {!isPwd && <UGTextField
      type='doy验证码'
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />}
    <Button title={isPwd ? '用短信验证码登录' : '用密码登录'} buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { setIsPwd(!isPwd) }} />
    <Button title='登录'
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: navBarBgColor,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      containerStyle={{ marginTop: sc(16) }}
      buttonStyle={{ paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ fontSize: sc(16), fontWeight: '600' }}
    />
    <View style={{ flex: 1 }} />
    <View style={{ flexDirection: 'row', marginBottom: sc(15), justifyContent: 'center' }}>
      <Button title='忘记密码' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { Alert.alert('请联系客服') }} />
      <Button title='注册账号' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} containerStyle={{ marginLeft: sc(40) }} onPress={() => { push(PageName.DoyRegisterPage) }} />
    </View>
  </View>
}