import React, { useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { scale } from '../helpers/function'
import TouchableImage from '../views/TouchableImage'
import Icon from 'react-native-vector-icons/EvilIcons'

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
          enableFastImage={enableFastImage}
          pic={logo}
          onPress={onPress}
          resizeMode={'contain'}
        />
        <Icon
          name={'close-o'}
          size={scale(40)}
          style={{
            alignSelf: 'flex-end',
            marginRight: scale(20),
            position: 'absolute',
            top: scale(-10)
          }}
          onPress={() => {
            setHide(true)
          }}
          color={'red'}

        />
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: scale(200),
    aspectRatio: 1,
    position: 'absolute',
    top: scale(500),
    right: 0,
  },
})
export default ActivityComponent
