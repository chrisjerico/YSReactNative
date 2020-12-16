import { Alert, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useRef, useState } from 'react'
import { BaseScreen } from '../../../../../pages/乐橙/component/BaseScreen'
import { anyEmpty } from '../../../../tools/Ext'
import { scale } from '../../../../tools/Scale'
import { Skin1 } from '../../../../theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import { ugLog } from '../../../../tools/UgLog'
import { UGColor } from '../../../../theme/UGThemeColor'
import { Res } from '../../../../../Res/icon/Res'
import { push } from '../../../../navigation/RootNavigation'
import { PageName } from '../../../../navigation/Navigation'
import PushHelper from '../../../../define/PushHelper'
import UseDepositRecordList from './UseDepositRecordList'
import EmptyView from '../../../view/empty/EmptyView'

/**
 * 存款记录
 * @param navigation
 * @constructor
 */
const DepositListComponent = ({ navigation, setProps }) => {

  const needNameInputRef = useRef(null)
  const [tabIndex, setTabIndex] = useState<number>(0)

  const {
    refreshCT,
    depositData,
    requestDepositData,
  } = UseDepositRecordList()

  // /**
  //  * 绘制银行信息
  //  * @param item
  //  */
  // const renderBank = (item: BankInfoParam) => <View>
  //   <Text style={_styles.bank_user_name}>{'开户姓名: ' + item.ownerName}</Text>
  //   <Text style={_styles.bank_user_name}>{'银行账户: ' + item.bankCard}</Text>
  //   <Text style={_styles.bank_user_name}>{'开卡地址: ' + item.bankAddr}</Text>
  // </View>
  //
  // /**
  //  * 绘制虚拟币信息
  //  * @param item
  //  */
  // const renderBtc = (item: BankInfoParam) => <View>
  //   <Text style={_styles.bank_user_name}>{'币种: ' + item.bankName}</Text>
  //   <Text style={_styles.bank_user_name}>{'钱包地址: ' + item.bankCard}</Text>
  //   {
  //     !anyEmpty(item.bankAddr) && <Text style={_styles.bank_user_name}>{'链名称: ' + item.bankAddr}</Text>
  //   }
  // </View>
  //
  // /**
  //  * 绘制微信信息
  //  * @param item
  //  */
  // const renderWx = (item: BankInfoParam) => <View>
  //   <Text style={_styles.bank_user_name}>{'真实姓名: ' + item.ownerName}</Text>
  //   <Text style={_styles.bank_user_name}>{'微信号: ' + item.bankCard}</Text>
  //   {
  //     !anyEmpty(item.bankAddr) && <Text style={_styles.bank_user_name}>{'绑定手机号: ' + item.bankAddr}</Text>
  //   }
  // </View>
  //
  // /**
  //  * 绘制支付宝信息
  //  * @param item
  //  */
  // const renderAli = (item: BankInfoParam) => <View>
  //   <Text style={_styles.bank_user_name}>{'真实姓名: ' + item.ownerName}</Text>
  //   <Text style={_styles.bank_user_name}>{'支付宝账户: ' + item.bankCard}</Text>
  // </View>
  //
  // /**
  //  * 点击编辑
  //  */
  // const clickEdit = () => {
  //   Alert.alert('提示',
  //     '请联系在线客服',
  //     [
  //       {
  //         text: '取消',
  //       },
  //       {
  //         text: '联系客服',
  //         onPress: () => {
  //           // Linking.openURL(systemStore?.zxkfUrl)
  //           PushHelper.openWebView(systemInfo?.zxkfUrl)
  //         },
  //       },
  //     ])
  // }
  //
  // /**
  //  * 绑定姓名
  //  * @param text
  //  */
  // const onSubmitFullName = (text?: string) => {
  //   ugLog('onSubmitFullName=', text)
  //   bindRealName(text, addNewAccount)
  // }
  //
  // /**
  //  * 右边按钮添加新账户
  //  */
  // let addNewAccount = () => {
  //   //是否实名过
  //   if (anyEmpty(userInfo?.fullName)) {
  //     needNameInputRef?.current?.reload()
  //   } else {
  //     push(PageName.AddBankComponent, {
  //       refreshBankList: () => {
  //         requestManageBankData(null)
  //       },
  //       bankCardData: bankCardData,
  //     })
  //   }
  // }

  return (
    <BaseScreen style={_styles.container}
                screenName={'我的提款账户'}>
      {
        [
          anyEmpty(depositData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList refreshControl={refreshCT}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        data={depositData?.list}
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
                        }}/>,
        ]
      }
    </BaseScreen>
  )
}

// export const TAB_ITEM_WIDTH = scale(96) //tab宽度
export const TAB_ITEM_HEIGHT = scale(70) //tab高度

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

export default DepositListComponent
