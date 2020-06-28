import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';


const FirstRoute = () => <View style={{ backgroundColor: '#ffffff', height: 200 }}><Text>{"FirstRoute"}</Text></View>
const SecondRoute = () => <View><Text>{"SecondRoute"}</Text></View>

const renderScene = SceneMap({
  0: FirstRoute,
  1: SecondRoute,
});

const TabComponent = () => {
  const [routes] = React.useState([
    { key: '0', title: 'First' },
    { key: '1', title: 'Second' },
  ])

  // const routes = [
  //   { key: '0', title: 'First' },
  //   { key: '1', title: 'Second' },
  // ]

  const [index, setIndex] = useState(0)
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{}}
    />
  )
}

export default TabComponent