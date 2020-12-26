import { Image, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { httpClient } from '../../../../public/network/httpClient'
import { useState } from 'react'

export const LLRegisterInput = ({ onChangeText, placeholder, img, visible = true, isPwd = false, maxLength }:
                                  { onChangeText: (text) => void, placeholder: string, img: string, visible?: boolean, isPwd?: boolean, maxLength?: number }) => {
  const [showPwd, setShowPwd] = useState(false)
  return visible ? (<View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#d1d0d0',
      paddingTop: 12,
    }}>
      <Image style={{ height: 18, width: 18, marginRight: 8, resizeMode: 'stretch' }}
             source={{ uri: img }} />
      <TextInput
        secureTextEntry={isPwd && !showPwd}
        maxLength={maxLength || 15}
        onChangeText={onChangeText}
        style={{ fontSize: 14, paddingVertical: 20, flex: 1 }}
        placeholderTextColor={'#333'}
        placeholder={placeholder} />
      {isPwd &&
      <TouchableWithoutFeedback onPress={() => setShowPwd(!showPwd)}>
        <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
               source={{ uri: showPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
      </TouchableWithoutFeedback>}
    </View>) :
    null

}
