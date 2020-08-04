import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import * as React from "react";
import {useEffect, useState} from "react";

interface CheckBoxProps {
    onCheck: () => void
    style?: StyleProp<ViewStyle>
    iconColor?: string
    activeColor?: string
    unActiveColor?: string
    text?: string
}

export const CheckBox = ({onCheck, style, iconColor, activeColor, unActiveColor, text}: CheckBoxProps) => {
    const [active, setActive] = useState(false)
    useEffect(() => {
        active && onCheck()
    }, [active])

    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }} onPress={() => setActive(!active)}>
            <View style={[{
                width: 18,
                height: 18,
                borderColor: "#333",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: active ? activeColor || "#0175fe" : unActiveColor || "#ffffff"
            }, style]}>
                <Icon color={iconColor || "white"} name={"check"}/>
            </View>
            <Text style={{color: "#333333", paddingLeft: 8}}>{text}</Text>
        </TouchableOpacity>
    )
}
