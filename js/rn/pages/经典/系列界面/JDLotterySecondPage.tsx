import { Platform, StyleSheet, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { UGBasePageProps } from '../../base/UGPage'
import { UGYYGames } from '../Model/UGYYGames'
import { ugLog } from '../../../public/tools/UgLog'
import CommStyles from '../../base/CommStyles'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import { anyEmpty, arrayEmpty, firstObj } from '../../../public/tools/Ext'
import JDGameListCP from '../cp/JDGameListCP'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../../public/theme/UGSkinManagers'

interface IJDLotterySecondHomParams {
  dataArray?: Array<UGYYGames>, //列表数据
  title?: string, //标题
}
/**
 * 2级系列大厅
 * @param navigation
 * @constructor
 */
const JDLotterySecondPage = ({ navigation, route, setProps, setNavbarProps }: UGBasePageProps) => {


  /**
    * refreshBankList: 刷新银行卡列表
    * bankCardData: 银行卡数据
    */
  let { title, dataArray }: IJDLotterySecondHomParams = route?.params

  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: title, back: true },
      didFocus: (params) => {
        switch (Platform.OS) {
          case 'ios':
            setNavbarProps({title:params?.title})
            break;
          case 'android':
            //TODO Android 2级系列大厅传参
            break;
        }
      }
    })

  }, [])

  /**
   * 绘制各Tab列表
   * @param item
   */
  const renderDataList = (item: Array<UGYYGames>) =>
    <JDGameListCP 
                           gameData={item}
                          />


  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (

        anyEmpty(dataArray)
          ? <EmptyView style={{ flex: 1 }} />
          : <ScrollView style={{}}>
            {renderDataList(dataArray)}
          </ScrollView>

    )
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={Skin1.bgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {
        renderAllData()
      }
    </LinearGradient>
  )
}

export default JDLotterySecondPage
