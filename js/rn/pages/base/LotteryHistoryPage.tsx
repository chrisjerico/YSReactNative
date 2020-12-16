import React from 'react'
import { View } from 'react-native'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'

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
    </>
  )
}

export default LotteryHistoryPage
