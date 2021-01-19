import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'

interface IUseLotteryTab2Params {
  listData?: LotteryListData
  style?: StyleProp<ViewStyle>
}

/**
 * 绘制 2个 tab
 * @constructor
 */
const LotteryTab2Component = ({ listData, style }: IUseLotteryTab2Params) => {
  /**
   * 绘制 2个Tab 容器 Tab
   *
   * @param selectedTabIndex 当前选中哪一个
   * @param tabIndex 当前TAB索引
   * @param groupData 当前TAB数据
   */
  const renderTab2Item = (selectedTabIndex?: number, tabIndex?: number, groupData?: PlayGroupData) => {
    return (<View style={[
      _styles.tab_item,
      selectedTabIndex == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
    ]}>
      <TouchableOpacity style={[_styles.tab_title_tb, style]}>
        <Text style={[
          _styles.tab_title,
          selectedTabIndex == tabIndex ? { color: 'white' } : null,
        ]}>{groupData?.alias}</Text>
      </TouchableOpacity>
    </View>)
  }


  return (<View style={[_styles.tab_container, style]}>
    {renderTab2Item(listData?.selectedTabIndex, 0, listData.data[0])}
    {renderTab2Item(listData?.selectedTabIndex, 1, listData.data[1])}
  </View>)
}

const _styles = StyleSheet.create({
  tab_title_tb: {
    width: '100%',
    alignItems: 'center',
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(6),
  },
  tab_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  tab_container: {
    flexDirection: 'row',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
})


export default LotteryTab2Component

