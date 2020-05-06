import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import HomeMyInfoComponent from './cp/HomeMyInfoComponent';
import HomeGameComponent from './cp/HomeGameComponent';
import HomeBannerComponent from './cp/HomeBannerComponent';
import HomeCouponComponent from './cp/HomeCouponComponent';
import HomeFloatAdvComponent from './cp/HomeFloatAdvComponent';
import HomeNewsComponent from './cp/HomeNewsComponent';
import HomeRedBagComponent from './cp/HomeRedBagComponent';
import HomeNoticeComponent from './cp/HomeNoticeComponent';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGBasePage from '../base/UGBasePage';
import {XBJHomeProps, XBJHomeStateToProps} from './XBJHomeProps';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import {ActionType} from '../../redux/store/ActionTypes';
import {UGLoadingType} from '../base/UGBasePageProps';

export interface IHomePageState {
  scrollEnable?: boolean; // scrollView 是否可以滑动
  gameTabIndex?: number; // 选中的gameTab
}

class XBJHomePage extends UGBasePage<XBJHomeProps, IHomePageState> {
  constructor(props) {
    super(props);
  }

  didFocus(params: XBJHomeProps): void { }
  
  /**
   * 请求数据
   */
  requestData() {
    this.setProps({status: UGLoadingType.Loading});

    IGlobalStateHelper.updateUserInfo();
    NetworkRequest1.homeInfo()
      .then(value => {
        this.setProps({...value, status: UGLoadingType.Success});
      })
      .catch(error => {
        this.setProps({status: UGLoadingType.Failed});
      });
  }

  /**
   * 设置是否允许滚动
   * @param bl
   * @private
   */
  _setScrollable = (bl: boolean) => {
    this.setState({
      scrollEnable: bl,
    });
  };

  /**
   * 绘制内容
   */
  renderContent(): React.ReactNode {
    const {banner, notice, userInfo, game, coupon, movie, redBag, floatAd} = this.props;
    if (banner == null) return null;

    const bRefreshing = false;
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
          <HomeBannerComponent reducerData={banner} />
          <HomeNoticeComponent reducerData={notice} />
          <HomeMyInfoComponent reducerData={userInfo} />
          <HomeGameComponent reducerData={game} setScrollable={this._setScrollable} />
          <HomeCouponComponent reducerData={coupon} />
          <HomeNewsComponent reducerData={movie} />
        </ScrollView>

        <HomeRedBagComponent reducerData={redBag} />
        <HomeFloatAdvComponent reducerData={floatAd} />
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
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(XBJHomeStateToProps)(XBJHomePage);
