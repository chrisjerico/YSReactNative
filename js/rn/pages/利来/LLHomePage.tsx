import {Dimensions, SafeAreaView, ScrollView, Text, View} from "react-native";
import * as React from "react";
import {HomeHeaderButtonBar} from "./component/homePage/HomeHeaderButtonBar";
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo";
import {HomeTabView} from "./component/homePage/HomeTabView";
import {ImageButton} from "./component/ImageButton";
import {WinningListView} from "./component/homePage/WinningListView";
import Icon from 'react-native-vector-icons/FontAwesome';
import PushHelper from "../../public/define/PushHelper";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../redux/store/UGStore";

const LLHomePage = () => {
    const {rankList} = useGetHomeInfo()
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {uid = ""} = userStore

    return (
        <ScrollView bounces={false} style={{flex: 1}}>
            <HomeHeaderButtonBar logoIcon={''}/>
            <HomeTabView/>
            <ImageButton
                imgStyle={{height: 131, width: Dimensions.get("screen").width - 16, marginHorizontal: 8, marginTop: 8}}
                onPress={() => {
                    uid === "" ?
                        PushHelper.pushLogin() :
                        PushHelper.pushUserCenterType(5)
                }} uri={'http://test05.6yc.com/views/mobileTemplate/20/images/llhhr.png'}/>
            <SafeAreaView style={{marginHorizontal: 10}}>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Icon style={{paddingRight: 4}} size={16} name={'bar-chart-o'}/>
                    <Text style={{fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10}}>中奖排行榜</Text>
                </View>
                <WinningListView data={rankList ? rankList.data.list : []}/>
            </SafeAreaView>
        </ScrollView>
    )
}

export default LLHomePage
