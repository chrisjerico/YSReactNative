import BaseWidget from "../base/BaseWidget";
import * as Progress from "react-native-progress";
import UGTheme from "../../theme/UGTheme";
import * as React from "react";
import IBaseWidgetProps from "../base/IBaseWidgetProps";
import IBaseWidgetState from "../base/IBaseWidgetState";

/**
 * 转圈等待框
 */
export default class UGProgressCircle extends BaseWidget<IBaseWidgetProps, IBaseWidgetState> {

  render(): React.ReactNode {
    let {colorAccent} = UGTheme.getInstance().currentTheme();
    return (
      <Progress.Circle
        borderWidth={4}
        size={45}
        indeterminate={true}
        borderColor={colorAccent}
        {...this.props}
      />
    );
  }

}
