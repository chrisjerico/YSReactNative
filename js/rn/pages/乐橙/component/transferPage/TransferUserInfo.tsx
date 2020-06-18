import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";

export const TransferUserInfo = () => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"}}>
            <View style={{flexDirection: "row", paddingVertical: 12, paddingHorizontal: 5}}>
                <View style={{width: 129, alignItems: "center"}}>
                    <Image style={{width: 76, height: 76}}
                           source={{uri: 'https://www.pngkey.com/png/detail/448-4483798_download-icon-user-png-clipart-computer-icons-user.png'}}/>
                </View>
                <View style={{marginVertical: 10}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: "#47535B",
                        marginBottom: 10
                    }}>ugrnezer</Text>
                    <View style={{flexDirection: 'row', alignItems: "center", marginBottom: 10}}>
                        <Text style={{fontSize: 14, color: "#64717A"}}>用户余额 ：</Text>
                        <Text style={{fontSize: 14, color: "#FF9900", fontWeight: "bold"}}>{`0.0000`}</Text>
                        <Text style={{fontSize: 14, color: "#64717A"}}> RMB</Text>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <Image style={{width: 20, height: 20, marginHorizontal: 4}}
                                   source={{uri: "http://test30.6yc.com/images/icon-refresh.png"}}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 14, color: "#64717A"}}>真实姓名 ：</Text>
                        <Text style={{fontSize: 14, color: "#FF9900", fontWeight: "bold"}}>{`測試人員`}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
