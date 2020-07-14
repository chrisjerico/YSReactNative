import React from 'react'
import { View, Text } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { IGlobalState } from '../../../redux/store/UGStore'
import { getLanguageCode } from '../../../public/tools/getLanguageString'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'

const Header = () => {
  const { width } = useDimensions().screen
  const { top } = useSafeArea()
  const { mobile_logo } = useSelector((state: IGlobalState) => state.SysConfReducer)

  return (
    <View style={{ width, height: 46 }}>
      <View style={{ height: top, width }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
        <View>
        </View>
        <FastImage resizeMode={"contain"} style={{ width: 130, height: 36 }} source={{ uri: mobile_logo }} />
        <View style={{ borderWidth: 1, borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
          <Text onPress={() => {
            push(PageName.VietnamLogin)
          }} style={{ color: "#646f95" }}>{}/</Text>
          <Text onPress={() => {
            push(PageName.VietnamRegister)
          }} style={{ color: "#646f95" }}>注册/</Text>
          <Text style={{ color: "#646f95" }}>试玩</Text>
        </View>
      </View>
    </View>
  )
}
export default Header