import { Dimensions, Image, ImageStyle, StyleProp, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import PushHelper from '../../../../public/define/PushHelper'
import { UGUserCenterType } from '../../../../redux/model/全局/UGSysConfModel'
import useMemberItems from '../../../../public/hooks/useMemberItems'
import { UGStore } from '../../../../redux/store/UGStore'
import { httpClient } from '../../../../public/network/httpClient'
import Animated, {
  block,
  clockRunning,
  cond,
  debug,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from 'react-native-reanimated'
import UGUserModel from '../../../../redux/model/全局/UGUserModel'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const CardView = () => {
  const userStore = UGStore.globalProps.userInfo
  const { balance, fullName, curLevelGrade, usr } = userStore
  const [showBalance, setShowBalance] = useState(true)
  const [LXBItem, setLXBItem] = useState<any>()
  const { UGUserCenterItem } = useMemberItems()
  const [spinValue, setSpinValue] = useState(new Value(0))

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    UGUserCenterItem && setLXBItem(UGUserCenterItem.find((item) => item.name == '利息宝'))
  }, [UGUserCenterItem])

  return (
    <View style={{ height: 300, width: Dimensions.get('screen').width }}>
      <Image
        style={{
          width: Dimensions.get('screen').width,
          height: '90%',
          resizeMode: 'stretch',
          position: 'absolute',
        }}
        source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/assetsBoxbg.png' }}
      />
      <View style={{ paddingTop: 12 }}>
        <View style={{ paddingLeft: 50, paddingRight: 30, paddingTop: 10, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <UGText style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{usr}</UGText>
            <View
              style={{ height: 22, marginLeft: 8, backgroundColor: '#84C1FF', borderRadius: 10, alignSelf: 'center' }}>
              <UGText style={{
                color: '#ffffff',
                fontWeight: 'bold',
                paddingVertical: 2,
                paddingHorizontal: 6,
              }}>{curLevelGrade}</UGText>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableWithoutFeedback style={{ alignItems: 'flex-end' }} onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
            }}>
              <Image style={{ width: 84, height: 22, resizeMode: 'stretch' }}
                     source={{ uri: httpClient.defaults.baseURL + '/static/vuePublic/images/my/userInfo/missionhall.png' }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{ alignItems: 'flex-end' }} onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
            }}>
              <Image style={{ width: 84, height: 22, resizeMode: 'stretch', marginTop: 8 }}
                     source={{ uri: httpClient.defaults.baseURL + '/static/vuePublic/images/my/userInfo/dailysign.png' }} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ paddingHorizontal: 50, flexDirection: 'row' }}>
          <UGText style={{ color: '#65727B', alignSelf: 'center', marginRight: 10 }}>余额 : </UGText>
          <TouchableWithoutFeedback onPress={() => setShowBalance(!showBalance)}>
            {showBalance ? <Image source={{
                width: 22,
                height: 22,
                uri: httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/moneyicon.png',
              }} /> :
              <Image source={{
                width: 22,
                height: 22,
                uri: httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/moneyhideicon.png',
              }} />}
          </TouchableWithoutFeedback>
        </View>
        <View style={{ paddingHorizontal: 50, paddingTop: 2, flexDirection: 'row', alignItems: 'center' }}>
          {showBalance ? <UGText style={{
            fontSize: 18,
            paddingRight: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            lineHeight: 36,
          }}>{`${balance} RMB`}</UGText> : <UGText style={{
            fontSize: 30,
            paddingRight: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            lineHeight: 36,
            top: 5,
          }}>
            * * * *
          </UGText>}
          {showBalance &&
          <TouchableWithoutFeedback onPress={() => {
            animatedSpin(spinValue, setSpinValue)
            UGUserModel.updateFromNetwork()
          }}>
            <Animated.Image
              style={{ transform: [{ rotate: spin }], height: 20, width: 20 }}
              source={{ uri: 'shuaxindef' }} />
          </TouchableWithoutFeedback>
          }
        </View>
        <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center' }}>
          <CardButton
            uri={httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/deposit.png'}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.存款)
            }} text={'存款'} />
          <View style={{ backgroundColor: '#9d9d9d', height: 40, width: 1 }} />
          <CardButton
            onPress={() => {
              LXBItem && PushHelper.pushUserCenterType(LXBItem.code)
            }}
            imgStyle={{ height: 39 }}
            uri={httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/bet.png'}
            text={'利息宝'}
          />
          <View style={{ backgroundColor: '#9d9d9d', height: 40, width: 1 }} />
          <CardButton
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.取款)
            }}
            uri={httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/withdraw.png'}
            text={'提现'} />
        </View>
      </View>
    </View>
  )
}

const CardButton = ({ uri, text, imgStyle, onPress }: { uri: string, text: string, imgStyle?: StyleProp<ImageStyle>, onPress: () => void }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ alignItems: 'center', flex: 1 / 3, height: '100%' }}>
        <View style={{ height: 39, justifyContent: 'center' }}>
          <Image style={[{ width: 39, height: 30, resizeMode: 'cover' }, imgStyle]}
                 source={{ uri }} />
        </View>
        <View style={{ flex: 1 }} />
        <UGText style={{ marginTop: 12 }}>{text}</UGText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const animatedSpin = (spinValue, setSpinValue) => {
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear, // Easing is an additional import from react-native
    },
  ).start(() => {
    setSpinValue(new Value(0))
  })
}

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 250,
    toValue: dest,
    easing: Easing.inOut(Easing.cubic),
  }

  return block([

    cond(clockRunning(clock), 0, [

      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ])
}
