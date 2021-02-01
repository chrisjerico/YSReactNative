import { ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { scale } from '../../../../../public/tools/Scale'
import UsePayResult from './UsePayResult'
import Icon from 'react-native-vector-icons/Fontisto'
import { Res } from '../../../../../Res/icon/Res'
import FastImage from 'react-native-fast-image'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'
import LotteryZodiacAndBall from '../../../widget/LotteryZodiacAndBall'
import * as Animatable from 'react-native-animatable'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import { forwardRef } from 'react'
import CommStyles from '../../../../base/CommStyles'

interface IPayResultComponent {
  betData?: LotteryResultData
  showCallback?: () => void //窗口 是否显示 回调
}

/**
 * 下注结果
 * @param menu
 * @param ref
 * @constructor
 */
const PayResultComponent = ({ betData, showCallback }: IPayResultComponent, ref?: any) => {

  const {
    counter,
    autoBet,
    setAutoBet,
  } = UsePayResult()

  /**
   * 绘制 是否中奖图标
   */
  const renderPrize = () => {
    return <Animatable.View animation={zoomOutIn}
                            iterationCount={1}
                            duration={500}
                            iterationDelay={500}
                            style={CommStyles.flex}>
      <FastImage source={Number.parseFloat(betData?.bonus) > 0 ? { uri: Res.mmczjl } : { uri: Res.mmcwzj }}
                 resizeMode={'contain'}
                 style={_styles.zj}/>
    </Animatable.View>
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

          <View style={_styles.text_container}>
            <Text style={_styles.bet_text}>{
              Number.parseFloat(betData?.bonus) > 0 ? '恭喜中奖' : '再接再厉'
            }</Text>
          </View>

          {
            autoBet && <View style={_styles.counter_container}>
              <Animatable.Text animation="pulse"
                               easing="linear"
                               iterationDelay={500}
                               iterationCount={'infinite'}
                               style={_styles.counter_text}>{
                `倒计时: ${3 - counter % 4}s`
              }️</Animatable.Text>
            </View>
          }

          <View style={_styles.zj_container}>
            {renderPrize()}
          </View>

          <TouchableWithoutFeedback onPress={() => setAutoBet(!autoBet)}>
            <View style={_styles.tz_container}>
              {
                autoBet ? <FastImage source={{ uri: Res.mmczt }}
                                     resizeMode={'contain'}
                                     style={_styles.tz}/> :
                  <FastImage source={{ uri: Res.mmczdtz }}
                             resizeMode={'contain'}
                             style={_styles.tz}/>
              }
            </View>
          </TouchableWithoutFeedback>

          <View style={_styles.ball_container}>
            <Animatable.View animation={zoomInOut}
                             iterationCount={1}
                             duration={500}
                             iterationDelay={400}
                             style={CommStyles.flex}>
              <LotteryZodiacAndBall ballStr={betData?.openNum}
                                    zodiacStr={betData?.result}
                                    gameType={betData?.gameType}/>
            </Animatable.View>
          </View>

          <View style={_styles.close_container}>
            <Icon size={scale(48)}
                  onPress={() => showCallback()}
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
    marginTop: scale(98),
    marginRight: scale(64),
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
    paddingBottom: scale(150),
    width: '100%',
    height: '100%',
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
  },

})

const zoomOutIn = {
  0: {
    opacity: 0,
    scale: 10,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

const zoomInOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

export default forwardRef(PayResultComponent)

