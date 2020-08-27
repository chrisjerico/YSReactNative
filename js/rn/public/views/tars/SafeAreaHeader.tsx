import React, { ReactNode } from 'react'
import {
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { scale } from '../../tools/Scale'

interface SafeAreaHeaderProps {
  headerColor: string;
  containerStyle?: ViewStyle | ViewStyle[];
  children?: ReactNode
}

const SafeAreaHeader = ({
  headerColor,
  containerStyle,
  children
}: SafeAreaHeaderProps) => {

  const safeArea = useSafeArea()

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
    aspectRatio: 540 / 60,
    flexDirection: 'row',
    paddingHorizontal: scale(10), //25
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default SafeAreaHeader
