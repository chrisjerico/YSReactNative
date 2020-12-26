import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../../public/tools/Ext'
import { scale } from '../../../../../../public/tools/Scale'
import { UGColor } from '../../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../../public/components/view/empty/EmptyView'
import CommStyles from '../../../../../base/CommStyles'
import { PayAisleData, PayAisleListData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import UseOnlinePay from './UseOnlinePay'
import { ManageBankCardData } from '../../../../../../public/network/Model/bank/ManageBankCardModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../../public/theme/UGSkinManagers'
import { BaseScreen } from '../../../../../乐橙/component/BaseScreen'
import { ugLog } from '../../../../../../public/tools/UgLog'

interface IRouteParams {
  payData?: PayAisleListData, //当前的账户数据
}

/**
 * 支付通道记录
 * @param navigation
 * @constructor
 */
const OnlinePayPage = ({ navigation, route }) => {

  const { payData }: IRouteParams = route?.params

  const {
    moneyOption,
    inputMoney,
    setInputMoney,
    selPayChannel,
    setSelPayChannel,
  } = UseOnlinePay()

  /**
   * 输入金额
   */
  const renderInputMoney = () => <TextInput style={_styles.input_money}
                                            value={inputMoney}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => setInputMoney(text)}
                                            placeholder={'请填写存款金额'}/>
  /**
   * 选择金额
   */
  const renderChoiceMoney = () => <View style={_styles.choice_money_container}>
    {
      moneyOption.map((item) => <TouchableOpacity onPress={() => setInputMoney(item)}>
        <View style={_styles.choice_money_item_container}>
          <Text style={_styles.choice_money_item_text}>{item + '元'}</Text>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 已选择的渠道
   */
  const renderSelectedChannel = () => <View>
    <Text style={_styles.choice_money_title}>{
      anyEmpty(payData.channel[selPayChannel]?.fcomment) ?
        payData.channel[selPayChannel]?.payeeName :
        payData.channel[selPayChannel]?.fcomment
    }</Text>
    <Text style={_styles.choice_money_hint}>UG集團你夢想的起航！來UG成就的你夢想</Text>
  </View>

  /**
   * 选择渠道
   */
  const renderAllChannel = () => <View style={_styles.select_channel_container}>
    {
      payData?.channel?.map((item, index) => <TouchableOpacity
        onPress={() => setSelPayChannel(index)}>
        <View style={[_styles.select_channel_item,
          index != 0 ? null : { borderTopWidth: 0 }]}>
          {
            index == selPayChannel ?
              <Icon size={scale(32)} name={'check'}/> :
              <Icon size={scale(32)} name={'circle-o'}/>
          }
          <Text style={_styles.select_channel_text}>{item?.payeeName}</Text>

        </View>
      </TouchableOpacity>)
    }
  </View>


  return (
    <BaseScreen screenName={payData.name}>
      <ScrollView showsVerticalScrollIndicator={false}
                  style={_styles.container}>
        {
          [
            renderInputMoney(),
            renderChoiceMoney(),
            renderSelectedChannel(),
            renderAllChannel(),
          ]
        }

        <Button title={'开始充值'}
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
      </ScrollView>
    </BaseScreen>

  )
}

const _styles = StyleSheet.create({
  container: {
    padding: scale(16),
    flex: 1,
  },
  input_money: {
    width: '100%',
    padding: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: UGColor.LineColor4,
    fontSize: scale(22),
  },
  choice_money_container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: scale(16),
  },
  choice_money_item_container: {
    width: scale(168),
    justifyContent: 'center',
    alignItems: 'center',
  },
  choice_money_item_text: {
    width: '90%',
    color: UGColor.TextColor2,
    fontSize: scale(22),
    textAlign: 'center',
    marginTop: scale(8),
    padding: scale(8),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    backgroundColor: UGColor.BackgroundColor4,
  },
  choice_money_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  choice_money_hint: {
    color: UGColor.RedColor2,
    fontSize: scale(20),
  },
  select_channel_container: {
    flex: 1,
    marginVertical: scale(16),
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
  },
  select_channel_item: {
    flex: 1,
    borderTopWidth: scale(1),
    borderTopColor: UGColor.LineColor4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  select_channel_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(16),
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

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default OnlinePayPage
