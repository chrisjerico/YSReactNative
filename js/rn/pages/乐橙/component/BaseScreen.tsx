import * as React from "react";
import {Dimensions, SafeAreaView, StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {Navigation} from "../../../public/navigation/Navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

interface BaseScreenProps {
    children?: any
    screenName: string
    style?: StyleProp<ViewStyle>
    icon?: 'angle-left' | 'home'
}

export const BaseScreen = ({children, screenName, style, icon}: BaseScreenProps) => {
    return (
        <View style={[{flex: 1}, style]}>
            <SafeAreaView style={{backgroundColor: "#ffffff", borderBottomColor: "#cccccc", borderBottomWidth: 1}}>
                <View style={{
                    backgroundColor: "#ffffff",
                    width: Dimensions.get("screen").width,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                }}>
                    <Text style={{
                        paddingTop: 20,
                        paddingBottom: 20,
                        textAlign: "center",
                        fontSize: 17,
                        width: "100%",
                        alignSelf: "center"
                    }}>{screenName}</Text>
                    <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => Navigation.pop()}>
                        <Icon size={33} name={icon || 'angle-left'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {children}
        </View>
    )
}
