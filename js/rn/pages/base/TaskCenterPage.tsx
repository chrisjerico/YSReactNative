import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { stringToFloat } from '../../public/tools/tars'
import Avatar from '../../public/views/tars/Avatar'
import Button from '../../public/views/tars/Button'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGStore } from '../../redux/store/UGStore'

const ExpBar = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: '#ffffff', marginRight: 5, fontSize: 16 }}>{'VIP2'}</Text>
      <View style={{ width: 220, flexDirection: 'row', backgroundColor: '#E0E0E0', height: 10, borderRadius: 10 }}>
        <View style={{ flex: 2, backgroundColor: '#000000', borderRadius: 10 }}></View>
        <View style={{ flex: 1 }}></View>
      </View>
      <Text style={{ color: '#ffffff', marginLeft: 5, fontSize: 16 }}>{'VIP3'}</Text>
    </View>
  )
}

const CommonTaskTab = ({ tabLabel }) => {
  const [commonList, setCommonList] = useState([])
  const [lhList, setLhCommonList] = useState([])
  const [lhIsOpen, setLhIsOpen] = useState(false)
  useEffect(() => {
    APIRouter.task_center().then((value) => {
      const list = value?.data?.data?.list?.filter((item) => {
        const { sortName } = item
        return sortName == '日常任务'
      })

      const commonList = list?.filter((item) => {
        const { sortName2 } = item
        return sortName2 == ''
      })

      const lhList = list?.filter((item) => {
        const { sortName2 } = item
        return sortName2 == '六合资料任务'
      })
      setCommonList(commonList)
      setLhCommonList(lhList)
      //@ts-ignore
    })
  }, [])
  return (
    <List
      uniqueKey={'CommonTaskTab'}
      data={lhIsOpen ? commonList?.concat({ title: '六合资料任务' })?.concat(lhList) : commonList?.concat({ title: '六合资料任务' })}
      scrollEnabled={true}
      renderItem={({ item }) => {
        const { missionName, integral, overTime, title } = item
        if (title) {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                setLhIsOpen(!lhIsOpen)
              }}>
              <View style={{ width: '100%', backgroundColor: '#D0D0D0', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <Text style={{ color: '#ffffff', fontSize: 20 }}>{title}</Text>
                <MaterialIcons name={'navigate-next'} size={40} color={'#ffffff'} />
              </View>
            </TouchableWithoutFeedback>
          )
        } else {
          return (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 70,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderColor: '#d9d9d9',
                borderBottomWidth: AppDefine.onePx,
              }}>
              <View>
                <Text>{missionName}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'red' }}>{'+' + integral + '积分'}</Text>
                  <Text style={{}}>{'截止时间 : ' + overTime}</Text>
                </View>
              </View>
              <Button
                title={'去完成'}
                containerStyle={{ backgroundColor: '#46A3FF', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, height: 30 }}
                titleStyle={{ color: '#ffffff', fontSize: 13 }}
              />
            </View>
          )
        }
      }}
      ListHeaderComponent={() => <Image source={{ uri: 'type2' }} style={{ width: '100%', height: 50 }} resizeMode={'cover'} />}
    />
  )
}

const TaskLobbyTab = ({ tabLabel }) => {
  return (
    <ScrollableTabViewComponent
      indicatorStyle={{ width: '100%', backgroundColor: Skin1.themeColor, height: 5 }}
      tabBarScrollEnabled={false}
      indicatorContainerStyle={{ height: '100%', position: 'absolute', backgroundColor: 'rgba(193,66,66,0.4)', justifyContent: 'flex-end' }}>
      <CommonTaskTab tabLabel={'日常任务'} key={'日常任务'} />
      <View tabLabel={'存款任务'} key={'存款任务'} />
      <View tabLabel={'提款任务'} key={'提款任务'} />
      <View tabLabel={'彩票投注'} key={'彩票投注'} />
      <View tabLabel={'推广任务'} key={'推广任务'} />
      <View tabLabel={'聊天室'} key={'聊天室'} />
    </ScrollableTabViewComponent>
  )
}

const MAccountTab = ({ tabLabel }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    APIRouter.task_creditsLog().then((value) => {
      const list = value?.data?.data?.list
      setList(list)
    })
  }, [])
  return (
    <List
      uniqueKey={'MAccountTab'}
      data={list}
      ListHeaderComponent={() => {
        return (
          <View style={styles.listRowContainer}>
            <Text style={styles.listRow}>{'帐变类型'}</Text>
            <Text style={styles.listRow}>{'M豆子'}</Text>
            <Text style={styles.listRow}>{'M豆子余额'}</Text>
            <Text style={styles.listRow}>{'全部日期'}</Text>
          </View>
        )
      }}
      renderItem={({ item }) => {
        const { type, integral, newInt, addTime } = item
        return (
          <View style={styles.listRowContainer}>
            <Text style={styles.listRow}>{type}</Text>
            <Text style={styles.listRow}>{integral}</Text>
            <Text style={styles.listRow}>{newInt}</Text>
            <Text style={styles.listRow}>{addTime}</Text>
          </View>
        )
      }}
    />
  )
}

const MChangeTab = ({ tabLabel }) => {
  const [clickIndex, seClickIndex] = useState(0)
  const [mValue, setMvalue] = useState(null)
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ paddingVertical: 10 }}>{'10.00000 M豆子:1元人民币'}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20, width: '100%' }}>
        <View style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder={'请输入M豆子'}
            style={{ width: '80%' }}
            value={mValue}
            onChangeText={(value) => {
              setMvalue(value)
            }}
          />
          <AntDesign
            name={'closecircle'}
            onPress={() => {
              setMvalue(null)
            }}
          />
        </View>
        <FontAwesome5 name={'exchange-alt'} size={20} />
        <Text>{mValue ? stringToFloat(mValue) / 10 : '获得人民币'}</Text>
      </View>
      <Button
        title={'确认兑换'}
        containerStyle={{ backgroundColor: Skin1.themeColor, borderRadius: 5, marginBottom: 20 }}
        titleStyle={{ color: '#ffffff', paddingVertical: 15, paddingHorizontal: 20 }}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {['10.0000', '50.0000', '100.0000', '500.0000', '全部兑换'].map((item, index) => (
          <Button
            key={index}
            title={item}
            containerStyle={[
              styles.button,
              {
                borderColor: index == clickIndex ? Skin1.themeColor : '#7B7B7B',
              },
            ]}
            titleStyle={styles.buttonTitle}
            onPress={() => {
              seClickIndex(index)
              setMvalue(item == '全部兑换' ? '200' : item)
            }}
          />
        ))}
      </View>
    </View>
  )
}
const TaskCenterPage = () => {
  const userInfo = UGStore.globalProps.userInfo

  const { balance } = userInfo
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'任务中心(RN)'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ aspectRatio: 2.2, width: '100%', backgroundColor: Skin1.themeColor, flexDirection: 'row' }}>
        <View style={{ flex: 3, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center' }}>
            <Avatar uri={AppDefine.defaultAvatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text style={{ color: '#ffffff', fontSize: 16 }}>{'tars198706'}</Text>
                <Text style={{ color: '#ffffff', fontSize: 16 }}>{'VIP2'}</Text>
                <Text style={{ color: '#BEBEBE', fontSize: 12 }}>{'M豆子'}</Text>
                <Text style={{ color: '#BEBEBE', fontSize: 12 }}>{'200'}</Text>
              </View>
              <ReLoadBalanceComponent balance={balance} containerStyle={{ flex: 1, marginLeft: 5 }} balanceStyle={{ color: '#ffffff' }} balanceDecimal={2} iconColor={'#ffffff'} />
            </View>
          </View>
          <View style={{ flex: 0.7, paddingLeft: 10 }}>
            <Text style={{ color: '#ffffff' }}>{'成长值 (200-500)'}</Text>
          </View>
          <View style={{ flex: 1.8, justifyContent: 'flex-start' }}>
            <ExpBar />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around', paddingVertical: 50 }}>
          <TouchableWithoutFeedback>
            <ImageBackground source={{ uri: 'usercenter0' }} style={styles.badgeConatiner} resizeMode={'contain'}>
              <Text style={{ color: '#ffffff', fontSize: 10, marginRight: 20 }}>{'会员中心'}</Text>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <ImageBackground source={{ uri: 'dailysign' }} style={styles.badgeConatiner} resizeMode={'contain'}>
              <Text style={{ color: '#ffffff', fontSize: 10, marginRight: 20 }}>{'会员中心'}</Text>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <ImageBackground source={{ uri: 'usercenter03' }} style={styles.badgeConatiner} resizeMode={'contain'}>
              <Text style={{ color: '#ffffff', fontSize: 10, marginRight: 20 }}>{'会员中心'}</Text>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollableTabViewComponent indicatorStyle={{ width: 50 }} tabBarScrollEnabled={false} showIndicator={false} activeTabStyle={{ borderWidth: 1, borderColor: Skin1.themeColor }}>
        <TaskLobbyTab tabLabel={'任务大厅'} key={'任务大厅'} />
        <MChangeTab tabLabel={'M豆子兑换'} key={'M豆子兑换'} />
        <MAccountTab tabLabel={'M豆子帐变'} key={'M豆子帐变'} />
      </ScrollableTabViewComponent>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#7B7B7B',
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 3,
  },
  buttonTitle: {
    paddingVertical: 10,
  },
  listRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: AppDefine.onePx,
  },
  listRow: {
    flex: 1,
    textAlign: 'center',
  },
  badgeConatiner: {
    width: 100,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default TaskCenterPage
