import React, { useRef, useState } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle
} from 'react-native'
import { Icon } from 'react-native-elements'
import { scale } from '../../tools/Scale'

interface ReLoadComponentProps {
  onPress: () => any;
  color: string;
  containerStyle?: ViewStyle;
  size?: number;
}
const ReLoadComponent = ({
  onPress,
  color,
  containerStyle,
  size = 25,
}: ReLoadComponentProps) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))
  const reload = useRef(false)
  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        { transform: [{ rotateZ: spinDeg }] },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (!reload.current) {
            console.log('----動畫----')
            reload.current = true
            onPress && onPress()
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start(() => {
              setSpinValue(new Animated.Value(0))
              reload.current = false
            })
          }
        }}
      >
        <Icon
          name={'reload'}
          type={'material-community'}
          size={scale(size)}
          color={color}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

export default ReLoadComponent
