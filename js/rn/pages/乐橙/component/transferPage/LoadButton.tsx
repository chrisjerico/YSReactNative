import {View, Text, TouchableWithoutFeedback} from "react-native";
import * as React from "react";
import {useState} from "react";

export const LoadButton = () => {
    const [money, setMoney] = useState('点击加载')
    return (
        <TouchableWithoutFeedback onPress={() => setMoney('加载失败')}>
            <View style={{height: 20, width: 52, borderRadius: 6, backgroundColor: money == '点击加载' ? "#FF9900" : "#ffffff", justifyContent: 'center'}}>
                <Text style={{paddingVertical: 2, paddingHorizontal: 1, fontSize: 12, color: money == '点击加载' ? "#ffffff" : "#000000"}}>{money}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
