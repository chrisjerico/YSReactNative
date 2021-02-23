import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import UseDialogRecord from './UseDialogRecord'
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

interface IDialogRecordComponent {
  betData?: LotteryResultData //开奖结果
  nextIssueData?: NextIssueData //下一期数据
  showCallback?: () => void //窗口 是否显示 回调
}

/**
 * 开奖结果
 * @param menu
 * @param ref
 * @constructor
 */
const DialogRecordComponent = ({ betData, nextIssueData, showCallback }: IDialogRecordComponent, ref?: any) => {

  const {
    setNextIssueData,
    closeWindow,
    setCloseWindow,
    betResult,
    setBetResult,
    counter,
    autoBet,
    setAutoBet,
  } = UseDialogRecord()

  useEffect(() => {
    setBetResult(betData)
    setNextIssueData(nextIssueData)
  }, [])

  useEffect(() => {
    //等到timer关闭才关闭窗口
    closeWindow && !autoBet && showCallback()
  }, [closeWindow, autoBet])


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
  result_container: {
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

export default forwardRef(DialogRecordComponent)

