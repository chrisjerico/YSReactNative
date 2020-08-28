import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GameLobbyTabComponent, {
  TabGame,
  Scene,
} from '../../../public/components/tars/GameLobbyTabComponent'
import { scale } from '../../../public/tools/Scale'

interface TabComponentProps {
  containerStyle?: ViewStyle;
  leftGames: any[];
  rightGames: TabGame[];
  renderLeftGame: (item: any, index: number) => any;
  renderRightGame: (item: any, index: number) => any;
  unActiveTabColor: string;
  activeTabColor: string;
  rowHeight: number;
}

const TabComponent = ({
  renderLeftGame,
  renderRightGame,
  leftGames = [],
  rightGames = [],
  containerStyle,
  unActiveTabColor,
  activeTabColor,
  rowHeight,
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
            <FontAwesome5
              name={'fire'}
              color={'#ffffff'}
              style={{ paddingRight: scale(5) }}
              size={scale(20)}
            />
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
            <FontAwesome5
              name={'award'}
              color={'#ffffff'}
              style={{ paddingRight: scale(5) }}
              size={scale(20)}
            />
            <Text style={styles.tabText}>{'购彩大厅'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {index ? (
        <GameLobbyTabComponent
          tabGames={rightGames}
          rowHeight={rowHeight}
          renderScene={renderRightGame}
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
})

export default TabComponent
