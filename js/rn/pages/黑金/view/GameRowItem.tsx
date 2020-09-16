import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {HomeGamesModel, Icon} from "../../../public/network/Model/HomeGamesModel";
import {anyLength} from "../../../public/tools/Ext";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import FastImage from "react-native-fast-image";
import {scale} from "../../../public/tools/Scale";

interface GameRowProps {
  iconsItem: Icon,
}

const GameRowItem = ({iconsItem}) => {
  const iconsLength = anyLength(iconsItem?.list);
  let datas = iconsItem?.list?.slice(0, iconsLength > 3 ? 3 : iconsLength);
  return (
    <View style={_styles.itemContainer}>
      {
        datas?.map(
          (item, index) => <FastImage
            style={_styles.item}
            source={{ uri: item.icon }}
          >
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
