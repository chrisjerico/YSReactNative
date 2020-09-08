import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
  rankContainerStyle?: ViewStyle | ViewStyle[];
  titleConatinerStyle?: ViewStyle | ViewStyle[];
  rankLists: RankList[];
  duration?: number;
  type: number;
  initialAnimatedHeight?: number;
  finalAnimatedHeight?: number;
}

const AnimatedRankComponent = ({
  containerStyle,
  iconTitleContainerStyle,
  rankContainerStyle,
  titleConatinerStyle,
  rankLists,
  duration = 1000,
  type,
  initialAnimatedHeight = 10,
  finalAnimatedHeight = 200,
}: AnimatedRankComponentProps) => {
  const height = useRef(new Animated.Value(initialAnimatedHeight)).current

  const animated = () => {
    Animated.timing(height, {
      toValue: finalAnimatedHeight,
      duration: 10000 + (rankLists?.length ?? 0) * duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        height?.setValue(initialAnimatedHeight)
        animated()
      }
    })
  }

  useEffect(() => {
    height?.stopAnimation()
    height?.setValue(initialAnimatedHeight)
    animated()
  }, [rankLists?.length])

  if (type != 0) {
    return (
      <View style={containerStyle}>
        <View style={[styles.iconTitleContainer, iconTitleContainerStyle]}>
          <FontAwesome name={'bar-chart'} size={scale(20)} />
          <Text style={styles.iconText}>
            {type == 1 ? '中奖排行榜' : '投注排行榜'}
          </Text>
        </View>
        <View style={[styles.rankContainer, rankContainerStyle]}>
          <View style={[styles.titleConatiner, titleConatinerStyle]}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'玩家'}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'游戏'}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {type == 1 ? '中奖金额' : '投注金额'}
              </Text>
            </View>
          </View>
          <View style={styles.animatedContainer}>
            <Animated.View style={{ height: height, width: '100%' }}>
              {rankLists?.map((item, index) => {
                const { coin, type, username } = item
                return (
                  <View key={index} style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.content} numberOfLines={1}>
                        {username}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.content} numberOfLines={1}>
                        {type}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.content} numberOfLines={1}>
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
  rankContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
    height: scale(250),
  },
  titleConatiner: {
    flexDirection: 'row',
    paddingVertical: scale(10),
    height: scale(50),
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: scale(10),
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  content: {
    color: '#EA0000',
    fontSize: scale(25),
  },
  iconText: {
    fontSize: scale(25),
    paddingLeft: scale(5),
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: scale(10),
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default AnimatedRankComponent
