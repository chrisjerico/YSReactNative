import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Avatar from '../../public/views/tars/Avatar'
import Button from '../../public/views/tars/Button'
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

const TaskLobby = () => {
  return (
    <ScrollableTabViewComponent
      indicatorStyle={{ width: '100%', backgroundColor: Skin1.themeColor, height: 5 }}
      tabBarScrollEnabled={false}
      indicatorContainerStyle={{ height: '100%', position: 'absolute', backgroundColor: 'rgba(193,66,66,0.4)', justifyContent: 'flex-end' }}>
      <View tabLabel={'日常任务'} key={'日常任务'} />
      <View tabLabel={'存款任务'} key={'存款任务'} />
      <View tabLabel={'提款任务'} key={'提款任务'} />
      <View tabLabel={'彩票投注'} key={'彩票投注'} />
      <View tabLabel={'推广任务'} key={'推广任务'} />
      <View tabLabel={'聊天室'} key={'聊天室'} />
    </ScrollableTabViewComponent>
  )
}

const MChange = () => {
  const [clickIndex, seClickIndex] = useState(0)
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>{'10.00000 M豆子:1元人民币'}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20, width: '100%' }}>
        <Text>{'500.0000'}</Text>
        <FontAwesome5 name={'exchange-alt'} size={20} />
        <Text>{'500.0000'}</Text>
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
            <Image source={{ uri: 'lqfl' }} style={{ width: 100, height: 20 }} resizeMode={'contain'} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={{ uri: 'lqfl' }} style={{ width: 100, height: 20 }} resizeMode={'contain'} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={{ uri: 'lqfl' }} style={{ width: 100, height: 20 }} resizeMode={'contain'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollableTabViewComponent indicatorStyle={{ width: 50 }} tabBarScrollEnabled={false} showIndicator={false}>
        <TaskLobby tabLabel={'任务大厅'} key={'任务大厅'} />
        <MChange tabLabel={'M豆子兑换'} key={'M豆子兑换'} />
        <View tabLabel={'M豆子帐变'} key={'M豆子帐变'} />
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
})
export default TaskCenterPage
