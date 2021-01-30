import React, { memo, useRef, useState } from 'react'
import { ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import AppDefine from '../../define/AppDefine'
import { Game } from '../../models/Interface'
import { scale } from '../../tools/Scale'
import { deleteHtml } from '../../tools/StringUtil'

interface TabComponentProps {
  tabGames: TabGame[]
  itemHeight: number
  renderScene: ({ tabLabel, item, index, tab }: RenderScene) => any
  renderTabBar?: ({ activeTab, goToPage }: RenderTabBar) => any
  focusTabColor?: string
  baseHeight?: number
  initialTabIndex?: number
  tabTextStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  tabWidth?: number
  tabStyle?: StyleProp<ViewStyle>
  enableAutoScrollTab?: boolean
  tabBarScrollEnabled?: boolean
  numColumns: number
  tabTextColor?: string
  tabBarBackgroundColor?: string
  fixedHeight?: number[]
  showIndicator?: boolean
  tabBarStyle?: StyleProp<ViewStyle>
  locked?: boolean
  enableMinWidth?: boolean
  c_ref?: TabComponentApi
}

interface RenderTabBar {
  activeTab: number
  goToPage: (pageNumber: number) => any
}

interface TabGame {
  category?: string
  categoryName?: string
  name?: string
  logo?: string
  list?: Game[]
  games?: Game[]
}

interface RenderScene {
  item: Game[]
  index: number
  tab: string
  tabLabel: string
}

interface SceneProps {
  data: any
  renderItem: (item: any, index: number) => any
  containerStyle?: StyleProp<ViewStyle>
}

export const Scene = ({ data, renderItem, containerStyle }: SceneProps) => {
  return <View style={[styles.scene, containerStyle]}>{data?.map(renderItem)}</View>
}

const minTabWidth = scale(100)
const defaultTabHeight = scale(60)


export interface TabComponentApi {
  updateGameSubTypeHeight: (subTypeHeight: number) => void
}

const TabComponent = ({
  tabGames = [],
  focusTabColor,
  baseHeight = defaultTabHeight,
  initialTabIndex = 0,
  renderScene,
  tabTextStyle,
  itemHeight,
  containerStyle,
  tabWidth,
  tabStyle,
  enableAutoScrollTab = true,
  tabBarScrollEnabled = true,
  numColumns,
  renderTabBar,
  tabTextColor = '#000000',
  tabBarBackgroundColor,
  fixedHeight = [],
  showIndicator = true,
  tabBarStyle,
  locked = true,
  enableMinWidth = true,
  c_ref,
}: TabComponentProps) => {
  const getSceneHeight = (index: number) => {
    if (fixedHeight[index]) {
      return fixedHeight[index]
    } else {
      const games = tabGames?.[index]?.list ?? tabGames?.[index]?.games
      if (games) {
        const gameCount = games?.length ?? 0
        const gameRow = Math.ceil(gameCount / numColumns)
        const subTypeHeight = (v?.subTypeHeights?.[index] ?? 0)
        return itemHeight * gameRow + baseHeight + subTypeHeight
      } else {
        return 0
      }
    }
  }

  const [height, setHeight] = useState(getSceneHeight(initialTabIndex))
  const scroll = useRef(null)
  const tabRef = useRef(null)
  const { current: v } = useRef({
    subTypeHeights: {},
    currentIndex: 0,
  })

  const getTabCount = () => {
    return tabGames?.length ?? 0
  }

  const getTabWidth = () => {
    if (tabWidth) {
      return tabWidth
    }
    const tabCount = getTabCount()
    let width = 0
    if(tabCount<5){
      width = tabCount ? AppDefine.width / tabCount : 0
    }else{
      width = tabCount ? AppDefine.width / 5 : 0
    }
    if (enableMinWidth && width < minTabWidth) {
      return minTabWidth + scale(20)
    } else {
      return width //+ scale(20)
    }
  }

  const changeIndex = ({ i }) => {
    v.currentIndex = i
    const height = getSceneHeight(i)
    const x = getTabXPosition(i)
    setHeight(height)
    enableAutoScrollTab && scrollTabTo(x)
  }

  // 点击子游戏时更新高度
  c_ref && (c_ref.updateGameSubTypeHeight = (subTypeHeight) => {
    v.subTypeHeights[v.currentIndex] = subTypeHeight
    setHeight(getSceneHeight(v.currentIndex))
  })

  const getTabXPosition = (index: number) => {
    const width = getTabWidth()
    const tabCount = getTabCount()
    const maxWidth = width * tabCount
    const windowsContainTab = AppDefine.width / width
    const scrllToEndIndex = tabCount - windowsContainTab
    const halfTab = windowsContainTab / 2
    const tabIndex = index > scrllToEndIndex ? 2 * index - halfTab - scrllToEndIndex : index - halfTab - 1
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

  const Scene = renderScene
  return (
    <ScrollableTabView
      ref={tabRef}
      tabBarBackgroundColor={tabBarBackgroundColor}
      style={[containerStyle, { height }]}
      onChangeTab={changeIndex}
      locked={locked}
      initialPage={initialTabIndex}
      renderTabBar={(props) => {
        const { activeTab, goToPage } = props
        return renderTabBar ? (
          renderTabBar({ activeTab, goToPage })
        ) : (
          <View style={[{ height: defaultTabHeight }, tabBarStyle, ]}>
            <ScrollView
              scrollEnabled={tabBarScrollEnabled}
              ref={scroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentOffset={{ x: getTabXPosition(initialTabIndex), y: 0 }}
              scrollEventThrottle={5000}>
              {tabGames?.map((item, index) => {
                const title = deleteHtml(item?.name ?? item?.categoryName ?? '')
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      goToPage(index)
                    }}>
                    <View
                      style={[
                        styles.tabContainer,
                        tabStyle,
                        {
                          width: getTabWidth(),
                        },
                      ]}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        style={[
                          styles.tabText,
                          tabTextStyle,
                          {
                            color: activeTab == index ? focusTabColor : tabTextColor,
                          },
                        ]}>
                        {title}
                      </Text>
                      {showIndicator && (
                        <View
                          style={[
                            styles.focusBar,
                            {
                              width: '50%',
                              backgroundColor: activeTab == index ? focusTabColor : 'transparent',
                            },
                          ]}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </ScrollView>
          </View>
        )
      }}>
      {tabGames?.map((ele: TabGame, index) => {
        const tab = ele?.name ?? ele?.categoryName ?? ''
        const item = ele?.list ?? ele?.games ?? []
        return Scene && <Scene key={index} tabLabel={deleteHtml(tab)} item={item} index={index} tab={tab} />
      })}
    </ScrollableTabView>
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
    borderRadius: scale(100),
    marginTop: scale(5),
    backgroundColor: '#ffffff',
  },
  tabText: {
    alignSelf: 'auto',
    fontSize: scale(25),
    marginBottom: scale(5),
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: scale(10),
  },
})

export default memo(TabComponent)
