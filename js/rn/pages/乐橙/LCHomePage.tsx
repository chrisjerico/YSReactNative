import * as React from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {BannerView} from "./component/homePage/BannerView";
import {MarqueeView} from "./component/homePage/MarqueeView";
import {HomeHeaderButtonBar} from "./component/homePage/HomeHeaderButtonBar";
import {WinningListView} from "./component/homePage/WinningListView";
import {HomeTabView} from "./component/homePage/homeTabView/HomeTabView";

const LCHomePage = () => {
    return (
        <ScrollView bounces={false} style={{flex: 1}}>
            <HomeHeaderButtonBar/>
            <BannerView
                imgs={['https://www.changsclub.com/wp-content/uploads/2016/01/free.jpg', 'https://osmhow2s.files.wordpress.com/2018/01/free-converted-01.png?w=2280&h=1762']}/>
            <MarqueeView textArr={['test111111111111', 'test222222222222', 'test333333333333']}/>
            <HomeTabView/>
            <SafeAreaView style={{marginHorizontal: 10}}>
                <Text style={{fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10}}>中奖排行榜</Text>
                <WinningListView />
            </SafeAreaView>
        </ScrollView>
    )
}

export default LCHomePage
