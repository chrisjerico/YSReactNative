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
  ugLog('rn=====',dataArray)
  const [isDate, setIsDate] = useState(false)

  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: title, back: true },
      didFocus: (params) => {
        ugLog('原生params==',params)
        switch (Platform.OS) {
          case 'ios':
            let dic = params;
            for (var key in dic) {
              if (key == 'dataArray') {
                if (!arrayEmpty(dic[key])) {
                  dataArray = dic[key]
                let oneObj :UGYYGames =  firstObj(dataArray);
                if (!anyEmpty(oneObj?.title)) {
                  // ["彩票", "电子", "捕鱼", "真人", "棋牌", "电竞", "体育"]
                  if (oneObj?.title.indexOf("电子") != -1 ) {
                    setNavbarProps({title:'电子系列'})
                  }
                  else if (oneObj?.title.indexOf("捕鱼") != -1 ) {
                    setNavbarProps({title:'捕鱼系列'})
                  }
                  else if (oneObj?.title.indexOf("真人") != -1 ) {
                    setNavbarProps({title:'真人系列'})
                  }
                  else if (oneObj?.title.indexOf("棋牌") != -1 ) {
                    setNavbarProps({title:'棋牌系列'})
                  }
                  else if (oneObj?.title.indexOf("电竞") != -1 ) {
                    setNavbarProps({title:'电竞系列'})
                  }
                  else if (oneObj?.title.indexOf("体育") != -1 ) {
                    setNavbarProps({title:'体育系列'})
                  }
                }
                 setIsDate(true)
                }
               
              }
            }
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
