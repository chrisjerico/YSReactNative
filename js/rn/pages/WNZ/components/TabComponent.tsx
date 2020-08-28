import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { scale } from '../../../public/tools/Scale';
import { useHtml5Image } from '../../../public/tools/tars';
import AppDefine from '../../../public/define/AppDefine';

const { getHtml5Image } = useHtml5Image('http://test10.6yc.com')

interface TabComponentProps {
  leftGames: any[];
  rightGames: any[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
  elementHeight: number;
}

const TabComponent = ({ leftGames, rightGames, renderLeftGame, renderRightGame, elementHeight }: TabComponentProps) => {
  const [routes]: any = React.useState([
    { key: 0, title: '官方玩法', logo: getHtml5Image(23, 'home/gfwf') },
    { key: 1, title: '信用玩法', logo: getHtml5Image(23, 'home/xywf') },
  ])

  const leftGamesLength = Math.ceil(leftGames?.length / 2)
  const rightGamesLength = Math.ceil(rightGames?.length / 2)

  const [index, setIndex] = useState(0)
  return (
    <TabView
      style={{ height: (index ? rightGamesLength : leftGamesLength) * elementHeight }}
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        0: () => <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#ffffff' }}>{leftGames?.map(renderLeftGame)}</View>,
        1: () => <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#ffffff' }}>{rightGames?.map(renderRightGame)}</View>,
      })}
      onIndexChange={setIndex}
      initialLayout={{}}
      renderTabBar={(props: any) => {
        return (
          <TabBar
            {...props}
            pressOpacity={1}
            contentContainerStyle={{ backgroundColor: '#ffffff', }}
            tabStyle={styles.tabStyle}
            renderLabel={({ route, focused }) => {
              const { logo, title }: any = route
              return (
                <>
                  <View style={styles.tabContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: scale(15), paddingLeft: scale(15) }}>
                      <Image source={{ uri: logo }} style={{ width: scale(55), aspectRatio: 1 }} resizeMode={'contain'} />
                      <Text
                        style={[
                          { paddingLeft: scale(10), fontSize: scale(23), fontWeight: '300' },
                        ]}
                      >
                        {title}
                      </Text>
                    </View>
                    {
                      !route?.key && <View style={{ width: scale(1), backgroundColor: '#d9d9d9', height: scale(50), alignSelf: 'flex-end', marginBottom: scale(5) }} />
                    }
                  </View>
                  {
                    focused ? (
                      <View
                        style={{
                          height: scale(2),
                          width: '75%',
                          backgroundColor: route?.key ? '#f44600' : '#80c025',
                          borderRadius: scale(100),
                          alignSelf: 'center',
                        }}
                      ></View>
                    ) : null
                  }
                </ >
              )
            }}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#ffffff',
    height: scale(100)
  },
  tabContainer: {
    width: AppDefine.width / 2, flexDirection: 'row'
  }
})

export default TabComponent