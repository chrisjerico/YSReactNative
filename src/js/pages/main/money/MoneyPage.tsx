import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import IMoneyProps from "./IMoneyProps";

/**
 * Arc
 *
 * 资金管理
 *
 */
class MoneyPage extends BasePage<IMoneyProps, IBasePageState> {

  requestData() {}



  renderContent(): React.ReactNode {
    const {homeReducer} = this.props;
    return (
      <View style={_styles.container}>
        <TouchableOpacity onPress={() => {

        }}>
          <Text>{'资金管理=' + JSON.stringify(homeReducer)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


/**
 * 当前所使用到的 Action方法
 */
const _mapDispatchToProps = ({});

/**
 * 将得到的reducer结果绑定到当前界面
 *
 * @param state
 * @private
 */
const _mapStateToProps = (state) => {
  return {
    ...state
  };
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(MoneyPage)
