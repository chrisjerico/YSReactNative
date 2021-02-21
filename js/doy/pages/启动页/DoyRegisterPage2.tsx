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
import { showLoading, showSuccess } from "../../../rn/public/widget/UGLoadingCP"
import UGTextField from "../../../rn/public/widget/UGTextField"
import { img_doy } from "../../../rn/Res/icon"
import { DoyButton1, DoyText14, DoyText20 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyTextInput1, DoyTextInputPwd, DoyTextInputSms } from "../../publicComponent/Button之类的基础组件/DoyTextInput"
import { doyApi } from "../../publicClass/network/DoyApi"

const sc = sc375

export const DoyRegisterPage2 = ({ setProps, route }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { backgroundColor: 'tansparent', backIconColor: 'black' } })
  }, [])

  const { params: { phone } } = route
  const { current: v } = useRef({
    pwd: '',
    code: '',
    nickname: '',
  })

  return <View style={{ flex: 1, paddingHorizontal: sc(24), paddingVertical: sc(10) }}>
    <DoyText20 bold1 style={{ marginTop: sc(10) }}>验证码已发送至号码</DoyText20>
    <DoyText20 bold2 style={{ marginTop: sc(7) }}>{'+86 ' + phone}</DoyText20>
    <DoyText14 style={{ marginTop: sc(35) }}>短信验证码</DoyText14>
    <DoyTextInputSms
      smsButtonProps={{
        onSmsButtonClick: (startCountdown) => {
          startCountdown()
        }
      }}
      onChangeText={(text) => {
        v.code = text
      }}
    />
    <DoyText14 style={{ marginTop: sc(20) }}>设置登录密码</DoyText14>
    <DoyTextInputPwd placeholder='八位数以上英文数字混合' onChangeText={(text) => {
      v.pwd = text
    }} />
    <DoyText14 style={{ marginTop: sc(20) }}>设置昵称</DoyText14>
    <DoyTextInput1 placeholder='显示钱包内的昵称' onChangeText={(text) => {
      v.nickname = text
    }} />

    <DoyButton1 title='完成' containerStyle={{ marginTop: sc(32) }} onPress={() => {
      showLoading()
      doyApi.user.reg(phone, v.pwd, v.nickname).useSuccess(() => {
        showSuccess('注册成功！')
        push(PageName.DoyHomePage)
      })
    }} />
  </View>
}