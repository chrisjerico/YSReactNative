import {Alert, AlertButton, Image, SafeAreaView, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import PushHelper from "../../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../../redux/model/全局/UGSysConfModel";
import {OCHelper} from "../../../../public/define/OCHelper/OCHelper";

export const HomeHeaderButtonBar = ({logoIcon}: { logoIcon: string }) => {
    const [serviceQQ, setServiceQQ] = useState("")

    useEffect(() => {
        getService()
    }, [])

    const getService = async () => {
        let data = await OCHelper.call("UGSystemConfigModel.currentConfig.serviceQQ1")
        setServiceQQ(data)
    }

    const onPress = () => {
        if (serviceQQ == "") {
            OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
        } else {
            Alert.alert('请选择QQ客服', null, [
                {
                    text: `QQ客服: ${serviceQQ}`,
                    onPress: () => {
                        OCHelper.call('CMCommon.goQQ:', [`serviceQQ`]);
                    },
                },
                {
                    text: '取消', style: 'cancel'
                }
            ]);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
            <View style={{flexDirection: "row", marginHorizontal: 16, marginVertical: 10, backgroundColor: "#FFFFFF"}}>
                <Image style={{width: 90, height: 28, resizeMode: "stretch"}}
                       source={{uri: logoIcon || 'https://a05front.wff9.com//cdn/A05FM/static/img/logo.9f6ba2be.png'}}/>
                <View style={{flex: 1}}/>
                <TouchableWithoutFeedback onPress={onPress}>
                    <Image style={{width: 30, height: 30}}
                           source={{uri: 'http://test05.6yc.com/views/mobileTemplate/20/images/zxkf2.png'}}/>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}
