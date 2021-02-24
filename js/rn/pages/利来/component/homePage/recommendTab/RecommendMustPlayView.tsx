import {Text, View} from "react-native";
import * as React from "react";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import {ImageButton} from "../../../../乐橙/component/ImageButton";
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const RecommendMustPlayView = ({list}: {list: List[]}) => {
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <UGText style={{fontWeight: "bold", color: '#333', fontSize: 18}}>必玩</UGText>
                <UGText style={{fontSize: 15, marginHorizontal: 10}}>|</UGText>
                <UGText style={{fontSize: 16, color: '#333'}}>全民来玩</UGText>
            </View>
            <ImageButton onPress={() => {
            }} imgStyle={{height: 153, width: "100%"}}
                         uri={list[0].icon}/>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1, marginRight: 10}}
                             uri={list[1].icon} onPress={() => {
                }}/>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1}}
                             uri={list[2].icon} onPress={() => {
                }}/>
            </View>
        </>
    )
}
