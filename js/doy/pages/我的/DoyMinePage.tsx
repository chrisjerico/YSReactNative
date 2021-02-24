import React, { useEffect, useRef } from "react"
import { Alert, View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { jumpTo, push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import List from "../../../rn/public/views/tars/List"
import { showLoading, showReload, showSuccess } from "../../../rn/public/widget/UGLoadingCP"
import { img_doy } from "../../../rn/Res/icon"
import { DoyText14, DoyText28, DoyText12, DoyButton1, DoyText20, DoyButton2 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { doyApi } from "../../publicClass/network/DoyApi"
import { DoyCheckBuyAlertCP } from "../首页/我要买/cp/DoyCheckBuyAlertCP"
import { DoyStarCP } from "./个人资料/cp/DoyStarCP"
import { DoyTabbar } from "../../publicComponent/Tabbar/DoyTabbar"

const sc = sc375

const items = [
  {
    title: '收付款方式',
    onPress: () => { push(PageName.DoyPaymentChannlPage) }
  }, {
    title: '我的评价',
    onPress: () => { push(PageName.DoyMyCommentPage) }
  }, {
    title: '登录密码',
    onPress: () => { push(PageName.DoyChangeLoginPwdPage) }
  }, {
    title: '交易密码',
    onPress: () => { push(PageName.DoyChangePayPwdPage) }
  },
]

export const DoyMinePage = ({ setProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1

  useEffect(() => {
    setProps({ navbarOpstions: { title: '我的', back: false } })
  }, [])

  const btns = items.map(({ title, onPress }) => {
    return [
      <TouchableOpacity style={{ paddingVertical: sc(16), paddingHorizontal: sc(24) }} onPress={onPress}>
        <DoyText14>{title}</DoyText14>
      </TouchableOpacity>,
      <View style={{ marginHorizontal: sc(24), height: sc(1), backgroundColor: '#EFF1F5' }} />
    ]
  })
  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ backgroundColor: '#ffffff44', padding: sc(2), width: sc(60), aspectRatio: 1, borderRadius: sc(6) }}>
          <FastImagePlaceholder source={{ uri: '' }} style={{ flex: 1, borderRadius: sc(4) }} />
        </View>
        <View style={{ marginLeft: sc(16) }} >
          <DoyText20 bold1 white>夏加尔</DoyText20>
          <DoyText12 white style={{ marginTop: sc(8), }}>这里是签名</DoyText12>
        </View>
        <View style={{ flex: 1 }} />
        <DoyText12 style={{ color: '#ffffffb3' }}>#71bs8c</DoyText12>
      </View>
      <View style={{ flexDirection: 'row', marginTop: sc(16), justifyContent: 'space-between' }}>
        <Button title='编辑个人资料' buttonStyle={{ height: sc(28), width: sc(167), padding: 0, backgroundColor: '#1052BE' }} titleStyle={{ fontSize: sc(12) }} onPress={() => {
          push(PageName.DoyUserInfoEditPage)
        }} />
        <Button title='查看个人主页' buttonStyle={{ height: sc(28), width: sc(167), padding: 0, backgroundColor: '#1052BE' }} titleStyle={{ fontSize: sc(12) }} onPress={() => {
          push(PageName.DoyUserInfoPage)
        }} />
      </View>
    </LinearGradient>
    <ScrollView style={{ padding: sc(16), flex: 1 }}>
      <View style={{ backgroundColor: 'white', borderRadius: sc(4), }}>
        {btns}
      </View>
      <Button title='退出登录' containerStyle={{ marginTop: sc(8) }} buttonStyle={{ height: sc(46), backgroundColor: 'white', }} titleStyle={{ fontSize: sc(14), fontWeight: '500', color: '#E36666' }} onPress={() => {
        Alert.alert('是否要退出登录？', undefined, [{ text: '取消', style: 'cancel' }, {
          text: '确定', onPress: () => {
            showLoading()
            doyApi.user.logout().useCompletion(() => {
              showSuccess('退出成功！')
              jumpTo(PageName.DoyLoginPage)
            })
          }
        }])
      }} />
    </ScrollView>
    <DoyTabbar selectedIndex={3} />
  </View>
}