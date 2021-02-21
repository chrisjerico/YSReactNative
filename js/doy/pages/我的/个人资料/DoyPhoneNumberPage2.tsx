import React, { useEffect } from "react"
import { View } from "react-native"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { pop } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { hideLoading, showError, showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyButton1, DoyText14, DoyText20 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyTextInput1, DoyTextInputSms } from "../../../publicComponent/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyPhoneNumberPage2 = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '更改手机号码' } })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4), paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText14>新手机号</DoyText14>
      <DoyTextInput1 style={{ backgroundColor: '#F7F7F9' }} placeholder='输入想绑定的新手机号' />
      <DoyText14 style={{ marginTop: sc(20) }}>手机验证码</DoyText14>
      <DoyTextInputSms style={{ backgroundColor: '#F7F7F9' }} smsButtonProps={{
        onSmsButtonClick: (startCountdown) => {
          startCountdown()
        }
      }} />
      <DoyButton1 title='确定' containerStyle={{ marginTop: sc(24) }} onPress={() => {
        showLoading()
        setTimeout(() => {
          showSuccess('更改成功！')
          pop()
          pop()
        }, 500);
      }} />
    </View>
  </View>
}