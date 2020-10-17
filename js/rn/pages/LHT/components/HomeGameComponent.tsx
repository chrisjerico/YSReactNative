import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import TabComponent from '../../../public/components/tars/TabComponent'
import { Game } from '../../../public/models/Interface'
import { LHThemeColor } from '../../../public/theme/colors/LHThemeColor'
import { scale } from '../../../public/tools/Scale'
import List from '../../../public/views/tars/List'
import { LotteryType } from '../../../redux/model/全局/UGLotteryModel'

interface RightGame {
  id?: string
  name: string
  style?: string
  logo?: string
  list: Game[]
}

interface LeftGame {
  gameId: LotteryType
  title: string
  selected: boolean
  logo: string
  gameType: string
  des: string
}

interface HomeGameComponentProps {
  containerStyle?: StyleProp<ViewStyle>
  leftGames: LeftGame[]
  rightGames: RightGame[]
  renderLeftGame: ({ item: LeftGame, index: number }) => any
  renderRightGame: ({ item: RightGame, index: number }) => any
  unActiveTabColor: string
  activeTabColor: string
  itemHeight: number
  leftIcon: string
  rightIcon: string
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

  const renderScene = useCallback(({ item, index }) => {
    return <List uniqueKey={'LHTHomeGameComponentRight' + index} style={styles.list} data={item} renderItem={renderRightGame} numColumns={3} />
  }, [])

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
            ]}>
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
            ]}>
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
          renderScene={renderScene}
          tabBarBackgroundColor={'#ffffff'}
        />
      ) : (
        <List uniqueKey={'LHTHomeGameComponentLeft'} style={styles.list} data={leftGames} renderItem={renderLeftGame} numColumns={3} />
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
  list: {
    paddingTop: scale(25),
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    backgroundColor: '#ffffff',
  },
})

export default HomeGameComponent
