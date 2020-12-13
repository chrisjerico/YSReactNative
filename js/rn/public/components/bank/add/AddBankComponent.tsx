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
import { chunkArray } from '../../../tools/ChunkArr'
import { getTrendData } from '../../../utils/getTrendData'
import { TrendData } from '../../../interface/trendData'
import Svg, { Line } from 'react-native-svg'
import APIRouter from '../../../network/APIRouter'
import { ChooseGameModal } from '../../ChooseGameModal'
import PushHelper from '../../../define/PushHelper'
import { BaseScreen } from '../../../../pages/乐橙/component/BaseScreen'
import { OCHelper } from '../../../define/OCHelper/OCHelper'
import { hideLoading, showLoading } from '../../../widget/UGLoadingCP'
import { getGameList } from '../../../utils/getGameList'
import { anyEmpty } from '../../../tools/Ext'
import { scale } from '../../../tools/Scale'
import { Skin1 } from '../../../theme/UGSkinManagers'
import { LEFThemeColor } from '../../../theme/colors/LEFThemeColor'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import { BankInfoParam, ManageBankCardData, ManageBankCardModel } from '../../../network/Model/act/ManageBankCardModel'
import UseAddBank from './UseAddBank'
import { ugLog } from '../../../tools/UgLog'
import { UGColor, UGThemeColor } from '../../../theme/UGThemeColor'
import { Res } from '../../../../Res/icon/Res'
import EmptyView from '../../view/empty/EmptyView'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import UGDropDownPicker from './view/UGDropdownPicker'
import { BankConst } from '../const/BankConst'
import Button from '../../../views/tars/Button'
import { getBankIcon } from '../list/UseManageBankList'

interface IRouteParams {
  refreshBankList?: () => any,
  bankCardData?: ManageBankCardData,
}

/**
 * 添加银行卡管理
 * @param navigation
 * @constructor
 */
const AddBankComponent = ({ navigation, route }) => {

  /**
   * 选择了银行、微信、支付宝、虚拟币
   */
  const [curAccountIndex, setCurAccountIndex] = useState(null)
  const [accountItems, setAccountItems] = useState(null)

  /**
   * 选择了哪个银行
   */
  const [curBankIndex, setCurBankIndex] = useState(null)

  /**
   * 选择了哪个虚拟币
   */
  const [curBtcIndex, setCurBtcIndex] = useState(null)

  let controller

  /**
   * refreshBankList: 刷新银行卡列表
   * bankCardData: 银行卡数据
   */
  const { refreshBankList, bankCardData }: IRouteParams = route?.params

  const {
    userInfo,
    bankDetailData,
    btcDetailData,
    bankDetailItems,
    btcDetailItems,
    requestBankDetailData,
  } = UseAddBank()

  /**
   * 银行列表
   */
  let bankList = bankCardData?.allAccountList
  useEffect(() => {
    let accountTypes = bankList.map(
      (item, index) =>
        ({
          label: item.name, value: item.type, icon: () => <FastImage source={getBankIcon(item.type.toString())}
                                                                     resizeMode={'contain'}
                                                                     style={_styles.bank_name_icon}/>,
        }))
    !anyEmpty(bankList) && setAccountItems(accountTypes)
    !anyEmpty(bankList) && setCurAccountIndex(accountTypes[0].value)
  }, [])

  /**
   * 监听银行数据变动
   */
  useEffect(() => {
    !anyEmpty(bankDetailItems) && setCurBankIndex(bankDetailItems[0].value)
  }, [bankDetailItems])

  /**
   * 监听虚拟币数据变动
   */
  useEffect(() => {
    !anyEmpty(btcDetailItems) && setCurBtcIndex(btcDetailItems[0].value)
  }, [btcDetailItems])

  /**
   * 绘制银行
   */
  const renderBank = () => <View style={_styles.item_bank_2nd_content}>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入您的银行卡开户地址'}/>
    </View>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入您的银行卡卡号'}/>
    </View>
  </View>

  /**
   * 绘制虚拟币
   */
  const renderBtc = () => <View style={_styles.item_bank_2nd_content}>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入您的收款钱包地址'}/>
    </View>
  </View>

  /**
   * 绘制微信
   */
  const renderWx = () => <View style={_styles.item_bank_2nd_content_wx}>
    <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入微信号'}/>
    </View>
    <View style={_styles.bank_bank_name_2nd_container}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入微信所绑定手机号'}/>
    </View>
  </View>

  /**
   * 绘制支付宝
   */
  const renderAli = () => <View style={_styles.item_bank_2nd_content_wx}>
    <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
      <TextInput style={_styles.input_name}
                 placeholder={'请输入您的支付宝账号'}/>
    </View>
  </View>

  return (
    <BaseScreen style={_styles.container} screenName={'绑定提款账户'}>
      {
        anyEmpty(bankList) ?
          <EmptyView style={{ flex: 1 }}/> :
          <View style={_styles.item_bank_container}>
            {
              !anyEmpty(curAccountIndex) && <UGDropDownPicker
                items={accountItems}
                // controller={instance => controller = instance}
                defaultValue={curAccountIndex}
                onChangeItem={item => setCurAccountIndex(item.value)}/>
            }
            <View style={{ height: scale(32) }}/>
            {
              [
                // 绘制银行
                curAccountIndex == BankConst.BANK && !anyEmpty(curBankIndex) && <UGDropDownPicker
                  items={bankDetailItems}
                  // controller={instance => controller = instance}
                  style={_styles.bank_picker}
                  defaultValue={curBankIndex}
                  onChangeItem={item => setCurBankIndex(item.value)}/>,
                curAccountIndex == BankConst.BANK && renderBank(),

                //绘制虚拟币
                curAccountIndex == BankConst.BTC && !anyEmpty(curBtcIndex) && <UGDropDownPicker
                  items={btcDetailItems}
                  // controller={instance => controller = instance}
                  style={_styles.bank_picker}
                  defaultValue={curBtcIndex}
                  onChangeItem={item => setCurBtcIndex(item.value)}/>,
                curAccountIndex == BankConst.BTC && renderBtc(),

                //绘制微信
                curAccountIndex == BankConst.WX && renderWx(),
                //绘制支付宝
                curAccountIndex == BankConst.ALI && renderAli(),
              ]
            }

            <Text style={_styles.real_name}>{'真实姓名：' + userInfo?.fullName}</Text>
            <Button title={'提交'}
                    titleStyle={_styles.submit_text}
                    containerStyle={_styles.submit_bt}
                    onPress={() => {

                    }}/>
          </View>
      }
    </BaseScreen>
  )
}

// export const TAB_ITEM_WIDTH = scale(96) //tab宽度
export const TAB_ITEM_HEIGHT = scale(60) //tab高度

const _styles = StyleSheet.create({
  container: {},
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
    marginLeft: scale(16),
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
    backgroundColor: Skin1.themeColor,
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

export default AddBankComponent
