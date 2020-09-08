import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  FlatList,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import TabComponent, {
  Scene,
} from '../../../public/components/tars/TabComponent'
import { LHThemeColor } from '../../../public/theme/colors/LHThemeColor'
import { scale } from '../../../public/tools/Scale'
import { LotteryType } from '../../../redux/model/全局/UGLotteryModel'

interface SubType {
  id: string;
  levelType: string;
  name: string;
  openWay: string;
  tipFlag: string;
  sort: string;
  seriesId: string;
  subId: string;
  parentId: string;
  isDelete: string;
  icon: string;
  url: string;
  category: string;
  hot_icon?: any;
  game_code: string;
  is_plus: string;
  site_ids: string;
  site_id: string;
  subtitle: string;
  gameId: string;
  realName: string;
  title: string;
  isInstant: string;
  isSeal: string;
  isClose: string;
  gameType: string;
  logo: string;
}

export interface List {
  id: string;
  icon: string;
  name: string;
  url: string;
  category: string;
  levelType: string;
  sort: string;
  seriesId: string;
  subId: any;
  tipFlag: string;
  openWay: string;
  hotIcon: string;
  gameCode: string;
  subtitle: string;
  subType: SubType[];
  gameId: any;
  realName: string;
  title: string;
  type: string;
  admin_uid: string;
  enable: string;
  headadd: string;
  footadd: string;
  domain: string;
  docType?: number;
  gameType: string;
  logo: string;
  isInstant: string;
  isSeal: string;
  isClose: string;
  supportTrial?: number;
  isPopup?: number;
}

interface RightGame {
  id?: string;
  name: string;
  style?: string;
  logo?: string;
  list: List[];
}

interface LeftGame {
  gameId: LotteryType;
  title: string;
  selected: boolean;
  logo: string;
  gameType: string;
  des: string;
}

interface HomeGameComponentProps {
  containerStyle?: ViewStyle | ViewStyle[];
  leftGames: LeftGame[];
  rightGames: RightGame[];
  renderLeftGame: ({ item: LeftGame, index: number }) => any;
  renderRightGame: ({ item: RightGame, index: number }) => any;
  unActiveTabColor: string;
  activeTabColor: string;
  itemHeight: number;
  leftIcon: string;
  rightIcon: string;
}

const HomeGameComponent = ({
  renderLeftGame,
  renderRightGame,
  leftGames = [],
  rightGames = [],
  containerStyle,
  unActiveTabColor,
  activeTabColor,
  itemHeight,
  leftIcon,
  rightIcon,
}: HomeGameComponentProps) => {
  const [index, setIndex] = useState(0)

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
            <FastImage style={styles.image} source={{ uri: leftIcon }} />
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
            <FastImage style={styles.image} source={{ uri: rightIcon }} />
            <Text style={styles.tabText}>{'购彩大厅'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {index ? (
        <TabComponent
          numColumns={3}
          initialTabIndex={0}
          focusTabColor={LHThemeColor.六合厅.themeColor}
          tabGames={rightGames}
          itemHeight={itemHeight}
          renderScene={({ item, index }) => {
            return (
              <FlatList
                listKey={'HomeGameComponentRight'}
                keyExtractor={(_, index) =>
                  'HomeGameComponentRight' + index.toString()
                }
                style={styles.flatList}
                data={item}
                renderItem={renderRightGame}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )
          }}
        />
      ) : (
          <FlatList
            listKey={'HomeGameComponentLeft'}
            keyExtractor={(_, index) =>
              'HomeGameComponentLeft' + index.toString()
            }
            style={styles.flatList}
            data={leftGames}
            renderItem={renderLeftGame}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
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
  image: {
    width: '10%',
    aspectRatio: 1,
  },
  flatList: {
    paddingTop: scale(25),
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    backgroundColor: '#ffffff',
  },
})

export default HomeGameComponent
