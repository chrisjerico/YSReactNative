import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo } from 'react-native'
import { Button } from 'react-native-elements'
import AppDefine from '../../../../../rn/public/define/AppDefine'
import { Skin1 } from '../../../../../rn/public/theme/UGSkinManagers'
import { AnimationFadeView } from '../../../../../rn/public/tools/animation/AnimationViews'
import { showLoading, hideLoading, showSuccess } from '../../../../../rn/public/widget/UGLoadingCP'
import { DoyButton1, DoyButton2, DoyText12, DoyText20 } from '../../../../public/Button之类的基础组件/DoyButton'
import { sc375 } from '../../../../../rn/public/tools/Scale'
import { push } from '../../../../../rn/public/navigation/RootNavigation'
import { PageName } from '../../../../../rn/public/navigation/Navigation'

const sc = sc375

export interface DoyCheckBuyAlertCP {
  showCheckBuyAlert?: () => void
}

interface DoyCheckBuyAlertVars {
  show?: boolean
}

export const DoyCheckBuyAlertCP = ({ c_ref }: { c_ref: DoyCheckBuyAlertCP }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<DoyCheckBuyAlertVars>({})

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showCheckBuyAlert = () => {
        v.show = !v.show
        setState({})
      })
  }, [])

  return (
    <AnimationFadeView show={v.show} backgroundColor='#00000077'>
      <View style={{ width: AppDefine.width - 55, backgroundColor: '#fff', borderRadius: sc(4), overflow: 'hidden', padding: sc(24) }}>
        <DoyText20 bold1>确认购买后将锁定交易</DoyText20>
        <DoyText12 gray1 style={{ lineHeight: sc(18) }}>{`
确认下单后，您将有15分钟无法进行其他交易，直到您回报付款资讯方能解除锁定。

为确保您可安全取得DOY币，该币已由系统进行担保，敬请安心付款。`}</DoyText12>
        <DoyButton1 title='确认购买' containerStyle={{ marginTop: sc(30) }} buttonStyle={{ height: sc(40) }} onPress={() => {
          v.show = !v.show
          setState({})
          push(PageName.DoyPendingPaymentPage)
        }} />
        <DoyButton2 title='再想想吧' containerStyle={{ marginTop: sc(8) }} buttonStyle={{ height: sc(40) }} onPress={() => {
          v.show = !v.show
          setState({})
        }} />
      </View>
    </AnimationFadeView>
  )
}

