import React, { memo, useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Skin1 } from '../../theme/UGSkinManagers'
import AppDefine from '../../define/AppDefine'
import { navigate, pop } from '../../navigation/RootNavigation'
import LinearGradient from 'react-native-linear-gradient'
import { httpClient } from '../../network/httpClient'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import { PageName } from '../../navigation/Navigation'

interface Yuebao {
  annualizedRate: string
  yuebaoName: string
  balance: string
  intro: string
  giftBalance: string
  lastSettleTime: string
  maxTransferOutMoneyTransferInMoney: string
  monthProfit: string
  todayProfit: string
  totalProfit: string
  weekProfit: string
}

export const AlipayView = ({ setProps }) => {
  const [yuebao, setYuebao] = useState<Yuebao>()
  const [showMoneyImg, setShowMoneyImg] = useState(false)
  useEffect(() => {
    getYuebao()
  }, [])

  useEffect(() => {
    const interval = showMoneyImg && setInterval(() => {
      setShowMoneyImg(false)
      clearInterval(interval)
    }, 1000)
  }, [showMoneyImg])

  const getYuebao = () => {
    api.yuebao.stat().promise.then(({ data }) => {
      data && setYuebao(data.data as Yuebao)
    })
  }

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Header setShowMoneyImg={setShowMoneyImg} setProps={setProps} name={yuebao?.yuebaoName} getYuebao={getYuebao} />
      <View style={{ alignItems: 'center', marginTop: 24 }}>
        <Text style={{ color: Skin1.textColor2 }}>今日收益(元)</Text>
        <Text style={{ marginTop: 16, fontSize: 30 }}>{yuebao?.todayProfit || 0}</Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Text style={{ color: Skin1.textColor2 }}>{yuebao?.yuebaoName || ''}余额：</Text>
          <Text style={{ color: '#fb4f48' }}>{`${yuebao?.balance || 0.0000000000}元`}</Text>
          <Text style={{ color: Skin1.textColor2 }}>,年化率：</Text>
          <Text style={{ color: '#fb4f48' }}>{`${yuebao ? yuebao?.annualizedRate * 100 : 0} %`}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Text style={{ color: Skin1.textColor2 }}>体验金：</Text>
          <Text style={{ color: '#fb4f48' }}>{`${yuebao?.giftBalance || 0.00}元`}</Text>
        </View>
      </View>
      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eeeeee', marginTop: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: '#eeeeee',
              flex: 1,
              paddingVertical: 40,
              height: 147,
            }}>
            <Text style={{
              fontSize: 18,
              color: '#111111',
            }}>{yuebao?.weekProfit ? yuebao?.weekProfit : 0}</Text>
            <Text style={{ fontSize: 14, marginTop: 20, color: Skin1.textColor2 }}>本周收益</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: '#eeeeee',
              flex: 1,
              paddingVertical: 40,
              height: 147,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#111111',
              }}>{yuebao?.monthProfit ? yuebao?.monthProfit : 0}</Text>
            <Text style={{ fontSize: 14, marginTop: 20, color: Skin1.textColor2 }}>本月收益</Text>
          </View>
          <View style={{ alignItems: 'center', flex: 1, paddingVertical: 40, height: 147 }}>
            <Text
              style={{
                fontSize: 18,
                color: '#111111',
              }}>{yuebao?.totalProfit ? yuebao?.totalProfit : 0}</Text>
            <Text style={{ fontSize: 14, marginTop: 20, color: Skin1.textColor2 }}>总收益</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
          <TouchableWithoutFeedback onPress={() => navigate(PageName.AlipayTransferView, { getYuebao, yuebao })}>
            <View
              style={{
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: '#eeeeee',
                flex: 1,
                paddingVertical: 40,
              }}>
              <Image style={{ width: 36, height: 36 }}
                     source={{ uri: httpClient.defaults.baseURL + '/images/edzrzc.png' }} />
              <Text style={{ fontSize: 14, marginTop: 16, color: Skin1.textColor2 }}>额度转入转出</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigate(PageName.AlipayProfitView)}>
            <View
              style={{
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: '#eeeeee',
                flex: 1,
                paddingVertical: 40,
                height: 147,
              }}>
              <Image style={{ width: 36, height: 36 }}
                     source={{ uri: httpClient.defaults.baseURL + '/images/sybb.png' }} />
              <Text style={{ fontSize: 14, marginTop: 16, color: Skin1.textColor2 }}>收益报表</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigate(PageName.AlipayTransferRecordView)}>
            <View style={{ alignItems: 'center', flex: 1, paddingVertical: 40, height: 114 }}>
              <Image style={{ width: 36, height: 36 }}
                     source={{ uri: httpClient.defaults.baseURL + '/images/zrzcjl.png' }} />
              <Text style={{ fontSize: 14, marginTop: 16, color: Skin1.textColor2 }}>转入转出记录</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{
        borderColor: Skin1.isBlack ? '#fff' : '#928c8c',
        borderWidth: 0.5,
        width: 300,
        padding: 16,
        alignSelf: 'center',
        marginTop: 28,
      }}>
        <Text
          style={{ color: '#f14b47' }}>
          {yuebao?.intro || '利息宝上线了，欢迎大家试用！ 1、复利结算，利滚利，收益更高。 2、结算快，每分钟结算一次，存入即开始收益。\n' + '3、转入转出无限制，随时随地享收益11。'}</Text>
      </View>
      {showMoneyImg && <Image style={{ width: 400, height: 400, position: 'absolute', top: AppDefine.height / 5 }}
                              source={{ uri: httpClient.defaults.baseURL + '/images/yuebaoMoney.png' }} />}
    </View>
  )
}


const Header = ({ setProps, name, setShowMoneyImg, getYuebao }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    AppDefine.checkHeaderShowBackButton((show) => {
      show && setShow(show)
      setProps()
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
          {show &&
          <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20, zIndex: 2 }} onPress={() => pop()}>
            <Icon size={28} name={'home'} color={Skin1.isBlack ? '#fff' : '#111'} />
          </TouchableOpacity>}
          <Text style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            flex: 1,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>{name || ``}</Text>
          <View style={{ position: 'absolute', right: 12 }}>
            <UrgeWithPleasureComponent  setShowMoneyImg={() => {
              getYuebao()
              setShowMoneyImg()
            }} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const UrgeWithPleasureComponent = memo(({ setShowMoneyImg }) => (
  <CountdownCircleTimer
    isPlaying
    duration={60}
    size={35}
    strokeWidth={4}
    colors={[
      ['#4352f2', 0.4],
      ['#F7B801', 0.4],
      ['#fb4f48', 0.2],
    ]}
    onComplete={() => {
      setShowMoneyImg(true)
      return [true, 1000]
    }}
  >
    {({ remainingTime, animatedColor }) => (
      <Text>{remainingTime}</Text>
    )}
  </CountdownCircleTimer>
))
