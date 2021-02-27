import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useEffect, useMemo } from 'react'
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
import { currentPlayOddData, currentTabGroupData } from '../../../util/select/ParseSelectedUtil'
import { HoChiMin, HoChiMinSub, LCode } from '../../../const/LotteryConst'
import { anyLength, arrayLength } from '../../../../../public/tools/Ext'

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

  //左边数据
  const leftData = useMemo(() => {
    return {
      '特等奖': nextIssueData?.d0,
      '一等奖': nextIssueData?.d1,
      '二等奖': nextIssueData?.d2,
      '三等奖': nextIssueData?.d3,
      '四等奖': nextIssueData?.d4,
      '五等奖': nextIssueData?.d5,
      '六等奖': nextIssueData?.d6,
      '七等奖': nextIssueData?.d7,
      '八等奖': nextIssueData?.d8,
    }
  }, [nextIssueData])

  //右边数据
  const rightData = useMemo(() => {
    return {
      '无头': '尾巴',
      '无0': nextIssueData?.t0,
      '无1': nextIssueData?.t1,
      '无2': nextIssueData?.t2,
      '无3': nextIssueData?.t3,
      '无4': nextIssueData?.t4,
      '无5': nextIssueData?.t5,
      '无6': nextIssueData?.t6,
      '无7': nextIssueData?.t7,
      '无8': nextIssueData?.t8,
      '无9': nextIssueData?.t9,
    }
  }, [nextIssueData])

  const {
    windowShow,
    setWindowShow,
  } = UseDialogRecord()


  //窗口关闭时回调
  useEffect(() => {
    !windowShow && onClosingDialog && onClosingDialog()
  }, [windowShow])

  /**
   * 绘制彩色文字
   * @param text
   * @param textIndex
   * @param array
   */
  const renderMulColorText = (text?: string, textIndex?: number, array?: string[]) => {
    const gameCode = currentPlayOddData()?.code
    const tabCode = currentTabGroupData()[0]?.plays[0]?.code

    let textArray = text?.split(',')

    const viewArr = textArray?.map((item, index) => {

      //红色字体起始位置，一般是 有几页，就有几位的红色
      let colorStart = anyLength(item) - arrayLength(currentTabGroupData())
      //红色截止位置，把一个字符串分成3段，如 12345 -> 123 4 5
      let colorEnd = item.length

      switch (true) {
        case tabCode == HoChiMinSub.BIAOTI: //只有最后一个红色
          if (textIndex != arrayLength(array) - 1) {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.ZHUANTI: //只有第一个红色
          if (textIndex != 0) {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.BIAOTIWB: // 只有第一个, 最后一个红色
          if (textIndex != arrayLength(array) - 1 && textIndex != 0) {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.TOU: // 只有第一个数字是红色
          colorStart = item.length - 2
          colorEnd = item.length - 1
          if (textIndex != 0) {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.WEI: // 只有第一个数字是红色
          colorStart = item.length - 1
          colorEnd = item.length
          if (textIndex != 0) {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.H_3YINJIE: // 只有第7个数字是红色
          if (textIndex == 7) {
            colorStart = 0
          } else {
            colorStart = anyLength(item)
          }
          break

        case tabCode == HoChiMinSub.H_4GTEBIE: // 只有第1个数字是红色
          if (textIndex == 0) {
            colorStart = item.length - 4
          } else {
            colorStart = anyLength(item)
          }
          break

        // case gameCode == HoChiMin.DDQX:
        //
        //   break

        default:
          // colorStart = 2
          break

      }

      let textArr: string[]
      if (anyLength(item) >= colorStart) {
        textArr = [
          item?.slice(0, colorStart),
          item?.slice(colorStart, colorEnd),
          item?.slice(colorEnd, item.length),
        ]
      } else {
        textArr = [item, '', '']
      }

      return (
        <Text style={_styles.item_text}>
          {textArr[0]}
          <Text style={_styles.item_text_2}>{
            textArr[1]
          }
          </Text>
          {textArr[2]}
          {index < arrayLength(textArray) - 1 ? '-' : ''}
        </Text>
      )
    })

    return (<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>{viewArr}</View>)
  }

  //左边条目
  const renderLeftColumn = () => {
    return (
      <View style={_styles.content_left}>
        {
          Object.keys(leftData)?.map((key, index, array) => (
            <View style={[
              _styles.content_left_container,
              index === 4 ? { height: 3 * ITEM_HEIGHT } : null,
            ]}>
              <Text style={_styles.item_text_title}>{key}</Text>
              {renderMulColorText(leftData[key], index, array)}
            </View>
          ))
        }
      </View>
    )
  }

  //右边条目
  const renderRightColumn = () => {
    return (
      <View style={_styles.content_right}>
        {
          Object.keys(rightData)?.map((key) => (
            <View style={_styles.content_left_container}>
              <Text style={_styles.item_text_title}>{key.substr(1)}</Text>
              <Text style={_styles.item_text}>{rightData[key]}</Text>
            </View>
          ))
        }
      </View>
    )
  }

  //绘制内容
  const renderContent = () => <View style={_styles.content}>
    {renderLeftColumn()}
    {renderRightColumn()}
  </View>

  return (
    windowShow && <View style={_styles.container}>
      <NormalDialogComponent
        title={'开奖详情'}
        customView={() => renderContent()}
        button={[
          {
            text: '确定',
            highlighted: true,
            clickCallback: () => setWindowShow(false),
          } as INormalDialogButton,
        ]}/>
    </View>
  )
}

const ITEM_HEIGHT = scale(42) //一个条目的高度

const _styles = StyleSheet.create({
  container: {},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content_left: {
    flex: 2,
  },
  content_left_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ITEM_HEIGHT,
    borderWidth: scale(0.5),
    borderColor: UGColor.LineColor4,
    paddingRight: scale(4),
  },
  content_right: {
    flex: 1,
  },
  item_text_title: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingHorizontal: scale(16),
    minWidth: scale(56),
  },
  item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
  },
  item_text_2: {
    color: UGColor.RedColor5,
    fontSize: scale(20),
  },
  // mmc_image: {
  //   width: '100%',
  //   aspectRatio: 1,
  // },
  // tz_container: {
  //   position: 'absolute',
  //   alignItems: 'flex-end',
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'flex-end',
  //   paddingBottom: scale(42),
  //   paddingRight: scale(64),
  // },
  // tz: {//跟注
  //   width: scale(98),
  //   aspectRatio: 1,
  // },
  // zj_container: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   alignItems: 'center',
  // },
  // zj: {//中奖
  //   width: scale(186),
  //   height: scale(64),
  //   marginTop: scale(280),
  // },
  // close: {
  //   marginTop: scale(128),
  //   marginRight: scale(82),
  // },
  // close_container: {
  //   position: 'absolute',
  //   alignItems: 'flex-end',
  //   width: '100%',
  //   height: '100%',
  // },
  // result_container: {
  //   position: 'absolute',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   width: '100%',
  //   height: '100%',
  // },
  // ball_content: {
  //   height: scale(86),
  //   marginBottom: scale(150),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // text_container: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // bet_text: {
  //   color: UGColor.YellowColor1,
  //   textAlign: 'center',
  //   marginBottom: scale(80),
  //   fontSize: scale(30),
  //   fontWeight: 'bold',
  // },
  // counter_container: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   alignItems: 'center',
  // },
  // counter_text: {
  //   color: 'white',
  //   textAlign: 'center',
  //   marginBottom: scale(80),
  //   fontSize: scale(30),
  //   marginTop: scale(48),
  // },

})

export default DialogRecordComponent

