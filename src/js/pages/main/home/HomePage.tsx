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

  /**
   * 个人菜单
   */
  myInfoMenuArr = [
    {
      url: Res.ck,
      text: '存款',
      onPress: () => {
        //TODO
      },
    }, {
      url: Res.edzh,
      text: '额度转换',
      onPress: () => {
        //TODO
      },
    }, {
      url: Res.qk,
      text: '取款',
      onPress: () => {
        //TODO
      },
    }, {
      url: Res.zjmx,
      text: '资金明细',
      onPress: () => {
        //TODO
      },
    }];

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
   * 广告跳转
   * @param adv
   * @private
   */
  _gotoBanner = (adv: IBannerDataItem) => {
    //TODO
  };

  /**
   * 绘制滑屏
   */
  _renderBanner(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const pics = data?.data?.banner?.data?.list;
    if (anyNull(pics)) return null;

    return (
      <View style={_styles.bannerWrapper} key={pics.toString()}>
        <UGSwiper>
          {
            pics.map((adv) => {
              return (
                <View key={adv.pic}
                      style={[
                        _styles.bannerContainer,
                        {backgroundColor: loadingBackground}
                      ]}>
                  <Image style={_styles.bannerImage} source={{uri: adv.pic}}/>
                </View>
              )
            })
          }
        </UGSwiper>
      </View>
    );
  }

  /**
   * 绘制 公告,信息 等等内容
   * @private
   */
  _renderNotice(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    let noticeArr = data?.data?.notice?.data?.scroll;
    if (arrayEmpty(noticeArr)) return null;

    return (
      <View style={_styles.noticeContainer} key='_renderNotice'>
        <Image resizeMode='stretch' style={_styles.noticeTextImage} source={Res.gd}/>
        <Text style={_styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
      </View>
    )
  }

  /**
   * 绘制存款 取款 等图标
   * @param url
   * @param text
   * @private
   */
  _renderMyInfoIcon = (item) => {
    return (
      <TouchableNativeFeedback onPress={item.onPress}>
        <View key={item.text}
              style={_styles.myInfoBottomWalletIconContainer}>
          <Image resizeMode='stretch' style={[
            _styles.myInfoBottomWalletIcon,
            {tintColor: primary}
          ]} source={item.url}/>
          <Text style={[
            _styles.myInfoBottomWalletIconText,
            {color: primary}
          ]}>{item.text}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  };

  /**
   * 跳转个人中心
   * @private
   */
  _gotoMyInfo = () => {
    //TODO
  };

  /**
   * 绘制 个个信息 存款 等等内容
   * @private
   */
  _renderMyInfo(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const userInfo = data?.data?.userInfo;
    if (anyNull(userInfo?.data)) return null;

    return (
      <View style={_styles.myInfoContainer} key='_renderMyInfo'>
        <View style={[
          _styles.myInfoTopContainer,
          {backgroundColor: primaryBright}
        ]}>
          <Text style={_styles.myInfoTopText}>{`晚上好，${userInfo.data.usr}`}</Text>
          <TouchableNativeFeedback onPress={this._gotoMyInfo}>
            <View style={_styles.myInfoTopButton}>
              <Text style={_styles.myInfoTopText}>个人资料</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={[
          _styles.myInfoBottomContainer,
          {backgroundColor: colorSecondBackground}
        ]}>
          <View>
            <View style={_styles.myInfoBottomWalletMoneyContainer}>
              <Text style={[
                _styles.myInfoBottomWalletMoneyFlag,
                {color: homeMoney}
              ]}>¥</Text>
              <Text style={[
                _styles.myInfoBottomWalletMoney,
                {color: homeMoney}
              ]}>{userInfo.data.balance}</Text>
            </View>
            <Text style={_styles.myInfoBottomWalletMe}>我的钱包</Text>
          </View>
          <Divider style={_styles.myInfoBottomWalletDivider}/>
          {
            this.myInfoMenuArr.map(this._renderMyInfoIcon)
          }
        </View>
      </View>
    )
  }

  /**
   * 切换tab
   * @param index
   * @private
   */
  _changeTab = (index: number) => {
    this.setState({
      gameTabIndex: index
    })
  };

  /**
   * 绘制 彩票、游戏、视讯 等等内容
   * @private
   */
  _renderGames(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const games = data?.data?.game?.data?.icons;
    if (arrayEmpty(games)) return null;

    let gameTabIndex = this.state?.gameTabIndex ?? 0;
    const menuArr = games.map((item) => {
      return {
        text: item.name,
        url: item.logo,
      }
    });
    const gameIcons = games[gameTabIndex].list;

    const tabHeight = 44;//每块高度
    const tabSpacing = 4;//间隙
    //game栏的总高度
    const gameContainerHeight = menuArr.length * (tabHeight + tabSpacing);

    return (
      <View style={[
        _styles.gameContainer,
        {height: gameContainerHeight}
      ]} key='_renderGames'>
        {/*左侧的栏目*/}
        <View>
          {
            menuArr.map((item, index) => {
              return (
                <TouchableNativeFeedback key={index}
                                         onPress={() => {
                                           this._changeTab(index)
                                         }}>
                  <View style={[
                    _styles.gameHeightLeftTab,
                    {
                      backgroundColor: gameTabIndex == index ? colorAccent : colorSecondBackground,
                      marginTop: tabSpacing,
                      height: tabHeight
                    }
                  ]}>
                    <Image source={{uri: item.url}} style={[
                      _styles.gameHeightLeftIcon,
                      {tintColor: gameTabIndex == index ? 'white' : colorAccent}
                    ]}/>
                    <Text style={[
                      _styles.gameHeightLeftText,
                      {color: gameTabIndex == index ? 'white' : colorAccent}
                    ]}>{item.text}</Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </View>
        {/*右侧的图标*/}
        <FlatGrid
          showsVerticalScrollIndicator={false}
          onTouchStart={() => {
            this.setState({
              scrollEnable: false
            })
          }}
          onTouchCancel={() => {
            this.setState({
              scrollEnable: true
            })
          }}
          spacing={tabSpacing}
          style={_styles.flatGrid}
          itemContainerStyle={[
            _styles.gameHeightRightTab,
            {height: tabHeight, backgroundColor: loadingBackground}
          ]}
          items={gameIcons}
          renderItem={({item}) => (
            <Image style={_styles.gameHeightTabImage} source={{uri: item.icon}} key={item.title}/>
          )}
        />
      </View>
    )
  }

  /**
   * 绘制优惠活动
   *
   * @private
   */
  _renderCoupon(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const coupon = data?.data?.coupon?.data;
    if (arrayEmpty(coupon?.list)) return null;

    return (
      <View key='_renderCoupon'>
        <View style={_styles.couponTitleContainer}>
          <Image style={_styles.couponTitleIcon} source={Res.yhhdIcon}/>
          <Text style={_styles.couponTitleText}>优惠活动</Text>
          <Text style={_styles.couponTitleText2}>查看更多</Text>
          <Image style={_styles.couponTitleArrow} source={Res.yhhdArraw}/>
        </View>
        {
          coupon.list.map((item, index) => (
            <View key={index}
                  style={[
                    _styles.couponItemContainer,
                    {backgroundColor: colorSecondBackground}
                  ]}>
              <Text style={_styles.couponItemTitle}>{item.title}</Text>
              <Image style={_styles.couponItemImage} source={{uri: item.pic}}/>
            </View>
          ))
        }
      </View>
    );
  }

  /**
   * 绘制投注专栏
   *
   * @private
   */
  _renderNews(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;

    return (
      <View key='_renderNews'>
        <View style={_styles.betTitleContainer}>
          <Text style={_styles.betTitle}>投注专栏</Text>
        </View>
        {
          data.data.movie.movies.map((movie, index) => (
            <View style={[
              _styles.betContainer,
              {backgroundColor: colorSecondBackground}
            ]} key={index}>
              <View style={_styles.betUserContainer}>
                <Avatar rounded containerStyle={_styles.betUserAvatar} source={Res.home}/>
                <Text style={_styles.betUserName}>j***01</Text>
                <Text style={_styles.betUserDate}>2020-02-12 11:28:44</Text>
              </View>
              <View style={_styles.betMessageContainer}>
                <Image style={_styles.betMessageImage} source={Res.home}/>
                <Text style={_styles.betMessageText}>{movie.title}
                  <Text style={_styles.betMessageText2}>¥100.00</Text>
                  <Text style={_styles.betMessageText}>{movie.title}</Text>
                </Text>
              </View>
            </View>
          ))
        }
      </View>
    );
  }

  /**
   * 绘制红包
   * @private
   */
  _rendRedBag(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const redBag = data?.data?.redBag;
    if (checkTrue(this.state?.hideRedBag) || anyNull(redBag.data)) return null;

    return (
      <View style={_styles.redContainer}>
        <Image style={_styles.redImage} source={{uri: redBag.data.redBagLogo}}/>
        <Icon name='x-circle'
              color={colorAccent} size={25}
              style={_styles.redImageClose}
              onPress={() => {
                this.setState({
                  hideRedBag: true,
                })
              }}/>
      </View>
    )
  }

  /**
   * 隐藏悬浮广告
   * @param index
   * @private
   */
  _hideFloatAd = (index: number) => {
    const hideArr = anyNull(this.state?.hideFloatAd) ? [false, false, false, false] : [...this.state.hideFloatAd];
    hideArr[index] = true;
    this.setState({
      hideFloatAd: hideArr
    })
  };

  /**
   * 显示某个广告
   * @param index 广告位置
   * @param arr 广告数据
   * @private
   */
  _showFloatAd = (index: number, arr: Array<IFloatAdBean>) => {
    return (
      arr.length > index && <View style={[
        _styles.floatAdItemContainer,
        {opacity: !anyNull(this.state?.hideFloatAd) && this.state.hideFloatAd[index] ? 0 : 100}
      ]}>
        <Image style={_styles.floatAdImage} source={{uri: arr[index].image}}/>
        <Icon name='x-circle'
              color={colorAccent} size={25}
              style={_styles.floatAdClose}
              onPress={() => {
                this._hideFloatAd(index);
              }}/>
      </View>
    );
  };

  /**
   * 绘制广告
   * @private
   */
  _rendFloatAd(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const floatAd = data?.data?.floatAd;
    if (arrayEmpty(floatAd.data)) return null;

    return (
      <View style={_styles.floatAdContainer}>
        <View>
          {
            this._showFloatAd(0, floatAd.data)
          }
          {
            this._showFloatAd(1, floatAd.data)
          }
        </View>
        <View>
          {
            this._showFloatAd(2, floatAd.data)
          }
          {
            this._showFloatAd(3, floatAd.data)
          }
        </View>
      </View>
    )
  }

  /**
   * 绘制内容
   */
  renderContent(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    if (data?.data == null) return null;

    // const {requestHomeData, requestUserInfo} = this.props;
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
          {
            this._renderBanner()
          }
          {
            this._renderNotice()
          }
          {
            this._renderMyInfo()
          }
          {
            this._renderGames()
          }
          {
            this._renderCoupon()
          }
          {
            this._renderNews()
          }
        </ScrollView>
        {
          this._rendRedBag()
        }
        {
          this._rendFloatAd()
        }

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

  //滑屏
  bannerWrapper: {
    aspectRatio: 343 / 153
  },
  bannerContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },

  //公告
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  noticeTextImage: {
    width: 27,
    height: 13,
    resizeMode: 'contain',
  },
  noticeDesText: {
    fontSize: 12,
    color: 'white',
    paddingLeft: 8,
    paddingRight: 8,
  },
  myInfoContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
  },

  //个人钱包
  myInfoTopContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  myInfoTopText: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  myInfoTopButton: {
    borderWidth: 1,
    borderRadius: 999,
    borderColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  myInfoBottomContainer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  myInfoBottomWalletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletMoneyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletMoneyFlag: {
    fontSize: 14,
  },
  myInfoBottomWalletMoney: {
    fontSize: 20,
  },
  myInfoBottomWalletMe: {
    fontSize: 12,
    marginTop: 6,
  },
  myInfoBottomWalletDivider: {
    width: 1,
    height: 38,
  },
  myInfoBottomWalletIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletIcon: {
    width: 24,
    height: 18,
  },

  myInfoBottomWalletIconText: {
    fontSize: 12,
    marginTop: 8,
  },

  //游戏彩票
  gameContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 12,
  },
  gameHeightLeftTab: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  gameHeightLeftIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    resizeMode: 'contain'
  },
  gameHeightLeftText: {
    fontSize: 12,
  },
  gameHeightTabImage: {
    flex: 1,
    borderRadius: 4,
    resizeMode: 'stretch'
  },
  flatGrid: {
    marginTop: 0,
    padding: 0,
    margin: 0,
  },
  gameHeightRightTab: {
    borderRadius: 4,
    aspectRatio: 116 / 92,
  },

  //优惠券
  couponTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  couponTitleIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  couponTitleText: {
    fontSize: 14,
    flex: 1,
    color: 'white'
  },
  couponTitleText2: {
    fontSize: 12,
    color: 'white'
  },
  couponTitleArrow: {
    width: 12,
    height: 12,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  couponItemContainer: {
    borderRadius: 4,
    padding: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12,
  },
  couponItemTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  couponItemImage: {
    height: 60,
    resizeMode: 'stretch'
  },

  //下注
  betTitleContainer: {
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  betTitle: {
    fontSize: 14,
    color: 'white',
  },
  betContainer: {
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12,
  },
  betUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  betUserAvatar: {
    width: 20,
    height: 20,
  },
  betUserName: {
    fontSize: 12,
    marginLeft: 12,
    flex: 1,
  },
  betUserDate: {
    fontSize: 12,
    marginLeft: 12,
  },
  betUser: {
    fontSize: 12,
  },
  betMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  betMessageImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  betMessageText: {
    fontSize: 18,
    flex: 1,
  },
  betMessageText2: {
    fontSize: 18,
    color: 'red',
  },

  //红包
  redContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: 150,
    right: 16,
  },
  redImage: {
    width: 60,
    height: 60,
    marginTop: 12,
    resizeMode: 'contain',
  },
  redImageClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  //悬浮广告
  floatAdContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 230,
    left: 16,
    right: 16,
  },
  floatAdItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  floatAdImage: {
    width: 120,
    height: 120,
    marginTop: 12,
    resizeMode: 'contain',
  },
  floatAdClose: {
    position: 'absolute',
    top: 0,
    right: 0,
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
