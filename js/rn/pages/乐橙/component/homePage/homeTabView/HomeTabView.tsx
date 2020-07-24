import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {useEffect, useState} from "react";
import {RecommendTabView} from "./recommendTab/RecommendTabView";
import {LotteryTabView} from "./lotteyTab/LotteryTabView";
import {GameListView} from "./lotteyTab/GameListView";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";
import {Icon} from "../../../../../public/network/Model/HomeGamesModel";
import {View} from "react-native";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../redux/store/UGStore";
import PushHelper from "../../../../../public/define/PushHelper";

export const HomeTabView = () => {
    const {homeGames} = useGetHomeInfo()
    const [games, setGames] = useState<Icon[]>([])
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {uid = ""} = userStore

    useEffect(() => {
        if (homeGames && homeGames.data && homeGames.data.icons) {
            const index = homeGames.data.icons.findIndex((item) => item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1)
            let arr = []
            index != -1 && arr.push(homeGames.data.icons[index])
            arr = arr.concat(homeGames.data.icons.filter((item) => item.name.indexOf("推荐") == -1 && item.name.indexOf("热门") == -1))
            setGames(arr)
        }
    }, [homeGames])

    const thirdPartGamePress = (id: string, gameID?: string) => {
        if (uid != "") {
            const result = homeGames.data.icons.filter((res) => res.id == id)
            if (gameID && result.length > 0) {
                const gameData = result[0].list.filter((res) => res.id == gameID)
                //@ts-ignore
                PushHelper.pushHomeGame(gameData[0])
            } else if (!gameID && result.length > 0) {

            } else {

            }
        } else {
            PushHelper.pushLogin()
        }
    }

    const getTab = (item: Icon) => {
        return item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1 ?
            <RecommendTabView thirdPartGamePress={thirdPartGamePress} list={item.list} tabLabel="推荐"/> :
            item.name.indexOf("彩票") != -1 ?
                <LotteryTabView thirdPartGamePress={thirdPartGamePress} list={item.list} tabLabel="彩票"/> :
                <GameListView list={item.list} thirdPartGamePress={thirdPartGamePress} tabLabel={item.name} />
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
