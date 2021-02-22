import { FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import PushHelper from '../../../../public/define/PushHelper'
import UseHallGameList from './UseHallGameList'
import { BallStyles, BallType, LCode, lotteryBallStyle } from '../../../bet/const/LotteryConst'
import { doubleDigit } from '../../../../public/tools/StringUtil'
import { UGText } from '../../../../../doy/public/Button之类的基础组件/DoyButton'

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

  const {
    systemInfo,
    userInfo,
  } = UseHallGameList()

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
    let balls = anyEmpty(ballStr) ? [] : ballStr.split(',').map((item) => doubleDigit(item)) //球的数组
    let lastBall = balls.pop() //最后一个球
    let ballStyle = lotteryBallStyle(gameType) //球的样式

    let ballView
    switch (gameType) {
      case LCode.bjkl8://北京快8
        ballView = (
          [
            <View style={_styles.ball_wrap_container}>
              {

                [...balls, lastBall]?.map((item) => <LotteryBall key={item}
                                                                 type={ballStyle}
                                                                 size={scale(38)}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case LCode.pk10://赛车系列
      case LCode.xyft://飞艇系列
      case LCode.pk10nn://牛牛系列
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item) => <LotteryBall key={item}
                                                                 type={ballStyle}
                                                                 size={scale(39)}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case LCode.dlt://大乐透系列
        ballView = (
          [
            <View style={CommStyles.flex}/>,
            <View style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) => <LotteryBall key={item}
                                                                        type={ballStyle}
                                                                        ballColor={index < balls.length - 1 ?
                                                                          UGColor.RedColor5 :
                                                                          UGColor.BlueColor6}
                                                                        ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case LCode.lhc://六合彩
        ballView = (
          [
            <View key={'0'}
                  style={CommStyles.flex}/>,
            <View key={'1'}
                  style={_styles.ball_container}>
              {
                balls?.map((item) => <LotteryBall key={item}
                                                  type={ballStyle}
                                                  ballNumber={item}/>)
              }
              {
                lastBall && <UGText style={_styles.text_content_plus}>{'+'}</UGText>
              }
              {
                lastBall && <LotteryBall type={ballStyle}
                                         ballNumber={lastBall}/>
              }
            </View>,
          ]
        )
        break
      default:
        ballView = (
          [
            <View key={'00'}
                  style={CommStyles.flex}/>,
            <View key={'11'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item) => <LotteryBall key={item}
                                                                 type={ballStyle}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
    }

    return anyEmpty(balls)
      ?
      <View style={_styles.start_game_container} pointerEvents={'none'}>
        <Button containerStyle={[_styles.start_game_button, { borderColor: Skin1.themeColor }]}
                titleStyle={[_styles.start_game_text, { color: Skin1.themeColor }]}
                title={'立即游戏'}/>
      </View>
      :
      ballView
  }

  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: HallGameListData) => {
    return (
      <TouchableWithoutFeedback key={item?.name}
                                onPress={() => {
        PushHelper.pushHomeGame(
          Object.assign({}, item, {
            seriesId: '1',
            gameId: item.id,
            subId: item.id,
          })
        )
      }}>
        <View key={item?.name}
              style={_styles.ball_item_container}>
          <FastImage style={_styles.item_logo}
                     resizeMode={'contain'}
                     source={{ uri: item.pic ?? item.logo }}/>
          <View style={CommStyles.flex}>
            <UGText style={_styles.text_content_title}>{item.title}</UGText>
            {renderBalls(item?.parentGameType, item?.preNum)}
            {
              <View style={_styles.date_container}>
                {
                  anyEmpty(item?.preDisplayNumber) ? null :
                    <UGText style={_styles.text_content_issue}>{'第' + item.preDisplayNumber + '期'}</UGText>
                }
                {
                  anyEmpty(item?.preOpenTime) ? null : <UGText style={_styles.text_content_date}>{item.preOpenTime}</UGText>
                }
              </View>
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
                        ListHeaderComponent={<View key={'header'} style={{height:5}} />}
                        ListFooterComponent={<View key={'footer'} style={{height:80}} />}
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

const CONTENT_ITEM_HEIGHT = scale(128) //内容高度

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
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(24),
    borderBottomRightRadius: scale(32),
    borderBottomLeftRadius: scale(24),
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

export default HallGameListComponent
