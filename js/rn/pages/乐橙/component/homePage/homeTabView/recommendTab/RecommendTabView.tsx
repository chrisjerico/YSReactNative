import * as React from "react";
import {View} from "react-native";
import {MonthlyBonus} from "../MonthlyBonus";
import {RecommendLoveView} from "./RecommendLoveView";
import {RecommendMustPlayView} from "./RecommendMustPlayView";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import useGetHomeInfo from "../../../../../../public/hooks/useGetHomeInfo";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../../redux/store/UGStore";
import PushHelper from "../../../../../../public/define/PushHelper";

export const RecommendTabView = ({list, thirdPartGamePress}: { list: List[], thirdPartGamePress: (id: string, gameID?: string) => void }) => {
    return (
        <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
            <RecommendMustPlayView thirdPartGamePress={thirdPartGamePress} list={list.slice(0, 3)}/>
            <MonthlyBonus/>
            <RecommendLoveView thirdPartGamePress={thirdPartGamePress} list={list.slice(3, list.length)}/>
        </View>
    )
}
