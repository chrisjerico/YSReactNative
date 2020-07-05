import { Skin1 } from '../../../public/theme/UGSkinManagers';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image, TouchableWithoutFeedback } from "react-native"
import { useDimensions } from '@react-native-community/hooks';
import React from 'react'
import { useLottoContext } from '../LottoBetting/LottoContext';
import { useSafeArea } from 'react-native-safe-area-context';
const Header = () => {
  const { width } = useDimensions().screen
  const { top } = useSafeArea()
  const value = useLottoContext()
  return (
    <LinearGradient colors={Skin1.navBarBgColor}>
      <View style={{ height: top, width }}></View>
      <View style={{
        height: 44, width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
      }}>
        <TouchableWithoutFeedback onPress={() => {
          value.setShowModal(false)
        }}>
          <Image style={{ width: 25, height: 25, }} source={{ uri: "back_icon" }} />
        </TouchableWithoutFeedback>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white' }}>点击图标切换彩票</Text>
        <TouchableWithoutFeedback onPress={() => {
          value.setShowModal(false)
        }}>
          <Text style={{ color: 'white', fontSize: 16 }}>取消</Text>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  )
}
export default Header