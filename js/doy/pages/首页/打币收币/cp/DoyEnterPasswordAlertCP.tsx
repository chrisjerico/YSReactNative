import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo, Alert, StyleProp, ViewStyle, } from 'react-native'
import { Button } from 'react-native-elements'
import AppDefine from '../../../../../rn/public/define/AppDefine'
import { skin1, Skin1 } from '../../../../../rn/public/theme/UGSkinManagers'
import { AnimationFadeView } from '../../../../../rn/public/tools/animation/AnimationViews'
import { showLoading, hideLoading, showSuccess } from '../../../../../rn/public/widget/UGLoadingCP'
import { DoyButton1, DoyButton2, DoyText12, DoyText20, DoyText40 } from '../../../../public/Button之类的基础组件/DoyButton'
import { sc375 } from '../../../../../rn/public/tools/Scale'
import { push } from '../../../../../rn/public/navigation/RootNavigation'
import { PageName } from '../../../../../rn/public/navigation/Navigation'
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { FastImagePlaceholder } from '../../../../../rn/pages/经典/tools/ImagePlaceholder'
import { img_doy } from '../../../../../rn/Res/icon'
import FastImage from 'react-native-fast-image'

const sc = sc375
const borderStyle: StyleProp<ViewStyle> = { borderWidth: sc(0.5), borderColor: '#DFE1E4', }

export interface DoyEnterPasswordAlertCP {
  showEnterPasswordAlert?: () => void
}

interface DoyEnterPasswordAlertVars {
  show?: boolean
  pwds?: string[]
}

export const DoyEnterPasswordAlertCP = ({ c_ref }: { c_ref: DoyEnterPasswordAlertCP }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<DoyEnterPasswordAlertVars>({
    pwds: []
  })
  const { themeColor } = skin1

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showEnterPasswordAlert = () => {
        v.show = !v.show
        v.pwds = []
        setState({})
      })
  }, [])

  const pwdItems = []
  for (let i = 0; i < 6; i++) {
    const b = v.pwds?.[i]?.length
    pwdItems.push(<View style={{ width: '16.7%', height: sc(46), justifyContent: 'center', ...borderStyle }}>
      {b && <DoyText12 textAlignCenter>●</DoyText12>}
    </View>)
  }

  const numberBtns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'x'].map((ele) => {
    return <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: sc(49), flexDirection: 'row', ...borderStyle }} onPress={() => {
      if (ele == 'x') {
        v.pwds?.pop()
      } else if (ele?.length) {
        v.pwds?.push(ele)
      }
      setState({})

      if (v.pwds?.length >= 6) {
        showLoading()
        setTimeout(() => {
          v.show = false
          setState({})
          hideLoading()
          push(PageName.DoyTransferSuccessPage)
        }, 2000);
      }
    }} >
      <DoyText20 bold3 textAlignCenter style={{ width: '33%', }}>{ele}</DoyText20>
    </TouchableOpacity>
  })

  return (
    <AnimationFadeView show={v.show} backgroundColor='#00000077' style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ width: sc(327), height: sc(231), backgroundColor: '#fff', borderRadius: sc(4), overflow: 'hidden', padding: sc(24), alignSelf: 'center' }}>
          <FastImagePlaceholder source={{ uri: img_doy('关闭_1@3x') }} style={{ width: sc(14), aspectRatio: 1, }} containerStyle={{ marginTop: sc(-18), marginRight: sc(-18), padding: sc(10), alignSelf: 'flex-end', }} onPress={() => {
            v.show = false
            setState({})
          }} />
          <DoyText20 bold1 style={{ textAlign: 'center', marginTop: sc(9) }}>请输入交易密码</DoyText20>
          <DoyText12 gray1 style={{ textAlign: 'center', marginTop: sc(11) }}>DOY币打出将无法追回，请谨慎确认</DoyText12>

          <View style={{ flexDirection: 'row', marginTop: sc(32), ...borderStyle }}>
            {pwdItems}
          </View>
          <Button title='忘记交易密码' containerStyle={{ marginTop: sc(5) }} buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-end', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(12), fontWeight: '600' }} onPress={() => {
            Alert.alert('请联系客服')
          }} />
        </View>
      </View>
      <View style={{ height: sc(195), backgroundColor: 'white', flexWrap: 'wrap', flexDirection: 'row' }}>
        {numberBtns}
      </View>
    </AnimationFadeView>
  )
}

