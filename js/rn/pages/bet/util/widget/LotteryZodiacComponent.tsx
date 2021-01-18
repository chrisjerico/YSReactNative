import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'

interface IUseLotteryZodiacParams {
  listData?: LotteryListData
}

interface IZodiacItem {
  item?: ZodiacNum
  selectedTabIndex?: number //当前选中的条目
  index?: number //当前索引
}

/**
 * 绘制 生肖
 * @constructor
 */
const LotteryZodiacComponent = ({ listData }: IUseLotteryZodiacParams) => {

  /**
   * 绘制 生肖
   * @param item
   * @param selectedTabIndex 当前选中的条目
   * @param index 当前索引
   */
  const renderZodiacItem = ({ item, selectedTabIndex, index }: IZodiacItem) => <TouchableOpacity >
    <View style={_styles.zodiac_item}>
      {
        selectedTabIndex == index ?
          <Icon size={scale(36)}
                color={Skin1.themeColor}
                name={'check-circle'}/> :
          <Icon size={scale(36)}
                name={'circle-o'}/>
      }
      <Text style={_styles.zodiac_item_text}>{item?.name}</Text>
    </View>
  </TouchableOpacity>

  return (<View >
      <ScrollView showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        <View style={_styles.zodiac_container}>
          {
            (listData?.data as Array<ZodiacNum>)?.map((item, index) =>
              renderZodiacItem({ item: item, selectedTabIndex: listData?.selectedTabIndex, index: index }))
          }
        </View>
      </ScrollView>
    </View>
  )
}

const _styles = StyleSheet.create({
  zodiac_container: {
    flexDirection: 'row',
  },
  zodiac_item: {
    flexDirection: 'row',
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    alignItems: 'center',
  },
  zodiac_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
})


export default LotteryZodiacComponent

