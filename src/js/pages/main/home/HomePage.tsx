import * as React from "react";
import {
  BackHandler,
  NativeModules,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text, TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import IHomeProps from "./IHomeProps";
import {Avatar, Button, Image, ListItem} from "react-native-elements";
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
const {grey, primaryDark, primaryBright} = UGTheme.getInstance().currentTheme();

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
                  {backgroundColor: primaryBright}
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
        <Text style={_styles.noticeText}>公告</Text>
        <Text style={_styles.noticeDesText}>欢迎来到UG测试平台，UG集团给你别人给不起的。</Text>
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
    const tabHeight = 60;//每块高度
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
                  onPress={()=>{
                    this.setState({
                      gameTabIndex: index
                    })
                  }}
                >
                  <View style={[
                    _styles.gameHeightLeftTab,
                    {backgroundColor: gameTabIndex == index ? primaryDark : primaryBright, marginTop: tabSpacing, height: tabHeight}
                  ]}>
                    <Text>{item}</Text>
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
            {height: tabHeight, backgroundColor: grey}
          ]}
          items={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
          renderItem={({item}) => (
            <Image resizeMode='stretch' containerStyle={_styles.gameHeightTabImage} source={Res.back}/>
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
      <ScrollView contentContainerStyle={_styles.scrollViewH}
                  horizontal={true}>
        {
          data.data.movies.map((movie, index) => (
            <ListItem
              key={index}
              title={movie.title}
              subtitle={movie.releaseYear}
              leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
              bottomDivider
            />
          ))
        }
      </ScrollView>
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
  noticeContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
  },
  noticeText: {
    fontSize: 12,
    color: 'white',
  },
  noticeDesText: {
    fontSize: 12,
    color: 'white',
    paddingLeft: 8,
    paddingRight: 8,
  },
  gameContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
  },
  gameHeightLeftTab: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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
  scrollViewH: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewV: {},
  button: {
    width: 140,
    margin: 4,
    marginTop: 40,
  },
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
  }
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
