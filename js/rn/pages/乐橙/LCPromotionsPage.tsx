import {Dimensions, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Navigation} from "../../public/navigation/Navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import * as React from "react";

export const LCPromotionsPage = () => {
    return (
        <View>
            <SafeAreaView style={{backgroundColor: "#ffffff", borderBottomColor: "#cccccc", borderBottomWidth: 1}}>
                <View style={{
                    width: Dimensions.get("screen").width,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                    height: 35,
                }}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 17,
                            alignSelf: "center"
                        }}>优惠活动</Text>
                    </View>
                    <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => Navigation.pop()}>
                        <Icon size={33} name={'home'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
