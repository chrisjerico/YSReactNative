import {BaseScreen} from "../BaseScreen";
import * as React from "react";
import {View, Text} from "react-native";

const LXBView = () => {
    return (
        <BaseScreen style={{backgroundColor: "#ffffff"}} screenName={"利息宝"} icon={'home'}>
            <View style={{alignItems: 'center', marginVertical: 20}}>
                <Text style={{color: "#333333", fontSize: 14, marginVertical: 10}}>今日收益(元)</Text>
                <Text style={{fontSize: 30, color: "#333333", fontWeight: "bold", paddingBottom: 10}}>0</Text>
                <View style={{flexDirection: "row", paddingBottom: 10}}>
                    <Text style={{color: "#333333", fontSize: 14}}>利息宝余额：</Text>
                    <Text style={{color: "#F70C0D", fontSize: 14}}>0.0000000000元</Text>
                    <Text style={{color: "#333333", fontSize: 14}}>,年化率：</Text>
                    <Text style={{color: "#F70C0D", fontSize: 14}}>12%</Text>
                </View>
                <View style={{flexDirection: "row", paddingBottom: 10}}>
                    <Text style={{color: "#333333", fontSize: 14}}>体验金：</Text>
                    <Text style={{color: "#F70C0D", fontSize: 14}}>0.00元</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", borderTopWidth: 1, borderColor: "#DEDEDE", borderBottomWidth: 1}}>
                <View style={{height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>本周收益</Text>
                </View>
                <View style={{
                    flex: 1 / 3,
                    alignItems: "center",
                    borderColor: "#DEDEDE",
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    justifyContent: "center"
                }}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>本月收益</Text>
                </View>
                <View style={{height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>
                        总收益
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: "row", borderColor: "#DEDEDE", borderBottomWidth: 1}}>
                <View style={{height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>本周收益</Text>
                </View>
                <View style={{
                    flex: 1 / 3,
                    alignItems: "center",
                    borderColor: "#DEDEDE",
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    justifyContent: "center"
                }}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>本月收益</Text>
                </View>
                <View style={{height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 14, color: "#47535B", paddingBottom: 20}}>0</Text>
                    <Text style={{fontSize: 14, color: "#47535B"}}>
                        总收益
                    </Text>
                </View>
            </View>
        </BaseScreen>
    )
}

export default LXBView
