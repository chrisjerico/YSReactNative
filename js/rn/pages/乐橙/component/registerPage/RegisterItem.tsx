import { TextInput, View } from 'react-native'
import * as React from 'react'
import { Icon } from 'react-native-elements'
import { scale } from '../../../../public/tools/Scale'
import Button from '../../../../public/views/tars/Button'

export const RegisterItem = ({ config, placeHolder, iconName, iconType = 'font-awesome', onChangeText, onPressSms }:
                               { config?: any, placeHolder: string, iconName: string, iconType?: string, onChangeText: (text) => void, onPressSms?: () => void }) => {
  return (
    <>
      {config === false || config == 0 || config == '0' ?
        <></> :
        <View style={{
          flexDirection: 'row',
          paddingVertical: 10,
          borderWidth: 1,
          paddingHorizontal: 12,
          borderColor: '#ddd',
          marginTop: 12,
        }}>
          <Icon type={iconType} size={25} color={'gold'} name={iconName} />
          <TextInput onChangeText={(text) => onChangeText(text)} placeholder={placeHolder}
                     style={{ flex: 1, marginLeft: 12 }} />
          {placeHolder == '请输入手机短信验证码' && <Button
            title={'获取验证码'}
            onPress={onPressSms}
            titleStyle={{ fontSize: scale(20) }}
            containerStyle={{
              aspectRatio: 4,
              width: scale(150),
              backgroundColor: '#F1E1FF',
              borderRadius: scale(5),
            }}
          />}
        </View>
      }
    </>)
}
