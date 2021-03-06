import React, { useEffect, useRef, useState } from "react"
import { View, Text, } from "react-native"
import { Button, ButtonGroup, Input } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { FlatList, TextInput, TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SegmentedControl from "rn-segmented-control"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PushNotificationIOS } from "../../../../rn/public/moudules/DynamicallyLoadModules"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { payType } from "../../../publicClass/network/api/api_order"
import { doyApi } from "../../../publicClass/network/DoyApi"
import buyList from "../../../publicClass/network/model/order/buyList"
import { DoyButton1, DoyText12, DoyText13, DoyText14, DoyText16 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyStarCP } from "../../我的/个人资料/cp/DoyStarCP"

const sc = sc375
const tipsBarColos = ['#FFEDD4', '#FAE4CF']

interface DoyWantBuyVars {
  buyList?: buyList
  num?: string
  payType?: payType
  notificationAuth?: boolean// 是否已开启通知权限
}

export const DoyWantBuyPage = ({ setProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1
  const [segmentedIndex, setSegmentedIndex] = useState(0)
  const { current: v } = useRef<DoyWantBuyVars>({})

  useEffect(() => {
    setProps({ navbarOpstions: { title: '我要买' } })
    requestData()

    // 是否已开启通知权限
    PushNotificationIOS?.checkPermissions((permissions) => {
      const { lockScreen, notificationCenter, alert } = permissions
      v.notificationAuth = lockScreen || notificationCenter || alert
    })
  }, [])


  // 请求数据
  const requestData = () => {
    const payType = segmentedIndex + 1
    doyApi.order.buyList(payType, v.num,).useSuccess(({ data }) => {
      v.buyList = data
      v.payType = payType
      setProps()
    })
  }

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <SegmentedControl
        tabs={['银行卡', '支付宝', '微信支付']}
        onChange={(idx) => {
          setSegmentedIndex(idx)
        }}
        currentIndex={segmentedIndex}
        segmentedControlBackgroundColor='#1052BE'
        activeSegmentBackgroundColor='#3B7FF1'
        width={AppDefine.width - sc(32)}
        containerStyle={{ height: sc(38), }}
        textStyle={{
          fontWeight: "500",
          fontSize: 14,
        }}
        theme={'DARK'}
      />
      <DoyText14 white bold1 style={{ marginTop: sc(24), }}>输入DOY数量</DoyText14>
      <TextInput placeholder='范围100~10000 DOY' placeholderTextColor='#FFFFFF99' clearButtonMode='while-editing'
        style={{ marginTop: sc(12), height: sc(46), borderRadius: sc(4), backgroundColor: '#1052BE', paddingHorizontal: sc(16), fontSize: sc(15), color: 'white', fontWeight: '700' }}
        onChangeText={(text) => {
          v.num = text
        }}
      />
      <DoyButton1 title='开始搜寻' containerStyle={{ marginTop: sc(24), marginBottom: sc(5) }} buttonStyle={{ height: sc(40) }} titleStyle={{ color: themeColor }} linearGradientProps={{
        colors: ['#E0EBFF', '#fff'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      }} onPress={requestData} />
    </LinearGradient>
    <View style={{ flex: 1 }}>
      {/* 正在搜索 */}
      <LinearGradient colors={tipsBarColos} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flexDirection: 'row', height: sc(36), paddingHorizontal: sc(16), alignItems: 'center' }}>
        <FastImage source={{ uri: img_doy('卖单通知@3x') }} style={{ width: sc(15), aspectRatio: 1 }} resizeMode='contain' />
        <DoyText12 style={{ marginLeft: sc(8), }}>等待</DoyText12>
        <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), height: sc(14), marginHorizontal: sc(4) }} />
        <DoyText13 bold3 style={{ marginTop: sc(1), }}>100</DoyText13>
        <DoyText12>、银行卡卖单通知。</DoyText12>
        <View style={{ flex: 1 }} />
        <DoyText12 bold3 gray1 style={{ marginTop: sc(1), }}>29:50</DoyText12>
        <TouchableOpacity style={{ paddingHorizontal: sc(8), marginRight: sc(-7), justifyContent: 'center' }}>
          <FontAwesome name='close' size={sc(10)} color='#FAE4CF' style={{ width: sc(16), aspectRatio: 1, backgroundColor: '#52575A', paddingTop: sc(2), paddingLeft: sc(4), borderRadius: sc(8), overflow: 'hidden' }} />
        </TouchableOpacity>
      </LinearGradient>
      {/* 搜索结果 */}
      <FlatList data={v.buyList?.list} style={{ padding: sc(16), flex: 1 }} renderItem={({ item, index }) => {
        const { amount, creditGrade } = item
        let icon = ''
        v.payType == payType?.银行卡 && (icon = img_doy('收付款方式/银行卡@3x'))
        v.payType == payType?.支付宝 && (icon = img_doy('收付款方式/支付宝@3x'))
        v.payType == payType?.微信 && (icon = img_doy('收付款方式/微信@3x'))

        return <TouchableOpacity style={{ height: sc(48), marginBottom: sc(8), backgroundColor: 'white', borderRadius: sc(4), flexDirection: 'row', alignItems: 'center', paddingHorizontal: sc(16) }} onPress={() => {
          push(PageName.DoySellOrderPage)
        }}>
          <DoyText14 style={{ marginLeft: sc(8), }}>售</DoyText14>
          <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(14), aspectRatio: 1, marginHorizontal: sc(8) }} />
          <DoyText16 bold2>{amount}</DoyText16>
          <View style={{ flex: 1 }} />
          <FastImage source={{ uri: icon }} style={{ width: sc(16), aspectRatio: 1, marginRight: sc(32) }} />
          <DoyStarCP selectedStarCnt={creditGrade} containerStyle={{ marginRight: sc(32) }} />
          <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(6), aspectRatio: 6 / 10, }} />
        </TouchableOpacity>
      }} />
      {/* 搜索无结果 */}
      {!v?.buyList?.list?.length && <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <FastImage source={{ uri: img_doy('暂无符合卖单@3x') }} style={{ width: sc(234), height: sc(156) }} />
        <DoyText14 gray2 style={{ textAlign: 'center', lineHeight: sc(20) }}>{`暂无符合卖单
开启通知后，有符合卖单会及时通知您`
        }
        </DoyText14>
        {PushNotificationIOS && <Button title={v.notificationAuth ? '已开启' : '开启通知'} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '700' }} buttonStyle={{ backgroundColor: 'transparent', paddingVertical: sc(16) }} onPress={() => {
          if (v.notificationAuth) return
          // 请求iOS的通知权限
          PushNotificationIOS?.requestPermissions({ lockScreen: true, notificationCenter: true, alert: true, sound: true, badge: true }).then((permissions) => {
            const { lockScreen, notificationCenter, alert } = permissions
            v.notificationAuth = lockScreen || notificationCenter || alert
            setProps()
          })
          // TODO安卓
          // 。。。
        }} />}
      </View>}
    </View>
  </View>
}