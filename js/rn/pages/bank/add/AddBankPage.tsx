import {
  Dimensions, FlatList,
  Image,
  Platform, RefreshControl,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { chunkArray } from '../../../public/tools/ChunkArr'
import { getTrendData } from '../../../public/utils/getTrendData'
import { TrendData } from '../../../public/interface/trendData'
import Svg, { Line } from 'react-native-svg'
import APIRouter from '../../../public/network/APIRouter'
import { ChooseGameModal } from '../../../public/components/ChooseGameModal'
import PushHelper from '../../../public/define/PushHelper'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP'
import { getGameList } from '../../../public/utils/getGameList'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { LEFThemeColor } from '../../../public/theme/colors/LEFThemeColor'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import {
  AllAccountListData,
  BankInfoParam,
  ManageBankCardData,
  ManageBankCardModel,
} from '../../../public/network/Model/bank/ManageBankCardModel'
import UseAddBank from './UseAddBank'
import { ugLog } from '../../../public/tools/UgLog'
import { UGColor, UGThemeColor } from '../../../public/theme/UGThemeColor'
import { Res } from '../../../Res/icon/Res'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import UGDropDownPicker from './view/UGDropdownPicker'
import { BankConst } from '../const/BankConst'
import Button from '../../../public/views/tars/Button'
import { getBankIcon } from '../list/UseManageBankList'
import { BankDetailListData } from '../../../public/network/Model/bank/BankDetailListModel'
import { Toast } from '../../../public/tools/ToastUtils'
import { pop } from '../../../public/navigation/RootNavigation'

interface IRouteParams {
  refreshBankList?: (accountType: string) => any, //刷新账户列表方法
  bankCardData?: ManageBankCardData, //当前的账户数据
  selectType?: number, //当前选中的是哪个条目
}

/**
 * 添加银行卡管理
 * @param navigation
 * @constructor
 */
const AddBankPage = ({ navigation, route }) => {

  const [loginPwd, setLoginPwd] = useState(null) //登录密码
  const [fundPwd, setFundPwd] = useState(null) //取款密码
  const [fundPwd2, setFundPwd2] = useState(null) //取款密码
  const [bankAddr, setBankAddr] = useState(null)//请输入您的银行卡开户地址
  const [bankNumber, setBankNumber] = useState(null) //请输入您的银行卡卡号
  const [bankPassword, setBankPassword] = useState(null) //请输入您的提款密码
  const [btcAddr, setBtcAddr] = useState(null) //请输入您的虚拟币收款钱包地址
  const [wxAccount, setWxAccount] = useState(null) //请输入微信号
  const [wxPhone, setWxPhone] = useState(null) //请输入微信所绑定手机号
  const [aliAccount, setAliAccount] = useState(null) //请输入您的支付宝账号
  const [curAccountType, setCurAccountType] = useState(null) //选择了银行、微信、支付宝、虚拟币
  const [curBankID, setCurBankID] = useState(null) //选择了哪个银行
  const [curBtcID, setCurBtcID] = useState(null) //选择了哪个虚拟币
  const [curChainValue, setCurChainValue] = useState(null) //选择了哪个链

  const [accountItems, setAccountItems] = useState(null) //账户有哪些
  const [chainDetailItems, setChainDetailItems] = useState(null) //链有哪些

  let bankController //银行选择
  let btcController //币种选择
  let chainController //链选择

  /**
   * refreshBankList: 刷新银行卡列表
   * bankCardData: 银行卡数据
   */
  const { refreshBankList, bankCardData, selectType }: IRouteParams = route?.params

  const {
    userInfo,
    systemInfo,
    bankDetailData,
    btcDetailData,
    bankDetailItems,
    btcDetailItems,
    requestBankDetailData,
    addBankAccount,
    bindPassword,
  } = UseAddBank()

  /**
   * 账户列表
   */
  let bankList = bankCardData?.allAccountList
  useEffect(() => {
    let accountTypes = bankList.filter((item) =>
      arrayLength(item.data) < Number(item.number) || Number(item.number) == 0).map(
      (item, index) =>
        ({
          label: item.name, value: item.type, icon: () => <FastImage source={getBankIcon(item.type.toString())}
                                                                     resizeMode={'contain'}
                                                                     style={_styles.bank_name_icon}/>,
        }))
    if (anyEmpty(accountTypes)) {
      Toast('不能添加更多账户')
      pop()
    } else {
      !anyEmpty(bankList) && setAccountItems(accountTypes)
      !anyEmpty(bankList) && setCurAccountType(selectType > 0 ? selectType : accountTypes[0].value)
    }
  }, [])

  /**
   * 监听银行数据变动
   */
  useEffect(() => {
    !anyEmpty(bankDetailItems) && setCurBankID(bankDetailItems[0].value)
  }, [bankDetailItems])

  /**
   * 监听虚拟币数据变动
   */
  useEffect(() => {
    !anyEmpty(btcDetailItems) && setCurBtcID(btcDetailItems[0].value)
  }, [btcDetailItems])

  /**
   * 监听虚拟币数据变动，可能改变链内容
   */
  useEffect(() => {
    if (curBtcID > 0) {
      let btcInfo: BankDetailListData = btcDetailData?.data.find((item) => item.id == curBtcID)
      let homeStr = btcInfo.home
      if (!anyEmpty(homeStr)) {
        let chainItems = homeStr?.split(',').map(
          (item, index) => ({ label: item, value: item }))
        setChainDetailItems(chainItems)
        setCurChainValue(chainItems[0].value)
      } else {
        setChainDetailItems(null)
        setCurChainValue(null)
      }

    } else {
      setCurChainValue(null)
    }
  }, [bankDetailData, curBtcID])

  /**
   * 绘制银行
   */
  const renderBank = () => <View style={_styles.item_bank_2nd_content}>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setBankAddr(text)}
                 placeholder={'请输入您的银行卡开户地址'}/>
    </View>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setBankNumber(text)}
                 placeholder={'请输入您的银行卡卡号'}/>
    </View>
    {
      systemInfo?.switchBindVerify == 1 && <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   onChangeText={text => setBankPassword(text)}
                   placeholder={'请输入提款密碼'}/>
      </View>
    }

  </View>

  /**
   * 绘制虚拟币
   */
  const renderBtc = () => <View style={_styles.item_bank_2nd_content}>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setBtcAddr(text)}
                 placeholder={'请输入您的虚拟币收款钱包地址'}/>
    </View>
  </View>

  /**
   * 绘制微信
   */
  const renderWx = () => <View style={_styles.item_bank_2nd_content_wx}>
    <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setWxAccount(text)}
                 placeholder={'请输入微信号'}/>
    </View>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setWxPhone(text)}
                 placeholder={'请输入微信所绑定手机号'}/>
    </View>
  </View>

  /**
   * 绘制支付宝
   */
  const renderAli = () => <View style={_styles.item_bank_2nd_content_wx}>
    <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
      <TextInput style={_styles.input_name}
                 onChangeText={text => setAliAccount(text)}
                 placeholder={'请输入您的支付宝账号'}/>
    </View>
  </View>

  /**
   * 绘制绑定密码
   */
  const renderBindPwd = () => <View style={_styles.item_pwd_container}>
    <View style={_styles.item_pwd_content}>
      <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
        <TextInput style={_styles.input_name}
                   secureTextEntry={true}
                   onChangeText={text => setLoginPwd(text)}
                   placeholder={'请输入当前登录密码'}/>
      </View>
      <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   maxLength={4}
                   secureTextEntry={true}
                   onChangeText={text => setFundPwd(text)}
                   placeholder={'请输入您的4位数字提款密码'}/>
      </View>
      <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   maxLength={4}
                   secureTextEntry={true}
                   onChangeText={text => setFundPwd2(text)}
                   placeholder={'请确认您的提款密码'}/>
      </View>
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              bindPassword({
                login_pwd: loginPwd,
                fund_pwd: fundPwd,
                fund_pwd2: fundPwd2,
                callBack: () => {
                  setLoginPwd(null)
                },
              })

            }}/>
  </View>

  return (
    <BaseScreen style={_styles.container} screenName={'绑定提款账户'}>
      {
        anyEmpty(userInfo?.hasFundPwd) ?
          renderBindPwd() ://先绑定密码
          (
            anyEmpty(bankList) ?
              <EmptyView style={{ flex: 1 }}/> : //没有数据
              <View style={_styles.item_bank_container}>
                {
                  !anyEmpty(curAccountType) && <UGDropDownPicker
                    items={accountItems}
                    defaultValue={curAccountType}
                    onOpen={() => {
                      bankController?.close()
                      btcController?.close()
                      chainController?.close()
                    }}
                    onChangeItem={item => {
                      setCurAccountType(item.value)
                    }
                    }/>
                }
                <View style={{ height: scale(32) }}/>
                {
                  [
                    // 绘制银行
                    curAccountType == BankConst.BANK && !anyEmpty(curBankID) && <UGDropDownPicker
                      items={bankDetailItems}
                      controller={instance => bankController = instance}
                      style={_styles.bank_picker}
                      defaultValue={curBankID}
                      onChangeItem={item => setCurBankID(item.value)}/>,
                    curAccountType == BankConst.BANK && renderBank(),

                    //绘制虚拟币
                    curAccountType == BankConst.BTC && !anyEmpty(curBtcID) && <UGDropDownPicker
                      items={btcDetailItems}
                      controller={instance => btcController = instance}
                      style={_styles.bank_picker}
                      defaultValue={curBtcID}
                      onOpen={() => {
                        chainController?.close()
                      }}
                      onChangeItem={item => {
                        setCurBtcID(item.value)
                      }}/>,
                    //绘制链
                    curAccountType == BankConst.BTC && !anyEmpty(curChainValue) && !anyEmpty(chainDetailItems) &&
                    <UGDropDownPicker
                      items={chainDetailItems}
                      controller={instance => chainController = instance}
                      style={_styles.bank_picker}
                      defaultValue={curChainValue}
                      onChangeItem={item => setCurChainValue(item.value)}/>,
                    curAccountType == BankConst.BTC && renderBtc(),

                    //绘制微信
                    curAccountType == BankConst.WX && renderWx(),
                    //绘制支付宝
                    curAccountType == BankConst.ALI && renderAli(),
                  ]
                }

                <Text style={_styles.real_name}>{'真实姓名：' + userInfo?.fullName}</Text>
                <Button title={'提交'}
                        titleStyle={_styles.submit_text}
                        containerStyle={[_styles.submit_bt,
                          { backgroundColor: Skin1.themeColor }]}
                        onPress={() => {
                          addBankAccount({
                            curAccountType,
                            curBankID,
                            curBtcID,
                            curChainValue,
                            bankAddr,
                            bankNumber,
                            bankPassword,
                            btcAddr,
                            wxAccount,
                            wxPhone,
                            aliAccount,
                            callBack: (accountType) => {
                              refreshBankList(accountType)
                            },
                          })

                        }}/>
              </View>

          )
      }
    </BaseScreen>
  )
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: UGColor.BackgroundColor1,
  },
  item_pwd_container: {
    padding: scale(32),
    flex: 1,
  },
  item_pwd_content: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    marginBottom: scale(64),
  },
  item_bank_container: {
    paddingHorizontal: scale(32),
    paddingTop: scale(32),
    flex: 1,
  },
  item_bank_2nd_content: {
    borderWidth: scale(1),
    borderTopWidth: 0,
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  item_bank_2nd_content_wx: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
  },
  bank_bank_name_2nd_container: {
    flexDirection: 'row',
    color: UGColor.TextColor1,
    alignItems: 'center',
    height: scale(70),
    borderTopWidth: scale(1),
    borderColor: UGColor.LineColor1,
  },
  bank_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(24),
    marginLeft: scale(16),
  },
  input_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(22),
    marginHorizontal: scale(16),
  },
  real_name: {
    color: UGColor.TextColor2,
    paddingVertical: scale(32),
    fontSize: scale(22),
  },
  right_icon: {
    marginRight: scale(16),
  },
  bank_picker: {
    backgroundColor: UGColor.BackgroundColor1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: '100%',
    height: scale(66),
    borderRadius: scale(8),
  },
  bank_name_icon: {
    width: scale(32),
    height: scale(32),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default AddBankPage
