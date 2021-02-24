import {FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import Icon from 'react-native-vector-icons/FontAwesome';
import PushHelper from "../../../../../../public/define/PushHelper";
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const RecommendLoveView = ({list, onPress}: { list: List[], onPress: (list: List) => void }) => {
    return list.length > 0 ? (
        <>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <UGText style={{fontWeight: "bold", color: '#333', fontSize: 18}}>猜你喜欢</UGText>
                <UGText style={{fontSize: 15, marginHorizontal: 10}}>|</UGText>
                <UGText style={{fontSize: 16, color: '#333', textAlign: "center"}}>你想玩的，这里都有</UGText>
            </View>
            <FlatList
                bounces={false}
                style={{marginTop: 10}}
                keyExtractor={(item, index) => `love-${index}`}
                numColumns={2}
                data={list}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback style={{flex: 1}} onPress={() => onPress(item)}>
                        {item.icon == "" ?
                            <Icon style={{flex: 1, height: 100, width: 100, margin: 5}} name={'image-inverted'}/> :
                            <Image style={{flex: 1, height: 100, width: 100, margin: 5, resizeMode: 'stretch'}}
                                   source={{uri: item.icon}}/>}
                    </TouchableWithoutFeedback>
                )}/>
        </>
    ) : (<></>)
}
