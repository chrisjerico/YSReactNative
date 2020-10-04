import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import { useHtml5Image } from '../../../public/tools/tars'

const { getHtml5Image } = useHtml5Image()

interface PreferenceButtonProps {
  title: string
  selected?: boolean
  onPress?: () => any
}
const PreferenceButton = ({ title, selected = false, onPress }: PreferenceButtonProps) => {
  return (
    <View style={{ width: '30%', marginBottom: scale(31) }}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: selected ? '#c21632' : '#D0D0D0',
            },
          ]}>
          <Text
            style={{
              fontSize: scale(20),
              color: selected ? '#ffffff' : '#7B7B7B',
            }}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {selected && (
        <FastImage
          source={{ uri: getHtml5Image(14, 'choose') }}
          style={{
            width: scale(25),
            aspectRatio: 1,
            position: 'absolute',
            right: scale(-5),
            top: scale(-15),
          }}
          resizeMode={'contain'}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    aspectRatio: 2.8,
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PreferenceButton
