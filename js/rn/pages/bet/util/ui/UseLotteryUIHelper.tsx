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
 * 彩票UI协助类，专门绘制各类小组件
 * @constructor
 */
const UseLotteryUIHelper = () => {


  // const renderTab = (listData?: LotteryListData) => {
  //
  // }
  /**
   * 绘制 2个Tab 容器 Tab
   */
  const renderTab2Item = (groupData?: PlayGroupData) =>
    <View style={[
            _styles.tab_item,
            tabIndex == tab ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <TouchableOpacity key={key + 'renderTabItem Text'}
                        onPress={() => setTabIndex(tab)}
                        style={_styles.tab_title_tb}>
        <Text key={key + 'renderTabItem Text'}
              style={[
                _styles.tab_title,
                tabIndex == tab ? { color: 'white' } : null,
              ]}>{!anyEmpty(pageData) && pageData[tab][0].alias}</Text>
      </TouchableOpacity>
    </View>

  /**
   * 绘制 2个Tab 容器
   */
  const renderTab2 = (listData?: LotteryListData) => <View style={_styles.tab_container}>
    {renderTab2Item(listData[0])}
    {renderTab2Item(listData[1])}
  </View>

  return {
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


export default UseLotteryUIHelper

