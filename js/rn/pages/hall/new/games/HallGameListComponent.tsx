import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall, { BallType } from '../../../../public/components/view/LotteryBall'

interface IHallGameList {
  refreshing?: boolean //刷新
  gameData?: Array<HallGameListData> //所有数据
  requestGameData?: () => void //请求数据
}

/**
 * 游戏大厅列表
 * @param navigation
 * @constructor
 */
const HallGameListComponent = ({
                                 refreshing,
                                 gameData,
                                 requestGameData,
                               }: IHallGameList) => {

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestGameData()
                                    }}/>

  /**
   * 绘制提示标题
   * @param item
   */
  const renderItemContent = (item: HallGameListData) => <View style={_styles.ball_item_container}>
    <FastImage style={_styles.item_logo}
               resizeMode={'contain'}
               source={{ uri: item.pic }}/>
    <View style={CommStyles.flex}>
      <Text style={_styles.text_content_title}>{item.title}</Text>
      <View style={_styles.ball_container}>
        {
          [
            ['0', '2', '3', '4', '5'].map((item) => <LotteryBall type={BallType.square}
                                                                 ballNumber={item}/>),
            <Text style={_styles.text_content_plus}>{'+'}</Text>,
            <LotteryBall type={BallType.square}
                         ballNumber={'9'}/>,
          ]
        }
      </View>
      <View style={_styles.date_container}>
        <Text style={_styles.text_content_issue}>{item.category}</Text>
        <Text style={_styles.text_content_date}>{item.status}</Text>
      </View>
    </View>
  </View>

  return (
    <View style={CommStyles.flex}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={gameData}
                        renderItem={({ item, index }) => {
                          return (
                            renderItemContent(item)
                          )
                        }}/>,
        ]
      }
    </View>
  )
}

// const CONTENT_ITEM_HEIGHT = scale(80) //内容高度

const _styles = StyleSheet.create({
  ball_item_container: {
    flex: 1,
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  text_content_title: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(20),
    textAlign: 'center',
  },
  text_content_issue: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(18),
    textAlign: 'center',
  },
  text_content_date: {
    color: UGColor.TextColor2,
    fontSize: scale(18),
    textAlign: 'center',
  },
  text_content_plus: {
    color: UGColor.TextColor1,
    fontSize: scale(22),
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
  item_logo: {
    width: scale(80),
    aspectRatio: 1,
    marginRight: scale(8),
  },
  ball_container: {
    width: '100%',
    flexDirection: 'row',
  },
  ball_item: {
    margin: scale(4),
  },
  date_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default HallGameListComponent
