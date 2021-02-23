import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
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
import NormalDialogComponent, { INormalDialogButton } from '../../../../../public/widget/dialog/普通对话框/NormalDialogComponent'

interface IDialogRecordComponent {
  nextIssueData?: NextIssueData //下一期数据
  onClosingDialog?: () => void //窗口 关闭时 回调
}

/**
 * 开奖结果
 * @param menu
 * @param ref
 * @constructor
 */
const DialogRecordComponent = ({
                                 nextIssueData,
                                 onClosingDialog,
                               }: IDialogRecordComponent, ref?: any) => {

  // const leftData = nextIssueData?

  const {} = UseDialogRecord()

  //左边条目
  const renderLeftColumn = () => {

  }

  //右边条目
  const renderRightColumn = () => {

  }

  //绘制内容
  const renderContent = () => <View style={_styles.content}>
    {renderLeftColumn()}
    {renderRightColumn()}
  </View>

  return (
    <View style={_styles.container}>
      <NormalDialogComponent
        content={'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题'}
        customView={() => <Text>bbb</Text>}
        onClosingDialog={onClosingDialog}
        button={[
          {
            text: '否',
            clickCallback: () => {
            },
          } as INormalDialogButton,
          {
            text: '是',
            highlighted: true,
            clickCallback: () => {
            },
          } as INormalDialogButton,
        ]}/>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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

export default DialogRecordComponent

