import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import * as React from "react";
import {useEffect, useState} from "react";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface CheckBoxProps {
    isCheck: boolean
    onCheck: () => void
    style?: StyleProp<ViewStyle>
    iconColor?: string
    activeColor?: string
    unActiveColor?: string
    text?: string
}

export const CheckBox = ({isCheck, onCheck, style, iconColor, activeColor, unActiveColor, text}: CheckBoxProps) => {

    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }} onPress={() => {
            onCheck()
        }}>
            <View style={[{
                width: 18,
                height: 18,
                borderColor: "#333",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isCheck ? activeColor || "#0175fe" : unActiveColor || "#ffffff"
            }, style]}>
                <Icon color={iconColor || "white"} name={"check"}/>
            </View>
            <UGText style={{color: "#333333", paddingLeft: 8}}>{text}</UGText>
        </TouchableOpacity>
    )
}
