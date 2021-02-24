import React, {useRef, useState, useEffect} from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  View,
  Text,
  TextStyle,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {scale} from '../../tools/Scale'
import APIRouter from '../../network/APIRouter'
import {UGStore} from '../../../redux/store/UGStore'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface ReLoadComponentProps {
  color?: string;
  containerStyle?: ViewStyle;
  size?: number;
  balance: number | string;
  title?: string;
  titleHint?: string;
  balanceStyle?: TextStyle | TextStyle[];
  titleStyle?: TextStyle | TextStyle[];
  titleHintStyle?: TextStyle | TextStyle[];
  animatedContainerStyle?: ViewStyle | ViewStyle[];
}

const ReLoadBalanceComponent = ({
                                  color,
                                  containerStyle,
                                  size = 25,
                                  balance,
                                  title,
                                  titleHint,
                                  balanceStyle,
                                  titleStyle,
                                  titleHintStyle,
                                  animatedContainerStyle
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
      const {data} = await APIRouter.user_balance_token()
      const balance = data?.data?.balance
      //console.log("-------balance-----", balance)
      setMoney(balance)
      UGStore.dispatch({type: 'merge', userInfo: {balance}})
    } catch (error) {
      //console.log("-------error------", error)
    }
  }

  useEffect(() => {
    setMoney(balance)
  }, [balance])

  return (
    <View style={[styles.container, containerStyle]}>
      <UGText style={[styles.title, titleStyle]}>{title}</UGText>
      <UGText style={[styles.balance, balanceStyle]} numberOfLines={1}>
        {money}
      </UGText>
      <UGText style={[styles.titleHint, titleHintStyle]}>{titleHint}</UGText>
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
        }}
      >
        <Animated.View
          style={[
            styles.animatedContainer,
            animatedContainerStyle,
            {width: scale(size)},
            {transform: [{rotateZ: spinDeg}]},
          ]}
        >
          <FontAwesome name={'refresh'} size={scale(size)} color={color}/>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  animatedContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: scale(2)
  },
  title: {
    fontSize: scale(19)
  },
  titleHint: {
    color: '#ff861b',
    fontSize: scale(19),
    marginLeft: scale(6),
    marginRight: scale(12)
  },
  balance: {
    color: '#ff861b',
    fontSize: scale(19),
  },
})

export default ReLoadBalanceComponent
