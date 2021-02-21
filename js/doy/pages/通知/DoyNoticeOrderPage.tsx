import React, { useEffect, useRef } from "react"
import { TouchableOpacity, View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { ScrollView } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { push } from "../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_assets, img_doy } from "../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14, DoyText30 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyEnterPasswordAlertCP } from "../首页/打币收币/cp/DoyEnterPasswordAlertCP"

const sc = sc375

export const DoyNoticeOrderPage = ({ setProps }: UGBasePageProps) => {

  const { current: v } = useRef<DoyEnterPasswordAlertCP>({})

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '我的卖单',
        rightComponent: (<Button title='聊聊' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => {
          push(PageName.DoyChatDetailPage)
        }} />)
      }
    })
  }, [])

  return [<ScrollView>
    <View style={{ flex: 1, paddingHorizontal: sc(16), paddingVertical: sc(24), alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {
        push(PageName.DoyUserInfoPage)
      }}>
        <FastImagePlaceholder source={{ uri: '' }} style={{ width: sc(46), aspectRatio: 1, borderRadius: sc(4), alignSelf: 'center' }} />
        <View style={{ flexDirection: 'row', marginTop: sc(8) }}>
          <DoyText14>夏加尔#4afc2d</DoyText14>
          <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ marginLeft: sc(8), width: sc(4), height: sc(18) }} resizeMode='contain' />
        </View>
      </TouchableOpacity>
      <DoyText30 bold3 style={{ marginTop: sc(14) }}>+150 DOY</DoyText30>
      <DoyText14 bold3 gray2 style={{ marginTop: sc(4) }}>(150 RMB)</DoyText14>
      <View style={{ marginTop: sc(10), width: '100%', padding: sc(16), backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', borderRadius: sc(4) }}>
        <DoyText14 gray2 style={{ width: '20%' }}>交易编号</DoyText14>
        <DoyText14 style={{ width: '80%', textAlign: 'right', marginBottom: sc(16) }}>tpsepukqd8k54</DoyText14>
        <DoyText14 gray2 style={{ width: '20%' }}>交易时间</DoyText14>
        <DoyText14 style={{ width: '80%', textAlign: 'right', marginBottom: sc(16) }}>2021/01/22 16:27</DoyText14>
        <DoyText14 gray2 style={{ width: '20%' }}>来源钱包</DoyText14>
        <DoyText14 style={{ width: '80%', textAlign: 'right' }}>{`银行卡
交通银行（1234****7890，王**）`}</DoyText14>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginTop: sc(16), paddingVertical: sc(18), paddingHorizontal: sc(10) }}>
        <View style={{ position: 'absolute', height: '100%', width: sc(2), backgroundColor: '#1F65E6', marginLeft: sc(68) }} />
        <>
          <DoyText14 bold2 style={{}}>16:23</DoyText14>
          <FastImage source={{ uri: img_doy('完成@3x') }} style={{ width: sc(18), height: sc(18), marginHorizontal: sc(12) }} resizeMode='contain' />
          <DoyText14 bold1 gray1 style={{ width: sc(240), marginTop: sc(1), }}>交易成立，等待付款</DoyText14>
          <DoyText12 bold2 gray2 style={{ marginLeft: sc(2), width: '90%', marginBottom: sc(25) }}>01/22</DoyText12>
        </>
        <>
          <DoyText14 bold2 style={{}}>16:23</DoyText14>
          <FastImage source={{ uri: img_doy('完成@3x') }} style={{ width: sc(18), height: sc(18), marginHorizontal: sc(12) }} resizeMode='contain' />
          <DoyText14 bold1 gray1 style={{ width: sc(240), marginTop: sc(1), }}>您已通知付款</DoyText14>
          <DoyText12 bold2 gray2 style={{ marginLeft: sc(2), marginBottom: sc(25) }}>01/22</DoyText12>
          <View style={{ width: sc(240), marginLeft: sc(46), marginTop: sc(12), height: sc(77), justifyContent: 'space-between', marginBottom: sc(25) }}>
            <DoyText12 gray1>银行名称：中国农业银行</DoyText12>
            <DoyText12 gray1>银行账号：1234****1234</DoyText12>
            <DoyText12 gray1>账户姓名：王霸胆</DoyText12>
            <DoyText12 gray1>转账时间：2021/01/22 16:26</DoyText12>
          </View>
        </>
        <>
          <DoyText14 bold2 style={{}}>16:23</DoyText14>
          <FastImage source={{ uri: img_doy('完成@3x') }} style={{ width: sc(18), height: sc(18), marginHorizontal: sc(12) }} resizeMode='contain' />
          <DoyText14 bold1 gray1 style={{ width: sc(240), marginTop: sc(1), }}>交易成立，等待付款</DoyText14>
          <DoyText12 bold2 gray2 style={{ marginLeft: sc(2), width: '90%', marginBottom: sc(25) }}>01/22</DoyText12>
        </>
        <>
          <FastImage source={{ uri: img_doy('完成@3x') }} style={{ width: sc(18), height: sc(18), marginHorizontal: sc(12), marginLeft: sc(50) }} />
          <DoyText14 bold1 gray1 style={{ width: sc(240), marginTop: sc(1), }}>交易关闭</DoyText14>
        </>
        <>
          <FastImage source={{ uri: img_doy('注意@3x') }} style={{ width: sc(18), height: sc(18), marginTop: sc(28), marginHorizontal: sc(12), marginLeft: sc(50) }} />
          <DoyText14 bold1 style={{ width: sc(240), marginTop: sc(29), color: '#DC550C' }}>评价卖方</DoyText14>
        </>
      </View>
      <DoyButton1 title='评价卖家' containerStyle={{ width: '100%' }} onPress={() => {
        push(PageName.DoyNoticeOrderFeedbackPage)
      }} />
      <DoyButton1 title='打币' containerStyle={{ width: '100%' }} onPress={() => {
        v.showEnterPasswordAlert && v.showEnterPasswordAlert()
      }} />
    </View>
  </ScrollView>,
  <DoyEnterPasswordAlertCP c_ref={v} />
  ]
}