import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View, ViewStyle, ScrollView} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {scale} from '../helpers/function';
import TabCircleButton from '../views/TabCircleButton';
import PushHelper from '../../../public/define/PushHelper';
import StringUtils from '../../../public/tools/StringUtils';

const mainTabRoutes = [{key: '0', title: '热门资讯'}, {key: '1', title: '购彩大厅'}];

interface HomeTabComponentProps {
  tabs: ITab[];
  containerStyle?: ViewStyle;
}

interface ITab {
  name: string;
  list: IList[];
}

interface IList {
  logo: string;
  name: string;
  icon: string;
  category: string;
  gameId: number;
  levelType: string;
}

const SubTab = ({routes, renderScene}) => {
  const [index, setIndex] = useState(0);
  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={(props: any) => {
        return (
          <ScrollView horizontal={true} style={{flexGrow: 0}} showsHorizontalScrollIndicator={false} scrollEventThrottle={200} decelerationRate="fast">
            <TabBar
              {...props}
              style={styles.tab}
              tabStyle={styles.subTabStyle}
              labelStyle={styles.subTabLabelStyle}
              activeColor={'red'}
              inactiveColor={'red'}
              indicatorStyle={{backgroundColor: 'red'}}
            />
          </ScrollView>
        );
      }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{
        height: 0,
        width: Dimensions.get('window').width,
      }}
    />
  );
};

const Scene = ({data, renderItem}) => <FlatList style={styles.scene} columnWrapperStyle={styles.columnWrapperStyle} numColumns={3} data={data} renderItem={renderItem} />;

const HomeTabComponent = ({tabs = [], containerStyle}: HomeTabComponentProps) => {
  // set state
  const [index, setIndex] = useState(0);
  // filter props
  const subTabNames = tabs.map((tab, index) => ({key: index, title: StringUtils.getInstance().deleteHtml(tab.name)}));

  const subScenes = {};
  tabs.forEach((tab, index) => {
    const {list}: ITab = tab;
    subScenes[index] = () => {
      let data = list.filter(ele => ele.levelType == '1');
      const remainder = data.length % 3;
      const patch = remainder > 0 ? 3 - (data.length % 3) : 0;
      data = data.concat(Array(patch).fill({show: false})).map((ele, index) => Object.assign({}, {key: index}, ele));
      if (index == 0) {
        console.log('----data----', data);
      }
      return (
        <Scene
          data={data}
          renderItem={({item}) => {
            const {name, logo, icon, category, gameId, show, realName} = item;
            const mainTitle = name ? (name.length > 0 ? name : realName) : realName;
            return <TabCircleButton logo={logo ? logo : icon} mainTitle={mainTitle} category={category} gameId={gameId} show={show} />;
          }}
        />
      );
    };
  });
  // render
  return (
    <View style={containerStyle}>
      <TabView
        navigationState={{index, routes: mainTabRoutes}}
        renderTabBar={(props: any) => {
          return (
            <TabBar
              {...props}
              style={styles.tab}
              tabStyle={styles.mainTabStyle}
              indicatorStyle={{backgroundColor: 'transparent'}}
              renderLabel={({route, focused}) => {
                return (
                  <View style={[styles.mainTab, focused ? styles.activeMainTab : styles.inactiveMainTab, route.key == '0' ? styles.leftMainTab : styles.rightMainTab]}>
                    <Text style={{color: '#ffffff'}}>{route.title}</Text>
                  </View>
                );
              }}
            />
          );
        }}
        renderScene={SceneMap({
          0: () => <Scene data={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}]} renderItem={({item}) => <TabCircleButton />} />,
          1: () => <SubTab routes={subTabNames} renderScene={SceneMap(subScenes)} />,
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
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  mainTab: {
    width: scale(250),
    aspectRatio: 250 / 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
  },
  activeMainTab: {
    backgroundColor: '#ff6b1b',
  },
  inactiveMainTab: {
    backgroundColor: '#bbbbbb',
  },
  leftMainTab: {
    marginRight: scale(5),
  },
  rightMainTab: {
    marginLeft: scale(5),
  },
  subTabStyle: {
    backgroundColor: '#ffffff',
    width: scale(100),
  },
  subTabLabelStyle: {
    color: '#000000',
  },
  scene: {
    backgroundColor: '#ffffff',
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    height: scale(350),
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly',
  },
});

export default HomeTabComponent;
