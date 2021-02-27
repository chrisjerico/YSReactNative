import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef } from 'react'
import { skin1, Skin1 } from '../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UsePayBoard from './UsePayBoard'
import Icon from 'react-native-vector-icons/FontAwesome'
import { anyEmpty, arrayLength, mapFilter } from '../../../../public/tools/Ext'
import { Toast } from '../../../../public/tools/ToastUtils'
import { LotteryResultData } from '../../../../public/network/Model/lottery/result/LotteryResultModel'
import { showLoading } from '../../../../public/widget/UGLoadingCP'
import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { BetShareModel, PlayNameArray } from '../../../../redux/model/game/bet/BetShareModel'
import { filterShareItem } from '../tools/BetUtil'
import { ugLog } from '../../../../public/tools/UgLog'
import { calculateSliderValue } from '../../util/ArithUtil'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import CommStyles from '../../../base/CommStyles'
import UsePayVietnamBoard from './UsePayVietnamBoard'

interface IPayVietnamBoardComponent {
  showCallback?: (data?: LotteryResultData) => void //窗口 是否显示 回调
}

/**
 * 越南下注面板
 * @param menu
 * @param ref
 * @constructor
 */
const PayVietnamBoardComponent = ({ showCallback }: IPayVietnamBoardComponent, ref?: any) => {

  const {
    betCount,
    setBetCount,
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    betShareModel,
    setBetShareModel,
    startBetting,
  } = UsePayVietnamBoard()

  /**
   * 绘制下注信息
   * @param nameArr
   * @param betInfo
   * @param betShareModel
   */
  const renderItem = (nameArr?: PlayNameArray,
                      betInfo?: BetLotteryData,
                      betShareModel?: BetShareModel) => {

    return (<View key={nameArr?.exFlag}
                  style={_styles.item_container}>
      <View style={_styles.item_title_container}>
        <UGText style={_styles.item_title}>{nameArr?.playName1}</UGText>
        <UGText style={_styles.item_content}>{`【${betInfo?.betInfo}】`}</UGText>
      </View>
      <View style={_styles.item_title_container}>
        <UGText style={_styles.item_odds}>{
          `组合数: `
        }</UGText>
        <UGText style={_styles.item_content}>{
          `${arrayLength(nameArr?.vieName)}`
        }</UGText>
      </View>

    </View>)
  }

  const itemViewArr = betShareModel?.betBean?.map((betInfo, index) => {
    const nameArr = betShareModel?.playNameArray[index]
    return renderItem(nameArr, betInfo, betShareModel)
  })

  return (
    <View style={_styles.container}>
      <Modal isVisible={true}
             style={_styles.modal_content}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.5}>
        <View style={_styles.content}>
          <View style={[
            _styles.dialog_title_container,
            { backgroundColor: Skin1.themeColor },
          ]}>
            <UGText
              style={_styles.dialog_title_text}>{`第${betShareModel?.issue_displayNumber ?? betShareModel?.turnNum}期 ${betShareModel?.gameName} 下注清单`}</UGText>
          </View>
          <View style={_styles.sv_parent}>
            <ScrollView style={_styles.sv_container}
                        showsVerticalScrollIndicator={false}>
              <View style={_styles.sv_content}>
                {itemViewArr}
              </View>
            </ScrollView>
          </View>
          <View style={_styles.total_info_container}>
            <UGText style={_styles.item_title}>{'注数：'}</UGText>
            <View style={CommStyles.flex}/>
            <TextInput defaultValue={betCount?.toString()}
                       onChangeText={text => {
                         setBetCount(Number(text))
                       }}
                       keyboardType={'numeric'}
                       style={_styles.item_input}/>
          </View>
          <View style={_styles.last_money_container}>
            <UGText style={_styles.bet_result2}>{'总金额：'}</UGText>
            <UGText style={[_styles.bet_result_total_money,
              { color: Skin1.themeColor }]}>{totalMoney}</UGText>
          </View>
          <View style={_styles.last_info_container}>
            <UGText style={_styles.bet_result}>{'组合明细：'}</UGText>
          </View>
          <ScrollView style={_styles.sv_bet_brick_container}
                      showsVerticalScrollIndicator={false}>
            <View style={_styles.bet_brick_container}>
              {
                betShareModel?.playNameArray[0]?.vieName?.map((play, index) => (
                  <Text key={play + index}
                        style={[
                          _styles.brick_text,
                          { backgroundColor: skin1.themeColor },
                        ]}>{play}</Text>
                ))
              }
            </View>
          </ScrollView>
          <View style={_styles.bt_container}>
            <UGText style={_styles.pay_bt}
                    onPress={() => showCallback && showCallback()}>{'取消'}</UGText>
            <UGText style={[_styles.pay_bt,
              { backgroundColor: Skin1.themeColor, color: 'white' }]}
                    onPress={() => {
                      // showLoading()
                      startBetting().then((data) => {
                        Toast(data?.msg)
                        showCallback(data?.data)
                      })
                    }}>{'确定'}</UGText>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const BET_ITEM_HEIGHT = scale(68) //每个条目高度
const BET_ITEM_WIDTH = scale(480) //每个条目宽度

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: BET_ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(16),
    backgroundColor: UGColor.BackgroundColor1,
  },
  sv_parent: {
    width: '100%',
  },
  sv_container: {
    width: '100%',
    maxHeight: scale(512),
  },
  sv_content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  bet_result_total_money: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  item_container: {
    width: BET_ITEM_WIDTH,
    paddingHorizontal: scale(16),
  },
  item_title_container: {
    flex: 1,
    flexDirection: 'row',
  },
  item_title: {
    textAlign: 'left',
    fontSize: scale(24),
    color: UGColor.TextColor2,
    paddingVertical: scale(4),
  },
  item_content: {
    flex: 1,
    textAlign: 'left',
    fontSize: scale(24),
    color: UGColor.TextColor3,
    paddingVertical: scale(4),
  },
  item_odds: {
    fontSize: scale(24),
    color: UGColor.TextColor2,
    paddingVertical: scale(4),
  },
  item_input: {
    width: scale(128),
    textAlign: 'center',
    color: UGColor.TextColor2,
    fontSize: scale(24),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: scale(4),
  },
  item_trash: {
    paddingHorizontal: scale(12),
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
    paddingHorizontal: scale(16),
  },
  total_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  last_money_container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
  },
  last_info_container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  sv_bet_brick_container: {
    maxHeight: scale(480),
  },
  bet_brick_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  brick_text: {
    fontSize: scale(24),
    color: 'white',
    paddingHorizontal: scale(25),
    paddingVertical: scale(4),
    margin: scale(1),
    borderRadius: scale(4),
  },
  bt_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
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

export {
  BET_ITEM_WIDTH,
  BET_ITEM_HEIGHT,
}
export default forwardRef(PayVietnamBoardComponent)

