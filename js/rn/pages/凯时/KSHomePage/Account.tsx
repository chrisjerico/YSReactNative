import React from 'react'
import { View, Text } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import LinearGradient from 'react-native-linear-gradient'
const Account = () => {
  const { width } = useDimensions().screen
  return (
    <View style={{ width: width - 20, alignSelf: 'center', height: 68, paddingBottom: 5, flexDirection: 'row', marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#3a3a41", borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: "white" }}>登录</Text>
      </View>
      <LinearGradient colors={["#eb5d4d", "#fb7a24"]} style={{ flex: 1, borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: "white" }}>注册</Text>
      </LinearGradient>
      <LinearGradient colors={["#eb5d4d", "#fb2464"]} style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: "white" }}>试玩</Text>
      </LinearGradient>
    </View>
  )
}
export default Account