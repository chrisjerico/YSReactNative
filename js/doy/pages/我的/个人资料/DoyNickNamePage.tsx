import React, { useEffect } from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { pop, push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { hideLoading, showLoading } from "../../../../rn/public/widget/UGLoadingCP"
import { DoyText14, DoyTextInput1 } from "../../../public/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyNickNamePage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '编辑我的昵称',
        rightComponent: (<Button title='保存' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => {
          showLoading()
          setTimeout(() => {
            hideLoading()
            pop()
          }, 500);
        }} />)
      }
    })
  }, [])

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', paddingHorizontal: sc(16), paddingVertical: sc(24), borderRadius: sc(4) }}>
      <DoyText14>我的昵称</DoyText14>
      <DoyTextInput1 bold1 defaultValue='Adam' style={{ backgroundColor: '#F7F7F9' }} />
    </View>
  </View>
}