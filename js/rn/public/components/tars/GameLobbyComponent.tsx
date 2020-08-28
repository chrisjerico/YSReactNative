import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import AppDefine from '../../define/AppDefine'
import { scale } from '../../tools/Scale'
import StringUtils from '../../tools/StringUtils'

interface GameLobbyComponentProps {
  tabGames: any[];
  rowHeight: number;
  renderScene: (item: any, index: number) => any;
}

interface SceneProps {
  data: any[];
  renderItem: (item: any, index: number) => any;
  containerStyle?: ViewStyle | ViewStyle[];
}

const Scene = ({ data, renderItem, containerStyle }: SceneProps) => {
  return (
    <View style={[styles.scene, containerStyle]}>{data.map(renderItem)}</View>
  )
}

const GameLobbyComponent = ({
  tabGames = [],
  rowHeight,
  renderScene,
}: GameLobbyComponentProps) => {
  const getTabWidth = () => {
    const length = tabGames?.length ?? 1
    const width = AppDefine.width / length
    const minWidth = scale(100)
    if (width < minWidth) {
      return minWidth
    } else {
      return width
    }
  }

  const getSceneHeight = (index: number) => {
    const games = tabGames?.[index]?.games
    if (games) {
      const fullRow = Math.floor(games?.length ?? 0 / 3)
      const row = games?.length ?? 0 % 3
      if (row == 0) {
        return rowHeight * fullRow + scale(60)
      } else {
        return rowHeight * (fullRow + 1) + scale(60)
      }
    } else {
      return 0
    }
  }

  let scenes = {}
  tabGames?.forEach((item, index) => {
    scenes[index] = () => {
      return (
        <Scene
          data={item?.games ?? []}
          renderItem={renderScene}
          containerStyle={{
            paddingTop: scale(25),
            borderTopColor: '#d9d9d9',
            borderTopWidth: scale(1),
          }}
        />
      )
    }
  })

  const [height, setHeight] = useState(getSceneHeight(0))
  const [index, setIndex] = useState(0)
  const scroll = useRef(null)

  const routes =
    tabGames?.map((item, index) => {
      return {
        key: index.toString(),
        title: StringUtils.getInstance().deleteHtml(item?.name ?? ''),
      }
    }) ?? []

  return (
    <TabView
      initialLayout={{ width: AppDefine.width }}
      style={{
        height,
        borderBottomRightRadius: scale(10),
        borderBottomLeftRadius: scale(10),
      }}
      navigationState={{ index, routes }}
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
      renderScene={SceneMap(scenes)}
      onIndexChange={(index) => {
        const height = getSceneHeight(index)
        setIndex(index)
        setHeight(height)
        scroll.current.scrollTo({
          x: index * scale(100),
          y: 0,
          animated: true,
        })
      }}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
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

export default GameLobbyComponent
