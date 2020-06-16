import {Dimensions, Image, ImageStyle, StyleProp, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import * as React from "react";
import {Icon} from "react-native-elements";

export const CardView = () => {
    return (
        <View style={{height: 300, width: Dimensions.get("screen").width}}>
            <Image style={{
                width: Dimensions.get("screen").width,
                height: "100%",
                resizeMode: "stretch",
                position: "absolute"
            }}
                   source={{uri: "http://test30.6yc.com/views/mobileTemplate/19/images/assetsBoxbg.png"}}/>
            <View style={{paddingTop: 20}}>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>ugrnezer</Text>
                    <View style={{marginLeft: 8, backgroundColor: "#84C1FF", borderRadius: 10}}>
                        <Text style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            paddingVertical: 2,
                            paddingHorizontal: 6
                        }}>VIP1</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: "flex-end"}} onPress={() => {
                    }}>
                        <Image style={{width: 84, height: 22, resizeMode: "stretch"}}
                               source={{uri: "http://test30.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png"}}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row"}}>
                    <Text style={{color: "#65727B", alignSelf: "center", marginRight: 10}}>余额 : </Text>
                    <Image source={{
                        width: 22,
                        height: 22,
                        uri: "http://test30.6yc.com/views/mobileTemplate/19/images/moneyicon.png"
                    }}/>
                </View>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row"}}>
                    <Text style={{
                        fontSize: 18,
                        paddingRight: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignSelf: "center"
                    }}>0.0000 RMB</Text>
                    <Icon name={"refresh"}/>
                </View>
                <View style={{flexDirection: "row", paddingHorizontal: 50, marginTop: 30, alignItems: "center"}}>
                    <CardButton uri={"http://test30.6yc.com/views/mobileTemplate/19/images/deposit.png"} text={"存款"}/>
                    <View style={{backgroundColor: "#9d9d9d", height: 40, width: 1}}/>
                    <CardButton imgStyle={{height: 39}}
                                uri={"http://test30.6yc.com/views/mobileTemplate/19/images/bet.png"}
                                text={"利息宝"}/>
                    <View style={{backgroundColor: "#9d9d9d", height: 40, width: 1}}/>
                    <CardButton uri={"http://test30.6yc.com/views/mobileTemplate/19/images/withdraw.png"} text={"提现"}/>
                </View>
            </View>
        </View>
    )
}

const CardButton = ({uri, text, imgStyle}: { uri: string, text: string, imgStyle?: StyleProp<ImageStyle> }) => {
    return (
        <View style={{alignItems: "center", flex: 1 / 3, height: "100%"}}>
            <View style={{height: 39, justifyContent: "center"}}>
                <Image style={[{width: 39, height: 30, resizeMode: "cover"}, imgStyle]}
                       source={{uri}}/>
            </View>
            <View style={{flex: 1}}/>
            <Text style={{marginTop: 20}}>{text}</Text>
        </View>
    )
}
