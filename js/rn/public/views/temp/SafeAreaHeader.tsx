import React, { ReactNode } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { scale } from '../../tools/Scale'
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";

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

  let safeTop = 0;
  switch (Platform.OS) {
    case 'ios':
      safeTop = safeArea?.top;
      break;
    case 'android':
      ANHelper.callAsync(CMD.STATUS_BAR_SHOW)
        .then((show) => safeTop = show ? safeArea?.top : 0);
      break;
  }

  return (
    <View style={{ backgroundColor: headerColor }}>
      <View style={[styles.container,
        {
          marginTop: safeTop,
          backgroundColor: headerColor
        },
        containerStyle,]}>
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
