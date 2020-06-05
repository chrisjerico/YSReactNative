import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {scale} from '../helpers/function';
import TabCircleButton from '../views/TabCircleButton';
const mainTabRoutes = [{key: '0', title: '热门资讯'}, {key: '1', title: '购彩大厅'}];
const rightTabRoutes = [{key: '0', title: '热门'}, {key: '1', title: '彩票'}, {key: '2', title: '棋牌'}];

interface HomeTabComponentProps {
  containerStyle?: ViewStyle;
}

const SubRightTabOne = () => (
  <View style={{backgroundColor: '#ffffff', flexDirection: 'row', flexWrap: 'wrap'}}>
    <TabCircleButton />
    <TabCircleButton />
    <TabCircleButton />
  </View>
);
const SubRightTabTwo = () => (
  <View>
    <Text>{'subRightTabTwo'}</Text>
  </View>
);
const SubRightTabThree = () => (
  <View>
    <Text>{'subRightTabThree'}</Text>
  </View>
);

const LeftTab = () => (
  <View style={{backgroundColor: '#ffffff', flexDirection: 'row', flexWrap: 'wrap'}}>
    <TabCircleButton />
    <TabCircleButton />
    <TabCircleButton />
  </View>
);

const RightTab = () => {
  const [index, setIndex] = useState(0);
  return (
    <TabView
      navigationState={{index, routes: rightTabRoutes}}
      renderTabBar={(props: any) => {
        return <TabBar {...props} style={styles.tab} tabStyle={styles.rightTabStyle} labelStyle={styles.rightTabLabelStyle} />;
      }}
      renderScene={SceneMap({
        0: SubRightTabOne,
        1: SubRightTabTwo,
        2: SubRightTabThree,
      })}
      onIndexChange={setIndex}
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
    />
  );
};

const HomeTabComponent = ({containerStyle}: HomeTabComponentProps) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={containerStyle}>
      <TabView
        navigationState={{index, routes: mainTabRoutes}}
        renderTabBar={(props: any) => {
          return <TabBar {...props} style={styles.tab} tabStyle={styles.mainTabStyle} />;
        }}
        renderScene={SceneMap({
          0: LeftTab,
          1: RightTab,
        })}
        onIndexChange={setIndex}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'transparent',
  },
  mainTabStyle: {
    backgroundColor: '#ff6b1b',
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
  },
  rightTabStyle: {
    backgroundColor: '#ffffff',
  },
  rightTabLabelStyle: {
    color: '#000000',
  },
});

export default HomeTabComponent;
