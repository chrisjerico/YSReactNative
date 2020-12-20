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
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'

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
  const renderItemContent = (item: HallGameListData) => {

    const balls = anyEmpty(item.preNum) ? [] : item.preNum.split(',').map((item) => ('0' + item).slice(-2))
    const lastBall = balls.pop()

    return (
      <View style={_styles.ball_item_container}>
        <FastImage style={_styles.item_logo}
                   resizeMode={'contain'}
                   source={{ uri: item.pic }}/>
        <View style={CommStyles.flex}>
          <Text style={_styles.text_content_title}>{item.title}</Text>
          {
            anyEmpty(balls) ?
              <View style={_styles.start_game_container}>
                <Button containerStyle={[_styles.start_game_button, { borderColor: Skin1.themeColor }]}
                        titleStyle={[_styles.start_game_text, { color: Skin1.themeColor }]}
                        title={'立即游戏'}/>
              </View> :
              [
                <View style={CommStyles.flex}/>,
                <View style={_styles.ball_container}>
                  {
                    balls.map((item) => <LotteryBall type={BallType.vegetable}
                                                     ballNumber={item}/>)
                  }
                  <Text style={_styles.text_content_plus}>{'+'}</Text>
                  <LotteryBall type={BallType.colorful}
                               ballNumber={lastBall}/>
                </View>,
                <View style={_styles.date_container}>
                  <Text style={_styles.text_content_issue}>{'第' + item.preDisplayNumber + '期'}</Text>
                  <Text style={_styles.text_content_date}>{item.preOpenTime}</Text>
                </View>,
              ]
          }
        </View>
      </View>
    )
  }

  return (
    <View style={CommStyles.flex}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        showsVerticalScrollIndicator={false}
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

const CONTENT_ITEM_HEIGHT = scale(140) //内容高度

const _styles = StyleSheet.create({
  ball_item_container: {
    flex: 1,
    height: CONTENT_ITEM_HEIGHT,
    padding: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  text_content_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    textAlign: 'left',
  },
  text_content_issue: {
    color: UGColor.TextColor3,
    fontSize: scale(18),
    textAlign: 'center',
  },
  text_content_date: {
    flex: 1,
    color: UGColor.TextColor3,
    fontSize: scale(18),
    textAlign: 'right',
  },
  text_content_plus: {
    color: UGColor.TextColor3,
    fontSize: scale(32),
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
  item_logo: {
    width: scale(80),
    aspectRatio: 1,
    marginRight: scale(8),
  },
  start_game_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start_game_button: {
    width: scale(180),
    height: scale(40),
    borderTopLeftRadius: scale(38),
    borderTopRightRadius: scale(16),
    borderBottomRightRadius: scale(38),
    borderBottomLeftRadius: scale(16),
    borderWidth: scale(1),
  },
  start_game_text: {
    fontSize: scale(24),
  },
  ball_container: {
    flexDirection: 'row',
    alignItems: 'center',
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
