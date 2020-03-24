import * as React from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import {requestHomeData, requestHomeDataParams} from "../../../redux/action/HomeAction";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/home/IHomeBean";
import UGTheme from "../../../theme/UGTheme";
import {requestUserInfo} from "../../../redux/action/Demo2Action";
import HomeMyInfoComponent from "./cp/HomeMyInfoComponent";
import HomeGameComponent from "./cp/HomeGameComponent";
import HomeBannerComponent from "./cp/HomeBannerComponent";
import HomeCouponComponent from "./cp/HomeCouponComponent";
import HomeFloatAdvComponent from "./cp/HomeFloatAdvComponent";
import HomeNewsComponent from "./cp/HomeNewsComponent";
import HomeRedBagComponent from "./cp/HomeRedBagComponent";
import HomeNoticeComponent from "./cp/HomeNoticeComponent";
import IGlobalProps from "../../../redux/store/IGlobalProps";

/**
 * Arc
 *
 * 主界面
 *
 */
const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();

class HomePage extends BasePage<IHomeProps, IHomePageState> {

  constructor(props) {
    super(props);
  }

  /**
   * 请求数据
   */
  requestData() {
    const {requestHomeData} = this.props;
    requestHomeData({
      type: 'test 4'
    });
  }

  /**
   * 设置是否允许滚动
   * @param bl
   * @private
   */
  _setScrollable = (bl: boolean) => {
    this.setState({
      scrollEnable: bl
    })
  };

  /**
   * 绘制内容
   */
  renderContent(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    if (data?.data == null) return null;

    const {bRefreshing} = this.props.reducerData;
    const scrollEnable = this.state?.scrollEnable ?? true;

    return (
      <View style={_styles.container}>

        <ScrollView
          scrollEnabled={scrollEnable}
          refreshControl={
            <RefreshControl
              refreshing={bRefreshing}
              onRefresh={() => {
                this.requestData();
              }}
            />
          }>
          <HomeBannerComponent reducerData={data}/>
          <HomeNoticeComponent reducerData={data}/>
          <HomeMyInfoComponent reducerData={data}/>
          <HomeGameComponent reducerData={data}
                             setScrollable={this._setScrollable}/>
          <HomeCouponComponent reducerData={data}/>
          <HomeNewsComponent reducerData={data}/>

        </ScrollView>

        <HomeRedBagComponent reducerData={data}/>
        <HomeFloatAdvComponent reducerData={data}/>

      </View>
    );
  }

  // componentDidMount(): void {
  //   super.componentDidMount();
  //   BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
  // }
  //
  // /**
  //  * 返回关闭Android Root界面
  //  */
  // _onBackAndroid = () => {
  //   BackHandler.exitApp();
  //   return true;
  // };
  //
  // componentWillUnmount(): void {
  //   BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
  // }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },


});


/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export interface IHomeProps extends IGlobalProps{
  requestHomeData?: (params: requestHomeDataParams) => ((dis)=>{});   //action方法 请求首页数据方法
  requestUserInfo?: (s: string) => ((dis)=>{});   //action方法 请求用户信息

}


/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export interface IHomePageState extends IBasePageState{
  scrollEnable?: boolean, // scrollView 是否可以滑动
  gameTabIndex?: number, // 选中的gameTab
}


/**
 * 当前所使用到的 Action方法
 */
const _mapDispatchToProps = ({
  requestHomeData: requestHomeData,
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
    reducerData: state.homeReducer
  }
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(HomePage)
