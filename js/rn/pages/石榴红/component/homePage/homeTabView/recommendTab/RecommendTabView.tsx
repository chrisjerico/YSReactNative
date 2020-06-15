import * as React from "react";
import {Dimensions, View} from "react-native";
import {MonthlyBonus} from "../MonthlyBonus";
import {RecommendLoveView} from "./RecommendLoveView";
import {RecommendMustPlayView} from "./RecommendMustPlayView";
import {useEffect, useRef} from "react";
import {useFocusEffect} from "@react-navigation/native";

export const RecommendTabView = () => {
    return (
        <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
            <RecommendMustPlayView/>
            <MonthlyBonus bonus={'10,769,492.44'}/>
            <RecommendLoveView/>
        </View>
    )
}
