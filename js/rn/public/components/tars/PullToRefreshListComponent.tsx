import React, { useRef, useState } from 'react'
import { ActivityIndicator, Animated, Easing, FlatListProps, RefreshControl, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import List from '../../views/tars/List'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const PullToRefreshListComponent = (props: Readonly<FlatListProps<any>> & { uniqueKey: string; onReleaseToRefresh?: () => Promise<any> }) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))
  const [isRefresh, setIsRefresh] = useState(false)
  const isAnimatedFinished = useRef(false)
  const inAnimated = useRef(false)

  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <List
      {...props}
      style={{ backgroundColor: '#ffffff', flex: 1 }}
      contentInset={{ top: -50 }}
      contentOffset={{ x: 0, y: 50 }}
      ListHeaderComponent={() => (
        <View style={styles.refreshComponentContainer}>
          {isRefresh ? (
            <ActivityIndicator />
          ) : (
            <Animated.View style={{ transform: [{ rotateZ: spinDeg }], justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name={'ios-arrow-round-down'} size={40} />
            </Animated.View>
          )}
          <View style={{ width: '40%', alignItems: 'center', justifyContent: 'space-around', height: '100%', marginLeft: 10 }}>
            <UGText style={{ fontWeight: '500' }}>{isRefresh ? 'Loading...' : 'Release to refresh'}</UGText>
            <UGText style={{ fontWeight: '500' }}>{'Last update : Today 14:31'}</UGText>
          </View>
        </View>
      )}
      refreshControl={<RefreshControl tintColor={'transparent'} colors={['transparent']} refreshing={isRefresh} />}
      onScroll={(event) => {
        const y = event.nativeEvent.contentOffset.y
        if (y < 20 && !inAnimated.current) {
          console.log('------轉動畫-----')
          inAnimated.current = true
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start(({ finished }) => {
            console.log('------結束動畫-----', finished)
            if (finished) {
              isAnimatedFinished.current = true
            }
          })
        } else if (y == 50) {
          console.log('------恢復原點-------')
          setSpinValue(new Animated.Value(0))
          isAnimatedFinished.current = false
          inAnimated.current = false
        }
      }}
      onScrollEndDrag={async () => {
        if (isAnimatedFinished.current) {
          console.log('------onReleaseToRefresh-------')
          setIsRefresh(true)
          props?.onReleaseToRefresh && (await props?.onReleaseToRefresh())
          setIsRefresh(false)
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  refreshComponentContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default PullToRefreshListComponent
