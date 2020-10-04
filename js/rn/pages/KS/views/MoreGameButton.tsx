import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

const MoreGameButton = ({ onPress }) => {
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
          <FastImage source={{ uri: 'http://t132f.fhptcdn.com/views/mobileTemplate/22/images/agbywicon.png' }} style={{ height: '100%', aspectRatio: 1 }} resizeMode={'contain'} />
          <View style={{ justifyContent: 'center', paddingLeft: scale(10) }}>
            <Text style={{ color: '#ffffff' }}>{'AG捕魚王'}</Text>
            <Text style={{ color: '#95979f' }}>{'玩法多样 坐地发财'}</Text>
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
