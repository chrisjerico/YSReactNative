import { FlatList, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../tools/Ext'
import { scale } from '../../../../../tools/Scale'
import { ugLog } from '../../../../../tools/UgLog'
import { UGColor } from '../../../../../theme/UGThemeColor'
import UseWithdrawalRecordList from './UseWithdrawalRecordList'
import EmptyView from '../../../../view/empty/EmptyView'
import { WithdrawalListData } from '../../../../../network/Model/wd/WithdrawalRecordModel'
import CommStyles from '../../../../../../pages/base/CommStyles'

/**
 * 取款记录
 * @param navigation
 * @constructor
 */
const WithdrawalRecordListComponent = () => {
  const {
    refreshCT,
    withdrawalData,
    requestWithdrawalData,
  } = UseWithdrawalRecordList()

  /**
   * 绘制提示标题
   * @param item
   */
  const renderTitleHint = () => <View style={_styles.text_title_container}>
    <Text style={_styles.text_title_0}>{'日期'}</Text>
    <Text style={_styles.text_title_0}>{'金额'}</Text>
    <Text style={_styles.text_title_0}>{'状态'}</Text>
  </View>

  /**
   * 绘制提示标题
   * @param item
   */
  const renderItemContent = (item: WithdrawalListData) => <View style={_styles.text_item_container}>
    <Text style={_styles.text_content_0}>{item.applyTime}</Text>
    <Text style={_styles.text_content_0}>{item.amount}</Text>
    <Text style={_styles.text_content_0}>{item.status}</Text>
  </View>

  return (
    <View style={CommStyles.flex}>
      {
        [
          renderTitleHint(),
          anyEmpty(withdrawalData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={withdrawalData}
              // ListEmptyComponent={() => <EmptyView/>}
                        onEndReached={({ distanceFromEnd }) => {
                          requestWithdrawalData({clear: false})
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
const CONTENT_ITEM_HEIGHT = scale(80) //内容高度

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
    marginHorizontal: scale(8),
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
    height: CONTENT_ITEM_HEIGHT,
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

export default WithdrawalRecordListComponent
