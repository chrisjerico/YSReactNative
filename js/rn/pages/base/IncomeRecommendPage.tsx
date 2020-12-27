import React from 'react'
import { Text, View } from 'react-native'
import { pop } from '../../public/navigation/RootNavigation'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'
import { Skin1 } from '../../public/theme/UGSkinManagers'

const IncomeRecommendPage = () => {
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'推荐受益'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      
    </>
  )
}

export default IncomeRecommendPage
