import * as React from "react";
import {View, Text, FlatList} from "react-native";
import { UGText } from '../../../../../doy/public/Button之类的基础组件/DoyButton'

export const WinningListView = ({data}: { data: any[] }) => {
    return (
        <FlatList
            keyExtractor={(item, index) => `winning-${index}`}
            style={{borderRadius: 10, height: 360, backgroundColor: "#ffffff", bottom:10}}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
                <View style={{flexDirection: "row", backgroundColor: "#ffffff"}}>
                    <UGText style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>用户名称</UGText>
                    <UGText style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>游戏名称</UGText>
                    <UGText style={{
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    }}>中奖金额</UGText>
                </View>
            )}
            data={data}
            renderItem={({item}) => {
                return (
                    <View style={{flexDirection: "row"}}>
                        <UGText style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.username}</UGText>
                        <UGText style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.type}</UGText>
                        <UGText style={{
                            flex: 1,
                            color: "#3c3c3c",
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        }}>{item.coin}</UGText>
                    </View>
                )
            }}/>
    )
}
