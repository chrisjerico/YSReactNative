import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import TouchableImage from '../../views/tars/TouchableImage'
import RedBagModal from '../RedBagModal'
import { ActivitySettingModel } from '../../network/Model/ActivitySettingModel'
import { FastImagePlaceholder } from '../../../pages/经典/tools/ImagePlaceholder'
import { ugLog } from '../../tools/UgLog'

interface ActivityComponentProps {
  logo: string
  onPress: () => any
  show?: any
  enableFastImage?: boolean
  containerStyle?: StyleProp<ViewStyle>
  refreshing?: boolean
  type?: number
}

const ActivityComponent = ({ logo, onPress, show, enableFastImage = true, containerStyle, refreshing, type }: ActivityComponentProps) => {
  const [hide, setHide] = useState(false)

  ugLog('logo ==',logo)
  useEffect(() => {
    refreshing && setHide(false)
  }, [refreshing])

  if (show && !hide) {
    return (
      <View style={[styles.container, containerStyle]}>
        {/* <TouchableImage containerStyle={{ padding: scale(20) }} enableFastImage={enableFastImage} pic={logo} onPress={onPress} resizeMode={'contain'} /> */}

        <TouchableWithoutFeedback onPress={onPress}>
          <FastImagePlaceholder source={{ uri: logo }} style={{ flex: 1, padding: scale(20) }} resizeMode={'contain'} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            setHide(true)
          }}>
          <View style={styles.iconContainer}>
            <AntDesign name={'closecircleo'} size={scale(35)} color={'red'} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: scale(150),
    aspectRatio: 1,
    position: 'absolute',
  },
  iconContainer: {
    width: scale(35),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(35),
    position: 'absolute',
    top: scale(20),
    right: scale(20),
  },
})

export default ActivityComponent
