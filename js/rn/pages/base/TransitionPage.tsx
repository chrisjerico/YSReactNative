import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import UGBasePage from './UGBasePage';
import { TransitionProps, TransitionStateToProps } from './TransitionProps';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { Text, Button } from 'react-native-elements';
import { Navigation, PageName } from '../../public/navigation/Navigation';

// 过渡页面，每次切换都会先进这个页面再切换（优化了初次加载新页面时卡顿的体验）
class TransitionPage extends UGBasePage<TransitionProps> {
  // 请求数据
  requestData() { }

  // 即将显示
  didFocus(p: TransitionProps) {
    const { jumpTo, pushTo, props } = p;
    if (jumpTo) {
      Navigation.jump(jumpTo, props);
    } else if (pushTo) {
      Navigation.push(pushTo, props);
    }
  }

  // 渲染内容
  renderContent(): React.ReactNode {
    return (
      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, color: Skin1.textColor1 }}>正在加载中...</Text>
      </View>
    );
  }
}

// 绑定Redux
export default connect(TransitionStateToProps)(TransitionPage);
