import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, ListRenderItemInfo } from 'react-native'
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../../public/define/AppDefine'
import { SalaryModel } from '../../../public/network/Model/SalaryModel'
import { hideLoading, showLoading, showSuccess } from '../../../public/widget/UGLoadingCP'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { AnimationFadeView } from '../../../public/tools/animation/AnimationViews'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export interface JDSalaryListCP {
  showSalaryAlert?: () => void
}

interface JDSalaryListVars {
  list?: SalaryModel[]
  show?: boolean
}

export const JDSalaryListCP = ({ c_ref }: { c_ref: JDSalaryListCP }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<JDSalaryListVars>({})

  // 初始化
  useEffect(() => {
    c_ref &&
      (c_ref.showSalaryAlert = () => {
        if (!v.list) {
          // 俸禄数据
          showLoading()
          api.task.getMissionBonusList().useSuccess(({ data: list }) => {
            hideLoading()
            v.list = list
            v.show = !v.show
            setState({})
          })
        } else {
          v.show = !v.show
          setState({})
        }
      })
  }, [])

  return (
    <AnimationFadeView show={v.show}>
      <View style={{ width: AppDefine.width - 55, height: AppDefine.height - 260, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 45, justifyContent: 'center' }}>
          <UGText style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>领取俸禄</UGText>
        </LinearGradient>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 45 }}>
          <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>等级</UGText>
          <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>周俸禄</UGText>
          <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>月俸禄</UGText>
          <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>领取</UGText>
        </View>
        <View style={{ height: 0.5, backgroundColor: '#aaa' }} />
        <FlatList showsVerticalScrollIndicator={false} data={v.list} renderItem={SalaryCell} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
        <Button
          title="关闭"
          style={{ marginVertical: 10, marginHorizontal: 13 }}
          onPress={() => {
            v.list = undefined
            v.show = !v.show
            setState({})
          }}
        />
      </View>
    </AnimationFadeView>
  )
}

const SalaryCell = ({ item }: ListRenderItemInfo<SalaryModel>) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', height: 45 }}>
        <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.levelName}</UGText>
        <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.weekBons}</UGText>
        <UGText style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.MonthBons}</UGText>
        {/* <UGText style={{ alignSelf: 'center', flex:1 }}>{item.MonthBons}</UGText> */}
        <View style={{ alignSelf: 'center', flex: 1 }}>
          <Button
            title="点击领取"
            containerStyle={{ marginHorizontal: 10 }}
            titleStyle={{ fontSize: 11 }}
            onPress={() => {
              showLoading()
              api.task.sendMissionBonus(item.bonsId).useSuccess(() => {
                showSuccess('领取成功')
              })
            }}
          />
        </View>
      </View>
      <View style={{ height: 0.5, backgroundColor: '#aaa' }} />
    </View>
  )
}
