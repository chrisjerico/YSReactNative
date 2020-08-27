import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { scale } from '../../../public/tools/Scale'
import { Button, Icon } from 'react-native-elements'

const CheckBox = ({ check, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      {check ? (
        <Icon
          type={'feather'}
          name={'check'}
          color={'#ffffff'}
          containerStyle={{
            width: scale(25),
            backgroundColor: 'blue',
            aspectRatio: 1,
            justifyContent: 'center',
          }}
          size={scale(20)}
        />
      ) : (
          <View
            style={{
              width: scale(25),
              aspectRatio: 1,
              borderColor: 'blue',
              borderWidth: scale(1),
            }}
          ></View>
        )}
      <Text style={{ paddingLeft: scale(10) }}>{'记住密码'}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default CheckBox