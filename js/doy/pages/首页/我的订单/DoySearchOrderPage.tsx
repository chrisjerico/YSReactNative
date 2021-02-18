import React, { useEffect, useRef, useState } from "react"
import { Platform, TextInput, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText20, DoyText12, DoyText14, DoyText28, DoyButton1, DoyText13, DoyText16, DoyCheckbox1 } from "../../../public/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../../public/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1 } from "../../../public/Button之类的基础组件/DoyTextInput"

const sc = sc375

const dateList = ['2020/12/1', '2020/12/2', '2020/12/3', '2020/12/4', '2020/12/5', '2020/12/6', '2020/12/7', '2020/12/8', '2020/12/9', '2020/12/10', '2020/12/11', '2020/12/12', '2020/12/13', '2020/12/14', '2020/12/15', '2020/12/16', '2020/12/17', '2020/12/18', '2020/12/19', '2020/12/20', '2020/12/21', '2020/12/22', '2020/12/23', '2020/12/24', '2020/12/25', '2020/12/26', '2020/12/27', '2020/12/28', '2020/12/29', '2020/12/30', '2020/12/31',]

export const DoySearchOrderPage = ({ setProps }: UGBasePageProps) => {

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '查询订单',
        rightComponent: (<Button title='重置' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: sc(14) }} onPress={() => { }} />)
      },
    })
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(16), paddingVertical: sc(24), }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', zIndex: 1 }}>
      <DoyText14 style={{ width: '100%' }}>交易数量</DoyText14>
      <DoyTextInput1 bold3 style={{ width: '44%' }}>100</DoyTextInput1>
      <View style={{ height: sc(2), width: sc(9), marginTop: sc(33), backgroundColor: '#979797', }} />
      <DoyTextInput1 bold3 style={{ width: '44%' }}>100000</DoyTextInput1>
      <DoyText14 style={{ width: '100%', marginTop: sc(20) }}>成立时间</DoyText14>
      <DoyDropDownPicker1 outerViewStyle={{ width: '44%' }} items={getDoyDropDownPickerItems(dateList)} defaultValueAtIndex={0} />
      <View style={{ height: sc(2), width: sc(9), marginTop: sc(33), backgroundColor: '#979797', }} />
      <DoyDropDownPicker1 outerViewStyle={{ width: '44%' }} items={getDoyDropDownPickerItems(dateList)} defaultValueAtIndex={0} />
      <DoyText14 style={{ width: '100%', marginTop: sc(20) }}>付款方式</DoyText14>
      <DoyCheckbox1 title='支付宝' style={{ width: '31.6%' }} onClick={(selected) => {
        return true
      }} />
      <DoyCheckbox1 title='微信支付' style={{ width: '31.6%' }} onClick={(selected) => {
        return true
      }} />
      <DoyCheckbox1 title='银行卡' style={{ width: '31.6%' }} onClick={(selected) => {
        return true
      }} />
    </View>
    <View style={{ flex: 1 }} />
    <DoyButton1 title='查询' onPress={() => {
      push(PageName.DoySearchReultPage)
    }} />
  </View>
}