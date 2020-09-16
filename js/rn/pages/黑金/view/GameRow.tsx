import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {HomeGamesModel, Icon} from "../../../public/network/Model/HomeGamesModel";
import GameRowItem from "./GameRowItem";
import {anyLength} from "../../../public/tools/Ext";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import {scale} from "../../../public/tools/Scale";
import FastImage from "react-native-fast-image";

interface GameRowProps {
  games?: HomeGamesModel,
}

const _rightText = '查看全部 >';

/**
 * 游戏图标
 * @param games
 * @constructor
 */
const GameRow = ({games}: GameRowProps) => {
  const icons = games?.data?.icons
  return (
    <View style={_styles.flex}>
      {
        icons?.map((item: Icon, index) => <View style={_styles.itemContainer}>
          <View style={_styles.itemTitleContainer}>
            <View style={_styles.itemTitleDivider}/>
            <FastImage
              style={_styles.itemTitleFlag}
              source={{uri: 'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/icon_live.png'}}/>
            <Text style={_styles.itemTitleText}>{item.name}</Text>
            <View style={_styles.flex}/>
            <Text style={_styles.itemTitleRightText}>{_rightText}</Text>
          </View>
          <GameRowItem iconsItem={item}/>
        </View>)
      }
    </View>
  );
}


const _styles = StyleSheet.create({
  itemContainer: {
    marginBottom: scale(32),
    marginRight: scale(24),
  },
  itemTitleContainer: {
    flexDirection: 'row',
    height: scale(60),
    alignItems: 'center',
    marginBottom: scale(8),
  },
  flex: {
    flex: 1,
  },
  itemTitleDivider: {
    flexDirection: 'row',
    width: scale(8),
    height: scale(60),
    backgroundColor: HJThemeColor.黑金.themeColor
  },
  itemTitleFlag: {
    width: scale(60),
    height: scale(40),
    marginHorizontal: scale(8),
  },
  itemTitleText: {
    fontSize: scale(28),
    color: HJThemeColor.黑金.themeColor,
    fontWeight: '300'
  },
  itemTitleRightText: {
    fontSize: scale(22),
    color: HJThemeColor.黑金.textColor2
  },
});

export default GameRow;
