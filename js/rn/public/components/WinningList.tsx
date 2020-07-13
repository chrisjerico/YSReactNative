import * as React from "react";
import {memo, useEffect, useRef} from "react";
import {FlatList, StyleProp, Text, View, ViewStyle} from "react-native";
import {List} from "../network/Model/RankListModel";

interface WinningListViewProps {
    data: List[],
    style?: StyleProp<ViewStyle>,
    contentContainerStyle?: StyleProp<ViewStyle>
}

export const WinningList = memo(({data, style = {}, contentContainerStyle = {}}: WinningListViewProps) => {
    let currentPosition = 0
    const itemHeight = 29.3
    let ticker = useRef()
    let activeInterval;

    useEffect(() => {
        startScrolls()
        return () => {
            clearInterval(activeInterval)
        }
    })

    const startScrolls = () => {
        activeInterval = setInterval(scrolling, 32);
    }

    const scrolling = () => {
        let current = currentPosition
        if (currentPosition < 0) {
            current = 0;
        }
        if (data.length > 10) {
            const position = current + 2;
            ticker.scrollToOffset({offset: position, animated: false});
            const maxOffset = data.length * itemHeight;
            if (current > maxOffset) {
                const offset = current - maxOffset;
                ticker.scrollToOffset({
                    offset,
                    animated: false,
                });
                currentPosition = offset
            } else {
                currentPosition = position
            }
        }
    }

    const getWrappedData = () => {
        const overlappingNo = getOverlappingNo();
        return {
            data: [...data, ...data.slice(0, overlappingNo)],
        };
    };

    const getOverlappingNo = () => {
        let overlappingNo = 10;
        if (data.length < 10) {
            overlappingNo = data.length;
        }
        return overlappingNo;
    };

    const {data: wrappedData} = getWrappedData();
    return data.length > 0 ? (
        <FlatList
            contentContainerStyle={contentContainerStyle}
            ListHeaderComponent={() => <View
                style={{backgroundColor: "white", flexDirection: "row", paddingHorizontal: 5, paddingVertical: 2}}>
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
            </View>}
            getItemLayout={(_, index) => ({
                length: data.length,
                offset: itemHeight * index,
                index,
            })}
            ref={(ref) => ticker = ref}
            showsHorizontalScrollIndicator={false}
            data={wrappedData}
            renderItem={({item, index}) =>
                <View style={{flexDirection: "row", paddingHorizontal: 5}}>
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
            }

            horizontal={false}
            style={[{
                width: '100%',
                height: 29.3 * data.length + 33.3 > 293 ? 293 + 33.3 : 293 * data.length + 33.3, //33.3 = headerComp 29.3 + margin 8
                flexGrow: 0,
                backgroundColor: "#ffffff",
                marginVertical: 8,
                borderRadius: 8
            }, style]}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) => item.type + index}
        />
    ) : <View/>
})

