import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, RefObject, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryConst from '../../const/LotteryConst'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../../../redux/store/UGStore'
import { ugLog } from '../../../../public/tools/UgLog'
import BetLotteryContext from '../../BetLotteryContext'
import UsePayBoard from './UsePayBoard'
import { Toast } from '../../../../public/tools/ToastUtils'

interface IPayBoardComponent {
  showCallback?: () => void //窗口 是否显示 回调
}

/**
 * 下注面板
 * @param menu
 * @param onMenuClick
 * @param ref
 * @constructor
 */
const PayBoardComponent = ({ showCallback, }: IPayBoardComponent, ref?: any) => {


  const {
    setShowCallback,
    showWindow,
    setShowWindow,
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    itemCount,
    playOddDetailData,
    selectedData,
    startBet,
  } = UsePayBoard()

  useEffect(() => setShowCallback(showCallback), [])

  // ugLog('Object?.values(selectedData)=', Object?.values(selectedData))
  // ugLog('Object.keys(selectedData) = ', Object.keys(selectedData))

  // ugLog('itemCount = ', itemCount, JSON.stringify(groupValueArr?.flat(2)))

  // 生成数据对应的 View
  const itemViewArr = useMemo(() => {
    return Object.keys(selectedData).map((key) => {
      const groupDataArr: Array<PlayGroupData> = selectedData[key]
      return groupDataArr?.map((groupData) => {
        switch (key) {
          case LotteryConst.TM:  //特码
            return groupData?.plays?.map((playData) => {
              return (<View key={playData?.id + playData?.name}
                            style={_styles.item_container}>
                <Text style={_styles.item_title}>{`【${groupData?.alias}-${playData?.id}】`}</Text>
                <Text style={_styles.item_odds}>{`@${playData?.odds}`}</Text>
                <Text style={_styles.item_x}>{'X'}</Text>
                <TextInput defaultValue={averageMoney?.toString()}
                           onChangeText={text => setMoneyMap(prevState => {
                             const dataMap = new Map<string, number>()
                             dataMap[playData?.id] = Number.parseFloat(text)
                             ugLog('prevState = ', JSON.stringify(prevState))
                             ugLog('dataMap = ', JSON.stringify(dataMap))
                             return { ...prevState, ...dataMap }
                           })}
                           keyboardType={'numeric'}
                           style={_styles.item_input}/>
              </View>)
            })

          case LotteryConst.HX://合肖
            return null

          case LotteryConst.ZM: //正码
          case LotteryConst.ZT:  //正特
            return null

          case LotteryConst.LMA:  //连码
            return null

          case LotteryConst.LM: //两面
          case LotteryConst.ZM1_6: //正码1T6
          case LotteryConst.SB: //色波
          case LotteryConst.ZOX://总肖
          case LotteryConst.WX:  //五行
            return null

          case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TX: //特肖
          case LotteryConst.ZX: //正肖
          case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
            return null

          case LotteryConst.LX: //连肖
            return null

          case LotteryConst.LW: //连尾
            return null

          case LotteryConst.ZXBZ:  //自选不中
            return null
        }

      })

    }).flat(2)

  }, [selectedData, averageMoney])

  const listHeight = useMemo(() => (itemCount < 8 ? itemCount : 8) * ITEM_HEIGHT, [itemCount])

  return (
    <View style={_styles.container}>
      <Modal isVisible={showWindow}
             style={_styles.modal_content}
             onBackdropPress={() => setShowWindow(false)}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.3}>
        <View style={[
          _styles.content,
          { height: listHeight + scale(310) }, //还要算上条目下面的下注按钮等元素的高度
        ]}>
          <View style={[
            _styles.dialog_title_container,
            { backgroundColor: Skin1.themeColor },
          ]}>
            <Text style={_styles.dialog_title_text}>{playOddDetailData()?.game?.title + '-下注清单'}</Text>
          </View>
          <View style={[_styles.sv_parent, { height: listHeight }]}>
            <ScrollView style={_styles.sv_container}
                        showsVerticalScrollIndicator={false}>
              <View style={_styles.sv_content}>
                {itemViewArr}
              </View>
            </ScrollView>
          </View>
          <View style={_styles.total_info_container}>
            <Text style={_styles.total_info_title}>{'投注金额不能为小数：'}</Text>
            <TextInput value={averageMoney?.toString()}
                       keyboardType={'numeric'}
                       onChangeText={(text => setAverageMoney(Number.parseFloat(text)))}
                       style={_styles.total_input_money}/>
          </View>
          <View style={_styles.last_info_container}>
            <Text style={_styles.bet_result}>{'合计注数：'}</Text>
            <Text style={[_styles.bet_result,
              { color: Skin1.themeColor }]}>{itemCount}</Text>
            <Text style={_styles.bet_result2}>{'总金额：'}</Text>
            <Text style={[_styles.bet_result_total_money,
              { color: Skin1.themeColor }]}>{totalMoney}</Text>
          </View>
          <View style={_styles.bt_container}>
            <Text style={_styles.pay_bt}
                  onPress={() => setShowWindow(false)}>{'取消'}</Text>
            <Text style={[_styles.pay_bt,
              { backgroundColor: Skin1.themeColor, color: 'white' }]}
                  onPress={() => setShowWindow(false)}>{'确定'}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const ITEM_HEIGHT = scale(68) //每个条目高度
const ITEM_WIDTH = scale(440) //每个条目宽度

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(16),
    backgroundColor: UGColor.BackgroundColor1,
    // backgroundColor: 'red',
  },
  sv_parent: {},
  sv_container: {},
  sv_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bet_result_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  bet_result: {
    color: UGColor.TextColor2,
    fontSize: scale(26),
  },
  bet_result2: {
    color: UGColor.TextColor2,
    fontSize: scale(26),
    paddingLeft: scale(24),
  },
  bet_result_total_money: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  item_container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.LineColor4,
  },
  item_title: {
    flex: 1,
    textAlign: 'left',
    fontSize: scale(20),
    paddingRight: scale(16),
    color: UGColor.TextColor2,
  },
  item_odds: {
    fontSize: scale(20),
    color: UGColor.TextColor2,
  },
  item_x: {
    color: UGColor.TextColor2,
    fontSize: scale(20),
    paddingHorizontal: scale(8),
  },
  item_input: {
    width: scale(64),
    textAlign: 'center',
    color: UGColor.TextColor2,
    fontSize: scale(24),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: scale(4),
  },
  dialog_title_container: {
    width: '100%',
    borderTopRightRadius: scale(16),
    borderTopLeftRadius: scale(16),
  },
  dialog_title_text: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    paddingVertical: scale(16),
    fontSize: scale(24),
    paddingHorizontal: scale(8),
  },
  total_info_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingTop: scale(12),
  },
  total_info_title: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingLeft: scale(22),
  },
  total_input_money: {
    flex: 1,
    width: scale(64),
    textAlign: 'center',
    color: UGColor.TextColor2,
    fontSize: scale(24),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: scale(8),
  },
  last_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingBottom: scale(12),
  },
  bt_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: scale(12),
  },
  pay_bt: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
    borderWidth: scale(1),
    paddingVertical: scale(12),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    marginHorizontal: scale(8),
    textAlign: 'center',
  },


})

export default forwardRef(PayBoardComponent)

