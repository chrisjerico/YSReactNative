import { Skin1 } from '../../../public/theme/UGSkinManagers';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useDimensions } from '@react-native-community/hooks';
import React from 'react'
import { useLottoContext } from '../LottoBetting/LottoContext';
import { useSafeArea } from 'react-native-safe-area-context';
import { pop } from '../../../public/navigation/RootNavigation';
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
const Header = () => {
  const { width } = useDimensions().screen
  const { top } = useSafeArea()
  const { lottoData, setShowModal } = useLottoContext()
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            pop()
          }}>
            <Image style={{ width: 25, height: 25, }} source={{ uri: "back_icon" }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
            setShowModal(true)
          }}>
            <UGText style={{ fontSize: 18, color: 'white', marginLeft: 20 }}>{lottoData?.title}</UGText>
            <Image style={{ width: 20, height: 20, tintColor: 'white' }} source={{ uri: "arrow_down" }} />
          </TouchableOpacity>
        </View>

        {/* <TouchableWithoutFeedback onPress={() => {
          value.setShowModal(false)
        }}>
          <UGText style={{ color: 'white', fontSize: 16 }}>取消</UGText>
        </TouchableWithoutFeedback> */}
      </View>
    </LinearGradient>
  )
}
export default Header
