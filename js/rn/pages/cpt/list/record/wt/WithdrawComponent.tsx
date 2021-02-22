import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import CapitalContext from '../../CapitalContext'
import UseWithdraw from './UseWithdraw'
import { anyEmpty } from '../../../../../public/tools/Ext'
import Button from '../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../../public/tools/Scale'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import MiddleMenu, { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'
import { BankConst } from '../../../../bank/const/BankConst'
import { CapitalConst } from '../../../const/CapitalConst'
import { push } from '../../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../../public/navigation/Navigation'
import Icon from 'react-native-vector-icons/Entypo'
import NeedNameInputComponent from '../../../../../public/components/tars/NeedNameInputComponent'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

/**
 * 提现界面
 * @param navigation
 * @constructor
 */
const WithdrawComponent = ({ navigation, route }) => {

  const needNameInputRef = useRef(null)
  const { getYueBaoInfo, refreshTabPage } = useContext(CapitalContext) //余额宝信息
  const [tabIndex, setTabIndex] = useState<number>(0) //当前是哪个Tab
  const refMenu = useRef(null)

  const {
    userInfo,
    systemInfo,
    bankCardData,
    bankInfoParamList,
    menuItem,
    curBank,
    setCurBank,
    withdrawType,
    setWithdrawType,
    newUsd,
    btcMoney,
    inputMoney,
    setInputMoney,
    bankPassword,
    setBankPassword,
    showAddBank,
    requestManageBankData,
    confirmWithdraw,
    yuebaoWithdraw,
    yueBao2YuE,
    bindRealName,
  } = UseWithdraw()

  useEffect(() => {
    if (!anyEmpty(bankInfoParamList)) {
      setCurBank(bankInfoParamList[0])
      // refMenu?.current?.toggleMenu()
    }

  }, [bankInfoParamList])

  /**
   * 底部按钮
   */
  const renderSwitchButton = () => <View>
    <View style={_styles.pwd_top_space}/>
    {
      systemInfo?.switchCoinPwd == '1' && <View style={_styles.forget_pwd_container}>
        <TouchableOpacity onPress={() => push(PageName.ForgetPasswordPage, {})}>
          <UGText style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'忘记取款密码?'}</UGText>
        </TouchableOpacity>
      </View>
    }
    {
      systemInfo?.switchBalanceChannel == '1' && <View style={_styles.forget_pwd_container}>
        <TouchableOpacity onPress={() => setWithdrawType(0)}>
          <UGText style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'切换到余额取款'}</UGText>
        </TouchableOpacity>
      </View>
    }
  </View>

  /**
   * 利息宝绘制取款到余额
   */
  const renderToYueBao = () => <View style={_styles.item_pwd_container}>
    <View style={_styles.input_container}>
      <TextInput style={_styles.input_name}
                 keyboardType={'numeric'}
                 onChangeText={text => setInputMoney(text)}
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
              yueBao2YuE().then(res => {
                if (res == 0) {
                  refreshTabPage(null)
                }
              })
            }}/>

    {
      renderSwitchButton()
    }
  </View>

  /**
   * 绘制绑定卡
   */
  const renderBind = () => {
    return <TouchableOpacity onPress={() => {
      push(PageName.AddBankPage, {
        refreshBankList: (accountType: string) => {
          requestManageBankData()
        },
        bankCardData: bankCardData,
        selectType: Number(curBank?.type),
      })
    }}>
      <View style={[_styles.bind_bt, { borderColor: Skin1.themeColor }]}>
        <Icon size={scale(36)}
              color={Skin1.themeColor}
              name={'plus'}/>
        <UGText style={[_styles.bind_text, { color: Skin1.themeColor }]}>
          {
            `绑定${curBank?.parentTypeName}`
          }
        </UGText>
      </View>
    </TouchableOpacity>

  }

  function bankLabel() {
    // `= ${btcMoney} ${curBank?.bankCode},    1 ${curBank?.bankCode} = ${newUsd} CNY`
    let a: string
    let b: string
    if (anyEmpty(btcMoney) || isNaN(btcMoney)) {
      a = '= 0 ' + curBank?.bankCode
    } else {
      a = '= ' + btcMoney + ' ' + curBank?.bankCode
    }
    if (anyEmpty(newUsd) || isNaN(newUsd)) {
      b = ',   1 ' + curBank?.bankCode + ' = 0' + ' CNY'
    } else {
      b = ',   1 ' + curBank?.bankCode + ' = ' + newUsd + ' CNY'
    }
    return a + ' ' + b

  }

  /**
   * 利息宝绘制输入金额和密码
   */
  const renderYueBaoInputAmount = () => {
    //找出当前是银行卡还是支付宝等等
    let tipsItem = bankCardData?.allAccountList?.find((item) => item?.type?.toString() == curBank?.type)

    return <View>
      <View style={_styles.input_container}>
        <TextInput style={_styles.input_name}
                   keyboardType={'numeric'}
                   onChangeText={text => setInputMoney(text)}
                   placeholder={'请填写取款金额'}/>
      </View>
      {
        curBank?.type != BankConst.BTC ?
          null :
          <UGText style={_styles.btc_hint}>{
            bankLabel()
          }</UGText>
      }
      <UGText style={_styles.max_hint}>{tipsItem && `单笔下限${Number(tipsItem?.minWithdrawMoney)}, 单笔上限${
        Number(tipsItem?.maxWithdrawMoney) <= 0 ? '不限' : Number(tipsItem?.maxWithdrawMoney)
      }`}</UGText>
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
                yuebaoWithdraw().then(res => {
                  if (res == 0) {
                    refreshTabPage(CapitalConst.WITHDRAWAL_RECORD)
                  }
                })
              }}/>
    </View>
  }

  /**
   * 绘制取款到余额宝银行卡
   */
  const renderToYueBaoBank = () => {

    return <View style={_styles.item_pwd_container}>

      <TouchableOpacity onPress={() => {
        refMenu?.current?.toggleMenu()
      }}>
        <View style={_styles.input_container}>
          <UGText style={_styles.input_name}>
            {
              curBank != null &&
              `${curBank?.parentTypeName} (${curBank?.bankName}, ${curBank?.bankCard}, ${curBank?.ownerName})`
            }
          </UGText>
        </View>
      </TouchableOpacity>
      {
        curBank?.notBind ?
          renderBind() :
          renderYueBaoInputAmount()
      }

      {
        renderSwitchButton()
      }
    </View>
  }

  /**
   * 点击菜单
   * @param index
   */
  const clickMenu = (index: number, item: IMiddleMenuItem) => {
    refMenu?.current?.toggleMenu()
    setCurBank(bankInfoParamList[index])
  }

  /**
   * 绘制输入金额和密码
   */
  const renderInputAmount = () => {
    //找出当前是银行卡还是支付宝等等
    let tipsItem = bankCardData?.allAccountList?.find((item) => item?.type?.toString() == curBank?.type)

    return <View>
      <View style={_styles.input_container}>
        <TextInput style={_styles.input_name}
                   keyboardType={'numeric'}
                   onChangeText={text => setInputMoney(text)}
                   placeholder={'请填写取款金额'}/>
      </View>
      {
        curBank?.type != BankConst.BTC ?
          null :
          <UGText style={_styles.btc_hint}>{
            // `= ${btcMoney} ${curBank?.bankCode},    1 ${curBank?.bankCode} = ${newUsd} CNY`
            bankLabel()
          }</UGText>
      }
      <UGText style={_styles.max_hint}>{tipsItem && `单笔下限${Number(tipsItem?.minWithdrawMoney)}, 单笔上限${
        Number(tipsItem?.maxWithdrawMoney) <= 0 ? '不限' : Number(tipsItem?.maxWithdrawMoney)
      }`}</UGText>
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
                confirmWithdraw().then(res => {
                  if (res == 0) {
                    refreshTabPage(CapitalConst.WITHDRAWAL_RECORD)
                  }
                })
              }}/>
    </View>
  }

  /**
   * 绘制取款到银行卡
   */
  const renderToBank = () => {

    return <View style={_styles.item_pwd_container}>

      <TouchableOpacity onPress={() => {
        refMenu?.current?.toggleMenu()
      }}>
        <View style={_styles.input_container}>
          <UGText style={_styles.input_name}>
            {
              curBank && `${curBank?.parentTypeName} (${curBank?.bankName}, ${curBank?.bankCard}, ${curBank?.ownerName})`
            }
          </UGText>
        </View>
      </TouchableOpacity>
      {
        curBank?.notBind ?
          renderBind() :
          renderInputAmount()
      }

      <View style={_styles.pwd_top_space}/>

      {
        systemInfo?.switchCoinPwd == '1' && <View style={_styles.forget_pwd_container}>
          <TouchableOpacity onPress={() => push(PageName.ForgetPasswordPage, {})}>
            <UGText style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{'忘记取款密码?'}</UGText>
          </TouchableOpacity>
        </View>
      }
      {
        systemInfo?.switchYuebaoChannel == '1' &&
        <View style={_styles.forget_pwd_container}>
          <TouchableOpacity onPress={() => setWithdrawType(1)}>
            <UGText style={[_styles.forget_pwd, { color: Skin1.themeColor }]}>{
              '切换到' + systemInfo?.yuebaoName + '取款'
            }</UGText>
          </TouchableOpacity>
        </View>
      }
    </View>
  }

  /**
   * 绘制TAB
   */
  const renderTab = () => <View style={_styles.sub_tab_container}>
    <TouchableOpacity onPress={() => setTabIndex(0)}>
      <View
        style={[_styles.sub_tab_item,
          { borderBottomColor: tabIndex == 0 ? Skin1.themeColor : 'transparent' }]}>
        <UGText
          style={[_styles.sub_tab_text,
            { color: tabIndex == 0 ? Skin1.themeColor : UGColor.TextColor3 }]}>{tabMenus[0]}</UGText>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setTabIndex(1)}>
      <View
        style={[_styles.sub_tab_item,
          { borderBottomColor: tabIndex == 1 ? Skin1.themeColor : 'transparent' }]}>
        <UGText
          style={[_styles.sub_tab_text,
            { color: tabIndex == 1 ? Skin1.themeColor : UGColor.TextColor3 }]}>{tabMenus[1]}</UGText>
      </View>
    </TouchableOpacity>
  </View>

  /**
   * 绘制取款条目
   */
  const renderItem = () => {
    if (anyEmpty(userInfo?.fullName)) {//没有实名
      return <EmptyView style={{ flex: 1 }}
                        text={'您还没有完善个人信息'}
                        buttonText={'完善个人信息'}
                        buttonCallback={() => {
                          needNameInputRef?.current?.reload()
                        }}/>
    } else if (!userInfo?.hasFundPwd) {//判断有没有资金密码
      return <EmptyView style={{ flex: 1 }}
                        text={'您还未设置资金密码'}
                        buttonText={'设置资金密码'}
                        buttonCallback={() => {
                          push(PageName.SetPasswordPage, {})
                        }}/>
    } else if (showAddBank) {
      return <EmptyView style={{ flex: 1 }}
                        text={'您还未绑定提款账户'}
                        buttonText={'添加提款账户'}
                        buttonCallback={() => {
                          push(PageName.AddBankPage, {
                            refreshBankList: (accountType: string) => { //添加成功
                              requestManageBankData()
                            },
                            bankCardData: bankCardData,
                            selectType: 0,
                          })
                        }}/>
    }
    if (systemInfo?.switchBalanceChannel == '1' && systemInfo?.switchYuebaoChannel != '1') {//只开启了余额
      return renderToBank()
    } else if (systemInfo?.switchBalanceChannel != '1' && systemInfo?.switchYuebaoChannel == '1') {//只开启了利息宝付款
      return (
        <View>
          {renderTab()}
          {tabIndex == 0 ? renderToYueBaoBank() : renderToYueBao()}
        </View>
      )
    }

    return withdrawType == 0 ?
      renderToBank() :
      <View>
        {renderTab()}
        {tabIndex == 0 ? renderToYueBaoBank() : renderToYueBao()}
      </View>
  }

  /**
   * 绘制内容
   */
  const renderContent = () => {
    if (systemInfo?.switchBalanceChannel != '1' && systemInfo?.switchYuebaoChannel != '1') {
      return <EmptyView style={{ flex: 1 }} text={'该功能暂时关闭'}/>
    }

    return (getYueBaoInfo() == null ? <EmptyView style={{ flex: 1 }}/> : renderItem())
  }

  /**
   * 绑定姓名
   * @param text
   */
  const onSubmitFullName = (text?: string) => {
    ugLog('onSubmitFullName=', text)
    bindRealName(text).then(() => {
    })
  }

  return (
    <View style={_styles.container}>
      {
        getYueBaoInfo() == null ?
          <EmptyView style={{ flex: 1 }}/> :
          renderContent()
      }

      <MiddleMenu key={menuItem?.toString()}
                  ref={refMenu}
                  onMenuClick={clickMenu}
                  menu={menuItem}/>

      <NeedNameInputComponent ref={needNameInputRef}
                              onSubmitFullName={onSubmitFullName}/>
    </View>
  )
}

const tabMenus = ['渠道提款', '提款到余额'] //TAB菜单
const _styles = StyleSheet.create({
  container: {
    backgroundColor: UGColor.BackgroundColor1,
    flex: 1,
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
  btc_hint: {
    color: UGColor.RedColor4,
    fontSize: scale(20),
    paddingBottom: scale(16),
  },
  max_hint: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
    paddingBottom: scale(16),
  },
  forget_pwd_container: {
    height: scale(44),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: scale(8),
  },
  forget_pwd: {
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
  bind_bt: {
    height: scale(68),
    borderWidth: scale(1),
    borderRadius: scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bind_text: {
    fontSize: scale(22),
    marginLeft: scale(8),
  },
  pwd_top_space: {
    height: scale(32),
  },


})

export default WithdrawComponent
