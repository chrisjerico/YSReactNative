import React, { useEffect } from "react"
import { View } from "react-native"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { pop, push } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { hideLoading, showError, showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyButton1, DoyText14, DoyText20 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyTextInputSms } from "../../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyPhoneNumberPage1 = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '更改手机号码' } })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4), paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText20 bold2 style={{ lineHeight: sc(28) }}>{`您当前使用的手机号码为
+86 15512345678`}</DoyText20>
      <DoyText14 style={{ marginTop: sc(24) }}>手机验证码</DoyText14>
      <DoyTextInputSms style={{ backgroundColor: '#F7F7F9' }} smsButtonProps={{
        onSmsButtonClick: (startCountdown) => {
          startCountdown()
        }
      }} />
      <DoyButton1 title='下一步' containerStyle={{ marginTop: sc(24) }} onPress={() => {
        showLoading()
        setTimeout(() => {
          hideLoading()
          push(PageName.DoyPhoneNumberPage2)
        }, 500);
      }} />
    </View>
  </View>
}