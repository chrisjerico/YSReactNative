import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { Text, Button } from 'react-native-elements';
import {  PageName } from '../../public/navigation/Navigation';
import { UGBasePageProps } from './UGPage';
import { UGStore } from '../../redux/store/UGStore';
import { push, jumpTo } from '../../public/navigation/RootNavigation';

// 声明Props
export interface TransitionProps extends UGBasePageProps<TransitionProps> {
  jumpTo?: PageName;
  pushTo?: PageName;
  props?: any;
}

// 过渡页面，每次切换都会先进这个页面再切换（优化了初次加载新页面时卡顿的体验）
export const TransitionPage = (props: TransitionProps) => {
  const { setProps, setDidFocus } = props;
  
  useEffect(() => {
    setProps({
      backgroundColor: Skin1.bgColor,
      navbarOpstions: { backgroundColor: 'transparent', hideUnderline: true, back: true },
      tabbarOpetions: { unmountOnBlur: false },
    })
  }, []);

  // 即将显示
  setDidFocus((p: TransitionProps) => {
    if (!p) return;
    const { jumpTo:j, pushTo, props } = p;
    if (j) {
      jumpTo(j, props);
    } else if (pushTo) {
      push(pushTo, props);
    }
  })
  

  // 渲染内容
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, color: Skin1.textColor1 }}>正在加载中...</Text>
    </View>
  );
}
