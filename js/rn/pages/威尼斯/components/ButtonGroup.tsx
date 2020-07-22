import React from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { scale } from '../../../public/tools/Scale'

interface ButtonGroupProps {
  leftLogo: string;
  rightLogo: string;
  leftTitle: string;
  rightTitle: string;
  onPressLeftButton: () => any;
  onPressRightButton: () => any;
}

const ButtonGroup = ({
  leftLogo,
  rightLogo,
  leftTitle,
  rightTitle,
  onPressLeftButton,
  onPressRightButton
}: ButtonGroupProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButtonContainer} onPress={onPressLeftButton}>
        <View style={styles.leftButton}>
          <Image
            source={{ uri: leftLogo }}
            style={{ width: scale(34), aspectRatio: 34 / 27 }}
          />
          <Text style={{ fontSize: scale(25), paddingLeft: scale(10) }}>
            {leftTitle}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButtonContainer} onPress={onPressRightButton}>
        <Image
          source={{ uri: rightLogo }}
          style={{ width: scale(34), aspectRatio: 34 / 27 }}
        />
        <Text style={{ fontSize: scale(25), paddingLeft: scale(10) }}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 65,
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    marginVertical: scale(10),
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
