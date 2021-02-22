import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AppDefine from '../../define/AppDefine'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'
import { navigate, pop, push } from '../../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import Animated, {
  block, Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  set,
  startClock, stopClock,
  timing,
  Value,
} from 'react-native-reanimated'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import useHomePage from '../../hooks/tars/useHomePage'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { httpClient } from '../../network/httpClient'
import { PageName } from '../../navigation/Navigation'
import { showLoading, showSuccess } from '../../widget/UGLoadingCP'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const tab = [
  { title: '真人', category: 'real' },
  { title: '棋牌', category: 'card' },
  { title: '电子', category: 'game' },
  { title: '电竞', category: 'esport' },
  { title: '捕鱼', category: 'fish' },
  { title: '体育', category: 'sport' },
]

const myWallet = { title: '我的钱包', id: 0, pic: httpClient.defaults.baseURL + '/images/realtrans/real0.png', balance: 0 }
const dataArr = [myWallet]

export const TransferTKLMainView = () => {
  const [activeTab, setActiveTab] = useState(tab[0])
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
  const [updateWallet, setUpdateWallet] = useState<{ id: any, balance: string }[]>([])

  useEffect(() => {
    getData()
  }, [])

  const checkBalance = async (id) => {
    const { data } = await api.real.checkBalance(id).promise
    return data
  }

  const transfer = async () => {
    if ((!transOut || !transIn) || transOut.id === transIn.id) {
      (!transOut || !transIn) ?
        Alert.alert('请选择需要转出和转入的游戏类型') :
        Alert.alert('输入钱包和输出钱包不能一致')
    } else {
      const { data } = await api.real.manualTransfer(transOut.id, transIn.id, money).promise
      Alert.alert(data.msg)
      const update1 = transIn.id == 0 ? { data: { balance: 0 } } : await checkBalance(transIn.id)
      const update2 = transOut.id == 0 ? { data: { balance: 0 } } : await checkBalance(transOut.id)
      setUpdateWallet([{ id: transIn.id, balance: update1.data.balance }, {
        id: transOut.id,
        balance: update2.data.balance,
      }])
      UGUserModel.updateFromNetwork()
    }
  }

  const getData = async () => {
    const { data } = await api.game.realGames().promise
    setData(data.data)
  }

  const autoTransfer = async () => {
    showLoading()
    let __cnt = 0
    api.real.oneKeyTransferOut().useSuccess(({ data }) => {
      data?.games?.forEach((ele) => {
        api.real.quickTransferOut(ele?.id?.toString()).useCompletion((res, err, sm) => {
          sm.noShowErrorHUD = true
          __cnt++
          if (__cnt >= data?.games?.length) {
            showSuccess('一键提取完成')
            UGUserModel.updateFromNetwork()
            getData()
          }
        })
      })
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
    <View style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={Skin1.bgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Header pressRecord={() => push(PageName.TransferRecordView)} />
        <TabBar data={data} activeTab={activeTab} setActiveTab={(item) => {
          setActiveTab(item)
          setTransIn(undefined)
          setTransOut(undefined)
        }} />
        <View style={{ paddingHorizontal: 12, paddingTop: 16, flexDirection: 'row', zIndex: 2 }}>
          <TransferPicker
            key={1}
            text={'转出钱包:'}
            animation={animation}
            zIndex={zIndex}
            open={open}
            setOpen={setOpen}
            data={data ? dataArr.concat(data.filter((item) => item.category == activeTab.category)) : dataArr}
            wallet={transOut}
            setWallet={(wallet) => {
              setTransOut(wallet)
            }}
            onPress={() => {
              if (open) {
                setAnimation(runTiming(new Clock(), new Value(250), new Value(0)))
                setOpen(false)
                setZIndex(1)
              } else {
                setAnimation(runTiming(new Clock(), new Value(0), new Value(250)))
                setOpen(true)
                setZIndex(99)
              }
            }} />
          <TransferPicker
            key={2}
            placeholder={`请选择钱包`}
            text={'转入钱包:'}
            animation={animation2}
            zIndex={zIndex2}
            open={open2}
            setOpen={setOpen2}
            data={data ? dataArr.concat(data.filter((item) => item.category == activeTab.category)) : dataArr}
            wallet={transIn}
            setWallet={(wallet) => {
              setTransIn(wallet)
              onGreyBGPress()
            }} onPress={() => {
            if (open2) {
              setAnimation2(runTiming(new Clock(), new Value(250), new Value(0)))
              setOpen2(false)
              setZIndex2(1)
            } else {
              setAnimation2(runTiming(new Clock(), new Value(0), new Value(250)))
              setOpen2(true)
              setZIndex2(99)
            }
          }} />
        </View>
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: Skin1.textColor3,
          borderRadius: 8,
        }}>
          <View style={{
            backgroundColor: Skin1.themeColor,
            height: 38,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,

          }}>
            <UGText style={{
              fontSize: 16,
              textAlign: 'center',
              alignSelf: 'center',
              color: Skin1.isBlack ? 'white' : Skin1.textColor4,
            }}>转换金额:</UGText>
          </View>
          <TextInput
            keyboardType={'numeric'}
            value={money}
            placeholder={''}
            placeholderTextColor={Skin1.textColor2}
            style={{
              flex: 1,
              height: 38,
              alignItems: 'center',
              flexDirection: 'row',
              color: Skin1.isBlack ? 'white' : '#111',
            }}
            onChangeText={(text) => setMoney(parseFloat(text))}
          />
        </View>
        <View style={{ paddingTop: 20, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{flex: 1}} onPress={transfer}>
            <View style={{
              borderRadius: 4,
              backgroundColor: Skin1.themeDarkColor,
            }}>
              <UGText style={{
                fontSize: 17,
                color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
                alignSelf: 'center',
                paddingVertical: 10,
              }}>开始转换</UGText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 30, flex: 1}} onPress={autoTransfer}>
            <View style={{
              borderRadius: 4,
              backgroundColor: Skin1.themeDarkColor,
            }}>
              <UGText style={{
                fontSize: 17,
                color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
                alignSelf: 'center',
                paddingVertical: 10,
              }}>一键提取</UGText>
            </View>
          </TouchableOpacity>
        </View>
        {data && <AccListView data={dataArr.concat(data.filter((item) => item.category == activeTab.category))}
                              updateWallet={updateWallet} setUpdateWallet={setUpdateWallet} />}
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
      </LinearGradient>
    </View>
  )
}

const TabBar = ({ activeTab, setActiveTab, data }) => {
  useEffect(() => {})
  return (
    <View style={{ flexDirection: 'row' }}>
      {tab.map((item, index) => {
        return data && data.filter((dataItem) => dataItem.category == item.category).length > 0 ?
        (
          <TouchableWithoutFeedback key={`tab-${index}`} onPress={() => setActiveTab(item)}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: 16,
              borderColor: activeTab == item ? "#e00212" : Skin1.textColor3,
            }}>
              <UGText style={{ color: activeTab == item ? "#e00212" : Skin1.textColor3 }}>{item.title}</UGText>
            </View>
          </TouchableWithoutFeedback>
        ) : <></>
      })}
    </View>
  )
}

const Header = ({ pressRecord, setProps }: { pressRecord: () => {}, setProps: () => void }) => {
  const [show, setShow] = useState(false)
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
          <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
            <Icon size={22} name={'left'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
          </TouchableOpacity>
          <UGText style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>额度转换</UGText>
          <TouchableWithoutFeedback onPress={pressRecord}>
            <View style={{ justifyContent: 'flex-end', position: 'absolute', left: AppDefine.width - 80 }}>
              <UGText style={{ color: Skin1.isBlack ? '#fff' : Skin1.textColor4, fontSize: 18 }}>转换记录</UGText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const AccListView = ({ data, updateWallet, setUpdateWallet }: { data: any[], updateWallet: any[], setUpdateWallet: (item: { id: any, balance: string }[]) => void }) => {
  const [marginBottom, setMarginBottom] = useState(60)
  useEffect(() => {
    setMargin()
  })

  const setMargin = async () => {
    const cnt = await OCHelper.call('UGNavigationController.current.viewControllers.count')
    console.log('cnt', cnt)
    if (cnt > 1) {
      setMarginBottom(0)
    } else {
      setMarginBottom(60)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
      <FlatList
        keyExtractor={(item, index) => `acc-${index}`}
        style={{ marginHorizontal: 12, marginTop: 12, backgroundColor: 'white', borderRadius: 10, marginBottom }}
        data={data}
        renderItem={({ item }) => {
          const wallet = updateWallet.find((wallet) => wallet.id === item.id)
          return (
            <AccItem item={item} updateBalance={wallet && wallet.balance} setUpdateWallet={setUpdateWallet} />
          )
        }} />
    </SafeAreaView>
  )
}

const TransferPicker = ({ placeholder = '请选择钱包', text, animation, data, wallet, setWallet, zIndex, open, onPress }:
                          { placeholder?: string, text: string, enable?: boolean, animation: any, zIndex: number, data: any, wallet: any, setWallet: (item: any) => void, onPress: () => void }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: Skin1.textColor3,
      borderWidth: 1,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: open ? 1 : 8,
      flex: 1,
      marginHorizontal: 8,
    }}>
      <View style={{
        backgroundColor: Skin1.themeColor,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      }}>
        <UGText
          style={{ fontSize: 16, textAlign: 'center', color: Skin1.isBlack ? 'white' : Skin1.textColor4 }}>{text}</UGText>
      </View>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={{
          paddingLeft: 4,
          paddingRight: 8,
          height: 38,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <UGText
            style={{ color: wallet ? Skin1.isBlack ? 'white' : 'black' : Skin1.textColor2 }}>{wallet ? wallet.title : placeholder}</UGText>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          backgroundColor: 'white',
          height: animation,
          width: '53%',
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
              onPress()
              setWallet(item)
            }}>
              <View style={{ paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'center' }}>
                <UGText>{item ? item.title || '' : ''}</UGText>
              </View>
            </TouchableWithoutFeedback>
          )} />}
      </Animated.View>
    </View>
  )
}


const AccItem = ({ item, updateBalance, setUpdateWallet }: { item: any, updateBalance: string, setUpdateWallet: (item: { id: any, balance: string }[]) => void }) => {
  const [balance, setBalance] = useState('*****')
  const [spinValue, setSpinValue] = useState(new Value(0))
  const { info } = useHomePage({})
  const { userInfo } = info
  const { balance: userBalance } = userInfo
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    item.id == 0 && setBalance(userBalance)
  }, [userBalance])

  useEffect(() => {
    updateBalance && setBalance(updateBalance)
  }, [updateBalance])

  useEffect(() => {
    setBalance('*****')
  }, [item])

  const checkBalance = async (id) => {
    if (id == 0) {
      UGUserModel.updateFromNetwork()
    } else {
      const { data } = await api.real.checkBalance(id).promise
      data && setBalance(data.data.balance)
      setUpdateWallet([{ id, balance: data.data.balance }])
    }
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
      <UGText style={{ fontSize: 14, paddingLeft: 16, flex: 1 }}>{item.title || ''}</UGText>
      <UGText style={{ color: '#ff2019' }}>{`￥${balance}`}</UGText>
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
