import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import * as React from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {anyNull, arrayEmpty} from "../../../../utils/Ext";
import {Divider} from "react-native-elements";
import {Component} from "react";
import {Res} from "../../../../../res/Resources";
import UGTheme from "../../../../theme/UGTheme";
import IHomeProps from "../IHomeProps";
import IHomePageState from "../IHomePageState";
import {FlatGrid} from "react-native-super-grid";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页游戏列表
 */
export default class HomeGameComponent extends Component<IHomeProps, IHomePageState> {

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

  render(): React.ReactNode {
    return this._renderGames();
  }

}

const _styles = StyleSheet.create({

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

});
