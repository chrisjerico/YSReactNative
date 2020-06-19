import * as React from "react";
import {useEffect} from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {BaseScreen} from "./component/BaseScreen";
import {CardView} from "./component/minePage/CardView";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from "react-redux";
import {IGlobalState} from "../../redux/store/UGStore";
import useMemberItems from "../../public/hooks/useMemberItems";
import PushHelper from "../../public/define/PushHelper";

const LCMinePage = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {uid = ""} = userStore
    const {UGUserCenterItem} = useMemberItems()
    useEffect(() => {
        userStore && uid == "" && PushHelper.pushLogin()
    })


    return (
        <BaseScreen style={{backgroundColor: "#ffffff", flex: 1}} screenName={"我的"}>
            <ScrollView bounces={false}>
                <CardView/>
                <FlatList
                    scrollEnabled={false}
                    style={{borderTopWidth: 1, borderTopColor: '#E0E0E0', bottom: 30, marginTop: 20}}
                    keyExtractor={(item, index) => `mine-${index}`}
                    data={UGUserCenterItem}
                    renderItem={({item}) => (
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
                                PushHelper.pushUserCenterType(item.code)
                            }}>
                                <Image style={{height: 29, width: 29, marginRight: 10}}
                                       source={{uri: item.logo}}/>
                                <Text style={{alignSelf: "center", color: "#47535B", flex: 1}}>{item.name}</Text>
                                <View style={{marginRight: 20}}>
                                    <Icon size={20} name={'angle-right'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}/>
            </ScrollView>
        </BaseScreen>
    )
}

export default LCMinePage
