import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {RecommendTabView} from "./recommendTab/RecommendTabView";
import {LotteryTabView} from "./lotteyTab/LotteryTabView";
import {GameListView} from "./lotteyTab/GameListView";

export const HomeTabView = () => {
    return (
        <ScrollableTabView
            tabBarUnderlineStyle={{height: 2, backgroundColor: "#3c3c3c"}}
            tabBarTextStyle={{color: "#3c3c3c"}}
            style={[{marginHorizontal: 10, backgroundColor: "#ffffff", borderRadius: 10, flex: 1}]}
            renderTabBar={() => <ScrollableTabBar/>}>
            <RecommendTabView tabLabel="推荐"/>
            <LotteryTabView tabLabel="彩票"/>
            <GameListView tabLabel="棋牌"/>
            <GameListView tabLabel="真人"/>
            <GameListView tabLabel="捕鱼"/>
            <GameListView tabLabel="体育"/>
            <GameListView tabLabel="电子"/>
            <GameListView tabLabel="电竞"/>
        </ScrollableTabView>
    )
}
