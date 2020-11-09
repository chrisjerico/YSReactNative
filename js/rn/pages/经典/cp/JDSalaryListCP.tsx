import React, { useEffect, useRef, useState } from 'react'
import { ListRenderItemInfo, Text, View } from "react-native"
import { Button } from "react-native-elements"
import { FlatList } from 'react-native-gesture-handler'
import LinearGradient from "react-native-linear-gradient"
import Animated, { Easing } from 'react-native-reanimated'
import AppDefine from '../../../public/define/AppDefine'
import { SalaryModel } from '../../../public/network/Model/SalaryModel'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { hideLoading, showLoading, showSuccess } from '../../../public/widget/UGLoadingCP'

interface UGFadeInAnimationProps {
  children: any;
  show?: boolean;
}

// 淡入动画组件
export const UGFadeAnimationView = (props: UGFadeInAnimationProps) => {
  const { show } = props;
  const { current: v } = useRef({
    fadeInOpacity: new Animated.Value(0)
  });
  const [zIndex, setZIndex] = useState(0);

  console.log('refresh ani');

  useEffect(() => {
    if (show) {
      console.log('isshow');

      Animated.timing(v.fadeInOpacity, { toValue: 1, duration: 250, easing: Easing.linear }).start(); // 淡入
      setZIndex(0);// 关闭点击穿透
    } else {
      console.log('notshow');
      Animated.timing(v.fadeInOpacity, { toValue: 0, duration: 250, easing: Easing.linear }).start();// 淡出
      setTimeout(() => { setZIndex(-999); }, 250); // 开启点击穿透
    }
  }, [show]);

  return (
    <Animated.View style={[{ zIndex: zIndex, position: 'absolute', width: AppDefine.width, height: AppDefine.height, alignItems: 'center', }, { opacity: v.fadeInOpacity }]}>
      {props?.children}
    </Animated.View>
  )
}



interface JDSalaryListVars {
  list?: SalaryModel[]
  show?: boolean;
}

const SalaryCell = ({ item }: ListRenderItemInfo<SalaryModel>) => {
  return [
    <View style={{ flexDirection: 'row', height: 45 }}>
      <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.levelName}</Text>
      <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.weekBons}</Text>
      <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>{item.MonthBons}</Text>
      {/* <Text style={{ alignSelf: 'center', flex:1 }}>{item.MonthBons}</Text> */}
      <View style={{ alignSelf: 'center', flex: 1 }}>
        <Button title='点击领取' containerStyle={{ marginHorizontal: 10 }} titleStyle={{ fontSize: 11 }} onPress={() => {
          showLoading();
          api.task.sendMissionBonus(item.bonsId).setCompletionBlock(() => {
            showSuccess('领取成功')
          });
        }} />
      </View>
    </View>,
    <View style={{ height: 0.5, backgroundColor: '#aaa' }} />
  ]
}

export interface JDSalaryListCP {
  showSalaryAlert?: () => void;
}

export const JDSalaryListCP = ({ c_ref }: { c_ref: JDSalaryListCP }) => {
  const [state, setState] = useState(true);
  const { current: v } = useRef<JDSalaryListVars>({});

  // 初始化
  useEffect(() => {
    c_ref && (c_ref.showSalaryAlert = () => {
      if (!v.list) {
        // 俸禄数据
        showLoading();
        api.task.getMissionBonusList().setCompletionBlock((res) => {
          hideLoading();
          console.log('list = ', res);
          
          // v.list = list;
          v.show = !v.show;
          setState(!state);
        });
      } else {
        v.show = !v.show;
        setState(!state);
      }
    });
  }, []);

  console.log('changeshow');

  return (
    <UGFadeAnimationView show={v.show} >
      <View style={{ marginTop: 115, width: AppDefine.width - 50, height: AppDefine.height - 250, backgroundColor: '#fff', borderRadius: 10, overflow: true }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 45, justifyContent: 'center' }} >
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }} >领取俸禄</Text>
        </LinearGradient>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 45 }}>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>等级</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>周俸禄</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>月俸禄</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>领取</Text>
        </View>
        <View style={{ height: 0.5, backgroundColor: '#aaa' }} />
        <FlatList showsVerticalScrollIndicator={false} data={v.list} renderItem={SalaryCell} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
        <Button title="关闭" style={{ marginVertical: 10, marginHorizontal: 13 }} onPress={() => {
          v.list = undefined;
          v.show = !v.show;
          setState(!state);
        }} />
      </View>
    </UGFadeAnimationView>
  )
}
