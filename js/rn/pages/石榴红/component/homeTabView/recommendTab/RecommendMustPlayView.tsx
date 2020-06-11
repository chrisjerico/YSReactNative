import {Text, View} from "react-native";
import {ImageButton} from "../../ImageButton";
import * as React from "react";

export const RecommendMustPlayView = () => {
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontWeight: "bold", color: '#333', fontSize: 18}}>必玩</Text>
                <Text style={{fontSize: 15, marginHorizontal: 10}}>|</Text>
                <Text style={{fontSize: 16, color: '#333'}}>全民来玩</Text>
            </View>
            <ImageButton onPress={() => {
            }} imgStyle={{height: 153, width: "100%"}}
                         uri={'http://test30.6yc.com/views/mobileTemplate/19/images/Baccarat.png'}/>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1, marginRight: 10}}
                             uri={'http://test30.6yc.com/views/mobileTemplate/19/images/Fishing.png'} onPress={() => {
                }}/>
                <ImageButton imgStyle={{width: 186, height: 117, flex: 1}}
                             uri={'http://test30.6yc.com/views/mobileTemplate/19/images/Sports.png'} onPress={() => {
                }}/>
            </View>
        </>
    )
}
