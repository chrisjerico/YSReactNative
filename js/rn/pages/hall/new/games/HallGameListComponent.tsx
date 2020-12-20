import { FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall, { BallType } from '../../../../public/components/view/LotteryBall'
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import PushHelper from '../../../../public/define/PushHelper'
import { SeriesId } from '../../../../public/models/Enum'

interface IHallGameList {
  refreshing?: boolean //刷新
  gameData?: HallGameData //所有数据
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
   * 绘制球
   * @param gameType 游戏种类
   */
  const renderBalls = (gameType?: string,
                       ballStr?: string) => {
    let balls = anyEmpty(ballStr) ? [] : ballStr.split(',').map((item) => ('0' + item).slice(-2)) //球的数组
    let lastBall = balls.pop() //最后一个球
    let ballStyle = BallStyles[gameType] //球的样式
    ballStyle = anyEmpty(ballStyle) ? BallStyles['lhc'] : ballStyle

    let ballView
    switch (gameType) {
      case 'bjkl8'://北京快8
        ballView = (
          [
            <View style={_styles.ball_wrap_container}>
              {

                [...balls, lastBall]?.map((item) => <LotteryBall type={ballStyle}
                                                                 size={scale(38)}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case 'pk10'://赛车系列
      case 'xyft'://飞艇系列
      case 'pk10nn'://牛牛系列
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item) => <LotteryBall type={ballStyle}
                                                                 size={scale(39)}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case 'dlt'://大乐透系列
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) => <LotteryBall type={ballStyle}
                                                                        ballColor={index < balls.length - 1 ?
                                                                          UGColor.RedColor5 :
                                                                          UGColor.BlueColor6}
                                                                        ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case 'lhc'://六合彩
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [
                  balls?.map((item) => <LotteryBall type={ballStyle}
                                                    ballNumber={item}/>),
                  lastBall && <Text style={_styles.text_content_plus}>{'+'}</Text>,
                  lastBall && <LotteryBall type={ballStyle}
                                           ballNumber={lastBall}/>,
                ]
              }
            </View>,
          ]
        )
        break
      default:
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item) => <LotteryBall type={ballStyle}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
    }

    return anyEmpty(balls) ?
      <View style={_styles.start_game_container}>
        <Button containerStyle={[_styles.start_game_button, { borderColor: Skin1.themeColor }]}
                titleStyle={[_styles.start_game_text, { color: Skin1.themeColor }]}
                title={'立即游戏'}/>
      </View> :
      ballView
  }

  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: HallGameListData) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        PushHelper.pushHomeGame(
          Object.assign({}, item, {
            seriesId: '1',
            gameId: item.id,
            subId: item.id,
          })
        )
      }}>
        <View style={_styles.ball_item_container}>
          <FastImage style={_styles.item_logo}
                     resizeMode={'contain'}
                     source={{ uri: item.pic }}/>
          <View style={CommStyles.flex}>
            <Text style={_styles.text_content_title}>{item.title}</Text>
            {
              [
                renderBalls(gameData?.gameType, item?.preNum),
                <View style={_styles.date_container}>
                  {
                    anyEmpty(item?.preDisplayNumber) ? null :
                      <Text style={_styles.text_content_issue}>{'第' + item.preDisplayNumber + '期'}</Text>
                  }
                  {
                    anyEmpty(item?.preOpenTime) ? null : <Text style={_styles.text_content_date}>{item.preOpenTime}</Text>
                  }
                </View>,
              ]
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={CommStyles.flex}>
      {
        [
          anyEmpty(gameData?.list)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={gameData?.list}
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

/**
 * 球的样式
 */
const BallStyles = {
  'lhc': BallType.round, //六合彩
  'qxc': BallType.pure, //"七星彩系列"
  'cqssc': BallType.pure, //"时时彩系列"
  'pk10': BallType.square, //"赛车系列"
  'xyft': BallType.square, //"飞艇系列"
  'yncp': BallType.pure, //"越南彩系列"
  'fc3d': BallType.pure, //"3D系列"
  'gdkl10': BallType.pure, //"快乐10分系列"
  'pk10nn': BallType.square, //"牛牛系列"
  'xync': BallType.vegetable, //"幸运农场系列"
  'bjkl8': BallType.pure, //"快乐8系列"
  'dlt': BallType.round, //"大乐透系列"
  'pcdd': BallType.pure, //"蛋蛋系列"
  'jsk3': BallType.sz, //"快三系列"
  'gd11x5': BallType.pure, //"11选5系列"
}

const CONTENT_ITEM_HEIGHT = scale(140) //内容高度

const _styles = StyleSheet.create({
  ball_item_container: {
    flex: 1,
    minHeight: CONTENT_ITEM_HEIGHT,
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
  ball_wrap_container: {//换行
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
