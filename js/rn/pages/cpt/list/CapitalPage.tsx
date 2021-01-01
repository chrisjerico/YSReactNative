import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { anyEmpty } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import UseCapital from './UseCapital'
import { CapitalConst } from '../const/CapitalConst'
import DepositRecordListComponent from './record/dp/DepositRecordListComponent'
import WithdrawalRecordListComponent from './record/wd/WithdrawalRecordListComponent'
import CapitalDetailListComponent from './record/dl/CapitalDetailListComponent'
import PayListComponent from './record/pay/PayListComponent'
import CapitalContext from './CapitalContext'
import { ugLog } from '../../../public/tools/UgLog'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import WithdrawPage from './record/wt/WithdrawPage'

/**
 * 存款提现
 * @param navigation
 * @constructor
 */
const CapitalPage = ({ navigation, setProps }) => {

  const needNameInputRef = useRef(null)
  const [tabIndex, setTabIndex] = useState<number>(0) //当前是哪个Tab
  const [refreshCount, setRefreshCount] = useState(0) //更新界面

  // let tabController //tab选择器

  const {
    systemInfo,
    userInfo,
    categoryData,
    bankCardData,
    yueBaoData,
    requestYueBao,
  } = UseCapital()

  /**
   * 刷新哪个界面
   * @param pageIndex
   */
  const refreshTabPage = (pageName: string) => {
    ugLog('refresh count 2 =', pageName, refreshCount)

    switch (pageName) {
      case CapitalConst.DEPOSIT_RECORD:
        // tabController?.goToPage(2)
        setTabIndex(2)
        break
      case CapitalConst.WITHDRAWAL_RECORD:
        // tabController?.goToPage(3)
        setTabIndex(3)
        break
    }

    setRefreshCount(refreshCount + 1)
    // const timer = setTimeout(() => {
    //   clearTimeout(timer)
    //   setRefreshCount(refreshCount + 1)
    // }, 3000)
  }

  /**
   * 绘制各列表
   * @param item
   */
  const renderRecordList = (item: string) => {
    switch (item) {
      case CapitalConst.DEPOSIT:
        return <PayListComponent tabLabel={item} key={item}/>
      case CapitalConst.WITHDRAWAL:
        return <WithdrawPage tabLabel={item} key={item}/>
      case CapitalConst.DEPOSIT_RECORD:
        return <DepositRecordListComponent tabLabel={item}/>
      case CapitalConst.WITHDRAWAL_RECORD:
        return <WithdrawalRecordListComponent tabLabel={item}/>
      case CapitalConst.CAPITAL_DETAIL:
        return <CapitalDetailListComponent tabLabel={item}/>
    }
  }

  /**
   * 绘制个人信息
   */
  const renderMineInfo = () => <View style={_styles.mine_info_container}>
    <FastImage source={{ uri: userInfo?.avatar }}
               resizeMode={'contain'}
               style={_styles.mine_info_avatar}/>
    <View>
      <Text style={_styles.mine_info_name}>{userInfo?.usr}</Text>
      <Text style={_styles.mine_info_balance}>{'用户余额: ' + userInfo?.balance}</Text>
      {
        yueBaoData &&
        <Text style={_styles.mine_info_balance}>{yueBaoData?.yuebaoName + '余额: ' + yueBaoData?.balance}</Text>
      }
    </View>
  </View>

  return (
    <CapitalContext.Provider value={{
      refreshTabPage,
      getYueBaoInfo: () => yueBaoData,
    }}>
      <BaseScreen style={_styles.container}
                  screenName={'资金管理'}>
        {
          [
            renderMineInfo(),
            anyEmpty(categoryData) ?
              <EmptyView style={{ flex: 1 }}/> :
              <ScrollableTabView
                key={'ScrollableTabView' + refreshCount}
                initialPage={tabIndex}
                onChangeTab={value => {
                  // ugLog('tab index=', value?.from, value?.i)
                  setTabIndex(value?.i)
                }}
                // ref={instance => tabController = instance}
                tabBarUnderlineStyle={[_styles.tab_bar_underline,
                  { backgroundColor: Skin1.themeColor }]}
                tabBarActiveTextColor={Skin1.themeColor}
                tabBarInactiveTextColor={Skin1.textColor1}
                tabBarTextStyle={{ fontSize: scale(20) }}
                style={[{ flex: 1 }]}
                renderTabBar={() => <DefaultTabBar style={_styles.tab_bar}/>}>
                {
                  categoryData?.map((tabItem, index) => {
                      return (
                        renderRecordList(tabItem)
                      )
                    },
                  )
                }
              </ScrollableTabView>,
          ]
        }
      </BaseScreen>
    </CapitalContext.Provider>
  )
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mine_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  mine_info_avatar: {
    width: scale(64),
    aspectRatio: 1,
    marginRight: scale(16),
  },
  mine_info_name: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  mine_info_balance: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
  },
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  right_button: {
    color: 'white',
    fontSize: scale(20),
    padding: scale(8),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default CapitalPage
