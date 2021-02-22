import React, { useEffect } from "react"
import { View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { DoyButton1, } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyStarCP } from "../我的/个人资料/cp/DoyStarCP"

const sc = sc375

export const DoyNoticeOrderFeedbackPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '评价卖方' } })
  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ borderRadius: sc(4), paddingVertical: sc(24), paddingHorizontal: sc(16), backgroundColor: 'white' }}>
      <DoyStarCP containerStyle={{ alignSelf: 'center' }} size={sc(20)} space={sc(5)} onPress={(stars) => {

      }} />
      <TextInput placeholder='付款超快速好卖家！推荐大家与他交易' style={{ backgroundColor: '#F7F7F9', borderRadius: sc(4), padding: sc(16), marginTop: sc(24), height: sc(192), paddingTop: sc(16) }} multiline />
      <DoyButton1 title='评价' containerStyle={{ marginTop: sc(24) }} onPress={() => {

      }} />
    </View>
  </View>
}