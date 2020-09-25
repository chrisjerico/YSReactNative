import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import AppDefine from '../../define/AppDefine'
import { Game } from '../../models/Interface'
import { scale } from '../../tools/Scale'
import StringUtils from '../../tools/StringUtils'

interface TabComponentProps {
  tabGames: TabGame[]
  itemHeight?: number
  renderScene?: ({ item, index, tab }: RenderScene) => any
  focusTabColor?: string
  baseHeight?: number
  initialTabIndex: number
  tabTextStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  tabWidth?: number
  tabStyle?: StyleProp<ViewStyle>
  enableAutoScrollTab?: boolean
  tabScrollEnabled?: boolean
  numColumns: number
  renderTabBar?: ({ activeTab, goToPage }: RenderTabBar) => any
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

const TabComponent = ({
  tabGames = [],
  focusTabColor,
  baseHeight,
  initialTabIndex = 0,
  renderScene,
  tabTextStyle,
  itemHeight,
  containerStyle,
  tabWidth,
  tabStyle,
  enableAutoScrollTab = true,
  tabScrollEnabled = true,
  numColumns,
  renderTabBar,
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
  const scroll = useRef(null)
  const tabRef = useRef(null)

  useEffect(() => {
    tabRef?.current?.goToPage(initialTabIndex)
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

  const changeIndex = ({ i }) => {
    const height = getSceneHeight(i)
    const x = getTabXPosition(i)
    setHeight(height)
    enableAutoScrollTab && scrollTabTo(x)
  }

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

  const Scene = (props) => renderScene && renderScene(props)

  return (
    <ScrollableTabView
      ref={tabRef}
      tabBarBackgroundColor={'#ffffff'}
      style={[containerStyle, { height }]}
      onChangeTab={changeIndex}
      renderTabBar={(props) => {
        const { activeTab, goToPage } = props
        return renderTabBar ? (
          renderTabBar({ activeTab, goToPage })
        ) : (
          <ScrollView
            scrollEnabled={tabScrollEnabled}
            ref={scroll}
            horizontal={true}
            removeClippedSubviews={true}
            style={{ flexGrow: 0, backgroundColor: '#ffffff' }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: getTabXPosition(initialTabIndex), y: 0 }}
            scrollEventThrottle={5000}
            disableScrollViewPanResponder={true}>
            <View style={[{ height: scale(60), flexDirection: 'row' }, tabStyle]}>
              {tabGames?.map((item, index) => {
                const title = StringUtils.getInstance().deleteHtml(item?.name ?? item?.categoryName ?? '')
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      goToPage(index)
                    }}>
                    <View
                      style={{
                        width: getTabWidth(),
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}>
                      <Text
                        style={[
                          styles.tabText,
                          tabTextStyle,
                          {
                            color: activeTab == index ? focusTabColor : '#000000',
                          },
                        ]}>
                        {title}
                      </Text>
                      <View
                        style={[
                          styles.focusBar,
                          {
                            width: '50%',
                            backgroundColor: activeTab == index ? focusTabColor : 'transparent',
                          },
                        ]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
          </ScrollView>
        )
      }}>
      {tabGames?.map((ele: TabGame, index) => {
        const tab = ele?.name ?? ele?.categoryName ?? ''
        const item = ele?.list ?? ele?.games ?? []
        return <Scene key={index} tabLabel={tab} item={item} index={index} tab={tab} />
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
})

export default TabComponent
