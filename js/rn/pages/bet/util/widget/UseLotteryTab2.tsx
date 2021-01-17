import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 绘制 2个 tab
 * @constructor
 */
const UseLotteryTab2 = () => {

  /**
   * 绘制 2个Tab 容器 Tab
   *
   * @param selectedTabIndex 当前选中哪一个
   * @param tabIndex 当前TAB索引
   * @param groupData 当前TAB数据
   */
  const renderTab2Item = (selectedTabIndex?: number, tabIndex?: number, groupData?: PlayGroupData) =>
    <View style={[
            _styles.tab_item,
      selectedTabIndex == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <TouchableOpacity style={_styles.tab_title_tb}>
        <Text style={[
                _styles.tab_title,
                selectedTabIndex == tabIndex ? { color: 'white' } : null,
              ]}>{groupData?.alias}</Text>
      </TouchableOpacity>
    </View>

  /**
   * 绘制 2个Tab 容器
   */
  const renderTab2 = (listData?: LotteryListData) => <View style={_styles.tab_container}>
    {renderTab2Item(listData?.selectedTabIndex, 0, listData[0])}
    {renderTab2Item(listData?.selectedTabIndex, 1, listData[1])}
  </View>

  return {
    renderTab2
  }
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


export default UseLotteryTab2

