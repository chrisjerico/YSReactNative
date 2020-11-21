import {TextInput, View} from "react-native";
import * as React from "react";
import {Icon} from "react-native-elements"

export const RegisterItem = ({config, placeHolder, iconName, iconType = "font-awesome", onChangeText}: { config?: any, placeHolder: string, iconName: string, iconType?: string, onChangeText: (text) => void }) => {
    return (
        <>
            {config === false || config == 0 || config == "0" ?
                <></> :
                <View style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    borderWidth: 1,
                    paddingHorizontal: 12,
                    borderColor: "#ddd",
                    marginTop: 12
                }}>
                    <Icon type={iconType} size={25} color={"gold"} name={iconName}/>
                    <TextInput onChangeText={(text) => onChangeText(text)} placeholder={placeHolder}
                               style={{flex: 1, marginLeft: 12}}/>
                </View>
            }
        </>)
}
