import {
  Dimensions, FlatList,
  Image,
  Platform, RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { chunkArray } from '../../tools/ChunkArr'
import { getTrendData } from '../../utils/getTrendData'
import { TrendData } from '../../interface/trendData'
import Svg, { Line } from 'react-native-svg'
import APIRouter from '../../network/APIRouter'
import { ChooseGameModal } from '../ChooseGameModal'
import PushHelper from '../../define/PushHelper'
import { BaseScreen } from '../../../pages/乐橙/component/BaseScreen'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { hideLoading, showLoading } from '../../widget/UGLoadingCP'
import { getGameList } from '../../utils/getGameList'
import { anyEmpty } from '../../tools/Ext'
import { scale } from '../../tools/Scale'
import { Skin1 } from '../../theme/UGSkinManagers'
import { LEFThemeColor } from '../../theme/colors/LEFThemeColor'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import { BankInfoParam, ManageBankCardData, ManageBankCardModel } from '../../network/Model/act/ManageBankCardModel'
import UseManageBankList from './UseManageBankList'
import { ugLog } from '../../tools/UgLog'
import { UGColor } from '../../theme/UGThemeColor'
import { Res } from '../../../Res/icon/Res'
import EmptyView from '../view/empty/EmptyView'

/**
 * 银行卡管理
 * @param navigation
 * @constructor
 */
const ManageBankListView = ({ navigation }) => {
  // //列表数据
  // const [listData, setListData] = useState<ActivityJackpotData>()
  // //当前是第几页数据
  // const [pageIndex, setPageIndex] = useState(0)
  //
  // useEffect(() => {
  //   setPageIndex(1)
  // }, [])
  //
  // useEffect(() => {
  //   APIRouter.activity_winApplyList().then(({ data: res }) => {
  //
  //   })
  // }, [pageIndex])
  const [tabIndex, setTabIndex] = useState<number>(0)

  const {
    getBankIcon,
    refreshCT,
    bankCardData,
    requestManageBankData,
    // requestLogData,
  } = UseManageBankList()

  return (
    <BaseScreen style={_styles.container} screenName={'我的提款账户'}>
      {
        true
          ? <EmptyView style={{flex: 1}}/>
          : <ScrollableTabView
            onChangeTab={(tab) => {
              if (tab.from == tab.i) {
                ugLog('tab index=', tab.i)
              }
            }}
            tabBarUnderlineStyle={_styles.tab_bar_underline}
            tabBarActiveTextColor={Skin1.themeColor}
            tabBarInactiveTextColor={Skin1.textColor1}
            tabBarTextStyle={{ fontSize: scale(22) }}
            style={[{ flex: 1 }]}
            renderTabBar={() => <DefaultTabBar style={_styles.tab_bar}/>}>
            {
              bankCardData.allAccountList.map((tabItem, index) => {
                  // ugLog('tabItem=', tabItem)
                  return (
                    <FlatList tabLabel={tabItem.name}
                              refreshControl={refreshCT}
                              keyExtractor={(item, index) => `${item}-${index}`}
                              data={tabItem.data}
                              renderItem={({ item, index }) => {
                                // ugLog('ITEM=', item)
                                let bankIcon = getBankIcon(tabItem.type)
                                ugLog('bankIcon type=', bankIcon)
                                return (
                                  <View style={_styles.item_container}>
                                    <View style={_styles.item_content}>
                                      <View style={_styles.bank_name_container}>
                                        <FastImage source={bankIcon}
                                                   resizeMode={'contain'}
                                                   style={_styles.bank_name_icon}/>
                                        <Text style={_styles.bank_name}>{item.bankName}</Text>
                                        <FastImage source={{ uri: Res.edit }}
                                                   style={_styles.bank_name_edit}/>
                                      </View>
                                      <Text style={_styles.bank_user_name}>{'开户姓名: ' + item.ownerName}</Text>
                                      <Text style={_styles.bank_user_name}>{'银行账户: ' + item.bankCard}</Text>
                                      <Text style={_styles.bank_user_name}>{'开卡地址: ' + item.bankAddr}</Text>
                                    </View>
                                  </View>
                                )
                              }}/>
                  )
                },
              )
            }
          </ScrollableTabView>
      }
    </BaseScreen>
  )
}

// export const TAB_ITEM_WIDTH = scale(96) //tab宽度
export const TAB_ITEM_HEIGHT = scale(60) //tab高度

const _styles = StyleSheet.create({
  container: {},
  tab_bar: {
    backgroundColor: '#f4f4f4',
    height: TAB_ITEM_HEIGHT,
  },
  tab_bar_underline: {
    height: scale(3),
    backgroundColor: Skin1.themeColor,
  },
  item_container: {
    paddingHorizontal: scale(32),
    paddingTop: scale(32),
  },
  item_content: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(22),
    padding: scale(16),
  },
  bank_name_container: {
    flexDirection: 'row',
    color: UGColor.TextColor1,
    fontSize: scale(24),
    alignItems: 'center',
  },
  bank_name_icon: {
    width: scale(40),
    height: scale(40),
  },
  bank_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(24),
    marginLeft: scale(16),
  },
  bank_name_edit: {
    width: scale(28),
    height: scale(28),
  },
  bank_user_name: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingTop: scale(16),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default ManageBankListView
