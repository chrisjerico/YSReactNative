import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { scale } from "../../tools/Scale"

interface BottomLogo {
  webName: string;
  onPressPromotion: () => any;
  onPressComputer: () => any;
  containerStyle?: ViewStyle | ViewStyle[]
}

const BottomLogo = ({ webName, onPressComputer, onPressPromotion, containerStyle }: BottomLogo) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressComputer}>
          <Text
            style={{
              color: '#000000',
            }}
          >
            {'💻电脑版'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressPromotion}>
          <Text
            style={{
              color: '#000000',
            }}
          >
            {'🎁优惠活动'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Text
        style={{
          color: '#000000',
          textAlign: 'center',
          paddingTop: scale(10),
        }}
      >
        {'COPYRIGHT © '}+ {webName} +{'RESERVED'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(30)
  }
})

export default BottomLogo