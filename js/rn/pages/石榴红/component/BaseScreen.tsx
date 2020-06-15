import * as React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    StyleProp,
    ViewStyle
} from "react-native";
import {ImageButton} from "./ImageButton";
import {Res} from "../../../Res/icon/Resources";
import {Navigation} from "../../../public/navigation/Navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ReactChildren} from "react";

interface BaseScreenProps {
    children?: any
    screenName: string
    style?: StyleProp<ViewStyle>
}

export const BaseScreen = ({children, screenName, style}: BaseScreenProps) => {
    return (
        <View style={style}>
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
                        }}>{screenName}</Text>
                    </View>
                    <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => Navigation.pop()}>
                        <Icon size={33} name={'angle-left'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {children}
        </View>
    )
}
