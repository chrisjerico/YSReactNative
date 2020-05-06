import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import UGBasePage from '../base/UGBasePage';
import {ZHTYHomeProps, ZHTYHomeStateToProps} from './ZHTYHomeProps';

class ZHTYHomePage extends UGBasePage<ZHTYHomeProps> {
  // 请求数据
  requestData() {}

  // 成为焦点页面
  didFocus(params: ZHTYHomeProps) {}

  // 渲染内容
  renderContent(): React.ReactNode {
    return <View />;
  }
}

// 绑定Redux
export default connect(ZHTYHomeStateToProps)(ZHTYHomePage);
