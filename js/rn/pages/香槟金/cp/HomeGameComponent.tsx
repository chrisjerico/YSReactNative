import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {arrayEmpty} from '../../../public/tools/Ext';
import {FlatGrid} from 'react-native-super-grid';
import PushHelper from '../../../public/define/PushHelper';
import IGameBean, {IGameIconListItem} from '../../../redux/model/home/IGameBean';
import {UGColor} from '../../../public/theme/UGThemeColor';
import {Skin1} from '../../../public/theme/UGSkinManagers';

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
interface IHomeGameProps {
  setScrollable?: (bl: boolean) => void; //设置是否滚动
  reducerData: IGameBean;
}

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
interface IHomeGameState {
  gameTabIndex?: number; // 选中的gameTab
}

/**
 * 主页游戏列表
 */
export default class HomeGameComponent extends Component<IHomeGameProps, IHomeGameState> {
  // 点击了游戏图标
  didGameItemClick(item: IGameIconListItem) {
    // Todo 安卓
    PushHelper.pushHomeGame(item);
  }

  /**
   * 切换tab
   * @param index
   * @private
   */
  _changeTab = (index: number) => {
    this.setState({
      gameTabIndex: index,
    });
  };

  /**
   * 绘制 彩票、游戏、视讯 等等内容
   * @private
   */
  _renderGames(): React.ReactNode {
    const games = this.props.reducerData?.icons;
    if (arrayEmpty(games)) return null;

    let gameTabIndex = this.state?.gameTabIndex ?? 0;
    const menuArr = games.map((item) => {
      return {
        text: item.name,
        url: item.logo,
      };
    });
    const gameIcons = games[gameTabIndex].list;

    const tabHeight = 44; //每块高度
    const tabSpacing = 4; //间隙
    //game栏的总高度
    const gameContainerHeight = menuArr.length * (tabHeight + tabSpacing);

    return (
      <View style={[_styles.gameContainer, {height: gameContainerHeight}]} key="_renderGames">
        {/*左侧的栏目*/}
        <View>
          {menuArr.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this._changeTab(index);
                }}>
                <View
                  style={[
                    _styles.gameHeightLeftTab,
                    {
                      backgroundColor: gameTabIndex == index ? Skin1.themeColor : UGColor.placeholderColor2,
                      marginTop: tabSpacing,
                      height: tabHeight,
                    },
                  ]}>
                  <Image source={{uri: item.url}} style={[_styles.gameHeightLeftIcon, {tintColor: gameTabIndex == index ? 'white' : Skin1.themeColor}]} />
                  <Text style={[_styles.gameHeightLeftText, {color: gameTabIndex == index ? 'white' : Skin1.themeColor}]}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {/*右侧的图标*/}
        <FlatGrid
          showsVerticalScrollIndicator={false}
          onTouchStart={() => {
            this.props.setScrollable(false);
          }}
          onTouchCancel={() => {
            this.props.setScrollable(true);
          }}
          spacing={tabSpacing}
          style={_styles.flatGrid}
          itemContainerStyle={[_styles.gameHeightRightTab, {height: tabHeight, backgroundColor: UGColor.placeholderColor2}]}
          items={gameIcons}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.didGameItemClick(item);
              }}>
              <Image style={_styles.gameHeightTabImage} source={{uri: item.icon}} key={item.title} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
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
    resizeMode: 'contain',
  },
  gameHeightLeftText: {
    fontSize: 12,
  },
  gameHeightTabImage: {
    flex: 1,
    borderRadius: 4,
    resizeMode: 'stretch',
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
