import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { scale } from '../../helpers/function'
import { Icon } from 'react-native-elements'

interface WinningBlockProps {
  containerStyle: ViewStyle
}

const WinningBlock = ({ containerStyle }: WinningBlockProps) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: scale(5),
        }}
      >
        <Icon name={'bar-chart'} type={'font-awesome'} />
        <Text style={{ paddingLeft: scale(5) }}>{'中奖排行榜'}</Text>
      </View>
      <View style={[styles.container, containerStyle]}>
        <Text>{'Text'}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 240,
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    marginTop: scale(10),
  },
})

export default WinningBlock
