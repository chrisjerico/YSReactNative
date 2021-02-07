import React, { useEffect } from "react"
import { View } from "react-native"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"

export const DoyUserInfoPage = ({ }: UGBasePageProps) => {
  useEffect(() => {

  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1 }}>
  </View>
}