import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import * as React from 'react'
import {useEffect, useState} from 'react'

import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import useGetHomeInfo from '../../../public/hooks/useGetHomeInfo'
import {Icon} from '../../../public/network/Model/HomeGamesModel'
import {removeHTMLTag} from '../../../public/tools/removeHTMLTag'
import {LEFThemeColor} from '../../../public/theme/colors/LEFThemeColor'
import {scale} from '../../../public/tools/Scale'
import {GAME_ITEM_HEIGHT, GameListView} from './GameListView'
import FastImage from 'react-native-fast-image'
import {ugLog} from '../../../public/tools/UgLog'

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
    notice &&
    notice.data &&
    notice.data.scroll.map((item, index) => {
      arr.push({label: index, value: removeHTMLTag(item.content)})
    })
    setMarquee(arr)
  }

  useEffect(() => {
    if (homeGames?.data?.icons) {
      const arr = homeGames.data.icons

      setGames(arr)

      let indexs = []
      arr.map((item) => indexs.push(item.name))
      setGamesIndex(indexs)
    }
  }, [homeGames])

  const getTab = (item: Icon, index: number) => {
    return <GameListView key={index}
                         refreshHeight={calculateHeight}
                         listData={item.list}
                         tabLabel={item.name}/>
  }

  const calculateHeight = (height: number) => {
    setHeight(height)
  }

  const calculateTabWidth = games?.length * TAB_ITEM_WIDTH

  return (
    <>
      {games?.length > 0 && (
        <ScrollableTabView
          // onChangeTab={({i}) => calculateHeight(i)}
          tabBarUnderlineStyle={_styles.tab_bar_underline}
          // tabBarActiveTextColor={LEFThemeColor.乐FUN.textColor2}
          // tabBarInactiveTextColor={LEFThemeColor.乐FUN.themeColor}
          // tabBarTextStyle={_styles.tab_bar_text}
          style={[{flex: 1, height}]}
          renderTabBar={() => (
            <ScrollableTabBar
              style={_styles.tab_bar}
              tabsContainerStyle={{width: calculateTabWidth}}
              renderTab={(name, pageIndex, isTabActive, onPressHandler, onLayoutHandler) => {
                return (
                  <TouchableWithoutFeedback key={name + pageIndex} onPress={() => onPressHandler(pageIndex)}>
                    <View style={[_styles.tab_bar_item, isTabActive ? {backgroundColor: 'white'} : {}]}>
                      <FastImage style={_styles.tab_bar_img} source={{uri: games[pageIndex].logo}}/>
                      <Text
                        style={[_styles.tab_bar_text, isTabActive ? {color: LEFThemeColor.乐FUN.textColor2} : {}]}>{name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
          )}>
          {games.length > 0 ? games.map((item, index) => getTab(item, index)) : <View/>}
        </ScrollableTabView>
      )}
    </>
  )
}

export const TAB_ITEM_WIDTH = scale(96) //tab宽度

const _styles = StyleSheet.create({
  tab_bar: {
    backgroundColor: '#f4f4f4',
    height: scale(86),
  },
  tab_bar_underline: {
    height: scale(0),
    backgroundColor: LEFThemeColor.乐FUN.textColor2,
  },
  tab_bar_item: {
    width: TAB_ITEM_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_bar_img: {
    width: scale(34),
    height: scale(34),
  },
  tab_bar_text: {
    fontWeight: '300',
    fontSize: scale(22),
    color: LEFThemeColor.乐FUN.textColor1,
  },
})
