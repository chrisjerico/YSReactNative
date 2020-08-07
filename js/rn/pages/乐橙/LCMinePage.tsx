import * as React from "react";
import { useEffect } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BaseScreen } from "./component/BaseScreen";
import { CardView } from "./component/minePage/CardView";
import Icon from 'react-native-vector-icons/FontAwesome';
import {IGlobalState, UGStore} from "../../redux/store/UGStore";
import useMemberItems from "../../public/hooks/useMemberItems";
import PushHelper from "../../public/define/PushHelper";
import useLoginOut from "../../public/hooks/useLoginOut";
import { PageName } from "../../public/navigation/Navigation";

const LCMinePage = () => {
    const userStore = UGStore.globalProps.userInfo;
    const {uid = ""} = userStore
    const {UGUserCenterItem} = useMemberItems()
    useEffect(() => {
        userStore && uid == "" && PushHelper.pushLogin()
    })
    const { loginOut } = useLoginOut(PageName.LCHomePage)

    return (
        <BaseScreen style={{ backgroundColor: "#ffffff", flex: 1 }} screenName={"我的"}>
            <ScrollView bounces={false}>
                <CardView />
                <SafeAreaView>
                    <FlatList
                        scrollEnabled={false}
                        style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20 }}
                        keyExtractor={(item, index) => `mine-${index}`}
                        data={UGUserCenterItem}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: "row",
                                flex: 1,
                                marginLeft: 20,
                                height: 47,
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: '#E0E0E0'
                            }}>
                                <TouchableOpacity style={{ flexDirection: "row", flex: 1, }} onPress={() => {
                                    PushHelper.pushUserCenterType(item.code)
                                }}>
                                    <Image style={{ height: 29, width: 29, marginRight: 10, resizeMode: "stretch" }}
                                        source={{ uri: item.logo }} />
                                    <Text style={{ alignSelf: "center", color: "#47535B", flex: 1 }}>{item.name}</Text>
                                    <View style={{ marginRight: 20 }}>
                                        <Icon size={20} name={'angle-right'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )} />
                    <TouchableOpacity onPress={loginOut} style={{ height: 55, backgroundColor: '#34343b', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10, marginBottom: 150 }}>
                        <Text style={{ color: 'white', fontSize: 21 }}>退出登录</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </BaseScreen>
    )
}

export default LCMinePage
