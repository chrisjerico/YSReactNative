import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo } from 'react-native'
import { Button } from 'react-native-elements'
import AppDefine from '../../../../rn/public/define/AppDefine'
import { PageName } from '../../../../rn/public/navigation/Navigation'
import { push } from '../../../../rn/public/navigation/RootNavigation'
import { AnimationFadeView, AnimationMoveView } from '../../../../rn/public/tools/animation/AnimationViews'
import { sc375 } from '../../../../rn/public/tools/Scale'
import { DoyText20, DoyText12, DoyButton1, DoyButton2 } from '../../../publicComponent/Button之类的基础组件/DoyButton'

const sc = sc375

interface DoyChatFilterAlertProps {
  onPress?: (idx: number) => void
  c_ref: DoyChatFilterAlertCP
}

export interface DoyChatFilterAlertCP {
  showChatFilterAlert?: () => void
}

interface DoyCheckBuyAlertVars {
  show?: boolean
}

export const DoyChatFilterAlertCP = ({ c_ref, onPress }: DoyChatFilterAlertProps) => {
  const [, setState] = useState({})
  const { current: v } = useRef<DoyCheckBuyAlertVars>({})

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showChatFilterAlert = () => {
        v.show = !v.show
        setState({})
      })
  }, [])

  return (
    <AnimationMoveView show={v.show} backgroundColor='#00000077' style={{ alignItems: 'stretch' }}>
      <View style={{ flex: 1 }} />
      <View style={{ paddingVertical: sc(11), paddingHorizontal: sc(10) }}>
        <View style={{ borderRadius: sc(12), backgroundColor: '#F8F8F8D1' }}>
          <DoyText12 textAlignCenter style={{ color: '#838382', marginVertical: sc(16) }}>信息筛选</DoyText12>
          <View style={{ height: sc(0.5), backgroundColor: '#777' }} />
          <Button type='clear' title='显示未读信息' buttonStyle={{ height: sc(57) }} titleStyle={{ color: '#007AFF', fontSize: sc(20) }} onPress={() => {
            v.show = false
            setState({})
            onPress && onPress(0)
          }} />
          <View style={{ height: sc(0.5), backgroundColor: '#777' }} />
          <Button type='clear' title='显示所有信息 ✓' buttonStyle={{ height: sc(57) }} titleStyle={{ color: '#007AFF', fontSize: sc(20) }} onPress={() => {
            v.show = false
            setState({})
            onPress && onPress(1)
          }} />
        </View>
        <Button title='取消' containerStyle={{ marginTop: sc(7) }} buttonStyle={{ borderRadius: sc(12), backgroundColor: '#fff', height: sc(56), }} titleStyle={{ color: '#007AFF', fontSize: sc(20) }} onPress={() => {
          v.show = false
          setState({})
        }} />
      </View>
    </AnimationMoveView>
  )
}

