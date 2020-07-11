import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'
import { List } from '../../network/Model/RankListModel'
import { scale } from '../../tools/Scale'

interface AnimatedRankComponentProps {
  containerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  rankContainerStyle?: ViewStyle;
  titleConatinerStyle?: ViewStyle;
  rankLists: List[];
  duration?: number;
}

const AnimatedRankComponent = ({
  containerStyle,
  iconContainerStyle,
  rankContainerStyle,
  titleConatinerStyle,
  rankLists,
  duration = 15000,
}: AnimatedRankComponentProps) => {
  const height = useRef(new Animated.Value(0)).current

  const animated = () =>
    Animated.timing(height, {
      toValue: scale((25 * (rankLists?.length ?? 0)) + 250),
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        height?.setValue(0)
        animated()
      }
    })

  useEffect(() => {
    animated()
  }, [])

  return (
    <View style={containerStyle}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <Icon name={'bar-chart'} type={'font-awesome'} size={scale(20)} />
        <Text style={styles.iconText}>{'投注排行榜'}</Text>
      </View>
      <View style={[styles.rankContainer, rankContainerStyle]}>
        <View style={[styles.titleConatiner, titleConatinerStyle]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{'用户名称'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{'游戏名称'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{'投注金额'}</Text>
          </View>
        </View>
        <View style={styles.animatedContainer}>
          <Animated.View style={{ height: height, width: '100%' }}>
            {rankLists?.map((item, index) => {
              const { coin, type, username } = item
              return (
                <View key={index} style={styles.contentContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.content}>{username}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.content}>{type}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.content}>{coin}</Text>
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

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
    paddingVertical: scale(10),
  },
  rankContainer: {
    width: '100%',
    height: scale(250),
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  titleConatiner: {
    flexDirection: 'row',
    paddingVertical: scale(10),
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: scale(5),
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  content: {
    color: '#EA0000',
    fontSize: scale(20),
  },
  iconText: {
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
