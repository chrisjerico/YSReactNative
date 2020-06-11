import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import StringUtils from '../../../public/tools/StringUtils';
import {scale} from '../helpers/function';
import DropScene from '../views/DropScene';
import TabButton from '../views/TabButton';

const mainTabRoutes = [{key: '0', title: '热门资讯'}, {key: '1', title: '购彩大厅'}];

interface TabComponentProps {
  date: string;
  onPressTab: (props: any) => any;
  leftTabs: any[];
  rightTabs: ITab[];
  containerStyle?: ViewStyle;
  lotterys: Lottery[];
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

interface Lottery {
  number?: string;
  color?: string;
  sx?: string;
  showMore?: boolean;
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

const TabComponent = ({lotterys = [], date = '', onPressTab, leftTabs = [], rightTabs = [], containerStyle}: TabComponentProps) => {
  // set state
  const [index, setIndex] = useState(0);
  const [showDropScene, setShowDropScene] = useState(false);
  const [square, setSquare] = useState(false);
  // filter props
  const subTabNames = rightTabs.map((tab, index) => ({key: index, title: StringUtils.getInstance().deleteHtml(tab.name)}));
  const subScenes = {};
  rightTabs.forEach((tab, index) => {
    const {list}: ITab = tab;
    subScenes[index] = () => {
      let data = list.filter(ele => ele.levelType == '1');
      const remainder = data.length % 3;
      const patch = remainder > 0 ? 3 - (data.length % 3) : 0;
      data = data.concat(Array(patch).fill({show: false})).map((ele, index) => Object.assign({}, {key: index}, ele));
      return (
        <Scene
          data={data}
          renderItem={({item}) => {
            const {name, logo, icon, realName} = item;
            const mainTitle = name ? (name.length > 0 ? name : realName) : realName;
            return <TabButton {...item} logo={logo ? logo : icon} mainTitle={mainTitle} onPress={() => onPressTab && onPressTab(item)} />;
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
          0: () => (
            <View style={styles.leftScene}>
              {leftTabs.map((item, index) => (
                <TabButton
                  key={index}
                  {...item}
                  onPress={() => {
                    if (index == 2) {
                    } else {
                      setShowDropScene(true);
                      if (index == 0) {
                        setSquare(false);
                      } else if (index == 1) {
                        setSquare(true);
                      }
                    }
                  }}
                />
              ))}
            </View>
          ),
          1: () => <SubTab routes={subTabNames} renderScene={SceneMap(subScenes)} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
      {showDropScene ? (
        <DropScene
          onPress={() => setShowDropScene(false)}
          square={square}
          lotterys={lotterys}
          date={date}
          renderText={() => (
            <>
              <Text>{'下期开奖时间 '}</Text>
              <Text style={{color: '#ff861b'}}>{'2020-07-15 21:30'}</Text>
            </>
          )}
        />
      ) : null}
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
    backgroundColor: '#7B7B7B',
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
  leftScene: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    height: scale(410),
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
});

export default TabComponent;
