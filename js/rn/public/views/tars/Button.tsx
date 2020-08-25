import React from 'react'
import { StyleSheet, Text, View, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native'

interface Button {
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  text?: string;
  numberOfLines?: number;
  onPress?: () => any;
}

const Button = ({ containerStyle, textStyle, text, numberOfLines = 1, onPress }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]} numberOfLines={numberOfLines}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {

  }
})

export default Button
