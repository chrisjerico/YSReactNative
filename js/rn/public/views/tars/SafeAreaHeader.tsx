import React, { memo, ReactNode } from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { scale } from '../../tools/Scale'
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {ugLog} from "../../tools/UgLog";

interface SafeAreaHeaderProps {
  headerColor?: string
  containerStyle?: StyleProp<ViewStyle>
  children?: ReactNode
}

const SafeAreaHeader = ({ headerColor, containerStyle, children }: SafeAreaHeaderProps) => {
  const safeArea = useSafeArea()
  const [safeTop, setSafeTop] = useState<number>(0)

  return (
    <View style={{ backgroundColor: headerColor }}>
      <View
        style={[
          styles.container,
          containerStyle,
          {
            marginTop: safeArea?.top,
            backgroundColor: headerColor,
          },
        ]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 70,
    paddingHorizontal: scale(10),
    justifyContent: 'center',
  },
})

export default memo(SafeAreaHeader)
