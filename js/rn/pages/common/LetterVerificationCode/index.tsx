import { useState } from "react"
import { View, Image, TouchableWithoutFeedback, TextInput, Text } from "react-native"
import { Icon } from "react-native-vector-icons/Icon"
import { Controller } from "react-hook-form"
import React from 'react'

const LetterVerificationCode = ({ control, code, onPress, reg_vcode }: { code: string, control: any, onPress: () => {}, reg_vcode: 1 | 3 }) => {
  const [hide, setHide] = useState(reg_vcode == 1 ? false : true)
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', height: 50,
      backgroundColor: 'gray', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10
    }}>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={"Safety"} type={"antdesign"} color="black" size={24} />
      </View>
      <View style={{ height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
      <Controller
        placeholderTextColor={'black'}
        onChange={args => {
          return args[0].nativeEvent.text
        }}
        secureTextEntry={false}
        style={{ flex: 1 }}
        as={TextInput}
        rules={{
          required: {
            value: true, message
              : "请输入验证码"
          }
        }}
        name={"imgCode"}
        control={control}
        defaultValue=""
        placeholder={"请输入验证码"}
      />
      {!hide ? <TouchableWithoutFeedback onPress={onPress}>
        <Image resizeMode={'contain'} style={{ height: "100%", aspectRatio: 2 }} source={{ uri: code }} />
      </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
        setHide(false)
        onPress()
      }}>
          <Text>点击显示验证码</Text>
        </TouchableWithoutFeedback>}

    </View>


  )
}
export default LetterVerificationCode