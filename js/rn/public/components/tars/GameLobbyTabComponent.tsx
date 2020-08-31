import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { Icon, List } from '../../../public/network/Model/HomeGamesModel'
import AppDefine from '../../define/AppDefine'
import { Data, Game } from '../../network/Model/HomeRecommendModel'
import { scale } from '../../tools/Scale'
import StringUtils from '../../tools/StringUtils'

interface GameLobbyComponentProps {
  tabGames: (Icon | Data)[];
  itemHeight?: number;
  renderScene?: ({ games, index, tab }: Render) => any;
  focusTabColor: string;
  baseHeight?: number;
  initialTabIndex: number;
  tabTextStyle?: TextStyle | TextStyle;
  containerStyle?: ViewStyle | ViewStyle;
}

interface Render {
  games: List[] | Game[];
  index: number;
  tab: string;
}

export interface SceneProps {
  data: any;
  renderItem: (item: any, index: number) => any;
  containerStyle?: ViewStyle | ViewStyle[];
}

export const Scene = ({ data, renderItem, containerStyle }: SceneProps) => {
  return (
    <View style={[styles.scene, containerStyle]}>{data?.map(renderItem)}</View>
  )
}

const minTabWidth = scale(100)

const GameLobbyTabComponent = ({
  tabGames = [],
  focusTabColor,
  baseHeight = scale(60),
  initialTabIndex = 0,
  renderScene,
  tabTextStyle,
  itemHeight,
  containerStyle
}: GameLobbyComponentProps) => {

  const getTabWidth = () => {
    const gameCount = tabGames?.length ?? 1
    const width = AppDefine.width / gameCount
    if (width < minTabWidth) {
      return minTabWidth
    } else {
      return width
    }
  }

  const getSceneHeight = (index: number) => {
    //@ts-ignore
    const games = tabGames?.[index]?.list ?? tabGames?.[index]?.games
    if (games) {
      const gameCount = games?.length ?? 0
      const row = Math.ceil(gameCount / 3)
      return itemHeight * row + baseHeight
    } else {
      return 0
    }
  }

  let scenes = {}
  tabGames?.forEach((item: any, index: number) => {
    scenes[index] = () => {
      const tab = item?.name ?? item?.categoryName ?? ''
      const games = item?.list ?? item?.games ?? []
      return renderScene && renderScene({ games, index, tab })
    }
  })

  const [height, setHeight] = useState(getSceneHeight(initialTabIndex))
  const [index, setIndex] = useState(initialTabIndex)
  const scroll = useRef(null)
  const tab = useRef(null)

  const changeIndex = (index: number) => {
    const height = getSceneHeight(index)
    setIndex(index)
    setHeight(height)
    scrollTo(index)
  }

  const scrollTo = (index: number) => {
    const width = getTabWidth()
    console.log("--------width-------", width)
    // scroll.current.scrollToEnd({ animated: true })
    scroll.current.scrollTo({
      x: 700,
      y: 700,
      animated: true,
    })
  }

  const routes =
    tabGames?.map((item, index) => {
      return {
        key: index.toString(),
        //@ts-ignore
        title: StringUtils.getInstance().deleteHtml(item?.name ?? item?.categoryName ?? ''),
      }
    }) ?? []

  useEffect(() => {
    scrollTo(initialTabIndex)
  }, [])

  // useEffect(() => {
  //   const height = getSceneHeight(index)
  //   setHeight(height)

  // }, [tabGames])

  return (
    <TabView
      initialLayout={{ width: AppDefine.width }}
      style={[{
        height,
        borderBottomRightRadius: scale(10),
        borderBottomLeftRadius: scale(10),
      }, containerStyle
      ]}
      navigationState={{ index, routes }}
      renderTabBar={(props: any) => {
        return (
          <ScrollView
            ref={scroll}
            horizontal={true}
            style={{ flexGrow: 0, backgroundColor: '#ffffff' }}
            showsHorizontalScrollIndicator={false}
          >
            <TabBar
              ref={tab}
              {...props}
              lazy={true}
              pressOpacity={1}
              contentContainerStyle={{ backgroundColor: '#ffffff' }}
              tabStyle={styles.tabStyle}
              renderLabel={({ route, focused }) => {
                return (
                  <View
                    style={{
                      width: getTabWidth(),
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={[
                        {
                          alignSelf: 'auto',
                          fontSize: scale(25),
                          marginBottom: scale(5),
                        },
                        tabTextStyle,
                        focused ? { color: focusTabColor } : styles.text,
                      ]}
                    >
                      {route.title}
                    </Text>
                    {focused ? (
                      <View
                        style={{
                          height: scale(2),
                          width: '100%',
                          backgroundColor: focusTabColor,
                          borderRadius: scale(100),
                          marginTop: scale(5),
                        }}
                      ></View>
                    ) : null}
                  </View>
                )
              }}
            />
          </ScrollView>
        )
      }}
      renderScene={SceneMap(scenes)}
      onIndexChange={changeIndex}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    paddingTop: scale(25),
    borderTopColor: '#d9d9d9',
    borderTopWidth: scale(1),
  },
  tabStyle: {
    backgroundColor: '#ffffff',
    height: scale(60),
  },
  focusedText: {
    color: '#46A3FF',
  },
  text: {
    color: '#000000',
  },
})

export default GameLobbyTabComponent
