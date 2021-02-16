import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef } from 'react'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
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

interface IPayBoardComponent {
  showCallback?: (data?: LotteryResultData) => void //窗口 是否显示 回调
}

/**
 * 下注面板
 * @param menu
 * @param ref
 * @constructor
 */
const PayBoardComponent = ({ showCallback }: IPayBoardComponent, ref?: any) => {

  const {
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    betShareModel,
    setBetShareModel,
    startBetting,
  } = UsePayBoard()

  /**
   * 绘制连码等数据
   * @param nameArr
   * @param betInfo
   * @param betShareModel
   */
  const renderItem = (nameArr?: PlayNameArray,
                      betInfo?: BetLotteryData,
                      betShareModel?: BetShareModel) => {
    const showName = !anyEmpty(nameArr?.playName1) ?
      `[ ${nameArr?.playName1}- ${nameArr?.playName2 ?? ''} ]` :
      `[ ${nameArr?.playName2}- ${betInfo?.betInfo ?? betInfo?.name ?? ''} ]`
    return (<View key={nameArr?.exFlag}
                  style={_styles.item_container}>
      <Text style={_styles.item_title}
            numberOfLines={2}>{showName}</Text>
      <Text style={_styles.item_odds}>{
        `@${calculateSliderValue(betInfo?.odds, Number(betShareModel?.activeReturnCoinRatio))}`
      }</Text>
      <Text style={_styles.item_x}>{
        'X'
      }</Text>
      <TextInput defaultValue={averageMoney?.toString()}
                 onChangeText={text => setMoneyMap(prevState => {
                   const moneyMap = new Map<string, number>()
                   moneyMap[nameArr?.exFlag] = Number.parseFloat(text)
                   return { ...prevState, ...moneyMap }
                 })}
                 keyboardType={'numeric'}
                 style={_styles.item_input}/>
      <Icon size={scale(36)}
            onPress={() => {
              if (arrayLength(betShareModel?.playNameArray) <= 1) { //数量只有1个的时候关闭窗口
                showCallback && showCallback()
              } else {
                setBetShareModel(filterShareItem(betShareModel, nameArr?.exFlag))
                const newMap = mapFilter(moneyMap, nameArr?.exFlag)
                setMoneyMap(newMap)
              }
            }}
            style={_styles.item_trash}
            color={Skin1.themeColor}
            name={'trash-o'}/>
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
            <Text
              style={_styles.dialog_title_text}>{`第${betShareModel?.issue_displayNumber ?? betShareModel?.turnNum}期 ${betShareModel?.gameName} 下注清单`}</Text>
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
            <Text style={_styles.total_info_title}>{'投注金额不能为小数：'}</Text>
            <TextInput value={averageMoney?.toString()}
                       keyboardType={'numeric'}
                       onChangeText={(text => setAverageMoney(Number.parseFloat(text)))}
                       style={_styles.total_input_money}/>
          </View>
          <View style={_styles.last_info_container}>
            <Text style={_styles.bet_result}>{'合计注数：'}</Text>
            <Text style={[_styles.bet_result,
              { color: Skin1.themeColor }]}>{arrayLength(betShareModel?.betBean)}</Text>
            <Text style={_styles.bet_result2}>{'总金额：'}</Text>
            <Text style={[_styles.bet_result_total_money,
              { color: Skin1.themeColor }]}>{totalMoney}</Text>
          </View>
          <View style={_styles.bt_container}>
            <Text style={_styles.pay_bt}
                  onPress={() => showCallback && showCallback()}>{'取消'}</Text>
            <Text style={[_styles.pay_bt,
              { backgroundColor: Skin1.themeColor, color: 'white' }]}
                  onPress={() => {
                    // showLoading()
                    startBetting().then((data) => {
                      //不是秒秒彩就给出提示语
                      betShareModel?.isInstant != '1' && data?.code == 0 && Toast(data?.msg)
                      showCallback(data?.data)
                    })
                  }}>{'确定'}</Text>
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
    width: BET_ITEM_WIDTH,
    height: BET_ITEM_HEIGHT,
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
    paddingHorizontal: scale(4),
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
    paddingHorizontal: scale(8),
  },
  total_info_container: {
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

export {
  BET_ITEM_WIDTH,
  BET_ITEM_HEIGHT,
}
export default forwardRef(PayBoardComponent)

