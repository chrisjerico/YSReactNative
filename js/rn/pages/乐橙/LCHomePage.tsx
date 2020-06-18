import * as React from "react";
import {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, Text} from "react-native";
import {BannerView} from "./component/homePage/BannerView";
import {MarqueeView} from "./component/homePage/MarqueeView";
import {HomeHeaderButtonBar} from "./component/homePage/HomeHeaderButtonBar";
import {WinningListView} from "./component/homePage/WinningListView";
import {HomeTabView} from "./component/homePage/homeTabView/HomeTabView";
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo";

const LCHomePage = () => {
    const {banner, notice, rankList} = useGetHomeInfo()
    const [marquee, setMarquee] = useState<string[]>([])
    useEffect(() => {
        notice && getMarquee()
    }, [notice])
    const getMarquee = () => {
        let arr = []
        notice && notice.data && notice.data.scroll.map((item) => {
            arr.push(item.content)
        })
        setMarquee(arr)
    }
    return (
        <ScrollView bounces={false} style={{flex: 1}}>
            <HomeHeaderButtonBar/>
            <BannerView
                list={banner && banner.data ? banner.data.list : []}/>
            <MarqueeView textArr={marquee}/>
            <HomeTabView/>
            <SafeAreaView style={{marginHorizontal: 10}}>
                <Text style={{fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10}}>中奖排行榜</Text>
                <WinningListView data={rankList ? rankList.data.list : []}/>
            </SafeAreaView>
        </ScrollView>
    )
}

export default LCHomePage
