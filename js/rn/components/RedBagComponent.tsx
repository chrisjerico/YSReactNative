import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { scale } from '../helpers/function'
import TouchableImage from '../views/TouchableImage'
import Icon from 'react-native-vector-icons/EvilIcons'

interface RedBagComponentProps {
  logo: string;
  onPress: () => any;
  show?: any
}

const RedBagComponent = ({ logo, onPress, show }: RedBagComponentProps) => {

  const [hide, setHide] = useState(false)

  if (show && !hide) {
    return (
      <View style={styles.redEnvelope}>
        <Icon name={'close-o'} size={scale(30)} style={{ alignSelf: 'flex-end', marginRight: scale(20) }} onPress={() => { setHide(true) }} />
        <TouchableImage
          pic={logo}
          onPress={onPress}
        />
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  redEnvelope: {
    width: scale(200),
    aspectRatio: 1,
    position: 'absolute',
    top: scale(500),
    right: 0
  },
})
export default RedBagComponent
