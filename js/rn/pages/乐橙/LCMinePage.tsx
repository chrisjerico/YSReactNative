import * as React from "react";
import {useEffect} from "react";
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import {BaseScreen} from "./component/BaseScreen";
import {CardView} from "./component/minePage/CardView";
import Icon from 'react-native-vector-icons/FontAwesome';
import {UGStore} from "../../redux/store/UGStore";
import useMemberItems from "../../public/hooks/useMemberItems";
import PushHelper from "../../public/define/PushHelper";
import useLoginOut from "../../public/hooks/useLoginOut";
import {PageName} from "../../public/navigation/Navigation";
import LinearGradient from "react-native-linear-gradient";

const LCMinePage = () => {
    const userStore = UGStore.globalProps.userInfo;
    const {uid = ""} = userStore
    const {UGUserCenterItem} = useMemberItems()
    useEffect(() => {
        userStore && uid == "" && PushHelper.pushLogin()
    })
    const {loginOut} = useLoginOut(PageName.LCHomePage)

    return (
        <BaseScreen style={{backgroundColor: "#ffffff", flex: 1}} screenName={"我的"}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <CardView/>
                <SafeAreaView>
                    <FlatList
                        scrollEnabled={false}
                        style={{borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20}}
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
                                <TouchableWithoutFeedback style={{flexDirection: "row", flex: 1,}} onPress={() => {
                                    PushHelper.pushUserCenterType(item.code)
                                }}>
                                    <>
                                        <Image style={{height: 29, width: 29, marginRight: 10, resizeMode: "stretch"}}
                                               source={{uri: item.logo}}/>
                                        <Text
                                            style={{alignSelf: "center", color: "#47535B", flex: 1}}>{item.name}</Text>
                                        <View style={{marginRight: 20}}>
                                            <Icon size={20} name={'angle-right'}/>
                                        </View>
                                    </>
                                </TouchableWithoutFeedback>
                            </View>
                        )}/>
                    <LinearGradient
                        style={{marginTop: 10, marginBottom: 90, height: 55, borderRadius: 8, marginHorizontal: 20}}
                        colors={["#df830f", "#ffc200"]}>
                        <TouchableWithoutFeedback onPress={loginOut} style={{
                            height: 55,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                        }}>
                            <Text style={{color: 'white', fontSize: 21}}>退出登录</Text>
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                </SafeAreaView>
            </ScrollView>
        </BaseScreen>
    )
}

export default LCMinePage
