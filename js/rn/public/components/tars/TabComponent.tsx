import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import AppDefine from '../../define/AppDefine'
import { Game } from '../../models/Interface'
import { scale } from '../../tools/Scale'
import StringUtils from '../../tools/StringUtils'

interface TabComponentProps {
  tabGames: TabGame[];
  itemHeight?: number;
  renderScene?: ({ item, index, tab }: RenderScene) => any;
  focusTabColor?: string;
  baseHeight?: number;
  initialTabIndex: number;
  tabTextStyle?: TextStyle | TextStyle;
  containerStyle?: ViewStyle | ViewStyle;
  tabWidth?: number;
  renderLabel?: ({ route, focused }: RenderLabel) => any;
  tabStyle?: ViewStyle | ViewStyle[];
  contentOffset?: ContentOffset;
  enableAutoScrollTab?: boolean;
  tabScrollEnabled?: boolean;
  numColumns: number;
}

interface ContentOffset {
  x: number;
  y: number;
}

interface RenderLabel {
  route: any;
  focused: boolean;
}

interface TabGame {
  category?: string;
  categoryName?: string;
  name?: string;
  logo?: string;
  list?: Game[];
  games?: Game[];
}

interface RenderScene {
  item: Game[];
  index: number;
  tab: string;
}


interface SceneProps {
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

const TabComponent = ({
  tabGames = [],
  focusTabColor,
  baseHeight = scale(60),
  initialTabIndex = 0,
  renderScene,
  tabTextStyle,
  itemHeight,
  containerStyle,
  tabWidth,
  renderLabel,
  tabStyle,
  contentOffset,
  enableAutoScrollTab = true,
  tabScrollEnabled = true,
  numColumns,
}: TabComponentProps) => {
  const getSceneHeight = (index: number) => {
    const games = tabGames?.[index]?.list ?? tabGames?.[index]?.games
    if (games) {
      const gameCount = games?.length ?? 0
      const gameRow = Math.ceil(gameCount / numColumns)
      return itemHeight * gameRow + baseHeight
    } else {
      return 0
    }
  }

  const [height, setHeight] = useState(getSceneHeight(initialTabIndex))
  const [index, setIndex] = useState(initialTabIndex)
  const scroll = useRef(null)


  useEffect(() => {
    changeIndex(initialTabIndex)
  }, [initialTabIndex])

  const getTabCount = () => {
    return tabGames?.length ?? 0
  }

  const getTabWidth = () => {
    if (tabWidth) {
      return tabWidth
    }
    const tabCount = getTabCount()
    const width = tabCount ? AppDefine.width / tabCount : 0
    if (width < minTabWidth) {
      return minTabWidth
    } else {
      return width
    }
  }

  let scenes = {}
  tabGames?.forEach((ele: TabGame, index: number) => {
    scenes[index] = () => {
      const tab = ele?.name ?? ele?.categoryName ?? ''
      const item = ele?.list ?? ele?.games ?? []
      return renderScene ? renderScene({ item, index, tab }) : null
    }
  })

  const changeIndex = (index: number) => {
    const height = getSceneHeight(index)
    const x = getTabXPosition(index)
    setHeight(height)
    enableAutoScrollTab && scrollTabTo(x)
    setIndex(index)
  }

  const getTabXPosition = (index: number) => {
    const width = getTabWidth()
    const tabCount = getTabCount()
    const maxWidth = width * tabCount
    const windowsContainTab = AppDefine.width / width
    const scrllToEndIndex = tabCount - windowsContainTab
    const halfTab = windowsContainTab / 2
    const tabIndex =
      index > scrllToEndIndex
        ? 2 * index - halfTab - scrllToEndIndex
        : index - halfTab - 1
    const x = tabIndex * width
    if (x >= maxWidth) {
      return maxWidth
    } else if (x <= 0) {
      return 0
    } else {
      return x
    }
  }
  const scrollTabTo = (x: number) => {
    scroll?.current?.scrollTo({
      x: x,
      y: 0,
      animated: true,
    })
  }

  const routes =
    tabGames?.map((item, index) => {
      return {
        key: index.toString(),
        title: StringUtils.getInstance().deleteHtml(
          item?.name ?? item?.categoryName ?? ''
        ),
        logo: item?.logo,
      }
    }) ?? []

  return (
    <TabView
      initialLayout={{ width: AppDefine.width }}
      style={[containerStyle, { height }]}
      navigationState={{ index, routes }}
      renderTabBar={(props: any) => {
        return (
          <ScrollView
            scrollEnabled={tabScrollEnabled}
            ref={scroll}
            horizontal={true}
            removeClippedSubviews={true}
            style={{ flexGrow: 0, backgroundColor: '#ffffff' }}
            showsHorizontalScrollIndicator={false}
            contentOffset={
              contentOffset
                ? contentOffset
                : { x: getTabXPosition(initialTabIndex), y: 0 }
            }
            scrollEventThrottle={5000}
          >
            <TabBar
              {...props}
              lazy={false}
              pressOpacity={1}
              contentContainerStyle={{ backgroundColor: '#ffffff' }}
              tabStyle={[styles.tabStyle, tabStyle]}
              renderLabel={
                renderLabel
                  ? renderLabel
                  : ({ route, focused }) => {
                    return (
                      <View
                        style={{
                          width: getTabWidth(),
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={[
                            styles.tabText,
                            tabTextStyle,
                            focused ? { color: focusTabColor } : styles.text,
                          ]}
                          numberOfLines={1}
                        >
                          {route?.title}
                        </Text>
                        {focused && (
                          <View
                            style={[
                              styles.focusBar,
                              {
                                backgroundColor: focusTabColor,
                              },
                            ]}
                          />
                        )}
                      </View>
                    )
                  }
              }
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
    padding: 0,
    margin: 0,
  },
  focusedText: {
    color: '#46A3FF',
  },
  text: {
    color: '#000000',
  },
  focusBar: {
    height: scale(2),
    width: '100%',
    borderRadius: scale(100),
    marginTop: scale(5),
  },
  tabText: {
    alignSelf: 'auto',
    fontSize: scale(25),
    marginBottom: scale(5),
  },
})

export default TabComponent
