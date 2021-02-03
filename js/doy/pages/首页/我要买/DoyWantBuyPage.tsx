import React, { useEffect } from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"

const sc = sc375
const headerColos = ['#1F65E6', '#3581F5']

export const DoyWantBuyPage = ({ setProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1

  useEffect(() => {
    setProps({ navbarOpstions: { title: '我要买', gradientColor: headerColos } })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={headerColos} style={{ height: sc(228) }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>

    </LinearGradient>
  </View>
}