import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { scale } from '../../tools/Scale'

interface CouponBlock {
  containerStyle?: ViewStyle | ViewStyle;
  coupons: any[];
  renderCoupon: (item: any, index: number) => any;
  onPress?: () => any;
}

const CouponBlock = ({
  containerStyle,
  coupons = [],
  renderCoupon,
  onPress,
}: CouponBlock) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.title}>
        <Text>{'優惠活動'}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text>{'查看更多>>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.couponsContainer}>{coupons?.map(renderCoupon)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  couponsContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
    alignItems: 'center',
  },
  title: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})

export default CouponBlock
