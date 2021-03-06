import * as React from "react";
import {View, Text, FlatList, TouchableWithoutFeedback, Image} from "react-native";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const HotLotteryView = ({list, onPress}: {
    list: List[], onPress: (list: List) => void
}) => {
  console.log("tetete", list.length)
    return (
        <View style={{padding: 10}}>
            <UGText style={{fontSize: 18, color: '#3c3c3c', fontWeight: "bold"}}>热门彩种</UGText>
            <FlatList
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={(item, key) => `hotLottery-${key}`}
                data={list}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback onPress={() => onPress(item)}>
                        <Image source={{uri: item.icon}}
                               style={{width: 100, height: 90, resizeMode: "stretch", flex: 1 / 3, margin: 5}}/>
                    </TouchableWithoutFeedback>
                )}/>
        </View>
    )
}
