import { FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../public/network/Model/game/HallGameModel'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../base/CommStyles'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import { scale } from '../../../public/tools/Scale'
import { UGColor } from '../../../public/theme/UGThemeColor'
import LotteryBall, { BallType } from '../../../public/components/view/LotteryBall'
import Button from '../../../public/views/tars/Button'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import PushHelper from '../../../public/define/PushHelper'
import UseBetHistoryList from './UseBetHistoryList'
import { LotteryHistoryData, PlayData } from '../../../public/network/Model/lottery/LotteryHistoryModel'
import { ugLog } from '../../../public/tools/UgLog'
import EBall from '../../../public/components/view/lottery/EBall'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import BetRecordListComponent from './BetRecordListComponent'

interface IHallGameList {
  nextData?: NextIssueData //下期数据
  historyData?: LotteryHistoryData //所有数据
}

/**
 * 彩票开奖头部，特殊的一个
 * @param navigation
 * @constructor
 */
const BetRecordHeaderComponent = ({
                                    nextData,
                                    historyData,
                                  }: IHallGameList) => {

  const {
    showHistory,
    setShowHistory,
    systemInfo,
    userInfo,
  } = UseBetHistoryList()

  /**
   * 绘制生肖
   * @param zodiacStr 生肖编号
   */
  const renderZodiac = (zodiacStr?: string) => {
    let zodiacs = anyEmpty(zodiacStr) ? [] : zodiacStr.split(',')
    if (anyEmpty(zodiacs)) return null
    let lastZodiac = zodiacs.pop() //最后一个球

    return (
      <View style={_styles.zodiac_container}>
        {
          [
            zodiacs?.map((item, index) => (
              <View key={'header' + zodiacStr + item + index}
                    style={_styles.zodiac_text_container}>
                <Text style={_styles.zodiac_text}>{item}</Text>
              </View>
            )),
            lastZodiac && <Text key={'header' + zodiacStr + '+'}
                                style={_styles.text_content_plus}>{'+'}</Text>,
            lastZodiac && <View key={'header' + zodiacStr + lastZodiac}
                                style={_styles.zodiac_text_container}>
              <Text style={_styles.zodiac_text}>{lastZodiac}</Text>
            </View>,
          ]
        }
      </View>
    )
  }

  /**
   * 绘制球
   * @param gameType 游戏种类
   * @param ballStr 游戏编号
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
            <View key={ballStr + 'ct'}
                  style={_styles.ball_wrap_container}>
              {

                [...balls, lastBall]?.map((item, index) => <LotteryBall key={ballStr + item + index}
                                                                 type={ballStyle}
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
            <View key={ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) => <LotteryBall key={ballStr + item + index}
                                                                 type={ballStyle}
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
            <View key={ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) => <LotteryBall key={ballStr + item + index}
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
      case 'lhc'://六合彩
        ballView = (
          [
            <View key={ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [
                  balls?.map((item, index) => <LotteryBall key={ballStr + item + index}
                                                    type={ballStyle}
                                                    ballNumber={item}/>),
                  lastBall && <Text key={ballStr + '+'}
                                    style={_styles.text_content_plus}>{'+'}</Text>,
                  lastBall && <LotteryBall key={ballStr + lastBall}
                                           type={ballStyle}
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
            <View key={ballStr + 'line'}
                  style={CommStyles.flex} />,
            <View key={ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) => <LotteryBall key={ballStr + item + index}
                                                                 type={ballStyle}
                                                                 ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
    }

    return ballView
  }

  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: NextIssueData) => {
    return (
      <View style={_styles.ball_item_container}>
        <View style={_styles.issue_container}>
          {
            anyEmpty(item?.displayNumber) ? null :
              <Text style={_styles.text_content_issue}
                    numberOfLines={2}>{item.displayNumber + '期'}</Text>
          }
          <Icon size={scale(48)}
                key={'' + showHistory}
                onPress={() => setShowHistory(!showHistory)}
                style={_styles.issue_arrow}
                color={Skin1.themeColor}
                name={showHistory ? 'angle-double-up' : 'angle-double-down'}/>
        </View>
        <View>
          { renderBalls(item?.gameType, item?.preNum) }
          { renderZodiac(item?.preResult) }
        </View>
      </View>
    )
  }

  return (
    <View>
      {renderItemContent(nextData)}
      {
        showHistory ?
          <View style={_styles.history_list_container}>
            <BetRecordListComponent historyData={historyData}/>
          </View> :
          null
      }
    </View>
  )
}

/**
 * 球的样式
 */
export const BallStyles = {
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

const _styles = StyleSheet.create({
  ball_item_container: {
    height: scale(120),
    padding: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  issue_container: {
    flex: 1,
  },
  issue_arrow: {
    paddingHorizontal: scale(12),
  },
  text_content_issue: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    textAlign: 'center',
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
  zodiac_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zodiac_text_container: {
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    marginHorizontal: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(38),
    aspectRatio: 1,
  },
  zodiac_text: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    textAlign: 'center',
  },
  history_list_container: {
    width: scale(540),
    aspectRatio: 2,
  },

})

export default BetRecordHeaderComponent
