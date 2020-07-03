import * as React from "react";
import {View, Text, FlatList, TouchableWithoutFeedback, Image} from "react-native";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

const data = [
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
    {
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bjsc.png', onPress: () => {
        }
    },
]

export const HotLotteryView = ({list, thirdPartGamePress}: {
    list: List[], thirdPartGamePress:
        (id: string, gameID?: string) => void
}) => {
    return (
        <View style={{padding: 10}}>
            <Text style={{fontSize: 18, color: '#3c3c3c', fontWeight: "bold"}}>热门彩种</Text>
            <FlatList
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={(item, key) => `hotLottery-${key}`}
                data={list}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback onPress={() => thirdPartGamePress(item.id, item.gameId)}>
                        <Image source={{uri: item.icon}}
                               style={{width: 100, height: 90, resizeMode: "stretch", flex: 1 / 3, margin: 5}}/>
                    </TouchableWithoutFeedback>
                )}/>
        </View>
    )
}
