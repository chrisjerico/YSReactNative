import * as React from "react";
import {TouchableWithoutFeedback, View, Text} from "react-native";

export const LoginButtonBar = () => {
    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableWithoutFeedback onPress={() => {
            }}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>登录</Text>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9}}/>
            <TouchableWithoutFeedback onPress={() => {
            }}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>注册</Text>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9}}/>
            <TouchableWithoutFeedback onPress={() => {
            }}>
                <Text style={{color: "#333", fontSize: 17.6, lineHeight: 24.6}}>试玩</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
