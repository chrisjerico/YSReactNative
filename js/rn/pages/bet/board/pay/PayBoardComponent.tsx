import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, RefObject, useContext, useImperativeHandle, useState } from 'react'
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

interface IPayBoardComponent {
}

/**
 * 中间菜单
 * @param menu
 * @param onMenuClick
 * @param ref
 * @constructor
 */
const PayBoardComponent = ({}: IPayBoardComponent, ref?: any) => {

  const {
    playOddDetailData,
  } = useContext(BetLotteryContext)
  const selectedData = UGStore.globalProps?.selectedLotteryModel?.selectedData //当前选中的数据
  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    togglePayBoard: () => {
      setShow(!show)
    },
  }))

  ugLog('Object?.values(selectedData)=', Object?.values(selectedData))
  ugLog('Object.keys(selectedData) = ', Object.keys(selectedData))

  //总共有多少条数据
  const groupValueArr: Array<Array<PlayGroupData>> = Object?.values(selectedData)
  let itemCount = anyEmpty(groupValueArr) ? 0 :
    groupValueArr?.flat(2).map((item) =>
      arrayLength(item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
  ugLog('itemCount = ', itemCount, JSON.stringify(groupValueArr?.flat(2)))

  // 生成数据对应的 View
  const itemViewArr = Object.keys(selectedData).map((key) => {
    const groupDataArr: Array<PlayGroupData> = selectedData[key]
    return groupDataArr?.map((groupData) => {
      switch (key) {
        case LotteryConst.TM:  //特码
          return groupData?.plays?.map((playData) => {
            return (<View key={playData?.id + playData?.name}
                          style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            paddingHorizontal: scale(8),
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: scale(1),
                            borderBottomColor: UGColor.LineColor4,
                          }}>
              <Text style={{
                flex: 1,
                textAlign: 'left',
                fontSize: scale(20),
                paddingRight: scale(16),
                color: UGColor.TextColor2,
              }}>{`【${groupData?.alias}-${playData?.id}】`}</Text>
              <Text style={{
                fontSize: scale(20),
                color: UGColor.TextColor2,
              }}>{`@${playData?.odds}`}</Text>
              <Text style={{
                color: UGColor.TextColor2,
                fontSize: scale(20),
                paddingHorizontal: scale(8),
              }}>{'X'}</Text>
              <TextInput defaultValue={'1'}
                         style={{
                           width: scale(64),
                           textAlign: 'center',
                           color: UGColor.TextColor2,
                           fontSize: scale(24),
                           borderColor: UGColor.LineColor4,
                           borderWidth: scale(1),
                           borderRadius: scale(8),
                         }}/>
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

  const listHeight = (itemCount < 6 ? itemCount : 6) * ITEM_HEIGHT
  return (
    <View style={_styles.container}>
      <Modal isVisible={show}
             style={_styles.modal_content}
             onBackdropPress={() => setShow(false)}
             onBackButtonPress={() => setShow(false)}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.3}>
        <View style={[
          _styles.content,
          { height: listHeight + scale(244) }, //还要算上 条目 下面的 下注按钮等元素的高度
        ]}>
          <View style={[
            {
              width: '100%',
              borderTopRightRadius: scale(16),
              borderTopLeftRadius: scale(16),
            },
            {
              backgroundColor: Skin1.themeColor,
            }
          ]}>
            <Text style={{
              color: 'white',
              width: '100%',
              textAlign: 'center',
              paddingVertical: scale(16),
              fontSize: scale(24),
              paddingHorizontal: scale(8),
            }}>{playOddDetailData()?.game?.title + '-下注清单'}</Text>
          </View>
          <ScrollView style={[
            _styles.sv_container,
          ]}
                      showsVerticalScrollIndicator={false}>
            <View style={[
              _styles.sv_content,
            ]}>
              {itemViewArr}
            </View>
          </ScrollView>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(8),
          }}>
            <Text style={{
              color: UGColor.TextColor2,
              fontSize: scale(24),
            }}>{'投注金额不能为小数：'}</Text>
            <TextInput defaultValue={'1'}
                       style={{
                         flex: 1,
                         width: scale(64),
                         textAlign: 'center',
                         color: UGColor.TextColor2,
                         fontSize: scale(24),
                         borderColor: UGColor.LineColor4,
                         borderWidth: scale(1),
                         borderRadius: scale(8),
                       }}/>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(8),
          }}>
            <Text style={_styles.bet_result}>{'合计注数：'}</Text>
            <Text style={[_styles.bet_result,
              {color: Skin1.themeColor}]}>{itemCount}</Text>
            <Text style={_styles.bet_result2}>{'总金额：'}</Text>
            <Text style={[_styles.bet_result_total_money,
              {color: Skin1.themeColor}]}>{'16000'}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: ITEM_HEIGHT,
            paddingHorizontal: scale(8),
          }}>
            <Text style={_styles.pay_bt}
                  onPress={() => setShow(false)}>{'取消'}</Text>
            <Text style={[_styles.pay_bt,
              {
                backgroundColor: Skin1.themeColor,
                color: 'white',
              }]}
                  onPress={() => setShow(false)}>{'确定'}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const ITEM_HEIGHT = scale(84) //每个条目高度
const ITEM_WIDTH = scale(440) //每个条目宽度

const _styles = StyleSheet.create({
  container: {

  },
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
  sv_container: {
    flex: 1,
  },
  sv_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_content: {
    height: ITEM_HEIGHT,
    paddingHorizontal: scale(24),
    borderTopWidth: scale(1),
    alignItems: 'center',
    borderTopColor: UGColor.LineColor4,
    flexDirection: 'row',
  },
  item_sub_content: {
    flex: 1,
  },
  item_name: {
    color: UGColor.TextColor1,
    fontSize: scale(22),
  },
  item_sub_name: {
    color: UGColor.TextColor1,
    fontSize: scale(20),
  },
  bank_name_icon: {
    width: scale(42),
    aspectRatio: 1,
    marginRight: scale(8),
  },
  pay_bt: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
    marginHorizontal: scale(4),
    borderWidth: scale(1),
    paddingVertical: scale(12),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    textAlign: 'center',
  },
  bet_result_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  bet_result: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  bet_result2: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingLeft: scale(24),
  },
  bet_result_total_money: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },


})

export default forwardRef(PayBoardComponent)

