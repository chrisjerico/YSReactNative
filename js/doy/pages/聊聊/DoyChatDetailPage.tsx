import React, { useEffect } from "react"
import { View } from "react-native"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"

export const DoyChatDetailPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({ navbarOpstions: { title: '玛瑞亚#3b8dcd' } })
  }, [])

  return <View style={{ flex: 1 }}>
  </View>
}