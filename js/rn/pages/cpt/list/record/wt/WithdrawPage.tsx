import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import CapitalContext from '../../CapitalContext'
import UseWithdraw from './UseWithdraw'
import { BankInfoParam, ManageBankCardData } from '../../../../../public/network/Model/bank/ManageBankCardModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import Button from '../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../../public/tools/Scale'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import UGDropDownPicker from '../../../../bank/add/view/UGDropdownPicker'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import { getBankIcon } from '../../../../bank/list/UseManageBankList'
import { ugLog } from '../../../../../public/tools/UgLog'
import RightMenu from '../../../../../public/components/menu/RightMenu'
import MiddleMenu, { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'
import PushHelper from '../../../../../public/define/PushHelper'
import { UGUserCenterType } from '../../../../../redux/model/全局/UGSysConfModel'
import CommStyles from '../../../../base/CommStyles'
import { Input } from 'react-native-elements'

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
const WithdrawPage = ({ navigation, route }) => {

  const { getYueBaoInfo } = useContext(CapitalContext) //余额宝信息
  const [tabIndex, setTabIndex] = useState<number>(0) //当前是哪个Tab
  const [withdrawType, setWithdrawType] = useState(0) //当前 余额取款 0 还是 余额宝取款 1
  const [amount, setAmount] = useState(null) //取款金额
  const [bankPassword, setBankPassword] = useState(null) //请输入您的提款密码
  const [curBank, setCurBank] = useState<IMiddleMenuItem>(null) //选择了银行、微信、支付宝、虚拟币里面的哪个
  const [bankItems, setBankItems] = useState(null) //选择银行卡有哪些
  const refMenu = useRef(null)


  const {
    userInfo,
    systemInfo,
    bankCardData,
  } = UseWithdraw()

  //重新组合银行选择数据
  useEffect(() => {
    let bankItems = []
    bankCardData?.allAccountList?.map(
      (bkItem, index) =>
        bkItem?.data?.map((item) => {
          item.parentTypeName = bkItem?.name
          return (
            ({
              title: `${bkItem.name} (${item.bankName}, ${item.ownerName})`,
              subTitle: `${item.bankCard}`,
              id: `${bkItem.name} (${item.bankName}, ${item.bankCard}, ${item.ownerName})`,
              icon: getBankIcon(item.type.toString())?.uri,
            })
          )
        }),
    ).map((item) =>
      bankItems = [...bankItems, ...item],
    )
    // ugLog('bankItems=', bankItems)
    if (!anyEmpty(bankItems)) {
      setCurBank(bankItems[0])
      // refMenu?.current?.toggleMenu()
    }


    setBankItems(bankItems)

    setWithdrawType(0)

  }, [bankCardData])

  /**
   * 底部按钮
   */
  const renderSwitchButton = () => <View>
    <View style={_styles.forget_pwd_container}>
      <TouchableOpacity>
        <Text style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'忘记取款密码?'}</Text>
      </TouchableOpacity>
    </View>
    <View style={_styles.forget_pwd_container}><TouchableOpacity onPress={() => setWithdrawType(0)}>
      <Text style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'切换到余额取款'}</Text>
    </TouchableOpacity>
    </View>
  </View>

  /**
   * 绘制取款到余额
   */
  const renderToYuE = () => <View style={_styles.item_pwd_container}>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 keyboardType={'numeric'}
                 onChangeText={text => setAmount(text)}
                 placeholder={'请填写取款金额'}/>
    </View>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 maxLength={4}
                 secureTextEntry={true}
                 onChangeText={text => setBankPassword(text)}
                 placeholder={'请填写取款密码'}/>
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              // bindPassword({
              //   login_pwd: loginPwd,
              //   fund_pwd: fundPwd,
              //   fund_pwd2: fundPwd2,
              //   callBack: () => {
              //     setLoginPwd(null)
              //   },
              // })

            }}/>

    {
      renderSwitchButton()
    }
  </View>

  /**
   * 绘制取款到余额宝银行卡
   */
  const renderToYuEBank = () => <View style={_styles.item_pwd_container}>

    <TouchableOpacity onPress={() => {
      refMenu?.current?.toggleMenu()
    }}>
      <View style={_styles.input_container}>
        <Text style={_styles.input_name}>
          {
            curBank?.id
          }
        </Text>
      </View>
    </TouchableOpacity>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 keyboardType={'numeric'}
                 onChangeText={text => setAmount(text)}
                 placeholder={'请填写取款金额'}/>
    </View>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 maxLength={4}
                 secureTextEntry={true}
                 onChangeText={text => setBankPassword(text)}
                 placeholder={'请填写取款密码'}/>
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              // bindPassword({
              //   login_pwd: loginPwd,
              //   fund_pwd: fundPwd,
              //   fund_pwd2: fundPwd2,
              //   callBack: () => {
              //     setLoginPwd(null)
              //   },
              // })

            }}/>

    {
      renderSwitchButton()
    }
  </View>

  /**
   * 点击菜单
   * @param index
   */
  const clickMenu = (index: number, item: IMiddleMenuItem) => {
    refMenu?.current?.toggleMenu()
    setCurBank(item)
    // switch (index) {
    //   case 0:
    //     PushHelper.pushUserCenterType(UGUserCenterType.即时注单)
    //     break
    //   case 1:
    //     PushHelper.pushUserCenterType(UGUserCenterType.彩票注单记录)
    //     break
    //   case 2:
    //     PushHelper.pushUserCenterType(UGUserCenterType.开奖结果)
    //     break
    //   case 3:
    //     PushHelper.pushUserCenterType(UGUserCenterType.取款)
    //     break
    // }
  }

  /**
   * 绘制取款到银行卡
   */
  const renderToBank = () => <View style={_styles.item_pwd_container}>

    <TouchableOpacity onPress={() => {
      refMenu?.current?.toggleMenu()
    }}>
      <View style={_styles.input_container}>
        <Text style={_styles.input_name}>
          {
            curBank?.id
          }
        </Text>
      </View>
    </TouchableOpacity>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 keyboardType={'numeric'}
                 onChangeText={text => setAmount(text)}
                 placeholder={'请填写取款金额'}/>
    </View>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 maxLength={4}
                 secureTextEntry={true}
                 onChangeText={text => setBankPassword(text)}
                 placeholder={'请填写取款密码'}/>
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              // bindPassword({
              //   login_pwd: loginPwd,
              //   fund_pwd: fundPwd,
              //   fund_pwd2: fundPwd2,
              //   callBack: () => {
              //     setLoginPwd(null)
              //   },
              // })

            }}/>

    <View style={_styles.forget_pwd_container}>
      <TouchableOpacity>
        <Text style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'忘记取款密码?'}</Text>
      </TouchableOpacity>
    </View>
    {
      userInfo?.yuebaoSwitch &&
      <View style={_styles.forget_pwd_container}><TouchableOpacity onPress={() => setWithdrawType(1)}>
        <Text style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'切换到' + systemInfo?.yuebaoName + '取款'}</Text>
      </TouchableOpacity>
      </View>
    }
  </View>

  /**
   * 绘制取款条目
   */
  const renderItem = () => {
    return withdrawType == 0 ?
      renderToBank() :
      <View>
        <View style={_styles.sub_tab_container}>
          <TouchableOpacity onPress={() => setTabIndex(0)}>
            <View
              style={[_styles.sub_tab_item,
                { borderBottomColor: tabIndex == 0 ? Skin1.themeColor : 'transparent' }]}>
              <Text
                style={[_styles.sub_tab_text,
                  { color: tabIndex == 0 ? Skin1.themeColor : UGColor.TextColor3 }]}>{tabMenus[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabIndex(1)}>
            <View
              style={[_styles.sub_tab_item,
                { borderBottomColor: tabIndex == 1 ? Skin1.themeColor : 'transparent' }]}>
              <Text
                style={[_styles.sub_tab_text,
                  { color: tabIndex == 1 ? Skin1.themeColor : UGColor.TextColor3 }]}>{tabMenus[1]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          tabIndex == 0 ? renderToYuEBank() : renderToYuE()
        }
      </View>
  }

  return (
    <View style={_styles.container}>
      {
        getYueBaoInfo == null ?
          <EmptyView style={{ flex: 1 }}/> :
          renderItem()
      }

      <MiddleMenu ref={refMenu}
                  onMenuClick={clickMenu}
                  menu={bankItems}/>
    </View>
  )
}

const tabMenus = ['取款到银行卡', '取款到余额'] //TAB菜单
const _styles = StyleSheet.create({
  container: {
    backgroundColor: UGColor.BackgroundColor1,
  },
  item_pwd_container: {
    padding: scale(32),
  },
  input_container: {
    height: scale(70),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    marginBottom: scale(16),
    justifyContent: 'center',
  },
  input_name: {
    color: UGColor.TextColor1,
    fontSize: scale(22),
    marginHorizontal: scale(16),
  },
  forget_pwd_container: {
    height: scale(44),
  },
  forget_pwd: {
    paddingVertical: scale(32),
    fontSize: scale(22),
  },
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: '100%',
    height: scale(66),
    borderRadius: scale(8),
    marginTop: scale(32),
  },
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  sub_tab_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_tab_item: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(32),
    borderBottomWidth: scale(2),
  },
  sub_tab_text: {
    fontSize: scale(20),
  },


})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default WithdrawPage
