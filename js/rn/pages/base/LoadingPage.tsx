import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import UGBasePage from './UGBasePage';
import {LoadingProps, LoadingStateToProps} from './LoadingProps';
import {Skin1} from '../../public/theme/UGSkinManagers';
import {Text} from 'react-native-elements';

class LoadingPage extends UGBasePage<LoadingProps> {
  // 请求数据
  requestData() {}

  // 渲染内容
  renderContent(): React.ReactNode {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, color: Skin1.textColor1}}>正在加载中...</Text>
      </View>
    );
  }
}

// 绑定Redux
export default connect(LoadingStateToProps)(LoadingPage);
