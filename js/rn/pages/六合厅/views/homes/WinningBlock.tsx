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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.title}>{'用户名称'}</Text>
          <Text style={styles.title}>{'游戏名称'}</Text>
          <Text style={styles.title}>{'投注金额'}</Text>
        </View>
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
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25)
  }
})

export default WinningBlock
