import { pop, push } from '../../navigation/RootNavigation'
import React, { useEffect, useState } from 'react'
import AppDefine from '../../define/AppDefine'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { UGStore } from '../../../redux/store/UGStore'
import { useHtml5Image } from '../../../Res/icon'
import { httpClient } from '../../network/httpClient'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import useHomePage from '../../hooks/tars/useHomePage'
import Animated, { Clock, Easing, Value } from 'react-native-reanimated'
import useTransfer from '../../hooks/useTransfer'
import { PageName } from '../../navigation/Navigation'
import { TransferRecordView } from './TransferRecordView'
import { TransferLineRecordView } from './TransferLineRecordView'

const quickArr = ['全部', 100, 500, 1000, 5000, 10000]
export const TransferLineView = () => {
  const [activeWalletTab, setActiveWalletTab] = useState(tab[0])
  const [data, setData] = useState<any>()
  const [updateWallet, setUpdateWallet] = useState<{ id: any, balance: string }[]>([])
  const [animation, setAnimation] = useState(new Value(0))
  const [zIndex, setZIndex] = useState(3)
  const [animation2, setAnimation2] = useState(new Value(0))
  const [zIndex2, setZIndex2] = useState(2)
  const [transOut, setTransOut] = useState()
  const [transIn, setTransIn] = useState()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [money, setMoney] = useState<number>()
  const { info } = useHomePage({})
  const { userInfo } = info
  const { balance } = userInfo
  const [activeTab, setActiveTab] = useState(0)
  const { transfer, autoTransfer, getData, runTiming } = useTransfer()

  useEffect(() => {
    getData().then((data) => {
      setData(data)
    })
  }, [])

  const onGreyBGPress = () => {
    if (open) {
      setAnimation(runTiming(new Clock(), new Value(125), new Value(0)))
      setOpen(false)
      setZIndex(1)
    } else if (open2) {
      setAnimation2(runTiming(new Clock(), new Value(125), new Value(0)))
      setOpen2(false)
      setZIndex2(1)
    }
  }

  return (
    <View bounces={false} style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
      <View>
        <Header />
        <UserContent />
        <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />
        {(open || open2) && <TouchableWithoutFeedback style={{
          width: AppDefine.width,
          height: AppDefine.height + 150,
        }} onPress={onGreyBGPress}>
          <View style={{
            backgroundColor: 'rgba(0,0,0, 0.1)',
            width: AppDefine.width,
            height: AppDefine.height + 150,
            position: 'absolute',
          }} />
        </TouchableWithoutFeedback>}
      </View>
      {activeTab == 0 ?
        <ScrollView bounces={true} style={{ backgroundColor: '#f5f5f5', zIndex: 2 }}>
          <FlatList
            style={{ backgroundColor: '#fff' }}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => <WalletTabBar activeTab={activeWalletTab} setActiveTab={(item) => {
              setActiveWalletTab(item)
              setTransOut(undefined)
              setTransIn(undefined)
            }} data={data} />}
            numColumns={3}
            data={data ? dataArr.concat(data.filter((item) => item.category == activeWalletTab.category)) : []}
            renderItem={({ item, index }) => {
              const wallet = updateWallet.find((wallet) => wallet.id === item.id)
              return (
                <AccItem userBalance={balance} lastItem={index == data.length - 1} index={index} item={item}
                         updateBalance={wallet && wallet.balance} setUpdateWallet={setUpdateWallet} />
              )
            }}
          />
          <View style={{
            paddingHorizontal: 12,
            paddingTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}>
            <TransferPicker
              onGreyBGPress={onGreyBGPress}
              bgOpen={open2}
              key={1}
              text={'转出:'}
              animation={animation}
              zIndex={zIndex}
              open={open}
              setOpen={setOpen}
              data={data ? dataArr.concat(data.filter((item) => item.category == activeWalletTab.category)) : dataArr}
              wallet={transOut}
              setWallet={(wallet) => {
                setTransOut(wallet)
              }}
              onPress={() => {
                if (open) {
                  setAnimation(runTiming(new Clock(), new Value(125), new Value(0)))
                  setOpen(false)
                  setZIndex(1)
                } else {
                  setAnimation(runTiming(new Clock(), new Value(0), new Value(125)))
                  setOpen(true)
                  setZIndex(99)
                }
              }} />
            <TransferPicker
              onGreyBGPress={onGreyBGPress}
              bgOpen={open}
              key={2}
              placeholder={`请选择钱包`}
              text={'转入:'}
              animation={animation2}
              zIndex={zIndex2}
              open={open2}
              setOpen={setOpen2}
              data={data ? dataArr.concat(data.filter((item) => item.category == activeWalletTab.category)) : dataArr}
              wallet={transIn}
              setWallet={(wallet) => {
                setTransIn(wallet)
                onGreyBGPress()
              }} onPress={() => {
              if (open2) {
                setAnimation2(runTiming(new Clock(), new Value(125), new Value(0)))
                setOpen2(false)
                setZIndex2(1)
              } else {
                setAnimation2(runTiming(new Clock(), new Value(0), new Value(125)))
                setOpen2(true)
                setZIndex2(99)
              }
            }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 12, marginHorizontal: 12 }}>
            <View style={{
              height: 38,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text
                style={{ fontSize: 14, textAlign: 'center', color: Skin1.textColor1 }}>转入金额：</Text>
            </View>
            <View style={{
              marginLeft: 4,
              paddingLeft: 4,
              paddingRight: 15,
              height: 38,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#fff',
              width: 80,
            }}>
              <TextInput onChangeText={(text) => setMoney(parseInt(text))} keyboardType={'numeric'}
                         style={{ color: 'black', fontSize: 16, width: 80 }}>{money}</TextInput>
              <Text style={{ color: 'black', fontSize: 14, width: 80 }}>元</Text>
            </View>
          </View>
          <FlatList
            bounces={false}
            data={quickArr}
            style={{ marginTop: 12, borderTopWidth: 1, borderColor: '#eeeeee' }}
            numColumns={3}
            renderItem={({ item }) => {
              const text = typeof item == 'number' ? item + '元' : item
              return (
                <TouchableWithoutFeedback onPress={() => {
                  const money = typeof item == 'number' ? item : parseInt(balance)
                  setMoney(money)
                }}>
                  <View style={{
                    backgroundColor: '#ffffff',
                    flex: 1,
                    borderColor: '#eeeeee',
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                    <Text style={{
                      color: '#111',
                      fontSize: 13,
                    }}>{text}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          <View style={{
            paddingBottom: 130,
            paddingTop: 20,
            marginHorizontal: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => transfer(transOut, transIn, money, setUpdateWallet)}>
              <View style={{
                borderRadius: 4,
                backgroundColor: Skin1.themeDarkColor,
              }}>
                <Text style={{
                  fontSize: 17,
                  color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
                  alignSelf: 'center',
                  paddingVertical: 12,
                }}>开始转换</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 30, flex: 1 }} onPress={() => autoTransfer().then(async () => {
              const data = await getData()
              setData(data)
            })}>
              <View style={{
                borderRadius: 4,
                backgroundColor: Skin1.themeDarkColor,
              }}>
                <Text style={{
                  fontSize: 17,
                  color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
                  alignSelf: 'center',
                  paddingVertical: 12,
                }}>一键提取</Text>
              </View>
            </TouchableOpacity>
          </View>
          {(open || open2) && <TouchableWithoutFeedback style={{
            width: AppDefine.width,
            height: AppDefine.height + 150,
          }} onPress={onGreyBGPress}>
            <View style={{
              backgroundColor: 'rgba(0,0,0, 0.1)',
              width: AppDefine.width,
              height: AppDefine.height + 150,
              position: 'absolute',
            }} />
          </TouchableWithoutFeedback>}
        </ScrollView> :
        <TransferLineRecordView />
      }
    </View>
  )
}

const Header = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    AppDefine.checkHeaderShowBackButton((show) => {
      show && setShow(show)
    })
  }, [])
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
          {show && <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
            <Icon size={28} name={'left'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
          </TouchableOpacity>}
          <Text style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>额度转换</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const UserContent = () => {
  const userStore = UGStore.globalProps.userInfo
  const { avatar, isTest, usr, balance, fullName } = userStore
  const [spinValue, setSpinValue] = useState(new Value(0))
  const { getHtml5Image } = useHtml5Image()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

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

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      justifyContent: 'center',
      backgroundColor: '#fff',
    }}>
      <Image style={{ width: 70, height: 70 }}
             source={{ uri: isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar }} />
      <View style={{ justifyContent: 'center', marginLeft: 24 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, color: Skin1.isBlack ? 'white' : 'black' }}>{usr}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          animatedSpin(spinValue, setSpinValue)
          UGUserModel.updateFromNetwork()
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
            <Text style={{ color: Skin1.textColor2, fontSize: 14 }}>用户余额：</Text>
            <Text style={{ color: Skin1.themeColor, fontSize: 14 }}>{balance}</Text>
            <Text style={{ color: Skin1.textColor2, fontSize: 14 }}> RMB</Text>
            <Animated.Image
              style={{ transform: [{ rotate: spin }], height: 20, width: 20, marginLeft: 4 }}
              source={{ uri: httpClient.defaults.baseURL + '/images/icon-refresh.png' }} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
          <Text style={{ color: Skin1.textColor2, fontSize: 14 }}>真实姓名：</Text>
          <Text style={{ color: Skin1.themeColor, fontSize: 14 }}>{fullName}</Text>
        </View>
      </View>
    </View>
  )
}

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 32,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
    }}>
      <TouchableWithoutFeedback onPress={() => setActiveTab(0)}>
        <View style={{
          paddingHorizontal: 32,
          paddingVertical: 12,
          borderBottomWidth: activeTab == 0 ? 2 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: activeTab == 0 ? Skin1.themeColor : Skin1.textColor2,
        }}>
          <Text style={{
            fontSize: 14,
            color: activeTab == 0 ? Skin1.themeColor : Skin1.textColor2,
          }}>额度转换</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        setActiveTab(1)
      }}>
        <View style={{
          paddingHorizontal: 32,
          paddingVertical: 12,
          borderBottomWidth: activeTab == 1 ? 2 : 0,
          borderColor: activeTab == 1 ? Skin1.themeColor : Skin1.textColor2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text
            style={{
              fontSize: 14,
              color: activeTab == 1 ? Skin1.themeColor : Skin1.textColor2,
            }}>转换记录</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const WalletTabBar = ({ activeTab, setActiveTab, data }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
      {tab.map((item, index) => {
        return data && data.filter((dataItem) => dataItem.category == item.category).length > 0 ? (
          <TouchableWithoutFeedback key={`tab-${index}`} onPress={() => setActiveTab(item)}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: activeTab == item ? 2 : 1,
              paddingVertical: 16,
              borderColor: activeTab == item ? Skin1.themeColor : '#dddddd',
            }}>
              <Text style={{ color: activeTab == item ? Skin1.themeColor : Skin1.textColor2 }}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : <></>
      })}
    </View>
  )
}

const TransferPicker = ({ onGreyBGPress, bgOpen, placeholder = '请选择钱包', text, animation, data, wallet, setWallet, zIndex, open, onPress }:
                          { onGreyBGPress: () => void, bgOpen: boolean, placeholder?: string, text: string, enable?: boolean, animation: any, zIndex: number, data: any, wallet: any, setWallet: (item: any) => void, onPress: () => void }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 8,
    }}>
      <View style={{
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text
          style={{ fontSize: 14, textAlign: 'center', color: Skin1.textColor1 }}>{text}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => bgOpen ? onGreyBGPress() : onPress()}>
        <View style={{
          marginLeft: 4,
          paddingLeft: 4,
          paddingRight: 15,
          height: 38,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: bgOpen ? 'rgba(0,0,0, 0.1)' : '#fff',
        }}>
          <Text
            style={{
              color: wallet ? Skin1.isBlack ? 'white' : 'black' : Skin1.textColor2,
              fontSize: 18,
            }}>{wallet ? wallet.title : placeholder}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          backgroundColor: 'white',
          height: animation,
          width: '63%',
          position: 'absolute',
          top: 38,
          left: 52,
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
                <Text>{item ? item.title || '' : ''}</Text>
              </View>
            </TouchableWithoutFeedback>
          )} />}
      </Animated.View>
    </View>
  )
}

const AccItem = ({ userBalance, item, updateBalance, setUpdateWallet, index, lastItem = false }: { userBalance: any, item: any, updateBalance: string, setUpdateWallet: (item: { id: any, balance: string }[]) => void, index: number, lastItem?: boolean }) => {
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    item.id == 0 && setBalance(userBalance)
  }, [userBalance])

  useEffect(() => {
    updateBalance && setBalance(updateBalance)
  }, [updateBalance])

  useEffect(() => {
    setBalance('')
  }, [item])

  const checkBalance = async (id) => {
    setLoading(true)
    if (id == 0) {
      api.user.info().useSuccess(({ data: user }) => {
        setBalance(user.balance)
        setLoading(false)
      })
    } else {
      const { data } = await api.real.checkBalance(id).promise
      data && setBalance(data.data.balance)
      setUpdateWallet([{ id, balance: data.data.balance }])
      setLoading(false)
    }
  }

  return (
    <View style={{
      width: AppDefine.width / 3,
      borderBottomWidth: 0.5,
      borderColor: '#d9d9d9',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderLeftWidth: (lastItem && index % 3 == 0) || (index % 3 == 1) ? 0.5 : 0,
      borderRightWidth: (lastItem && index % 3 == 0) || (index % 3 == 1) ? 0.5 : 0,
    }}>
      <Text style={{ fontSize: 14 }}>{item.title || ''}</Text>
      {balance == '' ?
        loading ? <ActivityIndicator style={{ marginTop: 2 }} size={'small'} color={Skin1.themeColor} /> :
          <TouchableWithoutFeedback onPress={() => {
            checkBalance(item.id)
          }}>
            <View style={{ backgroundColor: Skin1.themeColor, borderRadius: 6, marginTop: 4 }}>
              <Text style={{ paddingVertical: 2, paddingHorizontal: 6, color: '#fff' }}>点击加载</Text>
            </View>
          </TouchableWithoutFeedback> :
        loading ? <ActivityIndicator style={{ marginTop: 2 }} size={'small'} color={Skin1.themeColor} /> :
          <TouchableWithoutFeedback onPress={() => {
            checkBalance(item.id)
          }}>
            <Text style={{ color: Skin1.textColor1, marginTop: 4 }}>{`${balance}`}</Text>
          </TouchableWithoutFeedback>
      }
    </View>
  )
}

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

