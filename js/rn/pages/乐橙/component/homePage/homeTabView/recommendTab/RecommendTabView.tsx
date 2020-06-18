import * as React from "react";
import {Dimensions, View} from "react-native";
import {MonthlyBonus} from "../MonthlyBonus";
import {RecommendLoveView} from "./RecommendLoveView";
import {RecommendMustPlayView} from "./RecommendMustPlayView";
import {useEffect, useRef} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";

export const RecommendTabView = ({list}: {list: List[]}) => {
    return (
        <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
            <RecommendMustPlayView list={list.slice(0, 3)}/>
            <MonthlyBonus bonus={'10,769,492.44'}/>
            <RecommendLoveView list={list.slice(3, list.length)}/>
        </View>
    )
}
