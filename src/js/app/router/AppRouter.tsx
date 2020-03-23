import * as React from "react";
import {ActionConst, Actions, Router, Scene, Stack} from "react-native-router-flux";
import Demo2Page from "../../pages/demo2/Demo2Page";
import MainPage from "../../pages/main/MainPage";
import HomePage from "../../pages/main/home/HomePage";
import GameRoomPage from "../../pages/main/game/GameRoomPage";
import BalancePage from "../../pages/main/balance/BalancePage";
import MePage from "../../pages/main/me/MePage";
import MoneyPage from "../../pages/main/money/MoneyPage";
import BasePage from "../../pages/base/BasePage";
import IGlobalProps from "../../redux/store/IGlobalProps";
import IBasePageState from "../../pages/base/IBasePageState";
import {connect} from 'react-redux'
import {ugLog} from "../../utils/UgLog";
import AppDefine from "../../../../js/rn/公共类/AppDefine";
import {Toast} from "../../utils/ToastUtils";
import CouponPage from "../../pages/main/coupon/CouponPage";


/**
 * Scene的通用配置
 */
const _sceneProps = {
  hideNavBar: true,
  hideTabBar: true
};

/**
 * 所有界面的路由表
 */
export default class AppRouter extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }


  /**
   * 绘制内容
   */
  render(): React.ReactNode {
    return (
      <Router>
        <Stack key='root'>
          {/*main界面，底部tab示例，包括了redux请求到显示的过程*/}
          <Scene key='main'
                 initial={true}
                 title='示例1'
                 hideHeader={true}
                 {..._sceneProps}
                 component={MainPage}/>
          {/*demo2界面，顶部tab示例，包括了redux请求到显示的过程*/}
          <Scene key='demo2'
                 title='示例2'
                 {..._sceneProps}
                 component={Demo2Page}/>
          {/*home界面，redux请求到显示的过程*/}
          <Scene key='home'
                 title='主页'
                 {..._sceneProps}
                 component={HomePage}/>
          {/*游戏大厅界面，redux请求到显示的过程*/}
          <Scene key='coupon'
                 title='优惠券'
                 {..._sceneProps}
                 component={CouponPage}/>
          {/*钱包界面，redux请求到显示的过程*/}
          <Scene key='gameRoom'
                 title='游戏大厅'
                 {..._sceneProps}
                 component={GameRoomPage}/>
          {/*钱包界面，redux请求到显示的过程*/}
          <Scene key='money'
                 title='钱包'
                 {..._sceneProps}
                 component={MoneyPage}/>
          {/*利息界面，redux请求到显示的过程*/}
          <Scene key='balance'
                 title='利息'
                 {..._sceneProps}
                 component={BalancePage}/>
          {/*我的界面，redux请求到显示的过程*/}
          <Scene key='me'
                 title='我的'
                 {..._sceneProps}
                 component={MePage}/>

        </Stack>
      </Router>
    );
  }

  componentDidMount(): void {
    // 监听原生发过来的事件通知
    AppDefine.ocEvent.addListener('UGEventEmitter', params => {
      // Toast('params='+ params);
      ugLog(`params=${params}`);
      let pms = JSON.parse(params);
      Actions.push(pms.sceneKey, {
        fromNative: true,//当前界面由原生打开
        type: ActionConst.REPLACE,
        ...pms?.props,
      })
    });
  }
}
