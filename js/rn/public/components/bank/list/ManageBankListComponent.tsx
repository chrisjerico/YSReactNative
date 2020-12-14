import { Alert, FlatList, Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../../../../pages/乐橙/component/BaseScreen'
import { anyEmpty } from '../../../tools/Ext'
import { scale } from '../../../tools/Scale'
import { Skin1 } from '../../../theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import UseManageBankList, { getBankIcon } from './UseManageBankList'
import { ugLog } from '../../../tools/UgLog'
import { UGColor } from '../../../theme/UGThemeColor'
import { Res } from '../../../../Res/icon/Res'
import EmptyView from '../../view/empty/EmptyView'
import { push } from '../../../navigation/RootNavigation'
import { PageName } from '../../../navigation/Navigation'
import { HJThemeColor } from '../../../theme/colors/HJThemeColor'
import APIRouter from '../../../network/APIRouter'
import { UGStore } from '../../../../redux/store/UGStore'
import PushHelper from '../../../define/PushHelper'
import { AllAccountListData, BankInfoParam } from '../../../network/Model/act/ManageBankCardModel'
import { BankConst } from '../const/BankConst'
import ReloadSlidingVerification from '../../tars/ReloadSlidingVerification'
import NeedNameInputComponent from '../../tars/NeedNameInputComponent'
import WebView from 'react-native-webview'

/**
 * 银行卡管理
 * @param navigation
 * @constructor
 */
const ManageBankListComponent = ({ navigation, setProps }) => {

  const needNameInputRef = useRef(null)
  const [tabIndex, setTabIndex] = useState<number>(0)

  const {
    systemInfo,
    userInfo,
    categoryData,
    refreshCT,
    bankCardData,
    requestManageBankData,
    bindRealName,
  } = UseManageBankList()

  /**
   * 绘制银行信息
   * @param item
   */
  const renderBank = (item: BankInfoParam) => <View>
    <Text style={_styles.bank_user_name}>{'开户姓名: ' + item.ownerName}</Text>
    <Text style={_styles.bank_user_name}>{'银行账户: ' + item.bankCard}</Text>
    <Text style={_styles.bank_user_name}>{'开卡地址: ' + item.bankAddr}</Text>
  </View>

  /**
   * 绘制虚拟币信息
   * @param item
   */
  const renderBtc = (item: BankInfoParam) => <View>
    <Text style={_styles.bank_user_name}>{'币种: ' + item.bankName}</Text>
    <Text style={_styles.bank_user_name}>{'钱包地址: ' + item.bankCard}</Text>
    {
      !anyEmpty(item.bankAddr) && <Text style={_styles.bank_user_name}>{'链名称: ' + item.bankAddr}</Text>
    }
  </View>

  /**
   * 绘制微信信息
   * @param item
   */
  const renderWx = (item: BankInfoParam) => <View>
    <Text style={_styles.bank_user_name}>{'真实姓名: ' + item.ownerName}</Text>
    <Text style={_styles.bank_user_name}>{'微信号: ' + item.bankCard}</Text>
    {
      !anyEmpty(item.bankAddr) && <Text style={_styles.bank_user_name}>{'绑定手机号: ' + item.bankAddr}</Text>
    }
  </View>

  /**
   * 绘制支付宝信息
   * @param item
   */
  const renderAli = (item: BankInfoParam) => <View>
    <Text style={_styles.bank_user_name}>{'真实姓名: ' + item.ownerName}</Text>
    <Text style={_styles.bank_user_name}>{'支付宝账户: ' + item.bankCard}</Text>
  </View>

  /**
   * 点击编辑
   */
  const clickEdit = () => {
    Alert.alert('提示',
      '请联系在线客服',
      [
        {
          text: '取消',
        },
        {
          text: '联系客服',
          onPress: () => {
            // Linking.openURL(systemStore?.zxkfUrl)
            PushHelper.openWebView(systemInfo?.zxkfUrl)
          },
        },
      ])
  }

  /**
   * 绑定姓名
   * @param text
   */
  const onSubmitFullName = (text?: string) => {
    ugLog('onSubmitFullName=', text)
    bindRealName(text, addNewAccount)
  }

  /**
   * 右边按钮添加新账户
   */
  let addNewAccount = () => {
    //是否实名过
    if (anyEmpty(userInfo?.fullName)) {
      needNameInputRef?.current?.reload()
    } else {
      push(PageName.AddBankComponent, {
        refreshBankList: () => {
          requestManageBankData(null)
        },
        bankCardData: bankCardData,
      })
    }
  }

  const rightButton = <TouchableWithoutFeedback onPress={addNewAccount}>
    <Text style={_styles.right_button}>新增</Text>
  </TouchableWithoutFeedback>

  return (
    <BaseScreen style={_styles.container}
                screenName={'我的提款账户'}
                rightButton={rightButton}>
      {
        [
          anyEmpty(categoryData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <ScrollableTabView
              tabBarUnderlineStyle={_styles.tab_bar_underline}
              tabBarActiveTextColor={Skin1.themeColor}
              tabBarInactiveTextColor={Skin1.textColor1}
              tabBarTextStyle={{ fontSize: scale(22) }}
              style={[{ flex: 1 }]}
              renderTabBar={() => <DefaultTabBar style={_styles.tab_bar}/>}>
              {
                categoryData?.map((tabItem, index) => {
                    return (
                      anyEmpty(tabItem?.data)
                        ? <EmptyView tabLabel={tabItem.name}
                                     text={'空空如也\n点击右上角“新增”添加提款账户吧'}
                                     style={{ flex: 1 }}/>
                        : <FlatList tabLabel={tabItem.name}
                                    refreshControl={refreshCT}
                                    keyExtractor={(item, index) => `${item}-${index}`}
                                    data={tabItem.data}
                                    renderItem={({ item, index }) => {
                                      // ugLog('ITEM=', item)
                                      let bankIcon = getBankIcon(item.type)
                                      return (
                                        <View style={_styles.item_container}>
                                          <View style={_styles.item_content}>
                                            <View style={_styles.bank_name_container}>
                                              <FastImage source={bankIcon}
                                                         resizeMode={'contain'}
                                                         style={_styles.bank_name_icon}/>
                                              <Text style={_styles.bank_name}>{item.bankName}</Text>
                                              <TouchableWithoutFeedback onPress={clickEdit}>
                                                <FastImage source={{ uri: Res.edit }}
                                                           style={_styles.bank_name_edit}/>
                                              </TouchableWithoutFeedback>
                                            </View>
                                            {
                                              [
                                                item.type == BankConst.BANK && renderBank(item),
                                                item.type == BankConst.BTC && renderBtc(item),
                                                item.type == BankConst.WX && renderWx(item),
                                                item.type == BankConst.ALI && renderAli(item),
                                              ]
                                            }
                                          </View>
                                        </View>
                                      )
                                    }}/>
                    )
                  },
                )
              }
            </ScrollableTabView>,
          <NeedNameInputComponent ref={needNameInputRef} onSubmitFullName={onSubmitFullName}/>,
        ]
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
  right_button: {
    color: 'white',
    fontSize: scale(20),
    padding: scale(8),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default ManageBankListComponent
