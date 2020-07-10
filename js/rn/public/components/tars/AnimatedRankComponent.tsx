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
}

const AnimatedRankComponent = ({
  containerStyle,
  iconContainerStyle,
  rankContainerStyle,
  titleConatinerStyle,
  rankLists,
}: AnimatedRankComponentProps) => {

  const height = useRef(new Animated.Value(0)).current

  const animated = () => Animated.timing(height,
    {
      toValue: 2 * scale(23 * ((rankLists?.length ?? 0) + 2)),
      duration: 10000,
      useNativeDriver: false
    }
  ).start(({ finished }) => {
    if (finished) {
      height?.setValue(0)
      animated()
    }
  });

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
          <Text style={styles.title}>{'用户名称'}</Text>
          <Text style={styles.title}>{'游戏名称'}</Text>
          <Text style={styles.title}>{'投注金额'}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: scale(10), marginHorizontal: scale(30), overflow: 'hidden' }}>
          <Animated.View style={{ height: height, width: '100%' }}>
            {
              rankLists?.map((item, index) => {
                const { coin, type, username } = item
                return (
                  <View key={index} style={styles.contentContainer}>
                    <Text style={styles.content}>{username}</Text>
                    <Text style={styles.content}>{type}</Text>
                    <Text style={styles.content}>{coin}</Text>
                  </View>)
              })
            }
          </Animated.View >
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
    aspectRatio: 540 / 240,
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  titleConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(5),
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  content: {
    color: '#EA0000',
    fontSize: scale(18),
  },
  iconText: {
    paddingLeft: scale(5),
  },
})

export default AnimatedRankComponent
