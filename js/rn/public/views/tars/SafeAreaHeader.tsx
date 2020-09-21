import React, { ReactNode } from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from '../../tools/Scale'

interface SafeAreaHeaderProps {
  headerColor: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode
}

const SafeAreaHeader = ({
  headerColor,
  containerStyle,
  children
}: SafeAreaHeaderProps) => {

  const safeArea = useSafeAreaInsets()

  return (
    <View style={{ backgroundColor: headerColor }}>
      <View style={[styles.container, containerStyle, {
        marginTop: safeArea?.top,
        backgroundColor: headerColor
      }]}>
        {
          children
        }
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 70,
    paddingHorizontal: scale(10),
    justifyContent: 'center'
  }
})

export default SafeAreaHeader
