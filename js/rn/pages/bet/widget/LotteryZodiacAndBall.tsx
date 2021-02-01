import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import CommStyles from '../../base/CommStyles'
import { anyEmpty } from '../../../public/tools/Ext'
import { BallStyles } from '../const/LotteryConst'
import LotteryBall from '../../../public/components/view/LotteryBall'

interface ILotteryZodiacAndBallItem {
  gameType?: string; //彩种 六合彩，秒秒彩 等等
  ballStr?: string; //彩球数据 "09,49,02,40,05,42,07"
  zodiacStr?: string; //生肖数据 "龙,鼠,猪,鸡,猴,羊,马"
}

/**
 * 生肖+彩球
 * @constructor
 */
const LotteryZodiacAndBall = ({
                                gameType,
                                ballStr,
                                zodiacStr,
                              }: ILotteryZodiacAndBallItem) => {

  /**
   * 绘制生肖
   * @param zodiacStr 生肖编号
   */
  const renderZodiac = (zodiacStr?: string) => {
    let zodiacs = anyEmpty(zodiacStr) ? [] : zodiacStr.split(',')
    if (anyEmpty(zodiacs)) return null
    let lastZodiac = zodiacs.pop() //最后一个球

    return (
      <View key={'renderZodiac' + zodiacStr}
            style={_styles.zodiac_container}>
        {
          zodiacs?.map((item, index) => (
            <View key={'renderZodiac' + zodiacStr + item + index}
                  style={_styles.zodiac_text_container}>
              <Text style={_styles.zodiac_text}>{item}</Text>
            </View>
          ))
        }
        {
          lastZodiac && <Text key={'renderZodiac' + zodiacStr + '+'}
                              style={_styles.text_content_plus}>{'+'}</Text>
        }
        {
          lastZodiac && <View key={'renderZodiac' + zodiacStr + lastZodiac}
                              style={_styles.zodiac_text_container}>
            <Text style={_styles.zodiac_text}>{lastZodiac}</Text>
          </View>
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
    let balls = anyEmpty(ballStr) ? [] :
      ballStr.split(',').map((item) => ('0' + item).slice(-2)) //球的数组
    let lastBall = balls.pop() //最后一个球
    let ballStyle = BallStyles[gameType] //球的样式
    ballStyle = anyEmpty(ballStyle) ? BallStyles['lhc'] : ballStyle

    let ballView
    const key = 'header renderBalls' + gameType
    switch (gameType) {
      case 'bjkl8'://北京快8
        ballView = (
          [
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_wrap_container}>
              {

                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
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
            <View key={key + ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
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
            <View key={key + ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
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
                  balls?.map((item, index) =>
                    <LotteryBall key={key + ballStr + item + index}
                                 type={ballStyle}
                                 ballNumber={item}/>),
                  lastBall && <Text key={key + ballStr + '+'}
                                    style={_styles.text_content_plus}>{'+'}</Text>,
                  lastBall && <LotteryBall key={key + ballStr + lastBall}
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
            <View key={key + ballStr + 'line'}
                  style={CommStyles.flex}/>,
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
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

  return (
    <View key={'LotteryZodiacAndBall = ' + gameType + ballStr}>
      {renderBalls(gameType, ballStr)}
      {renderZodiac(zodiacStr)}
    </View>
  )

}

const _styles = StyleSheet.create({
  ball_container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: scale(36),
    aspectRatio: 1,
  },
  zodiac_text: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    textAlign: 'center',
  },
  text_content_plus: {
    color: UGColor.TextColor3,
    fontSize: scale(28),
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
  ball_wrap_container: {//换行
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

export default LotteryZodiacAndBall
export { ILotteryZodiacAndBallItem }

