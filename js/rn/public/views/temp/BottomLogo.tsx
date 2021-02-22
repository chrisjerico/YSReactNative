import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { scale } from '../../tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface BottomLogo {
  webName: string;
  onPressPromotion: () => any;
  onPressComputer: () => any;
  containerStyle?: ViewStyle | ViewStyle[];
  version?: string;
  debug?: boolean;
}

const BottomLogo = ({
  webName,
  onPressComputer,
  onPressPromotion,
  containerStyle,
  version,
  debug = true,
}: BottomLogo) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressComputer}>
          <UGText
            style={{
              color: '#000000',
            }}
          >
            {'💻电脑版'}
          </UGText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressPromotion}>
          <UGText
            style={{
              color: '#000000',
            }}
          >
            {'🎁优惠活动'}
          </UGText>
        </TouchableWithoutFeedback>
      </View>
      <UGText
        style={{
          color: '#000000',
          textAlign: 'center',
          paddingTop: scale(10),
        }}
      >
        {'COPYRIGHT © ' + webName + 'RESERVED'}
      </UGText>
      {debug ? (
        <UGText style={{ color: '#000000', textAlign: 'center' }}>
          {'VERSION : ' + version}
        </UGText>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(30),
  },
})

export default BottomLogo
