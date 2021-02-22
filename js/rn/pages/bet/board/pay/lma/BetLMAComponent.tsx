import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../../../public/tools/Scale'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import * as React from 'react'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import { BET_ITEM_HEIGHT, BET_ITEM_WIDTH } from '../PayBoardComponent'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

interface IBetLMAComponentParams {
  lotteryCode?: string
  des?: string
  groupData?: PlayGroupData
  averageMoney?: number
  onChangeText?: (text: string, play0: PlayData) => void
  showCallback?: () => void
}

/**
 * 合肖下注协助类
 *
 * @param lotteryCode
 * @param groupData
 * @param averageMoney
 * @param onChangeText
 * @param showCallback
 * @constructor
 */
const BetLMAComponent = ({
                           lotteryCode,
                           des,
                           groupData,
                           averageMoney,
                           onChangeText,
                           showCallback,
                         }: IBetLMAComponentParams) => {

  const play0 = groupData?.plays[0]
  return (<View key={play0?.id + play0?.name}
                style={_styles.item_container}>
    <UGText style={_styles.item_title}
          numberOfLines={2}>{
      `[ ${groupData?.alias} - ${des} ]`
    }</UGText>
    <TextInput defaultValue={averageMoney?.toString()}
               onChangeText={text => onChangeText(text, play0)}
               keyboardType={'numeric'}
               style={_styles.item_input}/>
    <Icon size={scale(36)}
          onPress={() => {
            // const newSelectedData = new Map<string, Array<PlayGroupData>>() //重新组建数据
            // newSelectedData[lotteryCode] = null
            showCallback && showCallback()

          }}
          style={_styles.item_trash}
          color={Skin1.themeColor}
          name={'trash-o'}/>
  </View>)
}

const _styles = StyleSheet.create({
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
})


export { BetLMAComponent }
