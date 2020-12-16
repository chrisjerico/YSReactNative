import React from 'react'
import { Text, View } from 'react-native'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { pop } from '../../public/navigation/RootNavigation'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'

const LotteryHistoryPage = () => {
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'投注记录'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <ScrollableTabViewComponent indicatorStyle={{ width: '50%' }}>
        <View tabLabel={'已中奖'} />
        <View tabLabel={'未中奖'} />
        <View tabLabel={'等待开奖'} />
        <View tabLabel={'已撤单'} />
        <View tabLabel={'注单统计'} />
      </ScrollableTabViewComponent>
      {/* <View>
        <ScrollableTabView
          tabBarActiveTextColor={Skin1.themeColor}
          tabBarTextStyle={{ color: '#000000' }}
          tabBarUnderlineStyle={{
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View tabLabel={'已中奖'} />
          <View tabLabel={'未中奖'} />
          <View tabLabel={'等待开奖'} />
          <View tabLabel={'已撤单'} />
          <View tabLabel={'注单统计'} />
        </ScrollableTabView>
      </View> */}
    </>
  )
}

export default LotteryHistoryPage
