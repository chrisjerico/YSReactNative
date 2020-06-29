import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { scale } from '../../../../helpers/function'

interface ButtonGroupProps {
  leftLogo: string;
  rightLogo: string;
  leftTitle: string;
  rightTitle: string;
}

const ButtonGroup = ({
  leftLogo,
  rightLogo,
  leftTitle,
  rightTitle,
}: ButtonGroupProps) => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 500 / 65,
        flexDirection: 'row',
        paddingHorizontal: scale(10),
        marginVertical: scale(10),
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: scale(5),
          borderBottomLeftRadius: scale(5)
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderRightWidth: scale(1),
            borderRightColor: '#d9d9d9',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
            width: '100%',
          }}
        >
          <Image
            source={{ uri: leftLogo }}
            style={{ width: scale(34), aspectRatio: 34 / 27 }}
          />
          <Text style={{ fontSize: scale(25), paddingLeft: scale(10) }}>
            {leftTitle}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: scale(5),
          borderBottomRightRadius: scale(5)
        }}
      >
        <Image
          source={{ uri: rightLogo }}
          style={{ width: scale(34), aspectRatio: 34 / 27 }}
        />
        <Text style={{ fontSize: scale(25), paddingLeft: scale(10) }}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonGroup
