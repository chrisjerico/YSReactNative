import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import { scale } from '../../../public/tools/Scale'

const iconSize = scale(30)

const HomeHeader = ({ logo }) => {
  return (
    <View style={styles.container}>
      <Entypo name={'menu'} color={'#000000'} size={iconSize} />
      <FastImage source={{ uri: logo }} style={styles.logo} resizeMode={'contain'} />
      <Entypo name={'message'} color={'#000000'} size={iconSize} />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: '100%',
    aspectRatio: 1,
  },
})
