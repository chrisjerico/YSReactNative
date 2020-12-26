import { StyleSheet } from 'react-native'
import * as React from 'react'
import { useRef, useState } from 'react'
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

/**
 * 存款提现
 * @param navigation
 * @constructor
 */
const CapitalPage = ({ navigation, setProps }) => {

  const needNameInputRef = useRef(null)
  const [tabIndex, setTabIndex] = useState<number>(0)

  const {
    systemInfo,
    userInfo,
    categoryData,
    bankCardData,
  } = UseCapital()

  /**
   * 绘制各列表
   * @param item
   */
  const renderRecordList = (item: string) => {
    switch (item) {
      case CapitalConst.DEPOSIT:
        return <PayListComponent tabLabel={item}/>
      case CapitalConst.WITHDRAWAL:
        return <DepositRecordListComponent tabLabel={item}/>
      case CapitalConst.DEPOSIT_RECORD:
        return <DepositRecordListComponent tabLabel={item}/>
      case CapitalConst.WITHDRAWAL_RECORD:
        return <WithdrawalRecordListComponent tabLabel={item}/>
      case CapitalConst.CAPITAL_DETAIL:
        return <CapitalDetailListComponent tabLabel={item}/>
    }
  }

  return (
    <BaseScreen style={_styles.container}
                screenName={'我的提款账户'}>
      {
        [
          anyEmpty(categoryData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <ScrollableTabView
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
  )
}

const _styles = StyleSheet.create({
  container: {},
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  item_container: {
    paddingHorizontal: scale(32),
    paddingVertical: scale(16),
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
    width: scale(36),
    height: scale(36),
  },
  bank_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(22),
    marginLeft: scale(16),
  },
  bank_name_edit: {
    width: scale(28),
    height: scale(28),
  },
  bank_user_name: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
    paddingTop: scale(16),
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
