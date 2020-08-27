import {FlatList} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {fillArray} from "../../../../utils/fillArray";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

export const GameListView = ({list, onPress}: { list: List[], onPress: (list: List) => void }) => {
    return (
        <FlatList scrollEnabled={false} style={{flex: 1}} keyExtractor={(item, index) => `boardGame-${index}`}
                  numColumns={2} data={fillArray(list, 2)} renderItem={({item}) => {
            return (
                <ImageButton imgStyle={{height: 105, margin: 10, flex: 0.5}} uri={item.icon}
                             onPress={() => onPress(item)}/>
            )
        }}/>
    )
}
