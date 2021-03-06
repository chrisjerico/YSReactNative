import {FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {HomeGamesModel, Icon, List} from "../../../public/network/Model/HomeGamesModel";
import GameRowItem from "./GameRowItem";
import {anyLength} from "../../../public/tools/Ext";
import {scale} from "../../../public/tools/Scale";
import FastImage from "react-native-fast-image";
import {gameLeftColumnHeight, gameLeftColumnTopPadding} from "./GameColumn";
import {ugLog} from "../../../public/tools/UgLog";
import CommStyles from "../../base/CommStyles";
import {navigate} from "../../../public/navigation/RootNavigation";
import {PageName} from "../../../public/navigation/Navigation";
import { skinColors } from "../../../public/theme/const/UGSkinColor";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface GameRowProps {
  games?: HomeGamesModel,
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  listRef: any,
  clickItem?: (item: List) => void,
}

const _rightText = '查看全部 >';

/**
 * 游戏图标
 * @param games
 * @constructor
 */
const GameRow = ({
                   games,
                   onScroll,
                   listRef,
                   clickItem
                 }: GameRowProps) => {
  const icons = games?.data?.icons
  const iconsLength = anyLength(icons);
  const scrollHeight = iconsLength * gameLeftColumnHeight
    - (iconsLength - 3) * gameLeftColumnTopPadding;

  //绘制每一个条目
  const _renderItem = ({item, index}) => {

    //底部偏移距离，为了让左侧栏更美观
    let bottomStyle = index == iconsLength - 1
      ? {marginBottom: (iconsLength - 2) * gameLeftColumnHeight + 1}
      : {}

    return <View style={[_styles.itemContainer, bottomStyle]}>
      <View style={_styles.itemTitleContainer}>
        <View style={_styles.itemTitleDivider}/>
        <FastImage
          style={_styles.itemTitleFlag}
          source={{uri: 'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/icon_live.png'}}/>
        <UGText style={_styles.itemTitleText}>{item.name}</UGText>
        <View style={CommStyles.flex}/>
        <UGText style={_styles.itemTitleRightText}
              onPress={() => navigate(PageName.HJGameCategoryPage, {gameItem: item})}>
          {_rightText}
        </UGText>
      </View>
      <GameRowItem iconsItem={item} clickItem={clickItem}/>
    </View>
  };

  return (
    // <ScrollView
    //   nestedScrollEnabled={true}
    //   style={[_styles.flex, { height: scrollHeight }]}>
    //   {
    //     icons?.map((item: Icon, index) => <View style={_styles.itemContainer}>
    //       <View style={_styles.itemTitleContainer}>
    //         <View style={_styles.itemTitleDivider}/>
    //         <FastImage
    //           style={_styles.itemTitleFlag}
    //           source={{uri: 'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/icon_live.png'}}/>
    //         <UGText style={_styles.itemTitleText}>{item.name}</UGText>
    //         <View style={_styles.flex}/>
    //         <UGText style={_styles.itemTitleRightText}>{_rightText}</UGText>
    //       </View>
    //       <GameRowItem iconsItem={item}/>
    //     </View>)
    //   }
    // </ScrollView>
    <FlatList style={[CommStyles.flex, {height: scrollHeight}]}
              data={icons}
              ref={listRef}
              onScroll={onScroll}
              nestedScrollEnabled={true}
              renderItem={_renderItem}/>
  );
}

export const gameRowContentHeight = scale(240) //条目一行的高度

const _styles = StyleSheet.create({
  itemContainer: {
    marginRight: scale(24),
    height: gameRowContentHeight
  },
  itemTitleContainer: {
    flexDirection: 'row',
    height: scale(60),
    alignItems: 'center',
    marginBottom: scale(8),
  },
  itemTitleDivider: {
    flexDirection: 'row',
    width: scale(8),
    height: scale(60),
    backgroundColor: skinColors.themeColor.黑金
  },
  itemTitleFlag: {
    width: scale(60),
    height: scale(40),
    marginHorizontal: scale(8),
  },
  itemTitleText: {
    fontSize: scale(28),
    color: skinColors.themeColor.黑金,
    fontWeight: '300'
  },
  itemTitleRightText: {
    fontSize: scale(22),
    color: skinColors.textColor2.黑金
  },
});

export default GameRow;
