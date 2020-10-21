import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {List} from "../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../public/define/PushHelper";
import {fillArray} from "../../利来/utils/fillArray";
import {ImageButton} from "../../利来/component/ImageButton";
import {scale} from "../../../public/tools/Scale";
import {LEFThemeColor} from "../../../public/theme/colors/LEFThemeColor";
import CommStyles from "../../base/CommStyles";
import FastImage from "react-native-fast-image";
import {ugLog} from "../../../public/tools/UgLog";
import Button from "../../../public/views/temp/Button";
import AntDesign from "react-native-vector-icons/AntDesign";
import {anyEmpty} from "../../../public/tools/Ext";
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
    // ugLog('item=', item)
    return <TouchableWithoutFeedback onPress={()=>onPress(item)}>
      <View style={_styles.container}>
        <View style={_styles.item}>
          <FastImage style={_styles.icon}
                     resizeMode={'stretch'}
                     source={{uri: item.icon}}/>
          <View style={CommStyles.flex}>
            <Text style={_styles.title}>
              {anyEmpty(item.name) ? item.title : item.name}
            </Text>
          </View>
          <AntDesign
            name={'right'}
            color={'grey'}
            size={scale(20)}
            // onPress={onPressLeftTool}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  }

  return (
    <FlatList scrollEnabled={false} style={[CommStyles.flex, _styles.list]}
              // columnWrapperStyle={_styles.row}
              keyExtractor={(item, index) => `boardGame-${index}`}
              numColumns={2} data={list} renderItem={renderItem}/>
  )
}

const _styles = StyleSheet.create({
  // row: {
  //   flex: 1,
  //   justifyContent: "space-around",
  // },
  list: {
    backgroundColor: 'white',
    padding: scale(4),
  },
  container: {
    flex: 1,
    height: GAME_ITEM_HEIGHT,
    maxWidth: '50%',
  },
  item: {
    margin: scale(4),
    flex: 1,
    paddingHorizontal: scale(4),
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#9D9D9D33',
    backgroundColor: '#f4f4f4'
  },
  icon: {
    width: scale(80),
    aspectRatio: 1,
    marginRight: scale(16),
  },
  title: {
    fontSize: scale(24),
    color: LEFThemeColor.乐FUN.textColor1,
  },
  hint: {
    fontSize: scale(18),
    color: 'grey',
  },
})
