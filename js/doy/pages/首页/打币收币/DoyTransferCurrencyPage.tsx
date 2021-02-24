import React, { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import SegmentedControl from "rn-segmented-control"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import AppDefine from "../../../../rn/public/define/AppDefine"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import List from "../../../../rn/public/views/tars/List"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14, DoyText16, } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyTextInput1 } from "../../../publicComponent/Button之类的基础组件/DoyTextInput"
import { DoyEnterPasswordAlertCP } from "./cp/DoyEnterPasswordAlertCP"


const sc = sc375

export const DoyTransferCurrencyPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  const { themeColor, navBarBgColor } = skin1
  const [isOk, setIsOk] = useState(false)
  const { current: v } = useRef<DoyEnterPasswordAlertCP>({})

  useEffect(() => {
    setProps({
      navbarOpstions: { title: '打币' },
    })
  }, [])

  return [<View style={{ flex: 1 }}>
    {/* 卖单类型 */}
    <LinearGradient colors={navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ padding: sc(16), paddingTop: sc(8 - 2), paddingBottom: sc(24) }}>
      <DoyText14 white bold1>输入DOY数量</DoyText14>
      <DoyTextInput1 bold3 style={{ backgroundColor: '#1052BE', fontSize: sc(16), color: 'white' }} placeholder='0' placeholderTextColor='#ffffff99'
        rightComponent={<DoyText16 bold3 style={{ color: '#ffffff99' }}>= 0 RMB</DoyText16>}
      />
    </LinearGradient>
    <View style={{ paddingVertical: sc(24), paddingHorizontal: sc(16), flex: 1 }}>
      <DoyText14>从 Adam#26080e 的钱包到</DoyText14>
      <DoyTextInput1 placeholder='请输入接收钱包地址' onChangeText={(t) => {
        if (isOk != t?.length > 0) {
          setIsOk(!isOk)
        }
      }} />
      <View style={{ flex: 1 }} />
      <DoyText12 gray2 style={{ marginTop: sc(14), textAlign: 'center', lineHeight: sc(19) }}>{`本平台之间交易无需手续费
跨平台交易所收手续费，由第三方平台决定`}</DoyText12>
      <DoyButton1 title='送出' containerStyle={{ marginTop: sc(24) }} disabledTitleStyle={{ color: 'white' }} {...(!isOk && { disabled: true, linearGradientColors: ['#C2C7D0', '#C2C7D0'] })} onPress={() => {
        v?.showEnterPasswordAlert && v?.showEnterPasswordAlert()
      }} />
    </View>
  </View>,
  <DoyEnterPasswordAlertCP c_ref={v} />
  ]
}