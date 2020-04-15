import BaseWidget from '../base/BaseWidget';
import * as Progress from 'react-native-progress';
import * as React from 'react';
import IBaseWidgetProps from '../base/IBaseWidgetProps';
import IBaseWidgetState from '../base/IBaseWidgetState';
import {Skin1} from '../../theme/UGSkinManagers';

/**
 * 转圈等待框
 */
export default class UGProgressCircle extends BaseWidget<IBaseWidgetProps, IBaseWidgetState> {
  render(): React.ReactNode {
    return <Progress.Circle borderWidth={4} size={45} indeterminate={true} borderColor={Skin1.themeColor} {...this.props} />;
  }
}
