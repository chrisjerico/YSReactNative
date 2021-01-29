import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { PageName } from '../../public/navigation/Navigation';
import { jumpTo, push } from '../../public/navigation/RootNavigation';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { UGBasePageProps } from './UGPage';

// 声明Props
export interface TransitionProps extends UGBasePageProps<TransitionProps> {
  jumpTo?: PageName;
  pushTo?: PageName;
  props?: any;
}

// 过渡页面，每次切换都会先进这个页面再切换（优化了初次加载新页面时卡顿的体验）
export const TransitionPage = (props: TransitionProps) => {
  const { setProps } = props;

  useEffect(() => {
    setProps({
      backgroundColor: '#ddd',
      navbarOpstions: { backgroundColor: 'transparent', hideUnderline: true, back: true },
      didFocus: (p: TransitionProps) => {
        if (Skin1.skitType == '香槟金') {
          setProps({ bgGradientColor: Skin1.bgColor });
        }
        if (!p) return;
        const { jumpTo: j, pushTo, props } = p;
        if (j) {
          jumpTo(j, props, true);
        } else if (pushTo) {
          push(pushTo, props, true);
        }
      }
    })
  }, []);

  // 渲染内容
  return (
    <View>
      <Text style={{ marginTop: 100, textAlign: 'center', fontSize: 15, color: Skin1.textColor1 }}>正在加载中...</Text>
    </View>
  );
}
