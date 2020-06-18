import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {RecommendTabView} from "./recommendTab/RecommendTabView";
import {LotteryTabView} from "./lotteyTab/LotteryTabView";
import {GameListView} from "./lotteyTab/GameListView";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";
import {useEffect, useState} from "react";
import {Icon} from "../../../../../public/network/Model/HomeGamesModel";
import {View} from "react-native";
import PushHelper from "../../../../../public/define/PushHelper";
import {push} from "../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../public/navigation/Navigation";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../redux/store/UGStore";

export const HomeTabView = () => {
    const {banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading} = useGetHomeInfo()
    const [games, setGames] = useState<Icon[]>([])
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore

    useEffect(() => {
        if (homeGames && homeGames.data && homeGames.data.icons) {
            const index = homeGames.data.icons.findIndex((item) => item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1)
            let arr = []
            index != -1 && arr.push(homeGames.data.icons[index])
            arr = arr.concat(homeGames.data.icons.filter((item) => item.name.indexOf("推荐") == -1 && item.name.indexOf("热门") == -1))
            setGames(arr)
        }
    }, [homeGames])

    const getTab = (item: Icon) => {
        item.name.indexOf("彩票") != -1 && console.log("test", item.list)
        return item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1 ?
            <RecommendTabView list={item.list} tabLabel="推荐"/> :
            item.name.indexOf("彩票") != -1 ?
                <LotteryTabView list={item.list} tabLabel="彩票"/> :
                <GameListView list={item.list} tabLabel={item.name} />
    }


    return (
        <ScrollableTabView
            tabBarUnderlineStyle={{height: 2, backgroundColor: "#3c3c3c"}}
            tabBarTextStyle={{color: "#3c3c3c"}}
            style={[{marginHorizontal: 10, backgroundColor: "#ffffff", borderRadius: 10, flex: 1}]}
            renderTabBar={() => <ScrollableTabBar/>}>
            {games.length > 0 ? games.map((item) => {
                return getTab(item)
            }) : <View />
            }
        </ScrollableTabView>
    )
}
