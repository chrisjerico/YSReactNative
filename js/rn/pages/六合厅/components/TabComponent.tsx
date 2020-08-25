import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Icons from 'react-native-vector-icons/FontAwesome5'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'
import StringUtils from '../../../public/tools/StringUtils'

interface TabComponentProps {
  containerStyle?: ViewStyle;
  leftGames: any[];
  rightGames: any[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
  unActiveTabColor: string;
  activeTabColor: string;
  rowHeight: number;
}

interface SceneProps {
  data: any[];
  renderItem: (item: any, index: number) => any;
  containerStyle?: ViewStyle;
}

const Scene = ({ data, renderItem, containerStyle }: SceneProps) => {
  return (
    <View style={[styles.scene, containerStyle]}>{data.map(renderItem)}</View>
  )
}

const TabComponent = ({
  renderLeftGame,
  renderRightGame,
  leftGames = [],
  rightGames = [],
  containerStyle,
  unActiveTabColor,
  activeTabColor,
  rowHeight,
}: TabComponentProps) => {
  // functions

  const getSubTabWidth = () => {
    const length = rightGames?.length ?? 1
    const width = AppDefine.width / length
    const minWidth = scale(100)
    if (width < minWidth) {
      return minWidth
    } else {
      return width
    }
  }
  const getHeight = (index: number) => {
    const games = rightGames[index]?.games
    if (games) {
      const fullRow = Math.floor(games.length / 3)
      const row = games.length % 3
      if (row == 0) {
        return rowHeight * fullRow + scale(60)
      } else {
        return rowHeight * (fullRow + 1) + scale(60)
      }
    } else {
      return 0
    }
  }

  let subScenes = {}
  rightGames.forEach((item, index) => {
    subScenes[index] = () => {
      return (
        <Scene
          data={item?.games ?? []}
          renderItem={renderRightGame}
          containerStyle={{
            paddingTop: scale(25),
            borderTopColor: '#d9d9d9',
            borderTopWidth: scale(1),
          }}
        />
      )
    }
  })

  const subTabs =
    rightGames?.map((item, index) => {
      return {
        key: index.toString(),
        title: StringUtils.getInstance().deleteHtml(item?.name ?? ''),
      }
    }) ?? []
  // set hooks
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [height, setHeight] = useState(getHeight(0))

  // ref
  const scroll = useRef(null)
  useEffect(() => {
    setHeight(getHeight(subIndex))
  }, [rightGames])
  // render
  return (
    <View style={containerStyle}>
      <View style={styles.mainTabContainer}>
        <TouchableWithoutFeedback onPress={() => setIndex(0)}>
          <View
            style={[
              styles.mainTab,
              {
                backgroundColor: index ? unActiveTabColor : activeTabColor,
              },
            ]}
          >
            <Icons
              name={'fire'}
              color={'#ffffff'}
              style={{ paddingRight: scale(5) }}
              size={scale(20)}
            />
            <Text style={styles.tabText}>{'热门资讯'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setIndex(1)}>
          <View
            style={[
              styles.mainTab,
              {
                backgroundColor: index ? activeTabColor : unActiveTabColor,
              },
            ]}
          >
            <Icons
              name={'award'}
              color={'#ffffff'}
              style={{ paddingRight: scale(5) }}
              size={scale(20)}
            />
            <Text style={styles.tabText}>{'购彩大厅'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {index ? (
        <TabView
          initialLayout={{ width: AppDefine.width }}
          style={{
            height,
            borderBottomRightRadius: scale(10),
            borderBottomLeftRadius: scale(10),
          }}
          navigationState={{ index: subIndex, routes: subTabs }}
          renderTabBar={(props: any) => {
            return (
              <ScrollView
                ref={scroll}
                horizontal={true}
                style={{ flexGrow: 0, backgroundColor: '#ffffff' }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate={'fast'}
              >
                <TabBar
                  {...props}
                  pressOpacity={1}
                  contentContainerStyle={{ backgroundColor: '#ffffff' }}
                  tabStyle={styles.subTabStyle}
                  renderLabel={({ route, focused }) => {
                    return (
                      <View
                        style={{
                          width: getSubTabWidth(),
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
                            focused ? styles.focusedText : styles.text,
                          ]}
                        >
                          {route.title}
                        </Text>
                        {focused ? (
                          <View
                            style={{
                              height: scale(2),
                              width: '100%',
                              backgroundColor: '#46A3FF',
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
          renderScene={SceneMap(subScenes)}
          onIndexChange={(index) => {
            const height = getHeight(index)
            setSubIndex(index)
            setHeight(height)
            scroll.current.scrollTo({
              x: index * scale(100),
              y: 0,
              animated: true,
            })
          }}
        />
      ) : (
          <Scene
            data={leftGames}
            renderItem={renderLeftGame}
            containerStyle={{
              paddingTop: scale(25),
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainTabContainer: {
    width: '100%',
    aspectRatio: 540 / 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTab: {
    width: '49%',
    backgroundColor: '#ff6b1b',
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabText: {
    color: '#ffffff',
    paddingLeft: scale(5),
  },
  scene: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
  },
  subTabStyle: {
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

export default TabComponent
