import {FlatList} from "react-native";
import * as React from "react";
import {ImageButton} from "../../../../乐橙/component/ImageButton";
import {fillArray} from "../../../utils/fillArray";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../../../public/define/PushHelper";
import {push} from "../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../public/navigation/Navigation";
import {UGStore} from "../../../../../redux/store/UGStore";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";

export const GameListView = ({list}: {list: List[]}) => {
    const onPress = (list: List) => {
        list.seriesId != '1' ? PushHelper.pushHomeGame(list) :
            list.gameId ?
                PushHelper.pushCategory(list.seriesId, list.gameId) :
                PushHelper.pushCategory(list.seriesId, list.subType[0]?.gameId)
    }
    return (
        <FlatList scrollEnabled={false} style={{height:375}} keyExtractor={(item, index) => `boardGame-${index}`}
                  numColumns={2} data={fillArray(list, 2)} renderItem={({item, index}) => {
            return (
                <ImageButton imgStyle={{height: 105, margin: 10, flex:1 }} uri={item.icon} onPress={() => onPress(item)}/>
            )
        }}/>
    )
}
