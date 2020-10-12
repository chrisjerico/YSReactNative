import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import * as React from "react";
import {useEffect, useState} from "react";

import {StyleSheet, View} from "react-native";
import useGetHomeInfo from "../../../public/hooks/useGetHomeInfo";
import {Icon} from "../../../public/network/Model/HomeGamesModel";
import {removeHTMLTag} from "../../../public/tools/removeHTMLTag";
import {LEFThemeColor} from "../../../public/theme/colors/LEFThemeColor";
import {scale} from "../../../public/tools/Scale";
import {GAME_ITEM_HEIGHT, GameListView} from "./GameListView";

export const HomeTabView = () => {
  const {homeGames, notice, banner, onlineNum} = useGetHomeInfo()
  const [height, setHeight] = useState(775)
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
    if (homeGames?.data?.icons) {
      const arr = homeGames.data.icons

      setGames(arr)

      let indexs = []
      arr.map((item) =>
        indexs.push(item.name)
      )
      setGamesIndex(indexs)
    }
  }, [homeGames])


  const getTab = (item: Icon, index: number) => {
    return <GameListView
      list={item.list}
      tabLabel={item.name}/>
  }

  const calculateHeight = (i: number) => {
    setHeight(((games[i].list.length/2 + games[i].list.length%2) + 1) * GAME_ITEM_HEIGHT)
  }


  return (
    <>
      {
        games?.length > 0 &&
        <ScrollableTabView
          onChangeTab={({i}) => calculateHeight(i)}
          tabBarUnderlineStyle={_styles.tab_bar_underline}
          tabBarTextStyle={_styles.tab_bar_text}
          style={[{flex: 1, height}]}
          renderTabBar={() => <ScrollableTabBar style={_styles.tab_bar}/>}>
          {
            games.length > 0
              ? games.map((item, index) => getTab(item, index))
              : <View/>
          }
        </ScrollableTabView>
      }
    </>
  )
}

const _styles = StyleSheet.create({
  tab_bar: {
    backgroundColor: "white"
  },
  tab_bar_underline: {
    height: scale(2),
    backgroundColor: LEFThemeColor.乐FUN.themeColor,
  },
  tab_bar_text: {
    color: LEFThemeColor.乐FUN.themeColor,
    fontWeight: "bold",
  },
})
