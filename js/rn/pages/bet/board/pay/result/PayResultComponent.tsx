import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import UsePayResult from './UsePayResult'
import Icon from 'react-native-vector-icons/Fontisto'
import { Res } from '../../../../../Res/icon/Res'
import FastImage from 'react-native-fast-image'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'
import LotteryZodiacAndBall from '../../../widget/LotteryZodiacAndBall'
import * as Animatable from 'react-native-animatable'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import CommStyles from '../../../../base/CommStyles'
import { NextIssueData } from '../../../../../public/network/Model/lottery/NextIssueModel'
import { AnimZoomInOut, AnimZoomOutIn } from '../../../anim/BetAnim'

interface IPayResultComponent {
  betData?: LotteryResultData //下注结果
  nextIssueData?: NextIssueData //下一期数据
  showCallback?: () => void //窗口 是否显示 回调
}

/**
 * 下注结果
 * @param menu
 * @param ref
 * @constructor
 */
const PayResultComponent = ({ betData, nextIssueData, showCallback }: IPayResultComponent, ref?: any) => {

  const {
    setNextIssueData,
    closeWindow,
    setCloseWindow,
    betResult,
    setBetResult,
    counter,
    autoBet,
    setAutoBet,
  } = UsePayResult()

  useEffect(() => {
    setBetResult(betData)
    setNextIssueData(nextIssueData)
  }, [])

  useEffect(() => {
    //等到timer关闭才关闭窗口
    closeWindow && !autoBet && showCallback()
  }, [closeWindow, autoBet])

  /**
   * 绘制倒计时
   */
  const renderCounter = () => {
    return (
      autoBet && <View style={_styles.counter_container}>
        <Animatable.Text animation="pulse"
                         easing="linear"
                         iterationCount={'infinite'}
                         style={_styles.counter_text}>{
          `倒计时: ${3 - counter % 4}s`
        }️</Animatable.Text>
      </View>
    )
  }

  /**
   * 绘制中奖金额
   */
  const renderBonus = () => {
    return <View style={_styles.text_container}>
      {
        betResult && <Animatable.Text key={betResult?.result + betResult?.openNum}
                                      animation={AnimZoomOutIn}
                                      iterationCount={1}
                                      duration={333}
                                      style={_styles.bet_text}>{
          Number.parseFloat(betResult?.bonus) > 0 ? `+${betResult?.bonus}` : '再接再厉'
        }</Animatable.Text>
      }
    </View>
  }

  /**
   * 绘制 是否中奖图标
   */
  const renderPrize = () => {
    return <View style={_styles.zj_container}>
      {
        betResult && <Animatable.View key={betResult?.result + betResult?.openNum}
                                      animation={AnimZoomOutIn}
                                      iterationCount={1}
                                      duration={333}
                                      style={CommStyles.flex}>
          <FastImage source={Number.parseFloat(betResult?.bonus) > 0 ? { uri: Res.mmczjl } : { uri: Res.mmcwzj }}
                     resizeMode={'contain'}
                     style={_styles.zj}/>
        </Animatable.View>
      }
    </View>
  }

  /**
   * 绘制 自动下注
   */
  const renderAutoBet = () => {
    return <View style={_styles.tz_container}>
      <TouchableWithoutFeedback onPress={() => setAutoBet(!autoBet)}>
        {
          autoBet
            ?
            <FastImage source={{ uri: Res.mmczt }}
                       resizeMode={'contain'}
                       style={_styles.tz}/>
            :
            <FastImage source={{ uri: Res.mmczdtz }}
                       resizeMode={'contain'}
                       style={_styles.tz}/>
        }
      </TouchableWithoutFeedback>
    </View>
  }

  /**
   * 绘制 中奖结果
   */
  const renderResult = () => {
    return <View style={_styles.ball_container}>
      {
        betResult && <Animatable.View key={betResult?.result + betResult?.openNum}
                                      animation={AnimZoomInOut}
                                      iterationCount={1}
                                      duration={333}
                                      style={_styles.ball_content}>
          <LotteryZodiacAndBall ballStr={betResult?.openNum}
                                zodiacStr={nextIssueData?.gameType == 'cqssc' ? null : betResult?.result}
                                gameType={betResult?.gameType}/>
        </Animatable.View>
      }
    </View>
  }

  return (
    <View style={_styles.container}>
      <Modal isVisible={true}
             style={_styles.modal_content}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.5}>
        <View style={_styles.content}>

          <FastImage source={{ uri: Res.mmcbackpic }}
                     resizeMode={'contain'}
                     style={_styles.mmc_image}/>

          {renderBonus()}

          {renderCounter()}

          {renderPrize()}

          {renderAutoBet()}

          {renderResult()}

          <View style={_styles.close_container}>
            <Icon size={scale(48)}
                  onPress={() => {
                    setAutoBet(false)
                    setCloseWindow(true)
                  }}
                  style={_styles.close}
                  color={'white'}
                  name={'close'}/>
          </View>


        </View>
      </Modal>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: scale(600),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mmc_image: {
    width: '100%',
    aspectRatio: 1,
  },
  tz_container: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: scale(42),
    paddingRight: scale(64),
  },
  tz: {//跟注
    width: scale(98),
    aspectRatio: 1,
  },
  zj_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  zj: {//中奖
    width: scale(186),
    height: scale(64),
    marginTop: scale(280),
  },
  close: {
    marginTop: scale(128),
    marginRight: scale(82),
  },
  close_container: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
  },
  ball_container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  ball_content: {
    height: scale(86),
    marginBottom: scale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bet_text: {
    color: UGColor.YellowColor1,
    textAlign: 'center',
    marginBottom: scale(80),
    fontSize: scale(30),
    fontWeight: 'bold',
  },
  counter_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  counter_text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: scale(80),
    fontSize: scale(30),
    marginTop: scale(48),
  },

})

export default forwardRef(PayResultComponent)

