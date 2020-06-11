import {Image, Text, View} from "react-native";
import * as React from "react";

interface MonthlyBonusProps {
    bonus: string
}
export const MonthlyBonus = ({bonus}: MonthlyBonusProps) => {
    return (
        <View style={{height: 54, marginTop: 10, alignItems: "center"}}>
            <Image style={{height: 44, width: "100%", resizeMode: "stretch", position: 'absolute', top: 6}}
                   source={{uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bonus.png'}}/>
            <Text style={{color: '#6666FF', fontSize: 12, fontWeight: "bold"}}>本月已发放红利</Text>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={{color: '#6666FF', fontSize: 20}}>{`￥ ${bonus}`}</Text>
            </View>
        </View>
    )
}
