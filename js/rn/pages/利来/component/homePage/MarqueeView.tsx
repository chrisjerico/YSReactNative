import {Dimensions, Image, View} from "react-native";
import * as React from "react";
import {MarqueeHorizontal} from 'react-native-marquee-ab';
import Icon from "react-native-vector-icons/Foundation";

const width = Dimensions.get("screen").width

interface MarqueeViewProps {
    textArr: {label: string, value: string}[]
}

export const MarqueeView = ({textArr}: MarqueeViewProps) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            marginVertical: 6
        }}>
            <Icon size={20} style={{color: "red", marginLeft: 10}}  name={"volume"} />
            <MarqueeHorizontal
                textList={textArr}
                separator={width - 90}
                speed={60}
                width={width - 55}
                height={30}
                direction={'left'}
                reverse={false}
                textStyle={{fontSize: 16, color: '#FF0000'}}
                onTextClick={(item) => {
                    alert('' + JSON.stringify(item));
                }}
            />
        </View>
    )
}
