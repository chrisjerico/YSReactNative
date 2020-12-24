
import AppDefine from '../../../public/define/AppDefine';
import React, { useEffect, useRef, useState, Component } from 'react'
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, } from 'react-native';
import { Button } from 'react-native-elements';


const JDWriteMessagePage = () => {

  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '建议反馈' },
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])

  return (
    <View style={[{ marginHorizontal: 10, backgroundColor: Skin1.textColor4 }]}>

      <Text style={[{ fontSize: 18, color: Skin1.textColor1, marginVertical: 10, }]}>{'反馈类型：提交建议'}</Text>

      <TextInput style={{ borderColor: '#d9d9d9',  height: 120, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5 ,color: Skin1.textColor1,}} placeholder={'请输入反馈内容'} numberOfLines={5} />

      <Button
          title="提交"
          style={{ marginVertical: 10,  }}
          onPress={() => {

          }}
        />
    </View>
  )
}

export default JDWriteMessagePage