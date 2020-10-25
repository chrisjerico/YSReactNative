import * as React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import HomeMyInfoComponent from './cp/HomeMyInfoComponent';
import HomeGameComponent from './cp/HomeGameComponent';
import HomeBannerComponent from './cp/HomeBannerComponent';
import HomeCouponComponent from './cp/HomeCouponComponent';
import HomeFloatAdvComponent from './cp/HomeFloatAdvComponent';
import HomeNewsComponent from './cp/HomeNewsComponent';
import HomeRedBagComponent from './cp/HomeRedBagComponent';
import HomeNoticeComponent from './cp/HomeNoticeComponent';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import { UGStore } from '../../redux/store/UGStore';
import { UGBasePageProps } from '../base/UGPage';
import IBannerAdvBean from '../../redux/model/home/IBannerAdvBean';
import INoticeBean from '../../redux/model/home/INoticeBean';
import IGameBean from '../../redux/model/home/IGameBean';
import ICouponBean from '../../redux/model/home/ICouponBean';
import IUserBean from '../../redux/model/user/IUserBean';
import IRedBagBean from '../../redux/model/home/IRedBagBean';
import IFloatAdBean from '../../redux/model/home/IFloatAdBean';
import ILotteryNumberBean from '../../redux/model/home/ILotteryNumberBean';
import { UGLoadingType, showLoading, hideLoading, showReload } from '../../public/widget/UGLoadingCP';


export interface IHomeBeanMovies {
  id?: string; //id
  title?: string; //标题
  releaseYear?: string; //发布年月
}

// 声明Props
export interface XBJHomeProps extends UGBasePageProps<XBJHomeProps> {
  lotteryNumber?: ILotteryNumberBean; // 六合彩
  banner?: IBannerAdvBean; //广告
  notice?: INoticeBean; //公告
  game?: IGameBean; //公告
  coupon?: ICouponBean; //优惠
  userInfo?: IUserBean; //个人信息
  redBag?: IRedBagBean; //红包
  floatAd?: Array<IFloatAdBean>; //悬浮广告

  movie?: {
    title?: string; //标题
    description?: string; //描述
    movies?: Array<IHomeBeanMovies>; //电影
  };
}

// UGStore.defaultGlobalProps.XBJHomeProps = {
//   navbarOpstions: { hidden: true },
//   tabbarOpetions: { unmountOnBlur: false },
// };


export interface IHomePageState {
  gameTabIndex?: number; // 选中的gameTab
}


export const XBJHomePage = (props: XBJHomeProps) => {
  const { setProps } = props;
  showLoading();
  const [scrollEnable, setScrollEnable] = React.useState<boolean>(true)


  function requestData() {
    IGlobalStateHelper.updateUserInfo();
    NetworkRequest1.homeInfo()
      .then(value => {
        hideLoading();
        setProps({ ...value });
      })
      .catch(error => {
        showReload(error);
      });
  }


  const { banner, notice, userInfo, game, coupon, movie, redBag, floatAd } = props;
  if (banner == null) return null;

  const bRefreshing = false;

  return (
    <View style={_styles.container}>
      <ScrollView
        scrollEnabled={scrollEnable}
        refreshControl={
          <RefreshControl
            refreshing={bRefreshing}
            onRefresh={() => {
              requestData();
            }}
          />
        }>
        <HomeBannerComponent reducerData={banner} />
        <HomeNoticeComponent reducerData={notice} />
        <HomeMyInfoComponent reducerData={userInfo} />
        <HomeGameComponent reducerData={game} setScrollable={(bl: boolean) => {
          setScrollEnable(bl);
        }} />
        <HomeCouponComponent reducerData={coupon} />
        <HomeNewsComponent reducerData={movie} />
      </ScrollView>

      <HomeRedBagComponent reducerData={redBag} />
      <HomeFloatAdvComponent reducerData={floatAd} />
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});