import React from 'react'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Avatar from '../../public/views/tars/Avatar'
import AppDefine from '../../public/define/AppDefine'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const ExpBar = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <UGText style={{ color: '#ffffff', marginRight: 5, fontSize: 16 }}>{'VIP2'}</UGText>
      <View style={{ width: 220, flexDirection: 'row', backgroundColor: '#E0E0E0', height: 10, borderRadius: 10 }}>
        <View style={{ flex: 2, backgroundColor: '#000000', borderRadius: 10 }}></View>
        <View style={{ flex: 1 }}></View>
      </View>
      <UGText style={{ color: '#ffffff', marginLeft: 5, fontSize: 16 }}>{'VIP3'}</UGText>
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
const TaskCenterPage = () => {
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'任务中心'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ aspectRatio: 2.2, width: '100%', backgroundColor: Skin1.themeColor, flexDirection: 'row' }}>
        <View style={{ flex: 3, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center' }}>
            <Avatar uri={AppDefine.defaultAvatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-around', marginBottom: 10 }}>
                <UGText style={{ color: '#ffffff', fontSize: 16 }}>{'tars198706'}</UGText>
                <UGText style={{ color: '#ffffff', fontSize: 16 }}>{'VIP2'}</UGText>
                <UGText style={{ color: '#BEBEBE', fontSize: 12 }}>{'M豆子'}</UGText>
                <UGText style={{ color: '#BEBEBE', fontSize: 12 }}>{'200'}</UGText>
              </View>
              <ReLoadBalanceComponent balance={'30'} containerStyle={{ flex: 1, marginLeft: 5 }} color={'#ffffff'} balanceStyle={{ color: '#ffffff' }} />
            </View>
          </View>
          <View style={{ flex: 0.7, paddingLeft: 10 }}>
            <UGText style={{ color: '#ffffff' }}>{'成长值 (200-500)'}</UGText>
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
        <View tabLabel={'M豆子兑换'} key={'M豆子兑换'} />
        <View tabLabel={'M豆子帐变'} key={'M豆子帐变'} />
      </ScrollableTabViewComponent>
    </>
  )
}

export default TaskCenterPage
