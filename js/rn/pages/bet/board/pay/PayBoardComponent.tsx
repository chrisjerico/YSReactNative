import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useMemo } from 'react'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryConst from '../../const/LotteryConst'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import UsePayBoard from './UsePayBoard'
import Icon from 'react-native-vector-icons/FontAwesome'
import { anyEmpty } from '../../../../public/tools/Ext'

interface IPayBoardComponent {
  showCallback?: () => void //窗口 是否显示 回调
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
    playOddDetailData,
    selectedData,
    setSelectedData,
    startBetting,
    calculateItemCount,
  } = UsePayBoard()

  /**
   * 绘制 特码 等条目
   * @param lotteryCode 彩种CODE，特码,合肖等
   * @param groupData
   */
  const renderTMItem = (lotteryCode?: string, groupData?: PlayGroupData) => {
    return groupData?.plays?.map((playData) => {
      const showName = lotteryCode == LotteryConst.LX || lotteryCode == LotteryConst.LW ?
        playData?.alias :
        playData?.name
      return (<View key={playData?.id + playData?.name}
                    style={_styles.item_container}>
        <Text style={_styles.item_title}
              numberOfLines={2}>{
          `[ ${groupData?.alias}- ${showName} ]`
        }</Text>
        <Text style={_styles.item_odds}>{`@${playData?.odds}`}</Text>
        <Text style={_styles.item_x}>{'X'}</Text>
        <TextInput defaultValue={averageMoney?.toString()}
                   onChangeText={text => setMoneyMap(prevState => {
                     const dataMap = new Map<string, number>()
                     dataMap[playData?.id] = Number.parseFloat(text)
                     // ugLog('prevState = ', JSON.stringify(prevState))
                     // ugLog('dataMap = ', JSON.stringify(dataMap))
                     return { ...prevState, ...dataMap }
                   })}
                   keyboardType={'numeric'}
                   style={_styles.item_input}/>
        <Icon size={scale(36)}
              onPress={() => {
                // //选中了哪些数据 code -> code -> value, 如 正特 -> 正特1 -> 01,03,04
                //
                // //新生成一份数据 多层结构
                // //Map1<string, Map2<string, Map3<string, Array<string>>>>()
                // const newSelectedData = JSON.parse(JSON.stringify(selectedData))
                //
                // Object.values(newSelectedData).map((map2) =>
                //   Object.values(map2).map((map3: Map<string, Array<string>>) =>
                //     Object.values(map3)).map((arr: Array<PlayData>) =>
                //     arr.map((value: PlayData) =>{
                //
                //   })))
                //
                // Object.keys(selectedData).forEach((ztKey => {
                //   const ztValue = selectedData[ztKey]
                //   Object.keys(ztValue).forEach((zt1Key => {
                //     const zt1Value = ztValue[zt1Key]
                //   }))
                // }))
                //
                // //注释以特码为例
                // for (let keyTM in selectedData) {
                //   newSelectedData[keyTM] = selectedData[keyTM]// 复制一份特码B 特码A的数据
                //   for (let keyTMB in valueTM) {
                //     const valueTMB = new Map<string, Array<string>>() // 特码数据 两面数据 色波数据
                //     valueTM[keyTM] = valueTMB
                //     for (let keySB in valueTMB) {
                //       const valueSB = new Array<string>() // 两码或者色波里面的 01, 02, 03
                //       valueTMB[keySB] = valueSB
                //
                //     }
                //   }
                // }
                //
                // Object.keys(selectedData)?.map((keyTM) => {
                //   return
                // })
                //
                //
                //
                // //从选中的列表里面 清除删除的数据 重新组建数据
                // Object.keys(selectedData)?.map((keyTM) => {
                //   //特码B数据
                //   const tmData: Map<string, Map<string, Array<string>>> = selectedData[keyTM]
                //
                //
                //   newSelectedData[key] = groupData?.map((groupData) => ({
                //     ...groupData,
                //     plays: groupData?.plays?.filter((item) => item?.id != playData?.id),
                //     exPlays: groupData?.exPlays?.filter((item) => item?.id != playData?.id),
                //   } as PlayGroupData))
                // })
                //
                // //数据少于1了就关闭窗口
                // if (calculateItemCount(newSelectedData) <= 0) {
                //   showCallback && showCallback()
                // } else {
                //   setSelectedData(newSelectedData)
                // }

              }}
              style={_styles.item_trash}
              color={Skin1.themeColor}
              name={'trash-o'}/>
      </View>)
    })
  }

  /**
   * 绘制合肖等数据
   * @param groupData
   * @param des
   */
  const renderHXItem = (groupData?: PlayGroupData,
                        des?: string) => {
    const play0 = groupData?.plays[0]
    return (<View key={play0?.id + play0?.name}
                  style={_styles.item_container}>
      <Text style={_styles.item_title}
            numberOfLines={2}>{
        `[ ${groupData?.alias}- ${des} ]`
      }</Text>
      <TextInput defaultValue={averageMoney?.toString()}
                 onChangeText={text => setMoneyMap(prevState => {
                   const dataMap = new Map<string, number>()
                   dataMap[play0?.id] = Number.parseFloat(text)
                   // ugLog('prevState = ', JSON.stringify(prevState))
                   // ugLog('dataMap = ', JSON.stringify(dataMap))
                   return { ...prevState, ...dataMap }
                 })}
                 keyboardType={'numeric'}
                 style={_styles.item_input}/>
      <Icon size={scale(36)}
            onPress={() => {
              // const newSelectedData = new Map<string, Array<PlayGroupData>>() //重新组建数据
              // newSelectedData[key] = null
              showCallback && showCallback()

            }}
            style={_styles.item_trash}
            color={Skin1.themeColor}
            name={'trash-o'}/>
    </View>)

  }

  const itemViewArr = selectedData == null ? null : null
  const listHeight = useMemo(() => (itemCount < 8 ? itemCount : 8) * BET_ITEM_HEIGHT, [itemCount])

  return (
    <View style={_styles.container}>
      <Modal isVisible={true}
             onBackdropPress={showCallback}
             onBackButtonPress={showCallback}
             style={_styles.modal_content}
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
                  onPress={() => showCallback && showCallback()}>{'取消'}</Text>
            <Text style={[_styles.pay_bt,
              { backgroundColor: Skin1.themeColor, color: 'white' }]}
                  onPress={() => startBetting()}>{'确定'}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const BET_ITEM_HEIGHT = scale(68) //每个条目高度
const BET_ITEM_WIDTH = scale(460) //每个条目宽度

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

export {
  BET_ITEM_WIDTH,
  BET_ITEM_HEIGHT,
}
export default forwardRef(PayBoardComponent)

