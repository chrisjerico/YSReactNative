import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { Icon } from 'react-native-elements'
import { scale } from '../../tools/Scale'
import TouchableImage from '../../views/tars/TouchableImage'

interface ActivityComponentProps {
  logo: string;
  onPress: () => any;
  show?: any;
  enableFastImage?: boolean;
  containerStyle?: ViewStyle;
}

const ActivityComponent = ({
  logo,
  onPress,
  show,
  enableFastImage = true,
  containerStyle,
}: ActivityComponentProps) => {
  const [hide, setHide] = useState(false)

  if (show && !hide) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableImage
          containerStyle={{ marginRight: scale(50) }}
          enableFastImage={enableFastImage}
          pic={logo}
          onPress={onPress}
          resizeMode={'contain'}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setHide(true)
          }}
        >
          <View style={styles.iconContainer}>
            <Icon
              type={'evilicon'}
              name={'close'}
              size={scale(35)}
              color={'#ffffff'}
            />
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
    top: scale(500),
    right: 0,
  },
  iconContainer: {
    backgroundColor: 'red',
    width: scale(35),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(35),
    position: 'absolute',
    top: scale(20),
    right: scale(10),
  },
})

export default ActivityComponent
