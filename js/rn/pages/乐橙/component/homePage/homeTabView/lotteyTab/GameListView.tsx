import {FlatList, View} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {fillArray} from "../../../../utils/fillArray";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

export const GameListView = ({list, onPress}: { list: List[], onPress: (list: List) => void }) => {
    return (
        <FlatList
            style={{flex: 1}}
            scrollEnabled={false}
            keyExtractor={(item, index) => `boardGame-${index}`}
            numColumns={2} data={fillArray(list, 2)}
            renderItem={({item}) => {
                return item.icon && item.icon != "" ? (
                    <ImageButton imgStyle={{height: 145, marginVertical: 4, flex: 0.5}} uri={item.icon}
                                 onPress={() => onPress(item)}/>
                ) : (<View style={{height: 145, flex: 0.5}}/>)
            }}/>
    )
}
