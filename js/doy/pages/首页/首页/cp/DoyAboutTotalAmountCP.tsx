import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo } from 'react-native'
import { Button } from 'react-native-elements'
import AppDefine from '../../../../../rn/public/define/AppDefine'
import { Skin1 } from '../../../../../rn/public/theme/UGSkinManagers'
import { AnimationFadeView } from '../../../../../rn/public/tools/animation/AnimationViews'
import { showLoading, hideLoading, showSuccess } from '../../../../../rn/public/widget/UGLoadingCP'
import { DoyButton1, DoyText12, DoyText20 } from '../../../../publicComponent/Button之类的基础组件/DoyButton'
import { sc375 } from '../../../../../rn/public/tools/Scale'

const sc = sc375

export interface DoyAboutTotalAmountCP {
  showAboutTotalAmountAlert?: () => void
}

interface DoyAboutTotalAmountVars {
  show?: boolean
}

export const DoyAboutTotalAmountCP = ({ c_ref }: { c_ref: DoyAboutTotalAmountCP }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<DoyAboutTotalAmountVars>({})

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showAboutTotalAmountAlert = () => {
        v.show = !v.show
        setState({})
      })
  }, [])

  return (
    <AnimationFadeView show={v.show} backgroundColor='#00000077'>
      <View style={{ width: AppDefine.width - 55, backgroundColor: '#fff', borderRadius: sc(4), overflow: 'hidden', padding: sc(24) }}>
        <DoyText20 bold1 >关于总资产</DoyText20>
        <DoyText12 gray1 style={{ lineHeight: sc(18) }}>{`
您的总资产即为所有属于您的DOY币，包含：可动数量、担保数量。为方便您计算，上述两项仅显示至整数位，总资产则会完整显示小数点后的位数。

【可动数量】
可以随时进行打币、出售、兑换BTC或者进行提领的DOY币。

【担保数量】
因兑换BTC、挂单出售等等，为使交易顺畅，暂且无法使用的币。您可藉由取消兑换、取消挂单等解冻。`}</DoyText12>
        <DoyButton1 title='知道了' containerStyle={{ marginTop: sc(30) }} buttonStyle={{ height: sc(40) }} onPress={() => {
          v.show = !v.show
          setState({})
        }} />
      </View>
    </AnimationFadeView>
  )
}

