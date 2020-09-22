import {FlatList, StyleSheet} from "react-native";
import * as React from "react";
import {List} from "../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../public/define/PushHelper";
import {fillArray} from "../../利来/utils/fillArray";
import {ImageButton} from "../../利来/component/ImageButton";
import {scale} from "../../../public/tools/Scale";
import {BYThemeColor} from "../../../public/theme/colors/BYThemeColor";
import CommStyles from "../../base/CommStyles";
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
  return (
    <FlatList scrollEnabled={false} style={CommStyles.flex}
              keyExtractor={(item, index) => `boardGame-${index}`}
              numColumns={1} data={list} renderItem={({item, index}) => {
      return (
        <ImageButton imgStyle={_styles.item}
                     uri={item.icon} onPress={() => onPress(item)}/>
      )
    }}/>
  )
}

const _styles = StyleSheet.create({
  item: {
    height: GAME_ITEM_HEIGHT,
    margin: scale(16),
    flex: 1,
  },
  icon: {
    width: scale(80),
    aspectRatio: 1,
    borderRadius: 999,
  },
  title: {
    fontWeight: 'bold',
    fontSize: scale(28),
    color: 'black',
  },
  hint: {
    fontSize: scale(18),
    color: 'grey',
  },
  hint_content: {
    fontSize: scale(18),
    color: BYThemeColor.白曜.textColor2
  },
  bt: {
    width: scale(120),
    fontSize: scale(18),
    color: 'white',
    borderRadius: 999,
  },
})
