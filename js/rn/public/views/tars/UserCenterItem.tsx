import React, { memo } from 'react'
import { Image, StyleSheet, Text, View, ViewStyle, TouchableWithoutFeedback, TextStyle, StyleProp } from 'react-native'
import { scale } from '../../tools/Scale'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface UserCenterItemProps {
  logo: string
  title: string
  onPress: () => any
  containerStyle?: StyleProp<ViewStyle>
  showUnReadMsg?: boolean
  unreadMsg?: number
  titleStyle?: StyleProp<TextStyle>
  arrowColor?: string
}

const UserCenterItem = ({ logo = '', title, onPress, containerStyle, showUnReadMsg = false, unreadMsg, arrowColor = '#000000', titleStyle }: UserCenterItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageContainer}>
          <Image resizeMode={'contain'} style={styles.image} source={{ uri: logo }} />
          <UGText style={[styles.title, titleStyle]}>{title}</UGText>
        </View>
        {showUnReadMsg ? (
          <View style={styles.unReadContainer}>
            <UGText style={styles.unReadText}>{unreadMsg > 99 ? 99 : unreadMsg}</UGText>
          </View>
        ) : (
          <AntDesign name={'right'} color={arrowColor} size={scale(20)} />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 490 / 75,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: scale(1),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    alignSelf: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scale(35),
    aspectRatio: 1,
  },
  text: {
    fontSize: scale(25),
  },
  title: {
    fontSize: scale(30),
    fontWeight: '300',
    paddingLeft: scale(25),
  },
  unReadContainer: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: scale(30),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unReadText: {
    color: '#ffffff',
    fontSize: scale(20),
  },
})

export default memo(UserCenterItem)
