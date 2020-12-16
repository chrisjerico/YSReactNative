import { FlatList, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../tools/Ext'
import { scale } from '../../../../../tools/Scale'
import { UGColor } from '../../../../../theme/UGThemeColor'
import EmptyView from '../../../../view/empty/EmptyView'
import { WithdrawalListData } from '../../../../../network/Model/wd/WithdrawalRecordModel'
import CommStyles from '../../../../../../pages/base/CommStyles'
import UseCapitalDetailRecordList from './UseCapitalDetailRecordList'
import { CapitalListData } from '../../../../../network/Model/wd/CapitalDetailModel'

/**
 * 资金明细记录
 * @param navigation
 * @constructor
 */
const CapitalDetailListComponent = () => {
  const {
    refreshCT,
    capitalDetailData,
    requestListDetailData,
  } = UseCapitalDetailRecordList()

  /**
   * 绘制提示标题
   * @param item
   */
  const renderTitleHint = () => <View style={_styles.text_title_container}>
    <Text style={_styles.text_title_0}>{'日期'}</Text>
    <Text style={_styles.text_title_0}>{'金额'}</Text>
    <Text style={_styles.text_title_0}>{'类型'}</Text>
    <Text style={_styles.text_title_0}>{'余额'}</Text>
  </View>

  /**
   * 绘制提示标题
   * @param item
   */
  const renderItemContent = (item: CapitalListData) => <View style={_styles.text_item_container}>
    <Text style={_styles.text_content_0}>{item.time}</Text>
    <Text style={_styles.text_content_0}>{item.changeMoney}</Text>
    <Text style={_styles.text_content_0}>{item.category}</Text>
    <Text style={_styles.text_content_0}>{item.balance}</Text>
  </View>

  return (
    <View style={CommStyles.flex}>
      {
        [
          renderTitleHint(),
          anyEmpty(capitalDetailData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={capitalDetailData}
              // ListEmptyComponent={() => <EmptyView/>}
                        onEndReached={({ distanceFromEnd }) => {
                          requestListDetailData(false)
                        }}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item, index }) => {
                          return (
                            renderItemContent(item)
                          )
                        }}/>,
        ]
      }
    </View>
  )
}

const TAB_ITEM_HEIGHT = scale(70) //tab高度

const _styles = StyleSheet.create({
  text_title_container: {
    backgroundColor: UGColor.BackgroundColor2,
    height: TAB_ITEM_HEIGHT,
    margin: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  text_item_container: {
    flex: 1,
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
    height: TAB_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_title_0: {
    flex: 1,
    color: UGColor.TextColor3,
    fontSize: scale(22),
    textAlign: 'center',
  },
  text_content_0: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(20),
    textAlign: 'center',
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default CapitalDetailListComponent
