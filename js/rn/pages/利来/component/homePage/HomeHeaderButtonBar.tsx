import {Image, SafeAreaView, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {useEffect} from "react";
import PushHelper from "../../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../../redux/model/全局/UGSysConfModel";

export const HomeHeaderButtonBar = ({logoIcon}: { logoIcon: string }) => {
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
            <View style={{flexDirection: "row", marginHorizontal: 16, marginVertical: 10, backgroundColor: "#FFFFFF"}}>
                <Image style={{width: 90, height: 28, resizeMode: "stretch"}}
                       source={{uri: logoIcon || 'https://a05front.wff9.com//cdn/A05FM/static/img/logo.9f6ba2be.png'}}/>
                <View style={{flex: 1}}/>
                <TouchableWithoutFeedback onPress={() => {PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)}}>
                    <Image style={{width: 30, height: 30}}
                           source={{uri: 'http://test05.6yc.com/views/mobileTemplate/20/images/zxkf2.png'}}/>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}
