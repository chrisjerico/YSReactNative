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
import { useEffect, useRef, useState } from 'react'
import MiddleMenu, { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

/**
 * 资金明细记录1
 * @param navigation
 * @constructor
 */
const CapitalDetailListComponent = () => {

  const [selectStartDate, setSelectStartDate] = useState<boolean>(false) //正在选择开始日期
  const [selectEndDate, setSelectEndDate] = useState<boolean>(false) //正在选择结束日期
  const [startDate, setStartDate] = useState<string>(null)//选中的开始日期
  const [endDate, setEndDate] = useState<string>(null)//选中的开始日期
  const refMenu = useRef(null)

  const {
    menuItem,
    refreshCT,
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
      <UGText style={_styles.calendar_item_title}>{'日期'}</UGText>
      <TouchableWithoutFeedback onPress={() => {
        //如果另外一个日历打开的，先关闭掉
        if (selectEndDate) {
          setSelectEndDate(false)
        } else {
          setSelectStartDate(!selectStartDate)
        }
      }}>
        <View style={_styles.calendar_item_container}>
          <UGText style={_styles.calendar_item_text}
                numberOfLines={1}>{anyEmpty(startDate) ? '----------' : startDate}</UGText>
          <Icon size={scale(20)} name={'calendar'}/>
        </View>
      </TouchableWithoutFeedback>
      <UGText style={_styles.calendar_item_title}>{'至'}</UGText>
      <TouchableWithoutFeedback onPress={() => {
        //如果另外一个日历打开的，先关闭掉
        if (selectStartDate) {
          setSelectStartDate(false)
        } else {
          setSelectEndDate(!selectEndDate)
        }
      }}>
        <View style={_styles.calendar_item_container}>
          <UGText style={_styles.calendar_item_text} numberOfLines={1}>{anyEmpty(endDate) ? '----------' : endDate}</UGText>
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
  const renderCalendar = () => {
    let curDate
    if(selectStartDate) curDate = new Date(startDate)
    if(selectEndDate) curDate = new Date(endDate)

    return (
      selectStartDate || selectEndDate ?
        <View key={'renderCalendar'}
              style={_styles.calendar_wid}>
          <Calendar.Picker selectedDate={curDate}
                           onDayPress={(date: Date) => {
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
                                 <UGText style={_styles.calendar_button}>{'上一月'}</UGText>
                               </TouchableWithoutFeedback>
                               <UGText style={_styles.calendar_title}>{arr[1] + '年'}</UGText>
                               <TouchableWithoutFeedback onPress={onNextMonth}>
                                 <UGText style={_styles.calendar_button}>{'下一月'}</UGText>
                               </TouchableWithoutFeedback>
                             </View>
                           }}
                           disabledDayPick={false}
                           weekdays={['周天', '周一', '周二', '周三', '周四', '周五', '周六']}
          />
        </View> :
        null
    )

  }

  /**
   * 绘制提示标题
   * @param item
   */
  const renderTitleHint = () => <View key={'renderTitleHint'}>
    <View style={_styles.text_title_container}>
      <UGText style={_styles.text_title_0}>{'日期'}</UGText>
      <UGText style={_styles.text_title_0}>{'金额'}</UGText>
      <TouchableWithoutFeedback onPress={() => refMenu?.current?.toggleMenu()}>
        <View style={_styles.item_type}>
          <UGText style={_styles.text_title_0} numberOfLines={1}>{
            menuItem?.find((item) => item.id == curGroup?.toString()).title
          }</UGText>
          <Icon size={scale(20)} name={'chevron-down'}/>
        </View>
      </TouchableWithoutFeedback>
      <UGText style={_styles.text_title_0}>{'余额'}</UGText>
    </View>
  </View>

  /**
   * 绘制条目内容
   * @param item
   * @param index
   */
  const renderItemContent = (item: CapitalListData, index?: number) => <View key={item?.time + index} style={_styles.text_item_container}>
    <UGText style={_styles.text_content_0}>{item.time}</UGText>
    <UGText style={_styles.text_content_0}>{item.changeMoney}</UGText>
    <UGText style={_styles.text_content_0}>{item.category}</UGText>
    <UGText style={_styles.text_content_0}>{item.balance}</UGText>
  </View>

  /**
   * 绘制内容
   * @param item
   */
  const renderListContent = () => <View key={'renderListContent'}
                                        style={CommStyles.flex}>
    {renderTitleHint()}
    {anyEmpty(capitalDetailData)
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
                  renderItem={({ item, index }) => renderItemContent(item, index)}
                  ListFooterComponent={
                    <View
                    style={{
                        height:100,

                    }}
                  >
                  </View>
                  }
                  />}
    {renderCalendar()}
  </View>

  /**
   * 点击菜单
   * @param index
   * @param item
   */
  const clickMenu = (index: number, item: IMiddleMenuItem) => {
    refMenu?.current?.toggleMenu()
    setCurGroup(Number.parseInt(item.id))
  }

  return (
    <View style={CommStyles.flex}>
      {renderCalendarTitle()}
      {renderListContent()}

      <MiddleMenu key={menuItem?.map((item) => item?.title)?.toString()}
                  curId={curGroup?.toString()}
                  ref={refMenu}
                  onMenuClick={clickMenu}
                  menu={menuItem}/>
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
