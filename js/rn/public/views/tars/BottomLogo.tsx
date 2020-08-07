import React from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { scale } from "../../tools/Scale"


interface BottomLogo {
  webName: string;
  onPressPromotion: () => any;
  onPressComputer: () => any;
}

const BottomLogo = ({ webName, onPressComputer, onPressPromotion }: BottomLogo) => {
  return (
    <View style={{ marginTop: scale(30) }}>
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

export default BottomLogo