import {FlatList} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {fillArray} from "../../../../utils/fillArray";

export const GameListView = () => {
    return (
        <FlatList scrollEnabled={false} style={{flex: 1}} keyExtractor={(item, index) => `boardGame-${index}`}
                  numColumns={2} data={fillArray(data, 2)} renderItem={({item, index}) => {
            return (
                <ImageButton imgStyle={{height: 105, margin: 10, flex: 0.5}} uri={item.uri} onPress={item.onPress}/>
            )
        }}/>
    )
}

const data = [{
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
}, {
    uri: "http://test30.6yc.com/images/realLogo_8/23.png",
    onPress: () => {
    }
},]
