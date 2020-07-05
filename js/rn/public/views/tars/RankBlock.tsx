import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'
import { scale } from '../../tools/Scale'

interface RankBlockProps {
  containerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  rankContainerStyle?: ViewStyle;
  titleConatinerStyle?: ViewStyle;
  rankLists: any[];
}

const RankBlock = ({
  containerStyle,
  iconContainerStyle,
  rankContainerStyle,
  titleConatinerStyle,
  rankLists,
}: RankBlockProps) => {
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
        {rankLists?.map((item) => {
          const { coin, type, username } = item
          return (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{username}</Text>
              <Text style={styles.content}>{type}</Text>
              <Text style={styles.content}>{coin}</Text>
            </View>
          )
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: scale(5),
  },
  title: {
    paddingTop: scale(5),
    fontWeight: '500',
    fontSize: scale(25),
  },
  content: {
    color: '#EA0000',
  },
  iconText: {
    paddingLeft: scale(5),
  },
})

export default RankBlock
