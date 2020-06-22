import {Dimensions, Image, View} from "react-native";
import * as React from "react";
import {MarqueeHorizontal} from 'react-native-marquee-ab';

const width = Dimensions.get("screen").width

interface MarqueeViewProps {
    textArr: string[]
}

export const MarqueeView = ({textArr}: MarqueeViewProps) => {
    const getTextList = () => {
        return textArr.map((value, index) => {
                return {label: index.toString(), value}
            })
    }
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 20,
            marginVertical: 6
        }}>
            <Image style={{height: 15, width: 15, marginLeft: 10}}
                   source={{uri: 'https://flyclipart.com/thumb2/bulletin-board-bulletin-notice-icon-with-png-and-vector-format-586196.png'}}/>
            <MarqueeHorizontal
                textList={getTextList()}
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
