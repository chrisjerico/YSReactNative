import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import FastImage from 'react-native-fast-image'
import GameLobbyTabComponent, { Scene } from '../../../public/components/tars/GameLobbyTabComponent'
import { Icon } from '../../../public/network/Model/HomeGamesModel'
import { Data } from '../../../public/network/Model/HomeRecommendModel'
import { LHThemeColor } from '../../../public/theme/colors/LHThemeColor'
import { scale } from '../../../public/tools/Scale'

interface TabComponentProps {
  containerStyle?: ViewStyle;
  leftGames: any[];
  rightGames: (Icon | Data)[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
  unActiveTabColor: string;
  activeTabColor: string;
  itemHeight: number;
  leftIcon: string;
  rightIcon: string;
}

const TabComponent = ({
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
}: TabComponentProps) => {
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
        <GameLobbyTabComponent
          containerStyle={{
            borderBottomRightRadius: scale(10),
            borderBottomLeftRadius: scale(10),
          }}
          numColumns={3}
          initialTabIndex={0}
          focusTabColor={LHThemeColor.六合厅.themeColor}
          tabGames={rightGames}
          itemHeight={itemHeight}
          renderScene={({ item, index }) => {
            return <Scene key={index} data={item} renderItem={renderRightGame} />
          }}
        />
      ) : (
          <Scene
            data={leftGames}
            renderItem={renderLeftGame}
            containerStyle={{
              paddingTop: scale(25),
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
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
    justifyContent: 'flex-start',
  },
  image: {
    width: '10%',
    aspectRatio: 1,
  },
})

export default TabComponent
