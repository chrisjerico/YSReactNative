import React, { useEffect, useRef } from 'react'
import { Animated, FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RankingListType } from '../../models/Enum'
import { scale } from '../../tools/Scale'

interface RankList {
  username: string;
  coin: string;
  type: string;
  actionTime: string;
}

interface AnimatedRankComponentProps {
  containerStyle?: ViewStyle | ViewStyle[];
  iconTitleContainerStyle?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
  titleConatinerStyle?: ViewStyle | ViewStyle[];
  rankLists: RankList[];
  duration?: number;
  type: RankingListType;
}

const AnimatedRankComponent = ({
  containerStyle,
  iconTitleContainerStyle,
  contentContainerStyle,
  titleConatinerStyle,
  rankLists,
  duration = 1000,
  type,
}: AnimatedRankComponentProps) => {

  const scroll = useRef(null)

  const count = rankLists?.length ?? 0
  const listHeight = 160
  const itemHeight = 40
  const y = useRef(new Animated.Value(0)).current
  const animated = () => {
    Animated.timing(y, {
      delay: 0,
      toValue: (itemHeight * count) + listHeight,
      duration: (count + 4) * duration,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        y?.setValue(0)
        animated()
      }
    })
  }

  const init = () => {
    y?.stopAnimation()
    y?.removeAllListeners()
    y?.setValue(0)
  }

  useEffect(() => {
    init()
    y?.addListener((animation) => {
      const offset = animation?.value
      scroll?.current?.scrollToOffset({ offset, animated: false })
    })
    animated()
    return () => y?.removeAllListeners()
  }, [count])

  if (type != 0) {
    return (
      <View style={containerStyle}>
        <View style={[styles.iconTitleContainer, iconTitleContainerStyle]}>
          <FontAwesome name={'bar-chart'} size={scale(20)} />
          <Text style={styles.iconText}>
            {type == RankingListType.中奖排行榜 ? '中奖排行榜' : '投注排行榜'}
          </Text>
        </View>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          <View style={[styles.titleConatiner, titleConatinerStyle]}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'玩家'}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'游戏'}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {type == RankingListType.中奖排行榜 ? '中奖金额' : '投注金额'}
              </Text>
            </View>
          </View>
          <FlatList
            ref={scroll}
            listKey={'AnimatedRankComponent'}
            keyExtractor={(_, index) => 'AnimatedRankComponent' + index.toString()}
            style={{ marginBottom: scale(20), height: listHeight }}
            ListHeaderComponent={() => <View style={{ height: listHeight }} />}
            ListFooterComponent={() => <View style={{ height: listHeight }} />}
            getItemLayout={(_, index) => {
              return {
                length: itemHeight, offset: itemHeight * index, index
              }
            }}
            scrollEnabled={false}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            data={rankLists}
            renderItem={({ item }) => {
              const { username, coin, type } = item
              return (
                <View style={styles.itemContainer} >
                  <View style={styles.itemtextContainer}>
                    <Text style={styles.item} numberOfLines={1}>
                      {username}
                    </Text>
                  </View>
                  <View style={styles.itemtextContainer}>
                    <Text style={styles.item} numberOfLines={1}>
                      {type}
                    </Text>
                  </View>
                  <View style={styles.itemtextContainer}>
                    <Text style={styles.item} numberOfLines={1}>
                      {coin}
                    </Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
    paddingVertical: scale(10),
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  titleConatiner: {
    flexDirection: 'row',
    paddingVertical: scale(10),
    height: scale(50),
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    height: 30,
    overflow: 'hidden',
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  item: {
    color: '#EA0000',
    fontSize: scale(25),
  },
  iconText: {
    fontSize: scale(25),
    paddingLeft: scale(5),
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemtextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AnimatedRankComponent
