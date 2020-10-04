import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface MoreGameButtonProps {
  title: string
  onPress?: () => any
  logo: string
}

const MoreGameButton = ({ onPress, title, logo }: MoreGameButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          aspectRatio: 4.5,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: scale(1),
          borderColor: '#5B5B5B',
          paddingVertical: scale(10),
          alignSelf: 'center',
        }}>
        <View style={{ flex: 4, flexDirection: 'row', height: '100%' }}>
          <FastImage source={{ uri: logo }} style={{ height: '100%', aspectRatio: 1 }} resizeMode={'contain'} />
          <View style={{ justifyContent: 'center', paddingLeft: scale(10) }}>
            <Text style={{ color: '#ffffff' }}>{title}</Text>
            {/* <Text style={{ color: '#95979f' }}>{'玩法多样 坐地发财'}</Text> */}
          </View>
        </View>
        <View style={{ flex: 1, borderColor: '#fb5858', justifyContent: 'center', alignItems: 'center', borderWidth: scale(1), height: '50%', borderRadius: scale(5) }}>
          <Text style={{ color: '#fb5858' }}>{'去游戏'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default MoreGameButton
