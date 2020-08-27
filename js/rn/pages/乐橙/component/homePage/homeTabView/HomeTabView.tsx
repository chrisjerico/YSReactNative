import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {useEffect, useState} from "react";
import {RecommendTabView} from "./recommendTab/RecommendTabView";
import {LotteryTabView} from "./lotteyTab/LotteryTabView";
import {GameListView} from "./lotteyTab/GameListView";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";
import {Icon, List} from "../../../../../public/network/Model/HomeGamesModel";
import {View} from "react-native";
import {IGlobalState, UGStore} from "../../../../../redux/store/UGStore";
import PushHelper from "../../../../../public/define/PushHelper";

export const HomeTabView = () => {
    const {homeGames} = useGetHomeInfo()
    const [games, setGames] = useState<Icon[]>([])
    const userStore = UGStore.globalProps.userInfo;
    const {uid = ""} = userStore

    useEffect(() => {
        homeGames?.data?.icons && console.log(homeGames?.data?.icons)
        homeGames?.data?.icons && setGames(homeGames.data.icons)
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

    const onPress = (list: List) => {
        console.log(list)
        list.seriesId != '1' ? thirdPartGamePress(list.seriesId, list.gameId) :
            list.gameId ?
                PushHelper.pushCategory(list.seriesId, list.gameId) :
                PushHelper.pushCategory(list.seriesId, list.subType[0]?.gameId)
    }

    const getTab = (item: Icon, index: number) => {
        return index == 0 ?
            <RecommendTabView onPress={onPress} list={item.list} tabLabel={item.name}/> :
            item.name.indexOf("彩票") != -1 ?
                <LotteryTabView onPress={onPress} list={item.list} tabLabel={item.name}/> :
                <GameListView list={item.list} onPress={onPress} tabLabel={item.name}/>
    }


    return (
        <ScrollableTabView
            tabBarUnderlineStyle={{height: 2, backgroundColor: "#3c3c3c"}}
            tabBarTextStyle={{color: "#3c3c3c"}}
            style={[{marginHorizontal: 10, backgroundColor: "#ffffff", borderRadius: 10, flex: 1}]}
            renderTabBar={() => <ScrollableTabBar/>}>
            {games.length > 0 ? games.map((item, index) => {
                return getTab(item, index)
            }) : <View/>
            }
        </ScrollableTabView>
    )
}
