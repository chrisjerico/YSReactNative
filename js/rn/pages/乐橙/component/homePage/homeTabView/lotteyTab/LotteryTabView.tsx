import * as React from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {HotLotteryView} from "./HotLotteryView";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../../../../public/define/PushHelper";

export const LotteryTabView = ({list, onPress}: { list: List[], onPress: (list: List) => void }) => {
    return (
        <View>
            <View>
                <Image style={{width: "100%", height: "100%", flex: 1, resizeMode: 'cover', position: "absolute"}}
                       source={{uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/cpbg.png'}}/>
                <View style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
                    <TouchableWithoutFeedback onPress={() => onPress(list[0])}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{
                                flex: 1,
                                height: 88,
                                width: 150,
                                resizeMode: "stretch",
                            }} source={{uri: list[0].icon}}/>
                            <View style={{position: "absolute", alignSelf: "flex-start", left: 30}}>
                                <Text style={{
                                    fontSize: 17,
                                    color: '#ffffff',
                                    fontWeight: 'bold'
                                }}>{list[0].title}</Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#ffffff',
                                        marginTop: 22
                                    }}>{list[0].subtitle}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {list.length > 1 ? <TouchableWithoutFeedback onPress={() => onPress(list[1])}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{
                                flex: 1,
                                height: 88,
                                width: 150,
                                resizeMode: "stretch",
                            }} source={{uri: list[1].icon}}/>
                            <View style={{position: "absolute", alignSelf: "flex-start", left: 30}}>
                                <Text style={{
                                    fontSize: 17,
                                    color: '#ffffff',
                                    fontWeight: 'bold'
                                }}>{list[1].title}</Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#ffffff',
                                        marginTop: 22
                                    }}>{list[1].subtitle}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback> : <View style={{flex: 1}}/>}
                </View>
            </View>
            <HotLotteryView onPress={onPress} list={list.slice(3, list.length - 1)} />
        </View>
    )
}
