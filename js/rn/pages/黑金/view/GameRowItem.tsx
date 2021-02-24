import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {HomeGamesModel, Icon, List} from "../../../public/network/Model/HomeGamesModel";
import {anyLength} from "../../../public/tools/Ext";
import FastImage from "react-native-fast-image";
import {scale} from "../../../public/tools/Scale";
import TouchableImage from "../../../public/views/temp/TouchableImage";
import {ugLog} from "../../../public/tools/UgLog";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface GameRowProps {
  iconsItem: Icon,
  clickItem?: (item: List) => void,
}

/**
 * 游戏图标条目
 * @param iconsItem
 * @constructor
 */
const GameRowItem = ({
                       iconsItem,
                       clickItem
                     }: GameRowProps) => {
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
          (item, index) => <TouchableWithoutFeedback onPress={() => clickItem(item)}>
            <FastImage
              style={_styles.item}
              source={{uri: item.icon}}>
              <UGText style={_styles.itemText}
                    numberOfLines={1} >{item.name}</UGText>
            </FastImage>
          </TouchableWithoutFeedback>
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
    borderRadius: scale(12),
  },
  itemText: {
    width: '100%',
    marginLeft: scale(4),
    marginBottom: scale(4),
    fontSize: scale(20),
    color: 'white',
    backgroundColor: '#00000022',
  },
});

export default GameRowItem;
