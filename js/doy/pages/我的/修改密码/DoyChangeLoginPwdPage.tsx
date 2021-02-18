import React, { useEffect } from "react"
import { Alert, View } from "react-native"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { pop } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyText14, DoyButton1, DoyButton2 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyTextInput1, DoyTextInputPwd, DoyTextInputSms } from "../../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyChangeLoginPwdPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '修改登录密码' } })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4), paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText14>登录密码</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='输入当前登录密码' />
      <DoyText14 style={{ marginTop: sc(20) }}>新登录密码</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='输入8位以上英文数字混合' />
      <DoyText14 style={{ marginTop: sc(20) }}>再次确认</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='再次输入新登录密码' />
      <DoyButton1 title='确定' containerStyle={{ marginTop: sc(24) }} onPress={() => {
        showLoading()
        setTimeout(() => {
          showSuccess('更改成功！')
          pop()
        }, 500);
      }} />
      <DoyButton2 title='忘记登录密码' containerStyle={{ marginTop: sc(8), marginBottom: -sc(15) }} buttonStyle={{ borderColor: 'transparent' }} titleStyle={{ fontSize: sc(12) }} onPress={() => {
        Alert.alert('请联系客服')
      }} />
    </View>
  </View>
}