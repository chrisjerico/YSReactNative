import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { scale } from '../../tools/Scale'

interface CouponBlock {
  containerStyle?: ViewStyle | ViewStyle[];
  coupons: any[];
  renderCoupon: (item: any, index: number) => any;
  onPressMore: () => any;
  visible: boolean;
}

const CouponBlock = ({
  visible,
  containerStyle,
  coupons = [],
  renderCoupon,
  onPressMore,
}: CouponBlock) => {
  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.titleContainer}>
          <Text>{'优惠活动'}</Text>
          <TouchableWithoutFeedback onPress={onPressMore}>
            <Text>{'查看更多>>'}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.couponsContainer}>{coupons?.map(renderCoupon)}</View>
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
  couponsContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
    alignItems: 'center',
    paddingBottom: scale(20)
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: scale(20),
  },
})

export default CouponBlock
