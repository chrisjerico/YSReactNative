import React, { useEffect } from "react"
import { Alert, View } from "react-native"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { pop } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyText14, DoyButton1, DoyButton2 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyTextInputPwd } from "../../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyChangePayPwdPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '修改交易密码' } })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4), paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText14>交易密码</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='输入当前交易密码' onlyInteger />
      <DoyText14 style={{ marginTop: sc(20) }}>新交易密码</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='输入6位数字' onlyInteger maxLength={6} />
      <DoyText14 style={{ marginTop: sc(20) }}>再次确认</DoyText14>
      <DoyTextInputPwd style={{ backgroundColor: '#F7F7F9' }} placeholder='再次输入新交易密码' onlyInteger maxLength={6} />
      <DoyButton1 title='确定' containerStyle={{ marginTop: sc(24) }} onPress={() => {
        showLoading()
        setTimeout(() => {
          showSuccess('更改成功！')
          pop()
        }, 500);
      }} />
      <DoyButton2 title='忘记交易密码' containerStyle={{ marginTop: sc(8), marginBottom: -sc(15) }} buttonStyle={{ borderColor: 'transparent' }} titleStyle={{ fontSize: sc(12) }} onPress={() => {
        Alert.alert('请联系客服')
      }} />
    </View>
  </View>
}