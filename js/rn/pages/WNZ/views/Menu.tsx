import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Dash from 'react-native-dash'
import { scale } from '../../../public/tools/Scale'

interface MenuProps {
  color: string;
  title: string;
  onPress?: () => any;
}
const Menu = ({ color, title, onPress }: MenuProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <View style={styles.menuConatiner}>
          <Text
            style={{
              fontSize: scale(23),
              color,
            }}
          >
            {title}
          </Text>
        </View>
        <Dash
          style={{ width: '100%', height: scale(1) }}
          dashGap={2}
          dashLength={4}
          dashThickness={1}
          dashColor={'#d9d9d9'}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  menuConatiner: {
    width: '100%',
    aspectRatio: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Menu
