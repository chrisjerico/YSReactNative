import { FlatList, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { UGBasePageProps } from '../../../base/UGPage'
import { ugLog } from '../../../../public/tools/UgLog'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import AppDefine from '../../../../public/define/AppDefine'
import CommStyles from '../../../base/CommStyles'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { skin1 } from '../../../../public/theme/UGSkinManagers'
import { UGStore } from '../../../../redux/store/UGStore'
import { GameHistorylistBean, GameHistoryModel } from '../../../../public/network/Model/HomeRecommendModel'
import APIRouter from '../../../../public/network/APIRouter'
import { UGBetsRecordListModel, UGBetsRecordModel } from '../../Model/UGBetsRecordModel'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'


/**
 * 其他注单
 * @param navigation
 * @constructor
 */
const JDDayDetailPage = ({ navigation, route, setProps }: UGBasePageProps) => {


  let betId: string;//下注id
  let date: string;//下注时间
  const [totalBetMoney, setTotalBetMoney] = useState('0') //下注
  const [totalResultMoney, setTotalResultMoney] = useState('0') //输赢

  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Array<UGBetsRecordModel>>([])
  const [isSetData, setIsSetData] = useState(false) //是否存取過數據
  const [betTotal, setBetTotal] = useState(0) //是否存取過數據



  useEffect(() => {
    setProps({
      didFocus: (params) => {
        ugLog('--------------------------params==', params)
        switch (Platform.OS) {
          case 'ios':
            let dic = params;
            for (var key in dic) {
              if (key == 'betId') {
                if (!anyEmpty(dic[key])) {
                  betId = dic[key];
                }
              }
              if (key == 'date') {
                if (!anyEmpty(dic[key])) {
                  date = dic[key];
                }
              }
            }
            if (!anyEmpty(betId) && !anyEmpty(date)) {
              requestGameData()
            }

            break;
          case 'android':
            //TODO Android 传参
            break;
        }


      },
    }, false)
  }, [])

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
    onRefresh={() => {
      requestGameData()
    }} />

  /**
   * 请求游戏数据
   */
  const requestGameData = async () => {
    setRefreshing(true)

    // 刷新UI
    function refreshUI(data: UGBetsRecordListModel) {
      setRefreshing(false)
      setData(data.data.list)
      let vBetTotal = data.data.totalBetMoney
      setTotalBetMoney(vBetTotal)
      let vTotalResultMoney = data.data.totalResultMoney
      setTotalResultMoney(vTotalResultMoney)

      renderAllData()
    }



    api.ticket.history('lottery', 5,date,date,betId,)
      .useSuccess(
        ({ data, msg }) => {

        }).useFailure(() => {

        })

    // 获取注單數據
    // APIRouter.ticket_history_args(
    //   page + '', '20', currentType?.type, startDate, startDate
    // ).then(({ data: res }) => {
    //   // ugLog('获取注單數據=======', res)
    //   if (res?.code == 0) {
    //     setIsSetData(true)
    //     refreshUI(res)
    //   } else {
    //     Toast(res?.msg)
    //   }
    // }).finally(() => {
    //   setRefreshing(false)
    // })
  }

  /**
   * 绘制各Tab列表
   * @param item
   */
  const renderDataList = (item: Array<UGBetsRecordModel>) => {
    // ugLog('item=', item)
    return (
      <>
        <View style={{ flex: 1 }}>
          {
            [
              anyEmpty(item)
                ? <EmptyView style={{ flex: 1 }} />
                : <FlatList
                  refreshControl={refreshCT}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.id + index}
                  data={item}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={[_styles.text_title_container, { backgroundColor: skin1.textColor4 }]}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          <Text style={{ color: UGColor.TextColor2, fontSize: scale(20) }}>{item.displayNumber}</Text>
                          <Text style={{ color: 'red', fontSize: scale(20) }}>{item.id}</Text>
                        </View>
                        <Text style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.playGroupName+'@'+item.odds}</Text>
                        <Text style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.betMoney}</Text>
                        <Text style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.rewardRebate}</Text>
                      </View>
                    )
                  }}
                />,
            ]
          }
        </View>
      </>
    )
  }

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (
      isSetData
        ?
        anyEmpty(data)
          ? <EmptyView style={{ flex: 1 }} />
          :
          <View>
            <ScrollView style={{ height: AppDefine.height - 44 - AppDefine.safeArea.top - 0 - 60 - 50, }}>
              {
                renderDataList(data)
              }
              <View style={{ height: 20, }}>
              </View>
            </ScrollView>
          </View>
        : <View></View>
    )
  }

  return (
    <View style={CommStyles.flex}>

      <View style={_styles.text_title_container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ color: UGColor.TextColor2, fontSize: scale(20) }}>{'期号/'}</Text>
          <Text style={{ color: 'red', fontSize: scale(20) }}>{'注单号'}</Text>
        </View>

        <Text style={_styles.text_content_0}>{'下注明细'}</Text>
        <Text style={_styles.text_content_0}>{'投注金额'}</Text>
        <Text style={_styles.text_content_0}>{'输赢'}</Text>
      </View>
      <View style={[_styles.text_bottom_container, { bottom: 0, backgroundColor: skin1.themeColor, }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <Text style={[_styles.text_content_bottom, { color: skin1.textColor1, marginTop: 10 }]}>{'下注: '}</Text>
          <Text style={[_styles.text_content_bottom, { color: 'yellow', }]}>{totalBetMoney}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <Text style={[_styles.text_content_bottom, { color: skin1.textColor1, marginTop: 10 }]}>{'输赢: '}</Text>
          <Text style={[_styles.text_content_bottom, { color: skin1.textColor1, }]}>{totalResultMoney}</Text>
        </View>

      </View>
      {
        renderAllData()
      }
    </View>
  )
}

const TAB_ITEM_HEIGHT = scale(70) //tab高度

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text_title_container: {
    backgroundColor: UGColor.BackgroundColor2,
    height: TAB_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  text_content_0: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(20),
    alignItems: 'center',
    textAlign: 'center',
  },
  text_bottom_container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: skin1.textColor4,
    position: 'absolute',

  },
  text_content_bottom: {
    flex: 1,
    fontSize: scale(20),
    textAlign: 'center',
  },
  calendar_wid: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  calendar_button: {
    fontSize: scale(22),
    textAlign: 'center',
    padding: scale(18),
  },
  calendar_title: {
    flex: 1,
    fontSize: scale(24),
    textAlign: 'center',
    padding: scale(16),
  },
})

export default JDDayDetailPage
