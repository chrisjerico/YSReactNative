import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../../../public/tools/Scale'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import * as React from 'react'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import { BET_ITEM_HEIGHT, BET_ITEM_WIDTH } from '../PayBoardComponent'
import { calculateItemCount } from '../../tools/BetUtil'
import CommStyles from '../../../../base/CommStyles'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

interface IBetTMComponentParams {
  lotteryCode?: string
  groupData?: PlayGroupData
  selectedData?: Map<string, Array<PlayGroupData>>
  setSelectedData?: (selectedData: Map<string, Array<PlayGroupData>>) => void
  averageMoney?: number
  onChangeText?: (text: string, playX: PlayData) => void
  showCallback?: () => void
}

/**
 * 合肖下注协助类
 *
 * @param lotteryCode
 * @param groupData
 * @param selectedData
 * @param setSelectedData
 * @param averageMoney
 * @param onChangeText
 * @param showCallback
 * @constructor
 */
const BetTMComponent = ({
                          lotteryCode,
                          groupData,
                          selectedData,
                          setSelectedData,
                          averageMoney,
                          onChangeText,
                          showCallback,
                        }: IBetTMComponentParams) => {

  return (<View style={_styles.container}>
    {
      groupData?.plays?.map((playData) => {
        return (<View key={playData?.id + playData?.name}
                      style={_styles.item_container}>
          <UGText style={_styles.item_title}
                numberOfLines={2}>{
            `[ ${groupData?.alias}-${playData?.id} ]`
          }</UGText>
          <UGText style={_styles.item_odds}>{`@${playData?.odds}`}</UGText>
          <UGText style={_styles.item_x}>{'X'}</UGText>
          <TextInput defaultValue={averageMoney?.toString()}
                     onChangeText={(text => onChangeText(text, playData))}
                     keyboardType={'numeric'}
                     style={_styles.item_input}/>
          <Icon size={scale(36)}
                onPress={() => {
                  const newSelectedData = new Map<string, Array<PlayGroupData>>() //重新组建数据

                  //从选中的列表里面 清除删除的数据 重新组建数据
                  Object.keys(selectedData)?.map((key) => {
                    const groupData: Array<PlayGroupData> = selectedData[key]
                    newSelectedData[key] = groupData?.map((groupData) => ({
                      ...groupData,
                      plays: groupData?.plays?.filter((item) => item?.id != playData?.id),
                      exPlays: groupData?.exPlays?.filter((item) => item?.id != playData?.id),
                    } as PlayGroupData))
                  })

                  //数据少于1了就关闭窗口
                  if (calculateItemCount(newSelectedData) <= 0) {
                    showCallback && showCallback()
                  } else {
                    setSelectedData(newSelectedData)
                  }

                }}
                style={_styles.item_trash}
                color={Skin1.themeColor}
                name={'trash-o'}/>
        </View>)
      })

    }
  </View>)
}

const _styles = StyleSheet.create({
  container: {
    width: BET_ITEM_WIDTH,
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
  item_odds: {
    fontSize: scale(20),
    color: UGColor.TextColor2,
  },
  item_x: {
    color: UGColor.TextColor2,
    fontSize: scale(20),
    paddingHorizontal: scale(4),
  },
})


export { BetTMComponent }
