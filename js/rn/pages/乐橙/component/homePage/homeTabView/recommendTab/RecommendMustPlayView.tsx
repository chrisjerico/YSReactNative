import {Text, View} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../../../../public/define/PushHelper";
import {push} from "../../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../../public/navigation/Navigation";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../../redux/store/UGStore";
import useGetHomeInfo from "../../../../../../public/hooks/useGetHomeInfo";

export const RecommendMustPlayView = ({list, thirdPartGamePress}: { list: List[], thirdPartGamePress: (id: string, gameID?: string) => void }) => {
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontWeight: "bold", color: '#333', fontSize: 18}}>必玩</Text>
                <Text style={{fontSize: 15, marginHorizontal: 10}}>|</Text>
                <Text style={{fontSize: 16, color: '#333'}}>全民来玩</Text>
            </View>
            <ImageButton onPress={() => thirdPartGamePress(list[0].id, list[0].gameId)}
                         imgStyle={{height: 153, width: "100%"}}
                         uri={list[0].icon}/>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1, marginRight: 10}}
                             uri={list[1].icon} onPress={() => thirdPartGamePress(list[1].id, list[1].gameId)}/>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1}}
                             uri={list[2].icon} onPress={() => thirdPartGamePress(list[2].id, list[2].gameId)}/>
            </View>
        </>
    )
}
