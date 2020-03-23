import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import {Actions} from "react-native-router-flux";
import {Button} from "react-native-elements";
import {requestGameData} from "../../../redux/action/GameRoomAction";
import ICouponProps from "./ICouponProps";
import {requestCouponData} from "../../../redux/action/CouponAction";

/**
 * Arc
 *
 * 优惠券
 *
 */
class CouponPage extends BasePage<ICouponProps, IBasePageState> {

  requestData() {}

  renderContent(): React.ReactNode {
    const {requestCouponData, reducerData} = this.props;
    return (
      <View style={_styles.container}>
        <Button buttonStyle={_styles.button} title='跳转demo2' onPress={() => {
          Actions.demo2();
        }}/>
        <Button buttonStyle={_styles.button} title='跳转 游戏中心' onPress={() => {
          Actions.gameRoom();
        }}/>
        <Button buttonStyle={_styles.button} title='请求数据' onPress={() => {
          requestCouponData({
            type: 'game type'
          });
        }}/>
        <TouchableOpacity onPress={() => {

        }}>
          <Text>{'游戏中心=' + JSON.stringify(reducerData)}</Text>
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
  button: {
    width: 140,
    margin: 4,
    marginTop: 40,
  },
});

/**
 * 当前所使用到的 Action方法
 */
const _mapDispatchToProps = ({
  requestCouponData: requestCouponData
});

/**
 * 将得到的reducer结果绑定到当前界面
 *
 * @param state
 * @private
 */
const _mapStateToProps = (state) => {
  return {
    ...state,
    reducerData: state.couponReducer
  };
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(CouponPage)
