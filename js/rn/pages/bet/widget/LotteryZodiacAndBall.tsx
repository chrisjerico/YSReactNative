import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import CommStyles from '../../base/CommStyles'
import { anyEmpty } from '../../../public/tools/Ext'
import { BallStyles, LCode, lotteryBallStyle } from '../const/LotteryConst'
import LotteryBall from '../../../public/components/view/LotteryBall'
import { doubleDigit } from '../../../public/tools/StringUtil'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

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
   * @param gameType 游戏种类
   * @param zodiacStr 生肖编号
   */
  const renderZodiac = (gameType?: string,
                        zodiacStr?: string) => {
    let zodiacs = anyEmpty(zodiacStr) ? [] : zodiacStr.split(',')
    if (anyEmpty(zodiacs)) return null
    let lastZodiac = zodiacs.pop() //最后一个球

    switch (gameType) {
      case LCode.bjkl8://北京快8
        return null

      case LCode.cqssc://时时彩
        return (
          <View key={'renderZodiac' + zodiacStr}
                style={_styles.zodiac_container}>
            {
              zodiacs?.map((item, index) => (
                <View key={'renderZodiac' + zodiacStr + item + index}
                      style={_styles.zodiac_cqssc_text_container}>
                  <UGText style={_styles.zodiac_cqssc_text}>{item}</UGText>
                </View>
              ))
            }
            {
              lastZodiac && <View key={'renderZodiac' + zodiacStr + lastZodiac}
                                  style={_styles.zodiac_cqssc_text_container}>
                <UGText style={_styles.zodiac_cqssc_text}>{lastZodiac}</UGText>
              </View>
            }
          </View>
        )

      case LCode.lhc://六合彩
        return (
          <View key={'renderZodiac' + zodiacStr}
                style={_styles.zodiac_container}>
            {
              zodiacs?.map((item, index) => (
                <View key={'renderZodiac' + zodiacStr + item + index}
                      style={_styles.zodiac_text_container}>
                  <UGText style={_styles.zodiac_text}>{item}</UGText>
                </View>
              ))
            }
            {
              lastZodiac && <UGText key={'renderZodiac' + zodiacStr + '+'}
                                  style={_styles.text_content_plus}>{'+'}</UGText>
            }
            {
              lastZodiac && <View key={'renderZodiac' + zodiacStr + lastZodiac}
                                  style={_styles.zodiac_text_container}>
                <UGText style={_styles.zodiac_text}>{lastZodiac}</UGText>
              </View>
            }
          </View>
        )

      case LCode.pk10://赛车系列
      case LCode.xyft://飞艇系列
      case LCode.fc3d://3D系列
        return (
          <View key={'renderZodiac' + zodiacStr}
                style={_styles.zodiac_container}>
            {
              zodiacs?.map((item, index) => (
                <View key={'renderZodiac' + zodiacStr + item + index}
                      style={_styles.zodiac_text_container}>
                  <UGText style={_styles.zodiac_text}>{item}</UGText>
                </View>
              ))
            }
            {
              lastZodiac && <View key={'renderZodiac' + zodiacStr + lastZodiac}
                                  style={_styles.zodiac_text_container}>
                <UGText style={_styles.zodiac_text}>{lastZodiac}</UGText>
              </View>
            }
          </View>
        )

      default:
        return (
          <View key={'renderZodiac' + zodiacStr}
                style={_styles.zodiac_container}>
            {
              zodiacs?.map((item, index) => (
                <View key={'renderZodiac' + zodiacStr + item + index}
                      style={_styles.zodiac_gdkl10_text_container}>
                  <UGText style={_styles.zodiac_gdkl10_text}>{item}</UGText>
                </View>
              ))
            }
            {
              lastZodiac && <View key={'renderZodiac' + zodiacStr + lastZodiac}
                                  style={_styles.zodiac_gdkl10_text_container}>
                <UGText style={_styles.zodiac_gdkl10_text}>{lastZodiac}</UGText>
              </View>
            }
          </View>
        )
    }
  }

  /**
   * 绘制球
   * @param gameType 游戏种类
   * @param ballStr 游戏编号
   */
  const renderBalls = (gameType?: string,
                       ballStr?: string) => {
    let balls = anyEmpty(ballStr)
      ? [] :
      ballStr.split(',').map((item) => doubleDigit(item)) //球的数组
    let lastBall = balls.pop() //最后一个球
    let ballStyle = lotteryBallStyle(gameType) //球的样式

    let ballView
    const key = 'header renderBalls' + gameType
    switch (gameType) {
      case LCode.bjkl8://北京快8
        ballView = (
          [
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_wrap_container}>
              {

                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
                               type={ballStyle}
                               size={scale(33)}
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
            <View key={key + ballStr + 'line'}/>,
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
                               type={ballStyle}
                               size={scale(32)}
                               ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case LCode.dlt://大乐透系列
        ballView = (
          [
            <View key={key + ballStr + 'line'}/>,
            <View key={key + ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [...balls, lastBall]?.map((item, index) =>
                  <LotteryBall key={key + ballStr + item + index}
                               type={ballStyle}
                               ballColor={index < balls.length - 1 ? UGColor.RedColor5 : UGColor.BlueColor6}
                               ballNumber={item}/>)
              }
            </View>,
          ]
        )
        break
      case LCode.lhc://六合彩
        ballView = (
          [
            <View key={ballStr + 'line'}/>,
            <View key={ballStr + 'ct'}
                  style={_styles.ball_container}>
              {
                [
                  balls?.map((item, index) =>
                    <LotteryBall key={key + ballStr + item + index}
                                 type={ballStyle}
                                 ballNumber={item}/>),
                  lastBall && <UGText key={key + ballStr + '+'}
                                    style={_styles.text_content_plus}>{'+'}</UGText>,
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
            <View key={key + ballStr + 'line'}/>,
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
      {renderZodiac(gameType, zodiacStr)}
    </View>
  )

}

const _styles = StyleSheet.create({
  ball_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zodiac_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zodiac_cqssc_text_container: {
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    marginHorizontal: scale(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(36),
  },
  zodiac_gdkl10_text_container: {
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    marginHorizontal: scale(2),
    paddingHorizontal: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(36),
  },
  zodiac_text_container: {
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    marginHorizontal: scale(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(36),
    aspectRatio: 1,
  },
  zodiac_cqssc_text: {
    color: UGColor.TextColor3,
    fontSize: scale(21),
    textAlign: 'center',
  },
  zodiac_gdkl10_text: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    textAlign: 'center',
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
    width: scale(360),
    justifyContent: 'center',
  },
})

export default LotteryZodiacAndBall
export { ILotteryZodiacAndBallItem }

