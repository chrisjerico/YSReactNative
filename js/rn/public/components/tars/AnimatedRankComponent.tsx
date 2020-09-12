import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native'
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
  const listHeight = 180
  const itemHeight = 40
  const count = rankLists?.length
  const height = useRef(new Animated.Value(listHeight)).current

  const y = useRef(new Animated.Value(0)).current
  const animated = () => {
    Animated.timing(height, {
      toValue: -(count * itemHeight),
      duration: count * duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        height?.setValue(listHeight)
        animated()
      }
    })
  }

  useEffect(() => {
    height?.stopAnimation()
    height?.setValue(listHeight)
    animated()
  }, [])

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
          <View style={[styles.listContainer, { height: listHeight }]}>
            <Animated.View
              style={{
                width: '100%',
                transform: [
                  {
                    translateY: height,
                  },
                ],
              }}
            >
              {rankLists?.map((item, index) => {
                const { coin, type, username } = item
                return (
                  <View key={index} style={styles.itemContainer}>
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.item} numberOfLines={1}>
                        {username}
                      </Text>
                    </View>
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.item} numberOfLines={1}>
                        {type}
                      </Text>
                    </View>
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.item} numberOfLines={1}>
                        {coin}
                      </Text>
                    </View>
                  </View>
                )
              })}
            </Animated.View>
          </View>
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
    height: 30,
    marginVertical: 5,
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
  listContainer: {
    marginTop: scale(5),
    marginBottom: scale(10),
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AnimatedRankComponent
