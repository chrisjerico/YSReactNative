import * as React from "react";
import {View, Text, FlatList} from "react-native";

export const WinningListView = ({data}: { data: any[] }) => {
    return (
        <FlatList
            keyExtractor={(item, index) => `winning-${index}`}
            style={{borderRadius: 10, height: 360, backgroundColor: "#ffffff", bottom:10}}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
                <View style={{flexDirection: "row", backgroundColor: "#ffffff"}}>
                    <Text style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>用户名称</Text>
                    <Text style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>游戏名称</Text>
                    <Text style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>中奖金额</Text>
                </View>
            )}
            data={data}
            renderItem={({item}) => {
                return (
                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.username}</Text>
                        <Text style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.type}</Text>
                        <Text style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.coin}</Text>
                    </View>
                )
            }}/>
    )
}
