import * as React from "react";
import {View, Text, FlatList, TouchableWithoutFeedback, Image} from "react-native";

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

export const HotLotteryView = () => {
    return (
        <View style={{padding: 10}}>
            <Text style={{fontSize: 18, color: '#3c3c3c', fontWeight: "bold"}}>热门彩种</Text>
            <FlatList
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={(item, key) => `hotLottery-${key}`}
                data={data}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback onPress={item.onPress}>
                        <Image source={{uri: item.uri}} style={{width: 100, height: 90, resizeMode: "stretch", flex: 1/3, margin: 5}}/>
                    </TouchableWithoutFeedback>
                )}/>
        </View>
    )
}
