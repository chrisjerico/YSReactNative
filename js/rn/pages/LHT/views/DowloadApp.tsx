import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface DowloadApp {
  onPressDowload: () => any
}

const DowloadApp = ({ onPressDowload }: DowloadApp) => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <View
        style={{
          width: '100%',
          aspectRatio: 7,
          position: 'absolute',
          backgroundColor: '#7B7B7B',
          bottom: 0,
          opacity: 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(10),
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name={'closecircle'}
            color={'#ffffff'}
            size={scale(23)}
            onPress={() => {
              setShow(false)
            }}
          />
          <UGText style={{ color: '#ffffff', fontSize: scale(23), marginLeft: scale(5) }}>{'下载App，体验更多购彩乐趣'}</UGText>
        </View>
        <Button title={'下載APP'} buttonStyle={{ backgroundColor: '#0072E3' }} onPress={onPressDowload} />
      </View>
    )
  } else {
    return null
  }
}

export default DowloadApp
