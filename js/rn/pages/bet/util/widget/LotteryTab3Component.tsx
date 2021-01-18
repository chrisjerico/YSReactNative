import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'

interface IUseLotteryTab3Params {
  listData?: LotteryListData
}

/**
 * 绘制 3个及以上 tab
 * @constructor
 */
const LotteryTab3Component = ({ listData }: IUseLotteryTab3Params) => {

  /**
   * 绘制 2个Tab 容器 Tab
   *
   * @param selectedTabIndex 当前选中哪一个
   * @param tabIndex 当前TAB索引
   * @param groupData 当前TAB数据
   */
  const renderTab3Item = (selectedTabIndex?: number, tabIndex?: number, groupData?: PlayGroupData) =>
    <TouchableOpacity style={CommStyles.flex}>
      <View style={[
        _styles.tab_item,
        selectedTabIndex == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
      ]}>
        <Text style={[
          _styles.tab_title_item_text,
          selectedTabIndex == tabIndex ? { color: `white` } : null,
        ]}>{groupData?.alias}</Text>
      </View>
    </TouchableOpacity>

  return (<View style={_styles.tab_title_container}>
    <ScrollView style={_styles.sv_container}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View style={_styles.tab_title_content}>
        {
          (listData?.data as Array<PlayGroupData>)?.map((item, index) =>
            renderTab3Item(listData?.selectedTabIndex, index, item))
        }
      </View>
    </ScrollView>
    <Icon size={scale(36)}
          color={Skin1.themeColor}
          name={'angle-double-left'}/>
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
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  sv_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
})


export default LotteryTab3Component

