import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface MoreGameButtonProps {
  title: string
  onPress?: () => any
  logo: string
  subtitle: string
}

const MoreGameButton = ({ onPress, title, logo, subtitle }: MoreGameButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: '95%',
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
            <UGText style={{ color: '#ffffff' }}>{title}</UGText>
            <UGText style={{ color: '#95979f', marginTop: scale(10) }}>{subtitle}</UGText>
          </View>
        </View>
        <View style={{ flex: 1, borderColor: '#fb5858', justifyContent: 'center', alignItems: 'center', borderWidth: scale(1), height: '50%', borderRadius: scale(5) }}>
          <UGText style={{ color: '#fb5858' }}>{'去游戏'}</UGText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default MoreGameButton
