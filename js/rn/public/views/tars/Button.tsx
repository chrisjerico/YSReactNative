import React from 'react'
import { StyleSheet, Text, View, ViewStyle, TextStyle, TouchableWithoutFeedback, StyleProp } from 'react-native'

interface Button {
  containerStyle?: StyleProp<ViewStyle>;
  disabledContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  numberOfLines?: number;
  onPress?: () => any;
  disabled?: boolean;
}

const Button = ({ containerStyle, disabledContainerStyle, titleStyle, title, numberOfLines = 1, onPress, disabled = false }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <View style={disabled ? [styles.disabledContainer, disabledContainerStyle] : [styles.container, containerStyle]}>
        <Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines}>{title}</Text>
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
