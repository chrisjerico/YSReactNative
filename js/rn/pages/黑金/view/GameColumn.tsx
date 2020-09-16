import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {HomeGamesModel, Icon} from "../../../public/network/Model/HomeGamesModel";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import {scale} from "../../../public/tools/Scale";
import FastImage from "react-native-fast-image";
import PushHelper from "../../../public/define/PushHelper";
import TouchableImage from "../../../public/views/tars/TouchableImage";

interface GameRowProps {
  games?: HomeGamesModel,
}

/**
 * 游戏图标
 * @param games
 * @constructor
 */
const GameColumn = ({games}: GameRowProps) => {
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
              pic={'http://voezv001isqzvyxl.playgame58.com/views/mobileTemplate/28/images/tab_golden.png'}
              resizeMode={'contain'}
              onPress={() => {
                // PushHelper.pushCategory(linkCategory, linkPosition)
              }}
            >

            </TouchableImage>
            <Text style={_styles.itemTitleText}>{item.name}</Text>
          </View>
        })
      }
    </View>
  );
}


const _styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: scale(49),
    height: scale(120),
  },
  itemTitleText: {
    position: 'absolute',
    fontSize: scale(24),
    color: 'white',
    marginHorizontal: scale(4),
    fontWeight: '300',
  },
});

export default GameColumn;
