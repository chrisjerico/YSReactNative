import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { anyEmpty } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, TabBarProps } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import UseCapital from './UseCapital'
import { CapitalConst } from '../const/CapitalConst'
import DepositRecordListComponent from './record/dp/DepositRecordListComponent'
import WithdrawalRecordListComponent from './record/wd/WithdrawalRecordListComponent'
import CapitalDetailListComponent from './record/dl/CapitalDetailListComponent'
import PayListComponent from './record/pay/PayListComponent'
import CapitalContext from './CapitalContext'
import FastImage from 'react-native-fast-image'
import WithdrawComponent from './record/wt/WithdrawComponent'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'
import { ugLog } from '../../../public/tools/UgLog'
import { PayAisleListData } from '../../../public/network/Model/wd/PayAisleModel'
import MineHeader from '../../../public/views/tars/MineHeader'
import moment from 'moment'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface IRouteParams {
  initTabIndex?: string, //选中哪个TAB
  showBackButton?: string // 1或者不传 为 显示
}

/**
 * 存款提现
 * @param navigation
 * @constructor
 */
const CapitalPage = ({ navigation, route, setProps }) => {

  const { initTabIndex, showBackButton }: IRouteParams = route?.params
  const indexValue = Object.values(CapitalConst).findIndex((item) => item == initTabIndex)

  // const needNameInputRef = useRef(null)
  const [tabIndex, setTabIndex] = useState<number>(indexValue < 0 ? 0 : indexValue) //当前是哪个Tab
  const [refreshCount, setRefreshCount] = useState(0) //更新界面

  // let tabController //tab选择器
  const tabRef = useRef<TabBarProps>(null)
  const {
    systemInfo,
    userInfo,
    categoryData,
    bankCardData,
    yueBaoData,
    requestYueBao,
  } = UseCapital()

  //初始化
  useEffect(() => {
    setProps({
      didFocus: (params) => {
        requestYueBao()
        let dic = params;
        ugLog('dic==',dic)
        for (var key in dic) {
          if (key == 'selectIndex' ||key == 'initTabIndex') {
            console.log('key ==============', key);
            console.log('v ==============', dic[key]);
            // tabRef?.current?.goToPage(2)
            setTabIndex(dic[key])
            setRefreshCount(dic[key] + 1)
            //  setRefreshCount(moment().unix())

          }
        }
      }
    })

  }, [])
  useEffect(() => {
    if (showBackButton == '0') {//主页初始化再确认一次
      setRefreshCount(refreshCount + 1)
    }
  }, [showBackButton])

  /**
   * 刷新哪个界面
   * @param pageIndex
   */
  const refreshTabPage = (pageName?: string) => {
    //ugLog('refresh count 2 =', pageName, refreshCount)
    requestYueBao()

    switch (pageName) {
      case CapitalConst.DEPOSIT_RECORD:
        setTabIndex(2)
        setRefreshCount(refreshCount + 1)
        break
      case CapitalConst.WITHDRAWAL_RECORD:
        setTabIndex(3)
        setRefreshCount(refreshCount + 1)
        break
    }

  }

  /**
   * 绘制各列表
   * @param item
   */
  const renderRecordList = (item: string) => {
    switch (item) {
      case CapitalConst.DEPOSIT:
        return <PayListComponent tabLabel={item} key={item} />
      case CapitalConst.WITHDRAWAL:
        return <WithdrawComponent tabLabel={item} key={item} />
      case CapitalConst.DEPOSIT_RECORD:
        return <DepositRecordListComponent tabLabel={item} />
      case CapitalConst.WITHDRAWAL_RECORD:
        return <WithdrawalRecordListComponent tabLabel={item} />
      case CapitalConst.CAPITAL_DETAIL:
        return <CapitalDetailListComponent tabLabel={item} />
    }
  }

  ugLog("blance=", !anyEmpty(userInfo?.balance) && `${Number(userInfo?.balance).toFixed(1)}`)
  /**
   * 绘制个人信息
   */
  const renderMineInfo = () =>
  <View style={[_styles.mine_info_container,{backgroundColor:Skin1.themeColor}]}>
    <FastImage source={{ uri: userInfo?.avatar }}
      resizeMode={'contain'}
      style={_styles.mine_info_avatar} />
    <View>
      <UGText style={[_styles.mine_info_name,{color:'white',}]}>{userInfo?.usr}</UGText>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <UGText style={[_styles.mine_info_balance, { color:  'white', }]}>{!anyEmpty(userInfo?.balance) && `用户余额:  `}</UGText>
        <UGText style={[_styles.mine_info_balance, { color: 'red', fontWeight: 'bold', }]}>{!anyEmpty(userInfo?.balance) && `${Number(userInfo?.balance).toFixed(1)}`}</UGText>
        <UGText style={[_styles.mine_info_balance, { color:  'white', }]}> RMB</UGText>
      </View>

      {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <UGText style={[_styles.mine_info_balance, { color: 'white', }]}>{!anyEmpty(yueBaoData) && yueBaoData?.yuebaoName + '余额: ' }</UGText>
        <UGText style={[_styles.mine_info_balance, { color: 'white', fontWeight: 'bold', }]}>{!anyEmpty(userInfo?.balance) && `${yueBaoData?.balance}`}</UGText>
      </View> */}
    </View>
  </View>

  return (
    <CapitalContext.Provider value={{
      refreshTabPage,
      getYueBaoInfo: () => yueBaoData,
    }}>
      <BaseScreen style={_styles.container}
        hideLeft={showBackButton == '0'}
        screenName={'资金管理'}>
        {
          [
            renderMineInfo(),
            anyEmpty(categoryData) ?
              <EmptyView style={{ flex: 1 }} /> :
              <ScrollableTabView
                key={'ScrollableTabView' + refreshCount}
                initialPage={tabIndex}
                onChangeTab={value => { }}
                ref={tabRef}
                // ref={instance => tabController = instance}
                tabBarUnderlineStyle={[_styles.tab_bar_underline,
                { backgroundColor: Skin1.themeColor }]}
                tabBarActiveTextColor={Skin1.themeColor}
                tabBarInactiveTextColor={'#999999'}
                tabBarTextStyle={{ fontSize: scale(20) }}
                style={[{ flex: 1,  }]}
                renderTabBar={() => <DefaultTabBar style={_styles.tab_bar} />}>
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
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  mine_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(60),
    padding: scale(16),
    height: scale(160)
  },
  mine_info_avatar: {
    width: scale(100),
    aspectRatio: 1,
    borderRadius: scale(50),
    marginRight: scale(16),

  },
  mine_info_name: {
    fontSize: scale(24),
    fontWeight: 'bold',

  },
  mine_info_balance: {
    fontSize: scale(20),
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

export default CapitalPage
