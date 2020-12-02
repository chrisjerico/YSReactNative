import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image, Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AppDefine from '../define/AppDefine'
import Icon from 'react-native-vector-icons/AntDesign'
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing, interpolate,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from 'react-native-reanimated'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import useHomePage from '../hooks/tars/useHomePage'
import { navigate, pop } from '../navigation/RootNavigation'
import { PageName } from '../navigation/Navigation'
import { Skin1 } from '../theme/UGSkinManagers'
import { OCHelper } from '../define/OCHelper/OCHelper'
import LinearGradient from 'react-native-linear-gradient'
import { httpClient } from '../network/httpClient'
import App from 'react-native-safe-area-context/lib/typescript/example/App'

export const TransferView = () => {
  const [money, setMoney] = useState(0)
  const [data, setData] = useState<any>()
  const [transOut, setTransOut] = useState()
  const [transIn, setTransIn] = useState()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [animation, setAnimation] = useState(new Value(0))
  const [zIndex, setZIndex] = useState(3)
  const [animation2, setAnimation2] = useState(new Value(0))
  const [zIndex2, setZIndex2] = useState(2)
  const [spinValue, setSpinValue] = useState(new Value(0))
  const { value, refresh } = useHomePage({})
  const { userInfo } = value
  const { balance } = userInfo
  const dataArr = [{ title: '我的钱包', id: 0 }]

  useEffect(() => {
    getData()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const getData = async () => {
    const { data } = await api.game.realGames().promise
    setData(data.data)
  }

  const transfer = async () => {
    if ((!transOut || !transIn) || transOut.id === transIn.id) {
      Alert.alert('输入钱包和输出钱包不能一制' )
    } else {
      const { data } = await api.real.manualTransfer(transOut.id, transIn.id, money).promise
      Alert.alert(data.msg)
    }
  }

  const autoTransfer = async () => {
    api.real.autoTransferOut().setCompletionBlock((data) => {
      Alert.alert(data.msg)
    })
  }

  const onGreyBGPress = () => {
    if (open) {
      setAnimation(runTiming(new Clock(), new Value(250), new Value(0)))
      setOpen(false)
      setZIndex(3)
    } else if (open2) {
      setAnimation2(runTiming(new Clock(), new Value(250), new Value(0)))
      setOpen2(false)
      setZIndex2(2)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Skin1.bgColor }}>
      <Header pressRecord={() => navigate(PageName.TransferRecordView)} />
      <LinearGradient style={{ paddingHorizontal: 12, paddingTop: 16, zIndex: 2 }} colors={Skin1.bgColor}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}>
        <TransferPicker
          key={1}
          text={'转出钱包'}
          animation={animation}
          defaultZIndex={3}
          zIndex={zIndex}
          open={open}
          setOpen={setOpen}
          data={dataArr.concat(data)} wallet={transOut}
          setWallet={(wallet) => {
            setTransOut(wallet)
            onGreyBGPress()
          }}
          onPress={() => {
            if (open) {
              setAnimation(runTiming(new Clock(), new Value(250), new Value(0)))
              setOpen(false)
              setZIndex(3)
            } else {
              setAnimation(runTiming(new Clock(), new Value(0), new Value(250)))
              setOpen(true)
              setZIndex(99)
            }
          }} />
        <TransferPicker
          key={2}
          text={'转入钱包'}
          animation={animation2}
          defaultZIndex={2}
          zIndex={zIndex2}
          open={open}
          setOpen={setOpen}
          data={dataArr.concat(data)}
          wallet={transIn}
          setWallet={(wallet) => {
            setTransIn(wallet)
            onGreyBGPress()
          }} onPress={() => {
          if (open2) {
            setAnimation2(runTiming(new Clock(), new Value(250), new Value(0)))
            setOpen2(false)
            setZIndex2(2)
          } else {
            setAnimation2(runTiming(new Clock(), new Value(0), new Value(250)))
            setOpen2(true)
            setZIndex2(99)
          }
        }} />
        {(open || open2) && <TouchableWithoutFeedback style={{
          width: AppDefine.width,
          height: AppDefine.height,
          position: 'absolute',
          zIndex: 4,
        }} onPress={onGreyBGPress}>
          <View style={{
            zIndex: 4,
            backgroundColor: 'rgba(0,0,0, 0.1)',
            width: AppDefine.width,
            height: AppDefine.height,
            position: 'absolute',
          }} />
        </TouchableWithoutFeedback>}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>转换金额</Text>
          <TextInput
            keyboardType={'numeric'}
            value={money}
            placeholder={'请输入金额'}
            placeholderTextColor={Skin1.textColor2}
            style={{
              flex: 1,
              marginLeft: 20,
              height: 38,
              borderBottomWidth: 1,
              borderBottomColor: Skin1.textColor3,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onChangeText={(text) => setMoney(parseFloat(text))}
          />
        </View>
        <View style={{ paddingTop: 32 }}>
          <TouchableWithoutFeedback onPress={transfer}>
            <View style={{
              borderRadius: 4,
            }}>
              <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={{
                  fontSize: 17,
                  color: Skin1.textColor4,
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}>开始转换</Text>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={autoTransfer}>
            <View style={{
              borderRadius: 4,
              marginTop: 12,
            }}>
              <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={{
                  fontSize: 17,
                  color: Skin1.textColor4,
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}>一键提取</Text>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            animatedSpin(spinValue, setSpinValue)
            refresh()
          }}>
            <View style={{
              borderRadius: 4,
              marginTop: 12,
            }}>
              <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={{
                  flexDirection: 'row', paddingVertical: 10,
                }}>
                  <Text
                    style={{
                      marginLeft: 12,
                      fontSize: 17,
                      color: Skin1.textColor1,
                      alignSelf: 'center',
                    }}>{`帐号余额: ￥${balance || 0}`}</Text>
                  <Animated.Image
                    style={{ transform: [{ rotate: spin }], height: 20, width: 20, marginLeft: 16 }}
                    source={{ uri: 'shuaxindef' }} />
                </View>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
      {data && <AccListView data={data} />}
      {(open || open2) && <TouchableWithoutFeedback style={{
        width: AppDefine.width,
        height: AppDefine.height,
        position: 'absolute',
      }} onPress={onGreyBGPress}>
        <View style={{
          backgroundColor: 'rgba(0,0,0, 0.1)',
          width: AppDefine.width,
          height: AppDefine.height,
          position: 'absolute',
        }} />
      </TouchableWithoutFeedback>}
    </View>
  )
}

const Header = ({ pressRecord }: { pressRecord: () => {} }) => {
  return (
    <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{
        flexDirection: 'row',
      }}>
        <View style={{
          width: AppDefine.width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => {
            switch (Platform.OS) {
              case 'ios':
                OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true])
                break
              case 'android':

                break
            }
            pop()
          }}>
            <Icon size={28} name={'left'} color={Skin1.textColor4} />
          </TouchableOpacity>
          <Text style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: Skin1.textColor4,
          }}>额度转换</Text>
          <TouchableWithoutFeedback onPress={pressRecord}>
            <View style={{ justifyContent: 'flex-end', position: 'absolute', left: AppDefine.width - 80 }}>
              <Text style={{ color: Skin1.textColor4, fontSize: 18 }}>转换纪录</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const AccListView = ({ data }: { data: any[] }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={Skin1.bgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => `acc-${index}`}
          style={{ marginHorizontal: 12, marginTop: 12, backgroundColor: 'white', borderRadius: 10, marginBottom: 60 }}
          data={data}
          renderItem={({ item }) => {
            return (
              <AccItem item={item} />
            )
          }} />
      </SafeAreaView>
    </LinearGradient>
  )
}

const TransferPicker = ({ text, animation, data, wallet, setWallet, zIndex, open, onPress }:
                          { text: string, enable?: boolean, animation: any, defaultZIndex, zIndex, data: any, wallet: any, setWallet: (item: any) => void, onPress: () => void }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', zIndex }}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{text}</Text>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={{
          flex: 1,
          marginLeft: 20,
          height: 38,
          borderBottomWidth: 1,
          borderBottomColor: Skin1.textColor3,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{ color: !wallet ? Skin1.textColor2 : 'black' }}>{wallet ? wallet.title : '请选择钱包'}</Text>
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
          keyExtractor={(item, index) => `${text}-item-${index}`}
          data={data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => {
              setWallet(item)
            }}>
              <View style={{ paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'center' }}>
                <Text>{item ? item.title || '' : ''}</Text>
              </View>
            </TouchableWithoutFeedback>
          )} />}
      </Animated.View>
    </View>
  )
}

const AccItem = ({ item }: {item: any}) => {
  const [balance, setBalance] = useState("*****")
  const [spinValue, setSpinValue] = useState(new Value(0))
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const checkBalance = async (id) => {
    const {data} = await api.real.checkBalance(id).promise
    data && setBalance(data.data.balance)
  }
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
      <Text style={{ fontSize: 14, paddingLeft: 16, flex: 1 }}>{item.title || ''}</Text>
      <Text style={{color: "#F75000"}}>{`￥${balance}`}</Text>
      <TouchableWithoutFeedback onPress={() => {
        animatedSpin(spinValue, setSpinValue)
        checkBalance(item.id)
      }}>
        <Animated.Image
          style={{ transform: [{ rotate: spin }], height: 20, width: 20, marginLeft: 16 }}
          source={{ uri: 'shuaxindef' }} />
      </TouchableWithoutFeedback>
    </View>
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
