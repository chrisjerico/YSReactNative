import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AppDefine from '../define/AppDefine'
import Icon from 'react-native-vector-icons/AntDesign'
import Animated, {
  block,
  Clock,
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
import useMinePage from '../hooks/tars/useMinePage'
import { api } from '../network/NetworkRequest1/NetworkRequest1'

export const TransferView = () => {
  const [money, setMoney] = useState(0)
  const mainColor = 'black'
  const [data, setData] = useState<any>()
  const [transOut, setTransOut] = useState()
  const [transIn, setTransIn] = useState()
  const { value } = useMinePage({})
  const { userInfo } = value
  const { balance } = userInfo

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await api.game.realGames().promise
    setData(data.data)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header mainColor={mainColor} pressRecord={() => {
      }} />
      <MiddleView data={data} mainColor={mainColor} balance={balance} money={money} setMoney={setMoney} transIn={transIn} transOut={transOut} setTransIn={setTransIn} setTransOut={setTransOut} />
      {data && <AccListView data={data} />}
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

const MiddleView = ({ mainColor, balance, money, setMoney, data, transIn, setTransIn, transOut, setTransOut }:
                      { mainColor: string, balance: string, money: number, setMoney: (text: string) => void }) => {
  const dataArr = [{ title: '我的钱包' }]
  return (
    <View style={{ marginHorizontal: 12, marginTop: 16, zIndex: 99 }}>
      <View style={{ zIndex: 2 }}>
        <TransferPicker key={1} text={'转出钱包'} defaultZIndex={3} data={dataArr.concat(data)} wallet={transOut} setWallet={setTransOut} />
        <TransferPicker key={2} text={'转入钱包'} defaultZIndex={2} data={dataArr.concat(data)} wallet={transIn} setWallet={setTransIn} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>转换金额</Text>
          <TextInput
            keyboardType={'numeric'}
            value={money}
            style={{
              flex: 1,
              marginLeft: 20,
              height: 38,
              borderBottomWidth: 1,
              borderBottomColor: '#d9d9d9',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onChangeText={(text) => setMoney(text)}
          />
        </View>
      </View>
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
              style={{
                marginLeft: 12,
                fontSize: 17,
                color: 'white',
                alignSelf: 'center',
              }}>{`帐号余额: ￥${balance || 0}`}</Text>
            <Icon size={20} name={'reload1'} color={'white'} style={{ marginLeft: 16 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const AccListView = ({ data }: { data: any[] }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 90 }}>
      <FlatList
        key={({item}) => `acc-${item.title}`}
        style={{ marginHorizontal: 12, marginTop: 12 }} data={data}
                renderItem={({ item }) => {
        return (
          <View style={{
            flexDirection: 'row',
            marginHorizontal: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#d9d9d9',
            alignItems: 'center',
            paddingVertical: 12,
          }}>
            <Image style={{ alignSelf: 'center', width: 24, height: 24 }} source={{ uri: item.pic }} />
            <Text style={{ fontSize: 14, paddingLeft: 16, flex: 1 }}>{item.title}</Text>
            <Text>￥*****</Text>
            <Icon size={20} name={'reload1'} color={'black'} style={{ marginLeft: 16 }} />
          </View>
        )
      }} />
    </SafeAreaView>
  )
}

const TransferPicker = ({ text, enable = true, defaultZIndex, data, wallet, setWallet }:
                          { text: string, enable?: boolean, defaultZIndex, data: any, wallet: any, setWallet: (item: any) => void }) => {
  const [open, setOpen] = useState(false)
  const [animation, setAnimation] = useState(new Value(0))
  const [zIndex, setZIndex] = useState(defaultZIndex)

  const toggleRow1Content = () => {
    if (open) {
      setAnimation(runTiming(new Clock(), new Value(250), new Value(0)))
      setOpen(false)
      setZIndex(defaultZIndex)
    } else {
      setAnimation(runTiming(new Clock(), new Value(0), new Value(250)))
      setOpen(true)
      setZIndex(99)
    }
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', zIndex }}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{text}</Text>
      <TouchableWithoutFeedback style={{}} disabled={!enable} onPress={() => toggleRow1Content()}>
        <View style={{
          flex: 1,
          marginLeft: 20,
          height: 38,
          borderBottomWidth: 1,
          borderBottomColor: '#d9d9d9',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text>{wallet ? wallet.title : ""}</Text>
          <View style={{ flex: 1 }} />
          <Icon style={{ alignSelf: 'center', transform: [{ rotateX: open ? '180deg' : '0deg' }] }} size={16}
                name={'caretdown'} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          backgroundColor: 'white',
          height: animation,
          width: '78%',
          position: 'absolute',
          top: 38,
          left: 85,
          zIndex,
          borderWidth: zIndex === 99 ? 1 : 0,
          borderColor: '#d9d9d9',
          borderRadius: 4,
        }}>
        {data &&
        <FlatList
          key={({item}) => `${item.title}`}
          data={data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => {
              setWallet(item)
              toggleRow1Content()
            }}>
              <View style={{ paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'center' }}>
                <Text>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          )} />}
      </Animated.View>
      {open != 0 && <TouchableWithoutFeedback style={{
        width: AppDefine.width,
        height: AppDefine.height,
        position: 'absolute',
        flex: 1,
        top: -180,
        left: -12,
      }} onPress={() => toggleRow1Content()}>
        <View style={{
          backgroundColor: 'rgba(0,0,0, 0.1)',
          width: AppDefine.width,
          height: AppDefine.height,
          position: 'absolute',
          flex: 1,
          top: -180,
          left: -12,
        }} />
      </TouchableWithoutFeedback>}
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
