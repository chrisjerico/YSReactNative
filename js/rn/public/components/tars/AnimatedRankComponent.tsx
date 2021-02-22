import React, { memo, useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, ViewStyle, StyleProp, TextStyle, Easing } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RankingListType } from '../../models/Enum'
import { scale } from '../../tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface RankList {
  username: string
  coin: string
  type: string
  actionTime: string
}

interface AnimatedRankComponentProps {
  rankLists: RankList[]
  duration?: number
  type: RankingListType
  iconColor?: string
  containerStyle?: StyleProp<ViewStyle>
  iconTitleContainerStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  titleConatinerStyle?: StyleProp<ViewStyle>
  iconTitleStyle?: StyleProp<TextStyle>
  contentTitleStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<TextStyle>
  leftItemTextStyle?: StyleProp<TextStyle>//行文本
  rightItemTextStyle?: StyleProp<TextStyle>//行文本
}

const itemHeight = 30

const AnimatedRankComponent = ({
  containerStyle,
  iconTitleContainerStyle,
  contentContainerStyle,
  titleConatinerStyle,
  rankLists,
  duration = 1000,
  type,
  iconTitleStyle,
  iconColor,
  contentTitleStyle,
  iconStyle,
  leftItemTextStyle,
  rightItemTextStyle,
}: AnimatedRankComponentProps) => {
  const listHeight = 180
  const count = rankLists?.length
  const height = useRef(new Animated.Value(0)).current

  // 往末尾插入6条数据，在倒数第6条时再回到第一条，使效果看起来像是衔接着循环滚动一样
  rankLists = rankLists.concat(rankLists.filter((v, i) => {
    if (i < 6) return v
  }))

  const animated = () => {
    Animated.timing(height, {
      toValue: -(count * itemHeight + 100),
      delay: 1000,
      duration: (count + 4.5) * duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        height?.setValue(0)
        animated()
      }
    })
  }

  useEffect(() => {
    height?.stopAnimation()
    height?.setValue(listHeight)
    animated()
  }, [])

  if (type == RankingListType.不顯示) {
    return null
  } else {
    return (
      <View style={containerStyle}>
        <View style={[styles.iconTitleContainer, iconTitleContainerStyle]}>
          <FontAwesome name={'bar-chart'} size={scale(20)} color={iconColor} style={iconStyle} />
          <UGText style={[styles.iconText, iconTitleStyle]}>{type == RankingListType.中奖排行榜 ? '中奖排行榜' : '投注排行榜'}</UGText>
        </View>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          <View style={[styles.titleConatiner, titleConatinerStyle]}>
            <View style={styles.textContainer}>
              <UGText style={[styles.title, contentTitleStyle]}>{'玩家'}</UGText>
            </View>
            <View style={styles.textContainer}>
              <UGText style={[styles.title, contentTitleStyle]}>{'游戏'}</UGText>
            </View>
            <View style={styles.textContainer}>
              <UGText style={[styles.title, contentTitleStyle]}>{type == RankingListType.中奖排行榜 ? '中奖金额' : '投注金额'}</UGText>
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
              }}>
              {rankLists?.map((item, index) => {
                const { coin, type, username } = item
                return (
                  <View key={index} style={styles.itemContainer}>
                    <View style={styles.itemTextContainer}>
                      <UGText style={[styles.item, leftItemTextStyle]} numberOfLines={1}>
                        {username}
                      </UGText>
                    </View>
                    <View style={styles.itemTextContainer}>
                      <UGText style={[styles.item, leftItemTextStyle]} numberOfLines={1}>
                        {type}
                      </UGText>
                    </View>
                    <View style={styles.itemTextContainer}>
                      <UGText style={[styles.item, rightItemTextStyle]} numberOfLines={1}>
                        {coin}
                      </UGText>
                    </View>
                  </View>
                )
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    )
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
    height: itemHeight,
    marginVertical: 5,
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  item: {
    color: '#EA0000',
    fontSize: scale(20),
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

export default memo(AnimatedRankComponent)
