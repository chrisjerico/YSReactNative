import * as React from "react";
import {View, Text} from "react-native";

export const WinningListView = () => {
    return (
        <View>
            <View style={{flexDirection: "row", backgroundColor: "#ffffff", height: 358, borderRadius: 10}}>
                <Text style={{flex: 1, textAlign: "center", paddingVertical: 3}}>用户名称</Text>
                <Text style={{flex: 1, textAlign: "center", paddingVertical: 3}}>游戏名称</Text>
                <Text style={{flex: 1, textAlign: "center", paddingVertical: 3}}>游戏名称</Text>
            </View>
        </View>
    )
}
