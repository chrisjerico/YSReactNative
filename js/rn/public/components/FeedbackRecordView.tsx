import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Skin1 } from '../theme/UGSkinManagers'
import { push, pop } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from 'react-native-reanimated'
import moment from 'moment'
import AppDefine from '../define/AppDefine'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { PageName } from '../navigation/Navigation'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const typeArr = ['全部状态', '待回复', '已回复']
const borderColor = '#d9d9d9'
export const FeedbackRecordView = () => {
  const [date, setDate] = useState(moment().utcOffset('+05:30').format('YYYY-MM-DD'))
  const [dateArr, setDateArr] = useState([])
  const [record, setRecord] = useState([])
  const [type, setType] = useState('全部状态')

  useEffect(() => {
    const dates = getDaysArray(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    setDateArr(dates)
    getRecord()
  }, [])

  useEffect(() => {
    getRecord()
  }, [type, date])

  const getRecord = async () => {
    let arr = []
    if (type == '全部状态') {
      const { data } = await api.user.myFeedback(0, date, true, 1, 20).promise
      arr = arr.concat(data.data.list)
      const { data: data2 } = await api.user.myFeedback(1, date, false, 1, 20).promise
      arr = arr.concat(data2.data.list)
      setRecord(arr)
    } else if (type == '待回复') {
      const { data: data } = await api.user.myFeedback(1, date, false, 1, 20).promise
      arr = arr.concat(data.data.list)
      setRecord(arr)
    } else {
      const { data } = await api.user.myFeedback(0, date, true, 1, 20).promise
      arr = arr.concat(data.data.list)
      setRecord(arr)
    }
  }

  const getDaysArray = (year:number, month:number, date:number) => {
    let monthIndex = month - 1
    let newDate = new Date(year, monthIndex, date)
    const result = []
    let day = date
    while (newDate.getMonth() == monthIndex) {
      result.push(moment(newDate).subtract(1, 'months').format('YYYY-MM-DD'))
      newDate.setDate(++day)

    }
    newDate = new Date(year, month - 1, day = 1)
    while (day <= date) {
      newDate.setDate(day++)
      result.push(moment(newDate).format('YYYY-MM-DD'))
    }
    return result
  }

  return (
    <View style={{backgroundColor: "#fff", flex: 1}}>
      <Header />
      <View style={{ flexDirection: 'row', paddingTop: 10, zIndex: 2 }}>
        <Picker value={date} setValue={setDate} data={dateArr} height={250} />
        <Picker value={type} data={typeArr} setValue={setType} />
      </View>
      <FlatList
        bounces={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomWidth: 0.5,
            borderColor: '#d9d9d9',
            backgroundColor: '#ffffff',
          }}>
            <View style={{
              width: 100,
              paddingVertical: 16,
              borderRightWidth: 0.5,
              borderColor: borderColor,
              alignItems: 'center',
            }}>
              <UGText style={{
                color: Skin1.textColor1,
                fontSize: 18,
              }}>{'类型'}</UGText>
            </View>
            <View style={{
              width: 80,
              paddingVertical: 16,
              borderRightWidth: 0.5,
              borderColor: borderColor,
              alignItems: 'center',
            }}>
              <UGText style={{
                color: Skin1.textColor1,
                fontSize: 18,
              }}>{'状态'}</UGText>
            </View>
            <View style={{
              paddingVertical: 16,
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <UGText style={{
                color: Skin1.textColor1,
                fontSize: 18,
              }} numberOfLines={1}>{`内容描述`}</UGText>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <UGText style={{ color: "#111" }}>点击可查看反馈详情</UGText>
          </View>
        )}
        style={{ marginTop: 20, flex: 1 }}
        contentContainerStyle={{ borderColor: borderColor, borderTopWidth: 0.5 }}
        data={record}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => push(PageName.SupFeedbackSubmitView, { item })}>
              <View style={{ flexDirection: 'row', flex: 1, borderBottomWidth: 0.5, borderColor: '#d9d9d9' }}>
                <View style={{
                  width: 100,
                  paddingVertical: 16,
                  borderRightWidth: 0.5,
                  borderColor: borderColor,
                  alignItems: 'center',
                }}>
                  <UGText style={{
                    color: Skin1.textColor1,
                    fontSize: 18,

                  }}>{item.type == 1 ? '我要投诉' : '提交建议'}</UGText>
                </View>
                <View style={{
                  width: 80,
                  paddingVertical: 16,
                  borderRightWidth: 0.5,
                  borderColor: borderColor,
                  alignItems: 'center',
                }}>
                  <UGText style={{
                    color: Skin1.textColor1,
                    fontSize: 18,
                  }}>{item.status == 1 ? '已回复' : '待回复'}</UGText>
                </View>
                <View style={{
                  paddingVertical: 16,
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <UGText style={{
                    color: Skin1.textColor1,
                    fontSize: 18,
                  }} numberOfLines={1}>{item.content}</UGText>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
    </View>
  )
}

const Picker = ({ data, value, setValue, height = 120 }:
                  { data: any, value: any, setValue: (item: any) => void, height?: number }) => {
  const [animation, setAnimation] = useState(new Value(0))
  const [zIndex, setZIndex] = useState(3)
  const [open, setOpen] = useState(false)

  const runTiming = (clock, value, dest) => {
    const state = {
      finished: new Value(0),
      position: value,
      time: new Value(0),
      frameTime: new Value(0),
    }

    const config = {
      duration: 250,
      toValue: dest,
      easing: Easing.inOut(Easing.cubic),
    }

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position,
    ])
  }


  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', zIndex }}>
        <TouchableWithoutFeedback onPress={() => {
          if (open) {
            setAnimation(runTiming(new Clock(), new Value(height), new Value(0)))
            setOpen(false)
            setZIndex(1)
          } else {
            setAnimation(runTiming(new Clock(), new Value(0), new Value(height)))
            setOpen(true)
            setZIndex(99)
          }
        }}>
          <View style={{
            marginLeft: 20,
            height: 38,
            borderWidth: 1,
            borderColor: borderColor,
            alignItems: 'center',
            flexDirection: 'row',
            width: 115,
            backgroundColor: "#fff"
          }}>
            <UGText
              style={{ color: '#111', marginLeft: 4 }}>{value}</UGText>
            <View style={{ flex: 1 }} />
            <Icon color={"#111"}
                  style={{ alignSelf: 'center', transform: [{ rotateX: open ? '180deg' : '0deg' }], marginRight: 4 }}
                  size={22}
                  name={'caret-down'} />
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            backgroundColor: 'white',
            height: animation,
            position: 'absolute',
            left: 20,
            top: 38,
            zIndex,
            borderWidth: zIndex === 99 ? 1 : 0,
            borderTopWidth: 0,
            borderColor: '#d9d9d9',
            borderBottomLeftRadiusRadius: 4,
            borderBottomRightRadius: 4,
            width: 115,
          }}>
          {data &&
          <FlatList
            keyExtractor={(item, index) => `${value}-item-${index}`}
            data={data}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => {
                setAnimation(runTiming(new Clock(), new Value(height), new Value(0)))
                setOpen(false)
                setZIndex(1)
                setValue(item)
              }}>
                <View style={{ paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'center' }}>
                  <UGText style={{color: "#111"}}>{item ? item || '' : ''}</UGText>
                </View>
              </TouchableWithoutFeedback>
            )} />}
        </Animated.View>
      </View>
      {open && <TouchableWithoutFeedback onPress={() => {
        setAnimation(runTiming(new Clock(), new Value(height), new Value(0)))
        setOpen(false)
        setZIndex(1)
      }}>
        <View style={{ width: AppDefine.width, height: AppDefine.height, position: 'absolute' }} />
      </TouchableWithoutFeedback>}
    </>
  )
}

const Header = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Skin1.themeColor, borderBottomColor: '#cccccc', borderBottomWidth: 1 }}>
      <View style={{
        backgroundColor: Skin1.themeColor,
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <UGText style={{
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: 'center',
          fontSize: 17,
          width: '100%',
          alignSelf: 'center',
          color: Skin1.navBarTitleColor,
        }}>反馈记录</UGText>
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}
