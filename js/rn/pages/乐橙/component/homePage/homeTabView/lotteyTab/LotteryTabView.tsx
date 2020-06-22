import * as React from "react";
import {FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {HotLotteryView} from "./HotLotteryView";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

const lottery = [
    {
        title: "重庆时时彩",
        subTitle: "每日开奖",
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/rmcp.png',
        onPress: () => {
        }
    },
    {
        title: "腾讯时时彩",
        subTitle: "每日开奖",
        uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/txcp.png',
        onPress: () => {
        }
    }
]

export const LotteryTabView = ({list}: {list: List[]}) => {
    return (
        <View>
            <View>
                <Image style={{width: "100%", height: "100%", flex: 1, resizeMode: 'cover', position: "absolute"}}
                       source={{uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/cpbg.png'}}/>
                <FlatList contentContainerStyle={{marginVertical: 10}} bounces={false} numColumns={2}
                          keyExtractor={(item, index) => `lottery-${index}`} data={lottery}
                          renderItem={({item}) => (
                              <TouchableWithoutFeedback style={{flex: 1}} onPress={item.onPress}>
                                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                      <Image style={{
                                          flex: 1,
                                          height: 88,
                                          width: 150,
                                          resizeMode: "stretch",
                                      }} source={{uri: item.uri}}/>
                                      <View style={{position: "absolute", alignSelf: "flex-start", left: 30}}>
                                          <Text style={{
                                              fontSize: 17,
                                              color: '#ffffff',
                                              fontWeight: 'bold'
                                          }}>{item.title}</Text>
                                          <Text
                                              style={{
                                                  fontSize: 13,
                                                  color: '#ffffff',
                                                  marginTop: 22
                                              }}>{item.subTitle}</Text>
                                      </View>
                                  </View>
                              </TouchableWithoutFeedback>
                          )}/>
            </View>
            <HotLotteryView/>
        </View>
    )
}
