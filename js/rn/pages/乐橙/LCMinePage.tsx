import * as React from "react";
import {FlatList, View, Image, Text, TouchableOpacity} from "react-native";
import {BaseScreen} from "./component/BaseScreen";
import {CardView} from "./component/minePage/CardView";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from "react";
import APIRouter from "../../public/network/APIRouter";

const LCMinePage = () => {
    const [buttonList, setButtonList] = useState<any[]>([])
    useEffect(() => {
        APIRouter.user_centerList().then((result) => {
            debugger
            setButtonList(result)
            console.log(result);
        })
    }, [])

    return (
        <BaseScreen style={{backgroundColor: "#ffffff", flex: 1}} screenName={"我的"}>
            <CardView/>
            <FlatList
                style={{borderTopWidth: 1, borderTopColor: '#E0E0E0'}}
                keyExtractor={(item, index) => `mine-${index}`}
                data={[1, 2, 3,]}
                renderItem={() => (
                    <View style={{
                        flexDirection: "row",
                        flex: 1,
                        marginLeft: 20,
                        height: 47,
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0'
                    }}>
                        <TouchableOpacity style={{flexDirection: "row", flex: 1,}} onPress={() => {
                        }}>
                            <Image style={{height: 29, width: 29, marginRight: 10}}
                                   source={{uri: "http://test30.6yc.com/views/mobileTemplate/3/images/center/menu-betting.png?99"}}/>
                            <Text style={{alignSelf: "center", color: "#47535B", flex: 1}}>每日签到</Text>
                            <View style={{marginRight: 20}}>
                                <Icon size={20} name={'angle-right'}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}/>
        </BaseScreen>
    )
}

export default LCMinePage
