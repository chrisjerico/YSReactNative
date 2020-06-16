import * as React from "react";
import {View, Text, FlatList} from "react-native";

export const WinningListView = () => {
    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => `winning-${index}`}
                style={{borderRadius: 10, backgroundColor: "#ffffff"}}
                ListHeaderComponent={() => (
                    <View style={{flexDirection: "row"}}>
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
                        }}>游戏名称</Text>
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
                        }}>{item.account}</Text>
                        <Text style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.game}</Text>
                        <Text style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.price}</Text>
                    </View>
                )
            }}/>
        </View>
    )
}

const data = [
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
    {account: "aaa", game: "test", price: "100,000"},
]
