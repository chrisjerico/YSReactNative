import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'

interface GameRowButtonProps {
  title: string
  logo: string
  onPress: () => any
}

const GameRowButton = ({ title, logo, onPress }: GameRowButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <FastImage source={{ uri: logo }} style={{ width: '20%', aspectRatio: 1, marginRight: scale(10) }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: scale(25), fontWeight: '600' }}>{title}</Text>
          <View style={{ flexDirection: 'row', marginTop: scale(10) }}>
            <Text style={{ color: '#8a8d96' }}>{'彩票 | '}</Text>
            <Text style={{ color: '#fb9802', fontWeight: '600' }}>{'500人在玩'}</Text>
          </View>
        </View>
        <Button title={'进入游戏'} containerStyle={{ backgroundColor: '#71abff', width: scale(150), aspectRatio: 3, borderRadius: scale(100) }} titleStyle={{ color: '#ffffff' }} onPress={onPress} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(150),
    width: '100%',
    borderBottomWidth: AppDefine.onePx,
    borderColor: '#d9d9d9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(50),
  },
})

export default GameRowButton
