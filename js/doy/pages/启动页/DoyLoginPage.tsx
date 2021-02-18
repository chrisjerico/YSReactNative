import React, { useEffect, useRef, useState } from "react"
import { View, Text, Alert } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_doy } from "../../../rn/Res/icon"
import { DoyButton1, DoyText14 } from "../../public/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../public/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1, DoyTextInputPwd, DoyTextInputSms, DoyTextInputVerificationCode1 } from "../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375
interface DoyLoginVars {
  pwd?: string
}

export const DoyLoginPage = ({ setProps }: UGBasePageProps) => {
  const [isPwd, setIsPwd] = useState(false)
  const { current: v } = useRef<DoyLoginVars>({})

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, paddingHorizontal: sc(24), }}>
    <FastImage source={{ uri: img_doy('登录页logo@3x') }} style={{ marginTop: sc(116), marginBottom: sc(24), width: sc(147), height: sc(36) }} />
    <View style={{ flexDirection: 'row', zIndex: 1, backgroundColor: 'white', borderRadius: sc(4), }}>
      <DoyDropDownPicker1
        items={getDoyDropDownPickerItems(['+86', '+63'], [img_doy('简体中文@3x'), img_doy('简体中文@3x')], { width: sc(24), height: sc(16), marginRight: sc(3) })}
        defaultValueAtIndex={0}
        outerViewStyle={{ width: sc(100), marginLeft: sc(5), }}
        containerStyle={{ marginTop: 0 }}
      />
      <DoyTextInput1 placeholder='请输入手机号' onlyInteger maxLength={11} style={{ flex: 1, marginTop: 0, paddingLeft: sc(7) }} />
    </View>

    {isPwd && <DoyTextInputPwd
      onlyInteger
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />}
    {!isPwd && <DoyTextInputSms
      smsButtonProps={{
        onSmsButtonClick: (startCountdown) => {
          startCountdown()
        }
      }}
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />}
    <Button title={isPwd ? '用短信验证码登录' : '用密码登录'} buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { setIsPwd(!isPwd) }} />
    <DoyButton1 title='登录' onPress={() => {
      push(PageName.DoyHomePage)
    }} />
    <View style={{ flex: 1 }} />
    <View style={{ flexDirection: 'row', marginBottom: sc(10), justifyContent: 'center' }}>
      <Button title='忘记密码' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { Alert.alert('请联系客服') }} />
      <Button title='注册账号' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} containerStyle={{ marginLeft: sc(40) }} onPress={() => { push(PageName.DoyRegisterPage1) }} />
    </View>
  </View>
}