import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface RowGameButtomProps {
  logo: string;
  name: string;
  desc: string;
  logoBallText: string;
}

const RowGameButtom = ({
  logo,
  name,
  desc,
  logoBallText,
}: RowGameButtomProps) => {
  return (
    <View
      style={{
        width: '50%',
        height: scale(100),
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: scale(1),
      }}
    >
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <View style={styles.logoBall}>
          <Text style={{ color: '#ffffff', fontSize: scale(20) }}>
            {logoBallText}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: scale(1),
          borderColor: '#d9d9d9',
        }}
      >
        <FastImage
          source={{ uri: logo }}
          style={{ width: scale(50), aspectRatio: 1 }}
          resizeMode={'contain'}
        />
        <View
          style={{
            justifyContent: 'space-around',
            marginLeft: scale(25),
            width: scale(150),
          }}
        >
          <Text numberOfLines={1}>{name}</Text>
          <Text
            style={{
              fontSize: scale(15),
              color: '#8E8E8E',
              paddingTop: scale(5),
            }}
            numberOfLines={1}
          >
            {desc}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  logoBall: {
    width: '10%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#f6a518',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
    marginTop: scale(5),
  },
})
export default RowGameButtom
