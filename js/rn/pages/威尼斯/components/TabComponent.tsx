import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { scale } from '../../../public/tools/Scale';


// const FirstRoute = () => <View style={{ backgroundColor: '#ffffff', height: 200 }}><Text>{"FirstRoute"}</Text></View>
// const SecondRoute = () => <View><Text>{"SecondRoute"}</Text></View>

// const renderScene = SceneMap({
//   0: FirstRoute,
//   1: SecondRoute,
// });

interface TabComponentProps {
  leftGames: any[];
  rightGames: any[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
}

const TabComponent = ({ leftGames, rightGames, renderLeftGame, renderRightGame }: TabComponentProps) => {
  const [routes]: any = React.useState([
    { key: 0, title: '官方玩法', logo: 'http://test10.6yc.com/views/mobileTemplate/23/images/home/gfwf.png' },
    { key: 1, title: '信用玩法', logo: 'http://test10.6yc.com/views/mobileTemplate/23/images/home/xywf.png' },
  ])

  // const routes = [
  //   { key: '0', title: 'First' },
  //   { key: '1', title: 'Second' },
  // ]

  const [index, setIndex] = useState(0)
  return (
    <TabView
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
            tabStyle={styles.tabStyle}
            renderLabel={({ route, focused }) => {
              const { logo, title }: any = route
              return (
                <>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: logo }} style={{ width: scale(50), aspectRatio: 1 }} resizeMode={'contain'} />
                    <Text
                      style={[
                        { fontWeight: '600', paddingLeft: scale(5) },
                      ]}
                    >
                      {title}
                    </Text>
                  </View>
                  {focused ? (
                    <View
                      style={{
                        height: scale(5),
                        width: '100%',
                        backgroundColor: route.key ? 'red' : 'green',
                        borderRadius: scale(100),
                        marginTop: scale(5),
                      }}
                    ></View>
                  ) : null}
                </>
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
    height: scale(100),
  },
})

export default TabComponent