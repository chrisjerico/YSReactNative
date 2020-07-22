import {SafeAreaView, View, Image, Text} from "react-native";
import {LoginButtonBar} from "./LoginButtonBar";
import * as React from "react";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../redux/store/UGStore";
import FastImage from "react-native-fast-image";
import {useEffect} from "react";

export const HomeHeaderButtonBar = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {balance, uid} = userStore
    const sysStore = useSelector((state: IGlobalState) => state.SysConfReducer)
    const { mobile_logo = "" } = sysStore
    useEffect(() => {
        console.log("uid:" ,uid)
    }, [uid])
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
            <View style={{flexDirection: "row", marginHorizontal: 10, backgroundColor: "#FFFFFF"}}>
                <FastImage resizeMode={'contain'} style={{ width: 127, height: 40 }} source={{ uri: mobile_logo }} />
                <View style={{flex: 1}}/>
                {!uid ? <LoginButtonBar/> :
                    <View style={{flexDirection: "row", alignItems: "center", height: 40}}>
                        <Image style={{width: 20, height: 20}}
                               source={{uri: "http://test10.6yc.com/views/mobileTemplate/19/images/coin.png"}}/>
                        <Text style={{marginLeft: 10}}>{balance || "0.000"}</Text>
                    </View>}
            </View>
        </SafeAreaView>
    )
}
