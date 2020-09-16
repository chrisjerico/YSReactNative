import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {HomeGamesModel, Icon, List} from "../../../public/network/Model/HomeGamesModel";
import {anyLength} from "../../../public/tools/Ext";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import FastImage from "react-native-fast-image";
import {scale} from "../../../public/tools/Scale";

interface GameRowProps {
  iconsItem: Icon,
}

/**
 * 游戏图标条目
 * @param iconsItem
 * @constructor
 */
const GameRowItem = ({iconsItem}: GameRowProps) => {
  const iconsLength = anyLength(iconsItem?.list);
  let datas = [];
  if (iconsLength > 0) {
    datas = [...iconsItem?.list?.slice(0, iconsLength > 3 ? 3 : iconsLength)]
    if (iconsLength < 3) {//小于3就补齐3位，render这里执行会有点影响绘制效率
      let count = 3 - iconsLength;
      while (count > 0) {
        datas = [
          ...datas,
          {}
        ];

        count--;
      }
    }
  }

  return (
    <View style={_styles.itemContainer}>
      {
        datas?.map(
          (item, index) => <FastImage
            style={_styles.item}
            source={{uri: item.icon}}>
            <Text style={_styles.itemText}>{item.title}</Text>
          </FastImage>
        )
      }

    </View>
  );
}

const _styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    marginHorizontal: scale(4),
    aspectRatio: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    borderRadius: scale(12),
  },
  itemText: {
    width: '100%',
    marginLeft: scale(4),
    marginBottom: scale(4),
    fontSize: scale(24),
    color: 'white',
    backgroundColor: '#00000022'
  },
});

export default GameRowItem;
