import {FlatList, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {List} from "../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../public/define/PushHelper";
import {fillArray} from "../../利来/utils/fillArray";
import {ImageButton} from "../../利来/component/ImageButton";
import {scale} from "../../../public/tools/Scale";
import {BYThemeColor} from "../../../public/theme/colors/BYThemeColor";
import CommStyles from "../../base/CommStyles";
import FastImage from "react-native-fast-image";
import {ugLog} from "../../../public/tools/UgLog";
import Button from "../../../public/views/temp/Button";
// import {ImageButton} from "../../../../乐橙/component/ImageButton";
// import {fillArray} from "../../../utils/fillArray";
// import {List} from "../../../../../public/network/Model/HomeGamesModel";
// import PushHelper from "../../../../../public/define/PushHelper";
// import {push} from "../../../../../public/navigation/RootNavigation";
// import {PageName} from "../../../../../public/navigation/Navigation";
// import {UGStore} from "../../../../../redux/store/UGStore";
// import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";

export const GAME_ITEM_HEIGHT = scale(130)

export const GameListView = ({list}: { list: List[] }) => {
  const onPress = (list: List) => {
    list.seriesId != '1' ? PushHelper.pushHomeGame(list) :
      list.gameId ?
        PushHelper.pushCategory(list.seriesId, list.gameId) :
        PushHelper.pushCategory(list.seriesId, list.subType[0]?.gameId)
  }

  const renderItem = ({item, index}) => {
    ugLog('item=', item)
    return <View style={_styles.item}>
      <FastImage style={_styles.icon}
                 resizeMode={'contain'}
                 source={{uri: item.icon}}/>
      <View style={CommStyles.flex}>
        <Text style={_styles.title}>
          {item.title}
        </Text>
        <View style={_styles.hint_content_layout}>
          <Text style={_styles.hint}>
            {item.name}
          </Text>
          <Text style={_styles.hint_content}>
            {Math.round(Math.random() * 10000) + '人在玩'}
          </Text>
        </View>
      </View>
      <Button title={'进入游戏'}
              containerStyle={_styles.bt_layout}
              titleStyle={_styles.bt_text}/>
    </View>
  }

  return (
    <FlatList scrollEnabled={false} style={CommStyles.flex}
              keyExtractor={(item, index) => `boardGame-${index}`}
              numColumns={1} data={list} renderItem={renderItem}/>
  )
}

const _styles = StyleSheet.create({
  item: {
    height: GAME_ITEM_HEIGHT,
    margin: scale(16),
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: '#9D9D9D33',
  },
  icon: {
    width: scale(80),
    aspectRatio: 1,
    marginRight: scale(16),
  },
  title: {
    fontWeight: 'bold',
    fontSize: scale(28),
    color: BYThemeColor.白曜.textColor1,
  },
  hint: {
    fontSize: scale(18),
    color: 'grey',
  },
  hint_content_layout: {
    flexDirection: "row",
  },
  hint_content: {
    marginLeft: scale(12),
    fontSize: scale(18),
    color: BYThemeColor.白曜.textColor2
  },
  bt_layout: {
    marginLeft: scale(16),
    paddingHorizontal: scale(26),
    paddingVertical: scale(6),
    fontSize: scale(18),
    borderRadius: 999,
    backgroundColor: BYThemeColor.白曜.themeColor
  },
  bt_text: {
    color: 'white',
    fontSize: scale(22),
  },
})
