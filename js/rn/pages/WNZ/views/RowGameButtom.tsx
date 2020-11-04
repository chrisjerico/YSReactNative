import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface RowGameButtomProps {
  logo: string
  name: string
  desc: string
  logoBallText: string
  onPress: () => any
  showRightBorder?: boolean
  showLogoBall?: boolean
}

const RowGameButtom = ({ logo, name, desc, logoBallText, onPress, showRightBorder = false, showLogoBall }: RowGameButtomProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {showLogoBall && (
          <View style={styles.logoBall}>
            <Text style={{ color: '#ffffff', fontSize: scale(15) }}>{logoBallText}</Text>
          </View>
        )}
        <View style={styles.logoContainer}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginLeft: scale(20),
            }}>
            <FastImage source={{ uri: logo }} style={{ width: scale(60), aspectRatio: 1 }} resizeMode={'contain'} />
            <View
              style={{
                justifyContent: 'center',
                marginLeft: scale(5),
                width: scale(150),
              }}>
              <Text numberOfLines={1} style={{ fontSize: scale(20), fontWeight: '300' }}>
                {name}
              </Text>
              <Text
                style={{
                  fontSize: scale(15),
                  color: '#666',
                  paddingTop: scale(5),
                }}
                numberOfLines={1}>
                {desc}
              </Text>
            </View>
          </View>
          {showRightBorder && <View style={{ width: scale(1), backgroundColor: '#d9d9d9', height: scale(50), marginTop: scale(10) }} />}
        </View>
        {/* <View style={{ flex: 1 }} /> */}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: scale(100),
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: scale(1),
  },
  logoBall: {
    width: '10%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#f6a518',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
    marginTop: scale(5),
    position: 'absolute',
    right: 0,
    top: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderRightWidth: scale(1),
    // borderColor: '#d9d9d9',
  },
})
export default RowGameButtom
