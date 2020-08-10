import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {useEffect, useState} from "react";

import {View} from "react-native";
import {Icon} from "../../../../public/network/Model/HomeGamesModel";
import useGetHomeInfo from "../../../../public/hooks/useGetHomeInfo";
import {LotteryTabView} from "./lotteyTab/LotteryTabView";
import {GameListView} from "./lotteyTab/GameListView";
import {RecommendTabView} from "./recommendTab/RecommendTabView";
import {removeHTMLTag} from "../../../../public/tools/removeHTMLTag";

export const HomeTabView = () => {
    const {homeGames, notice, banner, onlineNum} = useGetHomeInfo()
    const [height, setHeight] = useState(672)
    const [games, setGames] = useState<Icon[]>([])
    const [marquee, setMarquee] = useState<string[]>([])
    const [gamesIndex, setGamesIndex] = useState<string[]>([])

    useEffect(() => {
        notice && getMarquee()
    }, [notice])
    const getMarquee = () => {
        let arr = []
        notice && notice.data && notice.data.scroll.map((item, index) => {
            arr.push({label: index, value: removeHTMLTag(item.content)})
        })
        setMarquee(arr)
    }

    useEffect(() => {
        if (homeGames && homeGames.data && homeGames.data.icons) {
            const index = homeGames.data.icons.findIndex((item) => item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1)
            let arr = []
            index != -1 && arr.push(homeGames.data.icons[index])
            arr = arr.concat(homeGames.data.icons.filter((item) => item.name.indexOf("推荐") == -1 && item.name.indexOf("热门") == -1))
            setGames(arr)

            let indexs = []
            arr.map((item) =>
                indexs.push(item.name)
            )
            setGamesIndex(indexs)
        }
    }, [homeGames])


    const getTab = (item: Icon, index: number) => {
        return index == 0 ?
            <RecommendTabView banner={banner} list={item.list} marquee={marquee} onlineNum={onlineNum} tabLabel="精选"/> :
            item.name.indexOf("彩票") != -1 ?
                <LotteryTabView list={item.list} tabLabel="彩票"/> :
                <GameListView list={item.list} tabLabel={item.name}/>
    }

    const calculateHeight = (i: number) => {
        gamesIndex[i].indexOf("推荐") != -1 || gamesIndex[i].indexOf("热门") != -1 ?
            setHeight(672) :
            gamesIndex[i].indexOf("彩票") != -1 ?
                setHeight(Math.ceil(games[i].list.length / 4) * 95 + 50) :
                setHeight(Math.ceil(games[i].list.length / 2) * 125 + 50)
    }


    return (
        <>
            {games?.length > 0 &&
            <ScrollableTabView
                onChangeTab={({i}) => calculateHeight(i)}
                tabBarUnderlineStyle={{height: 2, backgroundColor: "red"}}
                tabBarTextStyle={{color: "#666666", fontWeight: "bold"}}
                style={[{flex: 1, height}]}
                renderTabBar={() => <ScrollableTabBar style={{backgroundColor: "#ffffff"}}/>}>
                {games.length > 0 ? games.map((item, index) => {
                    return getTab(item, index)
                }) : <View/>
                }
            </ScrollableTabView>
            }
        </>
    )
}
