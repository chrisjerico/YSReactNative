import React, { memo, useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { img_assets } from '../../../Res/icon'
import { scale } from '../../tools/Scale'
import List from './List'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface CouponBlock {
  coupons: any[]
  renderCoupon: ({ item: any, index: number }) => any
  onPressMore: () => any
  visible: boolean
  containerStyle?: StyleProp<ViewStyle>
  listContainerStyle?: StyleProp<ViewStyle>
  titleContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  c_ref?: {
    reRenderCoupon: () => void
  }
}

const CouponBlock = ({ visible, containerStyle, coupons = [], renderCoupon, onPressMore, listContainerStyle, titleContainerStyle, titleStyle, c_ref }: CouponBlock) => {

  const [, setState] = useState({})
  useEffect(() => {
    c_ref && (c_ref.reRenderCoupon = () => {
      setState({})
    })
  }, [c_ref])

  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: scale(25), height: scale(25), tintColor: '#000000', marginRight: scale(5), marginBottom: scale(5) }} source={{ uri: img_assets('礼品-(1)') }} />
            <Text style={[{ fontSize: scale(25) }, titleStyle]}>{'优惠活动'}</Text>
          </View>
          <TouchableWithoutFeedback onPress={onPressMore}>
            <UGText style={[{ fontSize: scale(25) }, titleStyle]}>{'查看更多>>'}</UGText>
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
  container: {},
  listContainer: {
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
