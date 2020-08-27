import React from 'react'
import { View } from 'react-native'
import { useSafeArea } from "react-native-safe-area-context"
import { scaleHeight } from "../../tools/Scale"

const BottomGap = () => {

  const safeArea = useSafeArea()

  return (
    <View style={{ height: scaleHeight(25) + safeArea.top }}></View>
  )
}

export default BottomGap