import {SafeAreaView, View, Image, ImageSourcePropType, TouchableWithoutFeedback} from "react-native";
import * as React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeHeaderButtonBar = ({logoIcon}: { logoIcon: string }) => {
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
            <View style={{flexDirection: "row", marginHorizontal: 16, marginVertical: 10, backgroundColor: "#FFFFFF"}}>
                <Image style={{width: 90, height: 28}}
                       source={{uri: 'https://a05front.wff9.com//cdn/A05FM/static/img/logo.9f6ba2be.png'}}/>
                <View style={{flex: 1}}/>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <Image style={{width: 30, height: 30}}
                           source={{uri: 'http://test05.6yc.com/views/mobileTemplate/20/images/zxkf2.png'}}/>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}
