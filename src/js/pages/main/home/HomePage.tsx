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
import {Avatar, Button, Divider, ListItem} from "react-native-elements";
import {requestHomeData} from "../../../redux/action/HomeAction";
import {Actions} from "react-native-router-flux";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/IHomeBean";
import Swiper from 'react-native-swiper'
import UGSwiper from "../../../widget/swp/UGSwiper";
import UGTheme from "../../../theme/UGTheme";
import AppDefine from "../../../../../js/rn/公共类/AppDefine";
import {requestUserInfo} from "../../../redux/action/Demo2Action";
import {anyNull} from "../../../utils/Ext";
import {FlatGrid} from "react-native-super-grid";
import IHomePageState from "./IHomePageState";
import {Res} from "../../../../res/Resources";

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
   * 绘制滑屏
   */
  _renderSwiper(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    return (
      <View style={_styles.wrapper}>
        <UGSwiper>
          {
            data.data.movies.map((movie) => {
              return (
                <View style={[
                  _styles.slide1,
                  {backgroundColor: loadingBackground}
                ]}>
                  <Text style={_styles.text}>{`${movie.title}\n${movie.releaseYear}`}</Text>
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
    return (
      <View style={_styles.noticeContainer}>
        <Text style={
          {..._styles.noticeText, color: primaryDark}
        }>公告</Text>
        <Text style={_styles.noticeDesText}>欢迎来到UG测试平台，UG集团给你别人给不起的。</Text>
      </View>
    )
  }

  _renderMyInfoIcon = ({url: url, text: text}) => {
    return (
      <View style={_styles.myInfoBottomWalletIconContainer}>
        <Image resizeMode='stretch' style={[
          _styles.myInfoBottomWalletIcon,
          {tintColor: primary}
        ]} source={url}/>
        <Text style={[
          _styles.myInfoBottomWalletIconText,
          {color: primary}
        ]}>{text}</Text>
      </View>
    )
  }

  /**
   * 绘制 个个信息 存款 等等内容
   * @private
   */
  _renderMyInfo(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const iconTexArr = [
      {
        url: Res.home,
        text: '存款',
      }, {
        url: Res.home,
        text: '额度转换',
      }, {
        url: Res.home,
        text: '取款',
      }, {
        url: Res.home,
        text: '资金明细',
      }];
    return (
      <View style={_styles.myInfoContainer}>
        <View style={[
          _styles.myInfoTopContainer,
          {backgroundColor: primaryBright}
        ]}>
          <Text style={_styles.myInfoTopText}>晚上好，adam</Text>
          <View style={_styles.myInfoTopButton}>
            <Text style={_styles.myInfoTopText}>个人资料</Text>
          </View>
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
              ]}>0.00</Text>
            </View>
            <Text style={_styles.myInfoBottomWalletMe}>我的钱包</Text>
          </View>
          <Divider style={_styles.myInfoBottomWalletDivider}/>
          {
            iconTexArr.map(this._renderMyInfoIcon)
          }
        </View>
      </View>
    )
  }

  /**
   * 绘制 彩票、游戏、视讯 等等内容
   * @private
   */
  _renderGames(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    let gameTabIndex = this.state?.gameTabIndex ?? 0;
    const menus = ['真人娱乐', '彩票投注', '电子竞技', '捕鱼电玩', '棋牌游戏', '体育游戏'];
    const tabHeight = 44;//每块高度
    const tabSpacing = 4;//间隙
    //game栏的总高度
    const gameContainerHeight = menus.length * tabHeight + (menus.length) * tabSpacing;

    return (
      <View style={[
        _styles.gameContainer,
        {height: gameContainerHeight}
      ]}>
        <View>
          {
            menus.map((item, index) => {
              return (
                <TouchableNativeFeedback
                  onPress={() => {
                    this.setState({
                      gameTabIndex: index
                    })
                  }}
                >
                  <View style={[
                    _styles.gameHeightLeftTab,
                    {
                      backgroundColor: gameTabIndex == index ? colorAccent : colorSecondBackground,
                      marginTop: tabSpacing,
                      height: tabHeight
                    }
                  ]}>
                    <Text style={[
                      _styles.gameHeightLeftText,
                      {color: gameTabIndex == index ? 'white' : colorAccent}
                    ]}>{item}</Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </View>
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
          items={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
          renderItem={({item}) => (
            <Image resizeMode='stretch' style={_styles.gameHeightTabImage} source={Res.back}/>
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
    return (
      <View>
        <View style={_styles.couponTitleContainer}>
          <Image style={_styles.couponTitleIcon} source={Res.home}/>
          <Text style={_styles.couponTitleText}>优惠活动</Text>
          <Text style={_styles.couponTitleText2}>查看更多</Text>
        </View>
        {
          data.data.movies.map((movie, index) => (
            <View style={[
              _styles.couponItemContainer,
              {backgroundColor: colorSecondBackground}
            ]}>
              <Text style={_styles.couponItemTitle}>优惠活动1</Text>
              <Image style={_styles.couponItemImage} source={Res.home}/>
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
      data.data.movies.map((movie, index) => (
        <ListItem
          key={index}
          title={movie.title}
          subtitle={movie.releaseYear}
          leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
          bottomDivider
        />
      ))
    );
  }

  /**
   * 绘制内容
   */
  renderContent(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const {requestHomeData, requestUserInfo} = this.props;
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
            this._renderSwiper()
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  //滑屏
  wrapper: {
    aspectRatio: 16 / 9
  },
  slide1: {
    flex: 1,
    margin: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
  noticeText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  gameHeightLeftText: {
    fontSize: 12,
  },
  gameHeightTabImage: {
    flex: 1,
    borderRadius: 4,
  },
  flatGrid: {
    padding: 0,
    margin: 0,
  },
  gameHeightRightTab: {
    borderRadius: 4,
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
