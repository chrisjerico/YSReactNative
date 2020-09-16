import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {HomeGamesModel, Icon} from "../../../public/network/Model/HomeGamesModel";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import {scale} from "../../../public/tools/Scale";
import FastImage from "react-native-fast-image";
import PushHelper from "../../../public/define/PushHelper";
import TouchableImage from "../../../public/views/tars/TouchableImage";
import {ugLog} from "../../../public/tools/UgLog";

interface GameRowProps {
  games?: HomeGamesModel,
  selectGameIndex?: number,
}

/**
 * 游戏图标
 * @param games
 * @constructor
 */
const GameColumn = ({games, selectGameIndex}: GameRowProps) => {
  const icons = games?.data?.icons;

  return (
    <View>
      {
        icons?.map((item: Icon, index) => {
          let topStyle = index > 0 ? {marginTop: scale(-16)} : {};

          return <View style={[_styles.itemContainer, topStyle]}>
            <TouchableImage
              containerStyle={_styles.item}
              key={index}
              pic={ index == selectGameIndex
                ? 'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/tab_golden_active.png'
                  : 'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/tab_golden.png'}
              resizeMode={'contain'}
              onPress={() => {
                // PushHelper.pushCategory(linkCategory, linkPosition)
              }} />
            <Text style={_styles.itemTitleText}>{item.name}</Text>
          </View>
        })
      }
    </View>
  );
}

export const gameLeftColumnHeight = scale(154);//游戏左侧条目高度

const _styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  item: {
    width: scale(60),
    height: gameLeftColumnHeight,
  },
  itemTitleText: {
    width: scale(47),
    height: scale(120),
    position: 'absolute',
    fontSize: scale(24),
    color: 'white',
    textAlignVertical: 'center',
    marginHorizontal: scale(4),
    fontWeight: '300',
  },
});

export default GameColumn;
