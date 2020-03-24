import * as React from "react";
import {
  BackHandler,
  NativeModules,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text, TouchableNativeFeedback,
  Image,
  View
} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import IHomeProps from "./IHomeProps";
import {Avatar, Button, Divider, ListItem, Overlay, Tile} from "react-native-elements";
import {requestHomeData} from "../../../redux/action/HomeAction";
import {Actions} from "react-native-router-flux";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/home/IHomeBean";
import Swiper from 'react-native-swiper'
import UGSwiper from "../../../widget/swp/UGSwiper";
import UGTheme from "../../../theme/UGTheme";
import AppDefine from "../../../../../js/rn/公共类/AppDefine";
import {requestUserInfo} from "../../../redux/action/Demo2Action";
import {anyNull, arrayEmpty, checkTrue} from "../../../utils/Ext";
import {FlatGrid} from "react-native-super-grid";
import IHomePageState from "./IHomePageState";
import {Res} from "../../../../res/Resources";
import StringUtils from "../../../utils/StringUtils";
import Icon from 'react-native-vector-icons/Feather';
import IFloatAdBean from "../../../redux/inter/bean/home/IFloatAdBean";
import {IBannerDataItem} from "../../../redux/inter/bean/home/IBannerAdvBean";
import HomeMyInfoComponent from "./cp/HomeMyInfoComponent";
import HomeGameComponent from "./cp/HomeGameComponent";
import HomeBannerComponent from "./cp/HomeBannerComponent";
import HomeCouponComponent from "./cp/HomeCouponComponent";
import HomeFloatAdvComponent from "./cp/HomeFloatAdvComponent";
import HomeNewsComponent from "./cp/HomeNewsComponent";
import HomeRedBagComponent from "./cp/HomeRedBagComponent";
import HomeNoticeComponent from "./cp/HomeNoticeComponent";

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
          <HomeGameComponent reducerData={data}/>
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
