import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
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

const LeftTab = () => (
  <View style={styles.scene}>
    <TabCircleButton />
    <TabCircleButton />
    <TabCircleButton />
    <TabCircleButton />
  </View>
);

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
        width: Dimensions.get('window').width,
      }}
    />
  );
};

const HomeTabComponent = ({tabs = [], containerStyle}: HomeTabComponentProps) => {
  // set state
  const [index, setIndex] = useState(0);
  // filter props
  const subTabNames = tabs.map((tab, index) => ({key: index, title: StringUtils.getInstance().deleteHtml(tab.name)}));

  const subScenes = {};
  tabs.forEach((tab, index) => {
    const {list}: ITab = tab;
    subScenes[index] = () => {
      return (
        <View style={styles.scene}>
          {list
            .filter(ele => ele.levelType == '1')
            .map((ele: any) => {
              const {name, logo, icon, category, gameId} = ele;
              return (
                <TabCircleButton
                  logoUri={logo ? logo : icon}
                  mainTitle={name}
                  onPress={() => {
                    PushHelper.pushCategory(category, gameId);
                  }}
                />
              );
            })}
        </View>
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
          0: LeftTab,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
});

export default HomeTabComponent;
