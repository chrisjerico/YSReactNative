import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, TextStyle } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from '../../../public/tools/Scale'

interface CheckBoxProps {
  check: boolean;
  onPress: () => any;
  label: string;
  containerStyle?: ViewStyle | ViewStyle;
  labelTextStyle?: TextStyle | TextStyle;
}

const CheckBox = ({ check, onPress, label, containerStyle, labelTextStyle }: CheckBoxProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.container, containerStyle]}>
      {check ? (
        <Feather
          name={'check'}
          color={'#ffffff'}
          style={styles.iconStyle}
          size={scale(25)}
        />
      ) : (
          <View style={styles.nonCheckContainer}></View>
        )}
      <Text style={[styles.label, labelTextStyle]}>{label}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  container: {
    // width: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { paddingLeft: scale(10) },
  nonCheckContainer: {
    width: scale(25),
    aspectRatio: 1,
    borderColor: 'blue',
    borderWidth: scale(1),
  },
  iconStyle: {
    backgroundColor: 'blue',
    width: scale(25),
    aspectRatio: 1,
  },
})

export default CheckBox
