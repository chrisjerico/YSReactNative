import React, { useState, useEffect, useRef } from 'react'
import { TranslateXTransform, TranslateYTransform, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated'
import AppDefine from '../../define/AppDefine'



// 淡入动画组件
// ___________________________________________________________________________
interface UGAnimationFadeProps {
  children: any;
  show?: boolean;
}
export const AnimationFadeView = (props: UGAnimationFadeProps) => {
  const { show } = props;
  const { current: v } = useRef({
    fadeInOpacity: new Animated.Value(0)
  });
  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    if (show) {
      Animated.timing(v.fadeInOpacity, { toValue: 1, duration: 250, easing: Easing.linear }).start(); // 淡入
      setZIndex(0);// 关闭点击穿透
    } else {
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




// 移入动画组件
// ___________________________________________________________________________

interface UGAnimationMoveProps {
  children: any;
  show?: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}
export const AnimationMoveView = (props: UGAnimationMoveProps) => {
  const { show, direction = 'bottom' } = props;
  let startValue: number;
  switch (direction) {
    case 'left':
      startValue = -AppDefine.width;
      break;
    case 'right':
      startValue = AppDefine.width;
      break;
    case 'top':
      startValue = -AppDefine.height;
      break;
    case 'bottom':
      startValue = AppDefine.height;
      break;
  }
  const { current: v } = useRef({
    offset: new Animated.Value(startValue),
    opacity: new Animated.Value(0)
  });
  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    if (show) {
      Animated.timing(v.offset, { toValue: 0, duration: 250, easing: Easing.linear }).start(); // 平移出现
      Animated.timing(v.opacity, { toValue: 1, duration: 250, easing: Easing.linear }).start(); // 透明
      setZIndex(0);// 关闭点击穿透
    } else {
      Animated.timing(v.offset, { toValue: startValue, duration: 250, easing: Easing.linear }).start();// 平移隐藏
      Animated.timing(v.opacity, { toValue: 0, duration: 250, easing: Easing.linear }).start();// 透明
      setTimeout(() => { setZIndex(-999); }, 250); // 开启点击穿透
    }
  }, [show]);

  return (
    <Animated.View style={[{ zIndex: zIndex, position: 'absolute', width: AppDefine.width, height: AppDefine.height, alignItems: 'center', backgroundColor:'#00000055' }, { opacity: v.opacity }]}>
      <Animated.View style={[{
        transform: [{
          translateX: direction == 'left' || direction == 'right' ? v.offset : 0,
          translateY: direction == 'top' || direction == 'bottom' ? v.offset : 0,
        }]
      }
      ]}>
        {props?.children}
      </Animated.View>
    </Animated.View>
  )
}