import React, { useEffect, useState } from 'react'
import { ImageBackground, Modal, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Res } from '../../Res/icon/Res'
import { scale } from '../tools/Scale'
import TouchableImage from '../views/tars/TouchableImage'

interface RedBagModalProps {
  logo: string
  onPress: () => any
  show?: any
  enableFastImage?: boolean
  containerStyle?: StyleProp<ViewStyle>
  refreshing?: boolean
}

const RedBagModal = () => {
  const [hide, setHide] = useState(false)

  if (!hide) {
    return (
      <Modal 
        style={{ zIndex: 2}}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setHide(false);
        }}>
        <View 
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
          <View style={[styles.container]} />
          <View style={{ 
                height: '60%',
                width: '70%',
                marginTop: -scale(30) }}>
            <ImageBackground 
              source={{ uri: Res.redBg }}
              style={{
                height: '100%',
                width: '100%', 
              }}
            >
            </ImageBackground>
          </View>
        </View>
      </Modal>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
})

export default RedBagModal
