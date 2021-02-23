import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo } from 'react-native'
import { Button, ButtonGroup } from 'react-native-elements'
import AppDefine from '../../../../../rn/public/define/AppDefine'
import { skin1, Skin1 } from '../../../../../rn/public/theme/UGSkinManagers'
import { AnimationFadeView } from '../../../../../rn/public/tools/animation/AnimationViews'
import { showLoading, hideLoading, showSuccess } from '../../../../../rn/public/widget/UGLoadingCP'
import { sc375 } from '../../../../../rn/public/tools/Scale'
import FastImage from 'react-native-fast-image'
import { img_doy } from '../../../../../rn/Res/icon'
import { UGText } from '../../../../publicComponent/Button之类的基础组件/DoyButton'

const sc = sc375

export interface DoyInRestModeCP {
  showInRestModeAlert?: () => void
}

interface DoyInRestModeProps {
  c_ref: DoyInRestModeCP
  onCloseRestModeBtnClick: () => void
}

interface DoyInRestModeVars {
  show?: boolean
}

export const DoyInRestModeCP = ({ c_ref, onCloseRestModeBtnClick }: DoyInRestModeProps) => {
  const [, setState] = useState({})
  const { current: v } = useRef<DoyInRestModeVars>({})

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showInRestModeAlert = () => {
        v.show = !v.show
        setState({})
      })
  }, [])

  const { themeColor } = skin1

  return (
    <AnimationFadeView show={v.show} backgroundColor='#00000099'>
      <View style={{ width: AppDefine.width, padding: sc(24), alignItems: 'center' }}>
        <FastImage source={{ uri: img_doy('休息模式中@3x') }} style={{ width: sc(64), aspectRatio: 1 }} />
        <UGText style={{ fontSize: sc(20), fontWeight: '500', color: 'white', marginTop: sc(32) }}>休息模式中</UGText>
        <UGText style={{ fontSize: sc(12), color: 'white', lineHeight: sc(18), textAlign: 'center', fontWeight: '500' }}>{`
休息模式开启后，您的卖单将不会出现在卖单列表
中，避免挂单在不便回应时被购买。`}</UGText>
        <Button title='关闭休息模式' containerStyle={{ marginTop: sc(30) }} buttonStyle={{ height: sc(38), width: sc(164), backgroundColor: 'white' }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => {
          v.show = !v.show
          setState({})
          onCloseRestModeBtnClick && onCloseRestModeBtnClick()
        }} />
        <Button title='关闭遮罩' buttonStyle={{ backgroundColor: 'transparent', paddingVertical: sc(16) }} titleStyle={{ color: 'white', fontSize: sc(12), fontWeight: '500' }} onPress={() => {
          v.show = !v.show
          setState({})
        }} />
      </View>
    </AnimationFadeView>
  )
}

