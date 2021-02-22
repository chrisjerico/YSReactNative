import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface ProfileButtonProps {
  title: string
  logo: string
  onPress: () => any
}

const ProfileButton = ({ title = 'title', logo = '', onPress }: ProfileButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <UGText style={styles.title}>{title}</UGText>
        <FastImage
          style={styles.image}
          resizeMode={'contain'}
          source={{
            uri: logo,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: scale(158),
    aspectRatio: 2.8,
    backgroundColor: '#ff6b1b',
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '15%',
    aspectRatio: 1,
    paddingLeft: scale(5),
  },
  title: {
    paddingRight: scale(5),
    color: '#ffffff',
    fontWeight: '500',
  },
})

export default ProfileButton
