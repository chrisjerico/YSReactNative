import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import List from "../../../rn/public/views/tars/List"
import { img_doy } from "../../../rn/Res/icon"
import { DoyText20, DoyText12, DoyText14, DoyText28, DoyButton1, DoyText16, DoyText15 } from "../../public/Button之类的基础组件/DoyButton"
import { DoyTextInput1 } from "../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyChatDetailPage = ({ setProps }: UGBasePageProps) => {
  const { current: v } = useRef({})
  const { themeColor, navBarBgColor } = skin1

  useEffect(() => {
    setProps({ navbarOpstions: { title: '玛瑞亚#3b8dcd' } })
  }, [])

  return <View style={{ flex: 1 }}>
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: sc(40) }} />
    <View style={{ marginTop: sc(-33), marginHorizontal: sc(16), backgroundColor: 'white', padding: sc(16), borderRadius: sc(4), }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DoyText12>购买数量</DoyText12>
        <DoyText12>待付款</DoyText12>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: sc(8) }}>
        <FastImage source={{ uri: img_doy('DOY币@3x') }} style={{ width: sc(16), aspectRatio: 1 }} />
        <DoyText15 bold3 style={{ marginLeft: sc(4), flex: 1 }}>200</DoyText15>
        <FastImage source={{ uri: img_doy('收付款方式/银行卡@3x') }} style={{ width: sc(16), aspectRatio: 1, }} />
      </View>
    </View>
    <List uniqueKey='聊天记录' style={{ marginHorizontal: sc(16), paddingVertical: sc(24) }} data={[{}, {}, {}, {}, {}, {}]} scrollEnabled
      renderItem={({ item, index }) => {
        const isMe = index % 2
        const { textColor1 } = skin1
        const flexDirection = isMe ? 'row-reverse' : 'row'
        const alignItems = isMe ? 'flex-end' : 'flex-start'
        const textBgColor = isMe ? '#6D9CF8' : 'white'
        const textColor = isMe ? 'white' : textColor1
        const text = isMe ? '稍等，我会尽快完成汇款~' : '请问您是否已向我完成汇款呢？'
        const quickReplys = ['稍等，我会尽快完成汇款~', '已完成汇款，请确认一下']
        const btns = quickReplys?.map((ele) => {
          return <Button
            title={ele}
            titleStyle={{ fontSize: sc(12), lineHeight: sc(15), color: '#333', marginTop: sc(-1) }}
            containerStyle={{ marginTop: sc(12) }}
            buttonStyle={{ borderRadius: sc(14), paddingVertical: sc(5), paddingHorizontal: sc(16), backgroundColor: 'white', borderWidth: sc(1), borderColor: '#1F65E6' }}
          />
        })
        return <View style={{ flexDirection, marginBottom: sc(16), }}>
          <FastImagePlaceholder source={{ uri: '' }} style={{ width: sc(32), aspectRatio: 1 }} />
          <View style={{ marginHorizontal: sc(8), alignItems }}>
            <DoyText12 bold1 gray2>01/22 15:38:31</DoyText12>
            <DoyText14 bold1 style={{
              marginTop: sc(4), paddingVertical: sc(10), paddingHorizontal: sc(12), borderRadius: sc(4), overflow: 'hidden', maxWidth: sc(250), lineHeight: sc(18),
              backgroundColor: textBgColor, color: textColor,
            }}>{text}</DoyText14>
            {btns}
          </View>
        </View>
      }}
      ListFooterComponent={<DoyText12 gray2 textAlignCenter style={{ marginTop: sc(12), marginBottom: sc(60) }}>卖方已打币，对话关闭</DoyText12>}
    />
    <View style={{ flexDirection: 'row', height: sc(50), backgroundColor: '#eee', alignItems: 'center' }}>
      <DoyTextInput1 bold1 style={{ marginTop: 0, marginLeft: sc(16), height: sc(38), flex: 1, paddingHorizontal: 0 }} placeholder='您好，请问在线吗？'
        rightComponent={
          <FastImagePlaceholder source={{ uri: img_doy('展开@3x') }} style={{ width: sc(10), height: sc(6) }} containerStyle={{ paddingHorizontal: sc(16), height: '100%', justifyContent: 'center' }} onPress={() => {
            // 快速回复
          }} />
        }
      />
      <FastImagePlaceholder source={{ uri: img_doy('发送@3x') }} style={{ width: sc(21), aspectRatio: 1 }} containerStyle={{ paddingHorizontal: sc(16), height: '100%', justifyContent: 'center' }} onPress={() => {
        // 发送
      }} />
    </View>
  </View>
}