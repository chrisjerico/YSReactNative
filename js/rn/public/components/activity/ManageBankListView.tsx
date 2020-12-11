import {
  Dimensions,
  Image,
  Platform,
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
import { ManageBankData, ManageBankModel } from '../../network/Model/act/ManageBankModel'
import UseManageBankList from './UseManageBankList'
import { ugLog } from '../../tools/UgLog'

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

  const {
    listData,
    categoryData,
    requestManageBankData,
    requestLogData
  } = UseManageBankList()

  ugLog('listData=', listData)

  const tabItems = [
    {
      name: '申请彩金',
      dataList: ['AAAA', 'BBBB', 'ccccc'],
    },
    {
      name: '申请反馈',
      dataList: ['AAAA', 'BBBB', 'ccccc'],
    },

  ]

  // const _renderDataList = ()

  return (
    <BaseScreen style={_styles.container} screenName={'活动彩金'}>
      <ScrollableTabView
        onChangeTab={(tab) =>{
          if (tab.from == tab.i) {

          }
        }}
        tabBarUnderlineStyle={_styles.tab_bar_underline}
        tabBarActiveTextColor={Skin1.themeColor}
        tabBarInactiveTextColor={Skin1.textColor1}
        tabBarTextStyle={{ fontSize: scale(22) }}
        style={[{ flex: 1 }]}
        renderTabBar={() => <DefaultTabBar style={_styles.tab_bar} />}>
        {
          tabItems.map((item, index) =>
            <Text tabLabel={item.name}>{item.name + '_' + index}</Text>)
        }
      </ScrollableTabView>
    </BaseScreen>
  )
}

export const TAB_ITEM_WIDTH = scale(96) //tab宽度
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
})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default ManageBankListView
