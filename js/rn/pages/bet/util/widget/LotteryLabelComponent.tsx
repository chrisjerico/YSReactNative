import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'

interface IUseLotteryLabelParams {
  listData?: LotteryListData
  style?: StyleProp<ViewStyle>
}

/**
 * 绘制 生肖
 * @constructor
 */
const LotteryLabelComponent = ({ listData, style }: IUseLotteryLabelParams) => {

  return (<View style={[_styles.sub_title_container, style]}>
      <Text style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{(listData?.data as PlayGroupData)?.alias}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
})


export default LotteryLabelComponent

