import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { scale } from '../../tools/Scale'
import { stringToFloat } from '../../tools/tars'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface ReLoadComponentProps {
  balance: string
  balanceDecimal: number
  currency?: string
  iconColor?: string
  containerStyle?: StyleProp<ViewStyle>
  size?: number
  title?: string
  balanceStyle?: StyleProp<TextStyle>
  titleStyle?: StyleProp<TextStyle>
  animatedContainerStyle?: StyleProp<ViewStyle>
  showK?: boolean
}
const ReLoadBalanceComponent = ({
  iconColor,
  containerStyle,
  size = 25,
  balance,
  title,
  balanceStyle,
  titleStyle,
  animatedContainerStyle,
  currency = '',
  showK,
  balanceDecimal,
}: ReLoadComponentProps) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))
  const reload = useRef(false)
  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const [money, setMoney] = useState(balance)

  const fetchBalance = async () => {
    try {
      const { data } = await APIRouter.user_balance_token()
      const balance = data?.data?.balance
      setMoney(balance)
      UGStore.dispatch({ type: 'merge', userInfo: { balance } })
    } catch (error) {
      console.log('-------error------', error)
    }
  }

  useEffect(() => {
    setMoney(balance)
  }, [balance])

  const moneyNumber = stringToFloat(money)
  return (
    <View style={[styles.container, containerStyle]}>
      <UGText style={[styles.title, titleStyle]}>{title}</UGText>
      <UGText style={[styles.balance, balanceStyle]} numberOfLines={1}>
        {(showK ? (moneyNumber / 1000).toFixed(balanceDecimal) + 'K' : moneyNumber.toFixed(balanceDecimal)) + currency}
      </UGText>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!reload.current) {
            reload.current = true
            fetchBalance()
            // onPress && onPress()
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start(() => {
              setSpinValue(new Animated.Value(0))
              reload.current = false
            })
          }
        }}>
        <Animated.View style={[styles.animatedContainer, animatedContainerStyle, { width: scale(size) }, { transform: [{ rotateZ: spinDeg }] }]}>
          <FontAwesome name={'refresh'} size={scale(size)} color={iconColor} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  animatedContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: scale(19) },
  balance: {
    color: '#ff861b',
    fontSize: scale(19),
    marginRight: scale(10),
  },
})

export default memo(ReLoadBalanceComponent)
