import {Text, View} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const RecommendMustPlayView = ({list, onPress}: { list: List[], onPress: (list: List) => void }) => {
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <UGText style={{fontWeight: "bold", color: '#333', fontSize: 18}}>必玩</UGText>
                <UGText style={{fontSize: 15, marginHorizontal: 10}}>|</UGText>
                <UGText style={{fontSize: 16, color: '#333'}}>全民来玩</UGText>
            </View>
            <ImageButton onPress={() => onPress(list[0])}
                         imgStyle={{height: 153, width: "100%"}}
                         uri={list[0].icon}/>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
                {list[1] && <ImageButton imgStyle={{width: 186, height: 117, flex: 1, marginRight: 10}}
                              uri={list[1].icon} onPress={() => onPress(list[1])}/>}
                {list[2] && <ImageButton imgStyle={{width: 186, height: 117, flex: 1}}
                              uri={list[2].icon} onPress={() => onPress(list[2])}/>}
            </View>
        </>
    )
}
