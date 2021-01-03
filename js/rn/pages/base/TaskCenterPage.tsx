import React from 'react'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import { View, Text } from 'react-native'
import Avatar from '../../public/views/tars/Avatar'
import AppDefine from '../../public/define/AppDefine'
import ReLoadBalanceComponent from '../../public/components/temp/ReLoadBalanceComponent'

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
                <Text style={{ color: '#ffffff', fontSize: 16 }}>{'tars198706'}</Text>
                <Text style={{ color: '#ffffff', fontSize: 16 }}>{'VIP2'}</Text>
                <Text style={{ color: '#BEBEBE', fontSize: 12 }}>{'M豆子'}</Text>
                <Text style={{ color: '#BEBEBE', fontSize: 12 }}>{'200'}</Text>
              </View>
              <ReLoadBalanceComponent balance={'30'} containerStyle={{ flex: 1, marginLeft: 5 }} color={'#ffffff'} balanceStyle={{ color: '#ffffff' }} />
            </View>
          </View>
          <View style={{ flex: 0.7, paddingLeft: 10 }}>
            <Text style={{ color: '#ffffff' }}>{'成长值 (200-500)'}</Text>
          </View>
          <View style={{ flex: 1.8, justifyContent: 'flex-start' }}>
            <ExpBar />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}></View>
      </View>
    </>
  )
}

export default TaskCenterPage
