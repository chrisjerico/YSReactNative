import React from 'react'
import { StyleSheet, Text, View, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface Button {
  containerStyle?: ViewStyle | ViewStyle[];
  disabledContainerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  title?: string;
  numberOfLines?: number;
  onPress?: () => any;
  disabled?: boolean;
}

const Button = ({ containerStyle, disabledContainerStyle, titleStyle, title, numberOfLines = 1, onPress, disabled = false }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <View style={disabled ? [styles.disabledContainer, disabledContainerStyle] : [styles.container, containerStyle]}>
        <UGText style={[styles.title, titleStyle]} numberOfLines={numberOfLines}>{title}</UGText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {

  },
  disabledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c6c6c6'
  }
})

export default Button
