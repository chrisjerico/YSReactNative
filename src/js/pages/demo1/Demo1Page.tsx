import * as React from "react";
import {StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import BasePage from "../base/BasePage";
import {connect} from 'react-redux'
import IBasePageState from "../base/IBasePageState";
import IGlobalProps from "../../redux/store/IGlobalProps";
import UGBottomTabBar from "../../widget/bar/bottombar/UGBottomTabBar";
import {Res} from "../../../res/Resources";
import HomePage from "../main/home/HomePage";
import GameRoomPage from "../main/game/GameRoomPage";
import MoneyPage from "../main/money/MoneyPage";
import BalancePage from "../main/balance/BalancePage";
import MePage from "../main/me/MePage";
import {IUGBottomTabBarBean} from "../../widget/bar/bottombar/IUGBottomTabBarProps";

/**
 * Arc
 *
 * 测试工程
 *
 */
class Demo1Page extends BasePage<IGlobalProps, IBasePageState> {

  requestData() {}

  /**
   * 绘制内容
   */
  renderContent(): React.ReactNode {
    //生成一个 tab界面
    let tabs: Array<IUGBottomTabBarBean> = [
      {
        title: '主页',
        icon: Res.zy,
        page: <HomePage title='主页' />,
      },
      {
        title: '优惠',
        icon: Res.yh,
        page: <GameRoomPage hideHeader={true} />,
      },
      {
        title: '客服',
        icon: Res.kf,
        page: <MoneyPage hideHeader={true} />,
      },
      {
        title: '注单',
        icon: Res.zd,
        page: <BalancePage hideHeader={true} />,
      },
      {
        title: '我的',
        icon: Res.wd,
        page: <MePage hideHeader={true} />,
      },
    ];

    // let arr = [1, 2, 3, 4];
    // let tabs = arr.map((it) => {
    //   return (
    //     {
    //       title: '主页' + it,
    //       icon: Res.home,
    //       page: <HomePage title='主页' />,
    //     }
    //   );
    // });

    return (
      <UGBottomTabBar tabs={tabs}/>
    );
  }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  }
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
    ...state,
  };
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(Demo1Page)
