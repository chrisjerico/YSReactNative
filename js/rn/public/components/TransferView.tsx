import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AppDefine from '../define/AppDefine'
import Icon from 'react-native-vector-icons/AntDesign'
import Animated, {
  block,
  Clock, clockRunning, cond, debug,
  Easing, Extrapolate, interpolate, set, startClock, stopClock, timing, Value,
} from 'react-native-reanimated'

export const TransferView = () => {
  const [money, setMoney] = useState(0)
  const mainColor = 'black'
  const [openPicker, setOpenPicker] = useState(false)
  return (
    <View>
      <Header mainColor={mainColor} pressRecord={() => {
      }} />
      <MiddleView mainColor={mainColor} balance={0} money={money} setMoney={setMoney} openPicker={openPicker} setOpenPicker={setOpenPicker} />
      <AccListView />
{/*      <View style={{
        backgroundColor: 'rgba(0,0,0, 0.1)',
        width: AppDefine.width,
        height: AppDefine.height,
        position: 'absolute',
        flex: 1,
      }} />*/}
    </View>
  )
}

const Header = ({ mainColor, pressRecord }: { mainColor: string, pressRecord: () => {} }) => {
  return (
    <SafeAreaView style={{
      backgroundColor: mainColor,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
      flexDirection: 'row',
    }}>
      <View style={{
        width: AppDefine.width,
        backgroundColor: mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{
          flex: 1,
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: 'center',
          fontSize: 20,
          color: 'white',
        }}>额度转换</Text>
        <TouchableWithoutFeedback onPress={pressRecord}>
          <View style={{ justifyContent: 'flex-end', position: 'absolute', left: AppDefine.width - 80 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>转换纪录</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  )
}

const MiddleView = ({ mainColor, balance, money, setMoney, openPicker, setOpenPicker }:
                      { mainColor: string, balance: string, money: number, setMoney: (text: string) => void, setOpenPicker: (status: boolean) => void }) => {
  return (
    <View style={{ marginHorizontal: 12, marginTop: 16 }}>
      <TransferPicker text={'转出钱包'} zIndex={99} setOpenPicker={setOpenPicker}  />
      <TransferPicker text={'转入钱包'} zIndex={98} setOpenPicker={setOpenPicker} />
      <TransferPicker text={'转换金额'} zIndex={97} setOpenPicker={setOpenPicker} />
      <View style={{ paddingTop: 32 }}>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{ backgroundColor: mainColor, paddingVertical: 10, borderRadius: 4, height: 40 }}>
            <Text style={{ fontSize: 17, color: 'white', alignSelf: 'center' }}>开始转换</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{ backgroundColor: mainColor, paddingVertical: 10, borderRadius: 4, marginTop: 12, height: 40 }}>
            <Text style={{ fontSize: 17, color: 'white', alignSelf: 'center' }}>一键提取</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{
            backgroundColor: mainColor,
            paddingVertical: 10,
            borderRadius: 4,
            marginTop: 12,
            flexDirection: 'row',
            height: 40,
          }}>
            <Text
              style={{ marginLeft: 12, fontSize: 17, color: 'white', alignSelf: 'center' }}>{`帐号余额: ￥${balance}`}</Text>
            <Icon size={20} name={'reload1'} color={'white'} style={{ marginLeft: 16 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const AccListView = () => {
  return (
    <FlatList style={{ marginHorizontal: 12, marginTop: 12 }} data={[1, 2, 3, 4, 5, 6]} renderItem={() => (
      <View style={{
        flexDirection: 'row',
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        alignItems: 'center',
        paddingVertical: 12,
      }}>
        <Icon style={{ alignSelf: 'center' }} size={24} name={'caretdown'} />
        <Text style={{ fontSize: 14, paddingLeft: 16, flex: 1 }}>MG电子</Text>
        <Text>￥*****</Text>
        <Icon size={20} name={'reload1'} color={'black'} style={{ marginLeft: 16 }} />
      </View>
    )} />
  )
}

const TransferPicker = ({ text, zIndex, setOpenPicker, openPicker }: { text: string, zIndex: number, setOpenPicker: (status: boolean) => void, openPicker: boolean }) => {
  const [open, setOpen] = useState(false)
  const [animation, setAnimation] = useState(new Value(0))
  const toggleRow1Content = () => {
    if (open) {
      setAnimation(runTiming(new Clock(), new Value(250), new Value(0)))
      setOpen(false)
    } else {
      setAnimation(runTiming(new Clock(), new Value(0), new Value(250)))
      setOpen(true)
    }
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', zIndex }}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{text}</Text>
      {/*{open && <View style={{*/}
      {/*  backgroundColor: 'rgba(0,0,0, 0.1)',*/}
      {/*  width: AppDefine.width,*/}
      {/*  height: AppDefine.height,*/}
      {/*  position: 'absolute',*/}
      {/*  flex: 1,*/}
      {/*  zIndex: 98,*/}
      {/*  top: 0-180,*/}
      {/*  left: 0-12*/}
      {/*}} />}*/}
      <TouchableWithoutFeedback style={{zIndex: 99}} onPress={() => toggleRow1Content()}>
        <View style={{
          flex: 1,
          marginLeft: 20,
          height: 38,
          borderBottomWidth: 1,
          borderBottomColor: '#d9d9d9',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <View style={{ flex: 1 }} />
          <Icon style={{ alignSelf: 'center' }} size={16} name={'caretdown'} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{ backgroundColor: 'red', height: animation, width: '78%', position: 'absolute', top: 38, left: 85, zIndex: 99 }} />
    </View>
  )
}

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 500,
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
