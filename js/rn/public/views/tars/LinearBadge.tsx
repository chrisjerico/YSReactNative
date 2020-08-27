import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from '../../tools/Scale'

interface LinearBadgeProps {
  title: string;
  colors: any[];
  onPress?: () => any;
  showIcon?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  size?: number;
}

const LinearBadge = ({
  title,
  colors,
  onPress,
  showIcon = true,
  containerStyle,
  textStyle,
  size = 1
}: LinearBadgeProps) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors} // ['#9393FF', 'rgb(91, 91, 220)']
        style={[styles.container, {
          width: scale(125 * size),
          borderRadius: scale(50 * size),
        }, containerStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {showIcon ? (
          <Icon
            style={{ marginLeft: scale(5) }}
            type={'AntDesign'}
            name={'link'}
            size={scale(20)}
            color={'#ffffff'}
          />
        ) : null}
      </LinearGradient>
    </TouchableWithoutFeedback>
  )

const styles = StyleSheet.create({
  container: {
    height: scale(33),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#ffffff' },
})

export default LinearBadge
