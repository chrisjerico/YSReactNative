import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface ButtonGroupProps {
  leftLogo: string
  rightLogo: string
  leftTitle: string
  rightTitle: string
  onPressLeftButton: () => any
  onPressRightButton: () => any
}

const ButtonGroup = ({ leftLogo, rightLogo, leftTitle, rightTitle, onPressLeftButton, onPressRightButton }: ButtonGroupProps) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPressLeftButton}>
        <View style={styles.leftButtonContainer}>
          <View style={styles.leftButton}>
            <Image source={{ uri: leftLogo }} style={{ width: scale(34), aspectRatio: 34 / 27 }} />
            <UGText style={{ fontSize: scale(25), paddingLeft: scale(10) }}>{leftTitle}</UGText>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPressRightButton}>
        <View style={styles.rightButtonContainer}>
          <Image source={{ uri: rightLogo }} style={{ width: scale(34), aspectRatio: 34 / 27 }} />
          <UGText style={{ fontSize: scale(25), paddingLeft: scale(10) }}>{rightTitle}</UGText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 73,
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    marginTop: scale(12),
    marginBottom: scale(7),
  },
  leftButtonContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5),
  },
  leftButton: {
    flexDirection: 'row',
    borderRightWidth: scale(1),
    borderRightColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
  },
  rightButtonContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
  },
})
export default ButtonGroup
