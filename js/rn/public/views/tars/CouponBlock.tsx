import React, { memo } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { scale } from '../../tools/Scale'
import List from './List'

interface CouponBlock {
  coupons: any[]
  renderCoupon: ({ item: any, index: number }) => any
  onPressMore: () => any
  visible: boolean
  containerStyle?: StyleProp<ViewStyle>
  listContainerStyle?: StyleProp<ViewStyle>
  titleContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

const CouponBlock = ({ visible, containerStyle, coupons = [], renderCoupon, onPressMore, listContainerStyle, titleContainerStyle, titleStyle }: CouponBlock) => {
  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: scale(25), height: scale(25), tintColor: '#000000', marginRight: scale(5), marginBottom: scale(5) }} source={{ uri: '礼品-(1)' }} />
            <Text style={[{ fontSize: scale(25) }, titleStyle]}>{'优惠活动'}</Text>
          </View>
          <TouchableWithoutFeedback onPress={onPressMore}>
            <Text style={[{ fontSize: scale(25) }, titleStyle]}>{'查看更多>>'}</Text>
          </TouchableWithoutFeedback>
        </View>
        <List uniqueKey={'CouponBlock'} style={[styles.listContainer, listContainerStyle]} data={coupons} renderItem={renderCoupon} removeClippedSubviews={true} />
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(15),
    paddingBottom: scale(20),
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(20),
  },
})

export default memo(CouponBlock)
