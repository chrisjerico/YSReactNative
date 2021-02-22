import { Alert, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { scale } from '../../../../../public/tools/Scale'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseDepositRecordList from './UseDepositRecordList'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import { DepositListData } from '../../../../../public/network/Model/wd/DepositRecordModel'
import CommStyles from '../../../../base/CommStyles'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

/**
 * 存款记录
 * @param navigation
 * @constructor
 */
const DepositRecordListComponent = () => {
  const {
    refreshCT,
    depositData,
    requestDepositData,
  } = UseDepositRecordList()

  /**
   * 显示条目内容对话框
   * @param item
   */
  const showItemDialog = (item: DepositListData) => {
    Alert.alert('查看详情',
      '交易编号: ' + item.orderNo
      + '\n发起时间: ' + item.applyTime
      + '\n交易类型: ' + item.category
      + '\n交易金额: ' + item.amount
      + '\n交易状态: ' + item.status
      + '\n存款人: ' + item.username
      + '\n存款时间: ' + item.arriveTime
      + '\n备注: ' + item.remark,
      [
        {
          text: '确定',
        },
      ])
  }

  /**
   * 绘制提示标题
   * @param item
   */
  const renderTitleHint = () => <View style={_styles.text_title_container}>
    <UGText style={_styles.text_title_0}>{'日期'}</UGText>
    <UGText style={_styles.text_title_0}>{'金额'}</UGText>
    <UGText style={_styles.text_title_0}>{'类型'}</UGText>
    <UGText style={_styles.text_title_0}>{'状态'}</UGText>
  </View>

  /**
   * 绘制条目内容
   * @param item
   */
  const renderItemContent = (item: DepositListData) =>
    <TouchableWithoutFeedback onPress={() => showItemDialog(item)}>
      <View style={_styles.text_item_container}>
        <UGText style={_styles.text_content_0}>{item.applyTime}</UGText>
        <UGText style={_styles.text_content_0}>{item.amount}</UGText>
        <UGText style={_styles.text_content_0}>{item.category}</UGText>
        <UGText style={_styles.text_content_0}>{item.status}</UGText>
      </View>
    </TouchableWithoutFeedback>

  return (
    <View style={CommStyles.flex}>
      {
        [
          renderTitleHint(),
          anyEmpty(depositData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={depositData}
              // ListEmptyComponent={() => <EmptyView/>}
                        onEndReached={({ distanceFromEnd }) => {
                          requestDepositData({ clear: false })
                        }}
                        onEndReachedThreshold={0.2}
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

export default DepositRecordListComponent
