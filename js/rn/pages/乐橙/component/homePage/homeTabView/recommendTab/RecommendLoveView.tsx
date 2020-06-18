import {FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

export const RecommendLoveView = ({list}: {list: List[]}) => {
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <Text style={{fontWeight: "bold", color: '#333', fontSize: 18}}>猜你喜欢</Text>
                <Text style={{fontSize: 15, marginHorizontal: 10}}>|</Text>
                <Text style={{fontSize: 16, color: '#333', textAlign: "center"}}>你想玩的，这里都有</Text>
            </View>
            <FlatList bounces={false} style={{marginTop: 10}} keyExtractor={(item, index) => `love-${index}`}
                      numColumns={2} data={list}
                      renderItem={({item}) => (
                          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
                          }}>
                              <Image style={{flex: 1, height: 100, width: 100, margin: 5, resizeMode: 'stretch'}}
                                     source={{uri: item.icon}}/>
                          </TouchableWithoutFeedback>
                      )}/>
        </>
    )
}
