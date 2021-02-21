import React, { useEffect } from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText14 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375

const items = [
  {
    type: '银行卡',
    realname: '王霸胆',
    bank: '招商银行',
    account: '1234****7890',
  }, {
    type: '支付宝',
    realname: '王霸胆',
    account: '1234****7890',
  }, {
    type: '微信',
    realname: '王霸胆',
    account: '1234****7890',
  },
]

const bankColors = ['#E63633', '#F05E46']
const alipayColors = ['#1296DB', '#1CBCDE']
const wechatColors = ['#39B130', '#59B130']

export const DoyPaymentChannlPage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '收付款方式',
        rightComponent: (
          <Button title='新增' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => {
            push(PageName.DoyPaymentEditPage)
          }} />
        )
      }
    })
  }, [])


  const btns = items?.map((item) => {
    const { type, realname, bank, account } = item
    let icon = undefined
    type == '银行卡' && (icon = img_doy('收付款方式/银行卡_白@3x'))
    type == '支付宝' && (icon = img_doy('收付款方式/支付宝_白@3x'))
    type == '微信' && (icon = img_doy('收付款方式/微信_白@3x'))

    let colors = undefined
    type == '银行卡' && (colors = bankColors)
    type == '支付宝' && (colors = alipayColors)
    type == '微信' && (colors = wechatColors)

    let showAccount = false
    type == '银行卡' && (showAccount = true)
    type == '支付宝' && (showAccount = false)
    type == '微信' && (showAccount = false)

    return <TouchableOpacity style={{ borderRadius: sc(4), overflow: 'hidden', backgroundColor: 'white', marginBottom: sc(8) }} onPress={() => {
      push(PageName.DoyPaymentEditPage, { item })
    }}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors} style={{ flexDirection: 'row', paddingHorizontal: sc(16), height: sc(32), alignItems: 'center', }}>
        <FastImage source={{ uri: icon }} style={{ width: sc(16), aspectRatio: 1 }} />
        <DoyText14 white style={{ marginLeft: sc(9) }}>{type}</DoyText14>
      </LinearGradient>
      <View style={{ paddingHorizontal: sc(16), paddingVertical: sc(20), flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          {showAccount && <DoyText14 style={{ marginBottom: sc(6) }}>{bank + ' ' + account}</DoyText14>}
          <DoyText14>{realname}</DoyText14>
        </View>
        <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ width: sc(7), height: sc(10) }} resizeMode='contain' />
      </View>
    </TouchableOpacity>
  })
  return <View style={{ flex: 1, padding: sc(16) }}>
    {btns}
    <DoyText12 gray2 textAlignCenter style={{ lineHeight: sc(18), marginTop: sc(14) }}>{`您可以添加支付宝、微信、银行卡各一组
作为收付款时所默认的账号`}</DoyText12>
  </View>
}