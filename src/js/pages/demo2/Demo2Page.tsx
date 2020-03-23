import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BasePage from "../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../base/IBasePageState";
import {requestUserInfo} from "../../redux/action/Demo2Action";
import IDemo2Props from "./IDemo2Props";
import {Button} from "react-native-elements";
import {IUGTopTabBarData} from "../../widget/bar/topbar/IUGTopTabBarProps";
import GameRoomPage from "../main/game/GameRoomPage";
import MoneyPage from "../main/money/MoneyPage";
import BalancePage from "../main/balance/BalancePage";
import MePage from "../main/me/MePage";
import UGTopTabBar from "../../widget/bar/topbar/UGTopTabBar";
import AppDefine from "../../../../js/rn/公共类/AppDefine";
import {ugLog} from "../../utils/UgLog";
import {NativeCommand} from "../../site/NativeCommand";

class Demo2Page extends BasePage<IDemo2Props, IBasePageState> {

  constructor(props) {
    super(props);
  }


  requestData() {
    // setTimeout(()=>{
    //   let {requestUserInfo} = this.props;
    //   requestUserInfo('第一次请求')
    // }, 2000)
  }

  /**
   * 有数据的时候，绘制tab bar
   * @private
   */
  _renderData(): React.ReactNode | null {
    let {reducerData} = this.props;
    if (reducerData?.data == null) {
      return null;
    }

    //生成一个 tab界面
    let tabs: Array<IUGTopTabBarData> = [
      {
        title: 'win phone',
        page: <MoneyPage hideHeader={true}/>,
      },
      {
        title: 'linux',
        page: <BalancePage hideHeader={true}/>,
      },
      {
        title: 'symbian',
        page: <MePage hideHeader={true}/>,
      },
    ];

    return (
      <UGTopTabBar tabs={tabs}/>
    );

  }

  /**
   * 绘制请求界面
   * @private
   */
  _renderRequest(): React.ReactNode {
    let {requestUserInfo, reducerData} = this.props;

    return (
      <View style={_styles.container}>
        <Text>第2页</Text>
        <Button title='按钮 请求数据' onPress={() => {
          requestUserInfo('xiao wang')
        }}/>
        <Button buttonStyle={_styles.button} title='切到原生的优惠券' onPress={() => {
          AppDefine.ocHelper.executeCmd(JSON.stringify({
            type: NativeCommand.OPEN_PAGE,
            data: {
              className: 'CouponsFragment',
              packageName: 'com.phoenix.lotterys.coupons',
              toActivity: false,
              intentParams: {
                fromReact: true,
              },
              constructParams: [false, false],
            }
          }));
        }}/>
        <TouchableOpacity>
          <Text>AAAAAAAA</Text>
          <Text>{'数据是: ' + JSON.stringify(reducerData)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent(): React.ReactNode {
    return this._renderData() ?? this._renderRequest();
  }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
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
  requestUserInfo: requestUserInfo
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
    reducerData: state.demo2Reducer,
  };
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(Demo2Page)
