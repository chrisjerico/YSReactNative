import React from 'react'
import { View } from 'react-native'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'

const SafeCenterPage = () => {
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'安全中心'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View></View>
    </>
  )
}

export default SafeCenterPage
