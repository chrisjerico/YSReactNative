import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import List from '../../public/views/tars/List'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const TotalHistory = ({ tabLabel }) => {
  return (
    <List
      uniqueKey={'TotalHistory'}
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={({}) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }}>
          <UGText>{'时间'}</UGText>
          <UGText>{'笔数'}</UGText>
          <UGText>{'中奖笔数'}</UGText>
          <UGText>{'中奖金额'}</UGText>
          <UGText>{'输赢'}</UGText>
        </View>
      )}
    />
  )
}

const LotteryHistoryPage = () => {
  const [rightMenuVisible, setRightMenuVisible] = useState(false)

  useEffect(() => {
  }, [])
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader
          title={'投注记录'}
          showBackBtn
          onPressBackBtn={pop}
          customerIcon={'calendar'}
          showCustomerService
          titleColor={'#ffffff'}
          onPressCustomerService={() => {
            setRightMenuVisible(true)
          }}
        />
      </SafeAreaHeader>
      <ScrollableTabViewComponent indicatorStyle={{ width: '50%' }} tabBarScrollEnabled={false}>
        <View tabLabel={'已中奖'} key={'已中奖'} />
        <View tabLabel={'未中奖'} key={'未中奖'} />
        <View tabLabel={'等待开奖'} key={'等待开奖'} />
        <View tabLabel={'已撤单'} key={'已撤单'} />
        <TotalHistory tabLabel={'注单统计'} key={'注单统计'} />
      </ScrollableTabViewComponent>
      <Modal style={{ flex: 1 }} transparent={true} visible={rightMenuVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setRightMenuVisible(false)
          }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <View style={styles.menuContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.menu}>
                  <UGText>{'今日'}</UGText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.menu}>
                  <UGText>{'最近三天'}</UGText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.menu}>
                  <UGText>{'最近一周'}</UGText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.menu}>
                  <UGText>{'最近一月'}</UGText>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#ffffff',
    width: 100,
    height: 130,
    position: 'absolute',
    top: 100,
    right: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default LotteryHistoryPage
