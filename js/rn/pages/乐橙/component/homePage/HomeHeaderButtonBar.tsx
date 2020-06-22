import {SafeAreaView, View} from "react-native";
import {LoginButtonBar} from "./LoginButtonBar";
import * as React from "react";

export const HomeHeaderButtonBar = () => {
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
            <View style={{flexDirection: "row", marginHorizontal: 10, backgroundColor: "#FFFFFF"}}>
                <View style={{flex: 1}}/>
                <LoginButtonBar/>
            </View>
        </SafeAreaView>
    )
}
