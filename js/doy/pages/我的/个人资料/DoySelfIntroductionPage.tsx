import React, { useEffect } from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { pop } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { hideLoading, showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyText14, DoyButton1 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyTextInput1, DoyTextInputSms } from "../../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoySelfIntroductionPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '编辑个人签名',
        rightComponent: (
          <Button title='保存' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => {
            showLoading()
            setTimeout(() => {
              hideLoading()
              pop()
            }, 500);
          }} />
        )
      }
    })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4), paddingHorizontal: sc(16), paddingVertical: sc(24) }}>
      <DoyText14>个人签名</DoyText14>
      <DoyTextInput1 style={{ backgroundColor: '#F7F7F9', paddingTop: sc(16), height: sc(192) }} multiline placeholder='这里是签名' />
    </View>
  </View>
}