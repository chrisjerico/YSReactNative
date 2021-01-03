import { FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { scale } from '../../../../../public/tools/Scale'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import { WithdrawalListData } from '../../../../../public/network/Model/wd/WithdrawalRecordModel'
import CommStyles from '../../../../base/CommStyles'
import UseCapitalDetailRecordList from './UseCapitalDetailRecordList'
import { CapitalListData } from '../../../../../public/network/Model/wd/CapitalDetailModel'
import UGDropDownPicker from '../../../../bank/add/view/UGDropdownPicker'
import Icon from 'react-native-vector-icons/Entypo'
import { ugLog } from '../../../../../public/tools/UgLog'
import { Calendar } from 'react-native-plain-calendar'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import { useEffect, useState } from 'react'

/**
 * 资金明细记录
 * @param navigation
 * @constructor
 */
const CapitalDetailListComponent = () => {

  const [selectStartDate, setSelectStartDate] = useState<boolean>(false) //正在选择开始日期
  const [selectEndDate, setSelectEndDate] = useState<boolean>(false) //正在选择结束日期
  const [startDate, setStartDate] = useState<string>(null)//选中的开始日期
  const [endDate, setEndDate] = useState<string>(null)//选中的开始日期

  let capitalController //类型选择

  const {
    refreshCT,
    groups,
    curGroup,
    setCurGroup,
    capitalDetailData,
    requestListDetailData,
  } = UseCapitalDetailRecordList()

  /**
   * 监听日期有改动
   */
  useEffect(() => {
    if (!anyEmpty(startDate) && !anyEmpty(endDate)) {
      requestListDetailData({
        clear: true,
        startDate: startDate,
        endDate: endDate,
      })
    } else if (anyEmpty(startDate) && anyEmpty(endDate)) {
      requestListDetailData({
        clear: true,
      })
    }
  }, [startDate, endDate])

  /**
   * 监听分组有改动
   */
  useEffect(() => {
    requestListDetailData({
      clear: true,
      startDate: startDate,
      endDate: endDate,
    })
  }, [curGroup])

  /**
   * 绘制日历标题
   * @param item
   */
  const renderCalendarTitle = () => <View key={'renderCalendarTitle'}>
    <View style={_styles.text_title_container}>
      <Text style={_styles.calendar_item_title}>{'日期'}</Text>
      <TouchableWithoutFeedback onPress={() => {
        //如果另外一个日历打开的，先关闭掉
        if (selectEndDate) {
          setSelectEndDate(false)
        } else {
          setSelectStartDate(!selectStartDate)
        }
      }}>
        <View style={_styles.calendar_item_container}>
          <Text style={_styles.calendar_item_text}
                numberOfLines={1}>{anyEmpty(startDate) ? '----------' : startDate}</Text>
          <Icon size={scale(20)} name={'calendar'}/>
        </View>
      </TouchableWithoutFeedback>
      <Text style={_styles.calendar_item_title}>{'至'}</Text>
      <TouchableWithoutFeedback onPress={() => {
        //如果另外一个日历打开的，先关闭掉
        if (selectStartDate) {
          setSelectStartDate(false)
        } else {
          setSelectEndDate(!selectEndDate)
        }
      }}>
        <View style={_styles.calendar_item_container}>
          <Text style={_styles.calendar_item_text} numberOfLines={1}>{anyEmpty(endDate) ? '----------' : endDate}</Text>
          <Icon size={scale(20)} name={'calendar'}/>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        setStartDate(null)
        setEndDate(null)
      }}>
        <Icon size={scale(36)} style={{ paddingHorizontal: scale(10) }}
              name={'erase'}/>
      </TouchableWithoutFeedback>
    </View>
  </View>

  /**
   * 绘制日历选择
   */
  const renderCalendar = () => (
    selectStartDate || selectEndDate ?
      <View key={'renderCalendar'}
            style={_styles.calendar_wid}>
        <Calendar.Picker onDayPress={(date: Date) => {
          let curDate = date.format('yyyy-MM-dd')
          if (selectStartDate) {//设置起始日期
            setSelectStartDate(false)
            setStartDate(curDate)
          } else if (selectEndDate) {//设置终止日期
            setSelectEndDate(false)
            setEndDate(curDate)
          }
        }}
                         HeaderComponent={({
                                             currentMonth,
                                             onPrevMonth,
                                             onNextMonth,
                                           }) => {
                           const arr = currentMonth.split(' ')
                           return <View style={{ flexDirection: 'row' }}>
                             <TouchableWithoutFeedback onPress={onPrevMonth}>
                               <Text style={_styles.calendar_button}>{'上一月'}</Text>
                             </TouchableWithoutFeedback>
                             <Text style={_styles.calendar_title}>{arr[1] + '年'}</Text>
                             <TouchableWithoutFeedback onPress={onNextMonth}>
                               <Text style={_styles.calendar_button}>{'下一月'}</Text>
                             </TouchableWithoutFeedback>
                           </View>
                         }}
                         disabledDayPick={false}
                         weekdays={['周天', '周一', '周二', '周三', '周四', '周五', '周六']}
        />
      </View> :
      null
  )

  /**
   * 绘制提示标题
   * @param item
   */
  const renderTitleHint = () => <View key={'renderTitleHint'}>
    <View style={_styles.capital_type_picker}>
      <UGDropDownPicker
        controller={instance => capitalController = instance}
        items={groups}
        defaultValue={curGroup}
        onChangeItem={item => {
          setCurGroup(item.value)
        }}/>
    </View>
    <View style={_styles.text_title_container}>
      <Text style={_styles.text_title_0}>{'日期'}</Text>
      <Text style={_styles.text_title_0}>{'金额'}</Text>
      <TouchableWithoutFeedback onPress={() => capitalController?.toggle()}>
        <View style={_styles.item_type}>
          <Text style={_styles.text_title_0} numberOfLines={1}>{groups[curGroup].label}</Text>
          <Icon size={scale(20)} name={'chevron-down'}/>
        </View>
      </TouchableWithoutFeedback>
      <Text style={_styles.text_title_0}>{'余额'}</Text>
    </View>
  </View>

  /**
   * 绘制条目内容
   * @param item
   */
  const renderItemContent = (item: CapitalListData) => <View style={_styles.text_item_container}>
    <Text style={_styles.text_content_0}>{item.time}</Text>
    <Text style={_styles.text_content_0}>{item.changeMoney}</Text>
    <Text style={_styles.text_content_0}>{item.category}</Text>
    <Text style={_styles.text_content_0}>{item.balance}</Text>
  </View>

  /**
   * 绘制内容
   * @param item
   */
  const renderListContent = () => <View key={'renderListContent'}
                                        style={CommStyles.flex}>
    {
      [
        renderTitleHint(),
        anyEmpty(capitalDetailData)
          ? <EmptyView style={{ flex: 1 }}/>
          : <FlatList refreshControl={refreshCT}
                      keyExtractor={(item, index) => `${item}-${index}`}
                      data={capitalDetailData}
                      showsVerticalScrollIndicator={false}
            // ListEmptyComponent={() => <EmptyView/>}
                      onEndReached={({ distanceFromEnd }) => {
                        requestListDetailData({
                          clear: false,
                          startDate: startDate,
                          endDate: endDate,
                        })
                      }}
                      onEndReachedThreshold={0.2}
                      renderItem={({ item, index }) => {
                        return (
                          renderItemContent(item)
                        )
                      }}/>,
        renderCalendar(),
      ]
    }
  </View>

  return (
    <View style={CommStyles.flex}>
      {
        [
          renderCalendarTitle(),
          renderListContent(),
        ]
      }
    </View>
  )
}

const TAB_ITEM_HEIGHT = scale(70) //tab高度
const CONTENT_ITEM_HEIGHT = scale(80) //内容高度

const _styles = StyleSheet.create({
  calendar_title: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
    textAlign: 'center',
    padding: scale(16),
  },
  calendar_button: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    textAlign: 'center',
    padding: scale(18),
  },
  text_title_container: {
    backgroundColor: UGColor.BackgroundColor2,
    height: TAB_ITEM_HEIGHT,
    margin: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  capital_type_picker: {
    height: TAB_ITEM_HEIGHT,
    padding: scale(8),
    position: 'absolute',
    width: '100%',
  },
  item_type: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendar_wid: {
    position: 'absolute',
    backgroundColor: UGColor.BackgroundColor2,
    width: '100%',
    paddingBottom: scale(32),
  },
  calendar_item_container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    paddingVertical: scale(8),
  },
  calendar_item_title: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    paddingHorizontal: scale(10),
    textAlign: 'center',
  },
  calendar_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
    paddingHorizontal: scale(4),
    textAlign: 'center',
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

export default CapitalDetailListComponent
