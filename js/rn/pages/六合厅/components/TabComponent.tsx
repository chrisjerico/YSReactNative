import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Icons from 'react-native-vector-icons/FontAwesome5'
import { scale } from '../../../helpers/function'
import AppDefine from '../../../public/define/AppDefine'

interface TabComponentProps {
  containerStyle?: ViewStyle;
  subTabs: any[];
  leftGames: any[];
  rightGames: any[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
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
  subTabs = [],
  containerStyle,
}: TabComponentProps) => {
  const initHeight = scale(
    rightGames[0] ? (rightGames[0].length / 3) * 200 + 60 : 0
  )
  // set state
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [height, setHeight] = useState(initHeight)
  // filter props
  let subScenes = {}
  rightGames.forEach((games, index) => {
    subScenes[index] = () => {
      return (
        <Scene
          data={games}
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
  // render
  return (
    <View style={containerStyle}>
      <View style={styles.mainTabContainer}>
        <TouchableOpacity
          style={[
            styles.mainTab,
            {
              backgroundColor: index == 0 ? '#ff6b1b' : '#7B7B7B',
            },
          ]}
          onPress={() => setIndex(0)}
        >
          <Icons
            name={'fire'}
            color={'#ffffff'}
            style={{ paddingRight: scale(5) }}
            size={scale(20)}
          />
          <Text style={styles.tabText}>{'热门资讯'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mainTab,
            {
              backgroundColor: index == 0 ? '#7B7B7B' : '#ff6b1b',
            },
          ]}
          onPress={() => setIndex(1)}
        >
          <Icons
            name={'award'}
            color={'#ffffff'}
            style={{ paddingRight: scale(5) }}
            size={scale(20)}
          />
          <Text style={styles.tabText}>{'购彩大厅'}</Text>
        </TouchableOpacity>
      </View>
      {index == 0 ? (
        <Scene
          data={leftGames}
          renderItem={renderLeftGame}
          containerStyle={{
            paddingTop: scale(25),
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      ) : (
          <TabView
            initialLayout={{ width: AppDefine.width, height: 0 }}
            style={{
              height,
              borderBottomRightRadius: scale(10),
              borderBottomLeftRadius: scale(10),
            }}
            navigationState={{ index: subIndex, routes: subTabs }}
            renderTabBar={(props: any) => {
              return (
                <ScrollView
                  horizontal={true}
                  style={{ flexGrow: 0 }}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}
                  decelerationRate={'fast'}
                >
                  <TabBar
                    {...props}
                    tabStyle={styles.subTabStyle}
                    renderLabel={({ route, focused }) => {
                      return (
                        <>
                          <Text
                            style={[
                              { fontWeight: '600', alignSelf: 'auto' },
                              focused ? styles.focusedText : styles.text,
                            ]}
                          >
                            {route.title}
                          </Text>
                          {focused ? (
                            <View
                              style={{
                                height: scale(5),
                                width: '100%',
                                backgroundColor: '#46A3FF',
                                borderRadius: scale(100),
                                marginTop: scale(5),
                              }}
                            ></View>
                          ) : null}
                        </>
                      )
                    }}
                  />
                </ScrollView>
              )
            }}
            renderScene={SceneMap(subScenes)}
            onIndexChange={(index) => {
              const height = rightGames[index]
                ? scale((rightGames[index].length / 3) * 200) + 60
                : 0
              setSubIndex(index)
              setHeight(height)
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
    justifyContent: 'space-between',
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
