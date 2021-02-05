import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useMemo } from 'react'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import UsePayBoard from './UsePayBoard'
import Icon from 'react-native-vector-icons/FontAwesome'
import { anyEmpty, dicNull } from '../../../../public/tools/Ext'
import { calculateItemCount, gatherSelectedItems } from '../tools/BetUtil'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { LotteryResultData } from '../../../../public/network/Model/lottery/result/LotteryResultModel'
import { combineEZDWArray, filterPlayData } from '../tools/ezdw/BetEZDWUtil'
import { showLoading } from '../../../../public/widget/UGLoadingCP'
import { zodiacPlayX } from '../tools/hx/BetHXUtil'
import { Play } from '../../../../public/network/Model/PlayOddDataModel'
import { playDataX } from '../tools/zxbz/BetZXBZUtil'

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
    itemCount,
    currentPlayGroupData,
    nextIssueData,
    playOddDetailData,
    selectedCombineData,
    setSelectedCombineData,
    startBetting,
  } = UsePayBoard()

  /**
   * 绘制 特码 等条目
   * @param selModel 选中的数据
   */
  const renderTMItem = (selModel?: SelectedPlayModel) => {
    return selModel?.plays?.map((playData) => {
      const showName = selModel?.code == LhcCode.LX || selModel?.code == LhcCode.LW ?
        playData?.alias :
        playData?.name
      return (<View key={'renderTMItem=' + playData?.id + showName}
                    style={_styles.item_container}>
        <Text style={_styles.item_title}
              numberOfLines={2}>{
          `[ ${selModel?.playGroups?.alias}- ${showName} ]`
        }</Text>
        <Text style={_styles.item_odds}>{
          `@${playData?.odds}`
        }</Text>
        <Text style={_styles.item_x}>{
          'X'
        }</Text>
        <TextInput defaultValue={averageMoney?.toString()}
                   onChangeText={text => setMoneyMap(prevState => {
                     const moneyMap = new Map<string, number>()
                     selModel?.code == LhcCode.LX || selModel?.code == LhcCode.LW ?
                       moneyMap[playData?.exId ?? playData?.id] = Number.parseFloat(text) :
                       moneyMap[playData?.alias] = Number.parseFloat(text)
                     return { ...prevState, ...moneyMap }
                   })}
                   keyboardType={'numeric'}
                   style={_styles.item_input}/>
        <Icon size={scale(36)}
              onPress={() => {
                //过滤掉选中的数据
                const newSelectedData = filterPlayData(selectedCombineData, playData)
                ugLog('newSelectedData = ', JSON.stringify(newSelectedData))
                //数据少于1了就关闭窗口
                if (calculateItemCount(newSelectedData) <= 0) {
                  showCallback && showCallback()
                } else {
                  setSelectedCombineData(newSelectedData)
                }

              }}
              style={_styles.item_trash}
              color={Skin1.themeColor}
              name={'trash-o'}/>
      </View>)
    })
  }

  /**
   * 绘制连码等数据
   * @param selModel
   * @param playX
   * @param des
   */
  const renderLMAItem = (selModel?: SelectedPlayModel, playX?: PlayData, des?: string) => {
    return (<View key={playX?.id + playX?.name}
                  style={_styles.item_container}>
      <Text style={_styles.item_title}
            numberOfLines={2}>{
        `[ ${selModel?.playGroups?.alias}- ${des} ]`
      }</Text>
      <TextInput defaultValue={averageMoney?.toString()}
                 onChangeText={text => setMoneyMap(prevState => {
                   const moneyMap = new Map<string, number>()
                   moneyMap[playX?.exId ?? playX?.id] = Number.parseFloat(text)
                   return { ...prevState, ...moneyMap }
                 })}
                 keyboardType={'numeric'}
                 style={_styles.item_input}/>
      <Icon size={scale(36)}
            onPress={() => {
              showCallback && showCallback()

            }}
            style={_styles.item_trash}
            color={Skin1.themeColor}
            name={'trash-o'}/>
    </View>)
  }

  const itemViewArr = selectedCombineData == null ? null : selectedCombineData?.map((selModel, index) => {
    ugLog('pay board itemViewArr = ', selModel?.code, index)
    switch (selModel?.code) {
      case LhcCode.TM:  //特码
      case LhcCode.LM: //两面
      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case LhcCode.WX:  //五行 或 五星
      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
      case CqsscCode.YZDW:  //一字定位
        return renderTMItem(selModel)

      case LhcCode.HX://合肖
        return renderLMAItem(selModel, zodiacPlayX(selModel),
          selModel?.zodiacs?.map((item) => item?.name)?.toString())

      case LhcCode.LMA:  //连码
        return renderLMAItem(selModel, selModel?.plays[0],
          combineEZDWArray(selModel)?.toString())

      case LhcCode.ZXBZ:  //自选不中
        return renderLMAItem(selModel, playDataX(selModel),
          combineEZDWArray(selModel)?.toString())
    }

  }).flat(Infinity)

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
            <Text style={_styles.dialog_title_text}>{'下注清单'}</Text>
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
              { color: Skin1.themeColor }]}>{itemCount}</Text>
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
                    showLoading()
                    startBetting().then((data) => {
                      if (nextIssueData?.isInstant == '1') {//秒秒彩
                        showCallback(data?.data)
                      } else {
                        (Toast(data?.msg))
                        showCallback()
                      }
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

