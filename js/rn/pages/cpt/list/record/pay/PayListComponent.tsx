import { FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useContext } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { scale } from '../../../../../public/tools/Scale'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import CommStyles from '../../../../base/CommStyles'
import UsePayList from './UsePayList'
import { PayAisleListData } from '../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import { push } from '../../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../../public/navigation/Navigation'
import CapitalContext from '../../CapitalContext'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import HTML from 'react-native-render-html'
import { ugLog } from '../../../../../public/tools/UgLog'

interface IRouteParams {
  // refreshTabPage?: (pageName: string) => void, //刷新哪个界面
}

/**
 * 支付通道记录
 * @param navigation
 * @constructor
 */
const PayListComponent = ({ navigation, route }) => {

  const { refreshTabPage } = useContext(CapitalContext)

  const {
    refreshCT,
    payData,
    requestPayData,
  } = UsePayList()

  /**
   * 跳转虚拟币教程
   */
  const gotoBtcTutorial = (item: PayAisleListData) => {
    push(PageName.BtcTutorialPage, { btc_type: item?.id })
  }

  /**
   * 绘制条目内容
   * @param item
   */
  const renderItemContent = (item: PayAisleListData) => {
    let icon = item.bank_sort_icon //优先从后台拿图片
    if (anyEmpty(icon)) icon = PayIcon[item.code]
    if (anyEmpty(icon)) icon = PayIcon['39']

    return (
      <TouchableWithoutFeedback onPress={() => {
        switch (item?.id) {
          case 'alipay_online'://"支付宝转账"
          case 'wechat_online'://"微信在线支付"
          case 'tenpay_online'://"云闪付在线支付"
          case 'aliyin_transfer'://"支付宝-银联"
          case 'bank_online'://"网银在线支付"
          case 'yinlian_online'://银联钱包在线支付
          case 'huobi_online'://"火币钱包"
          case 'xnb_online'://"虚拟币
            push(PageName.OnlinePayPage, {
              // refreshBankList: (accountType: string) => {
              //   // ugLog('accountType=', accountType)
              //   categoryData?.map((item, index) => {
              //     ugLog('accountType=', accountType, item.type)
              //     if (accountType == item.type.toString()) {
              //       tabController?.goToPage(index)
              //     }
              //   })
              //   requestManageBankData(null)
              // },
              payData: item,
              refreshTabPage: refreshTabPage,

            })
            break
          case 'bank_transfer'://"银行卡转账"
          case 'alipay_transfer'://"支付宝转账"
          case 'yxsm_transfer'://"易信扫码支付"
          case 'yunshanfu_transfer'://云闪付
          case 'wxzsm_transfer'://"微信赞赏码支付"
          case 'wxsm_transfer'://"微信扫码"
          case 'ysf_transfer'://"云闪付扫码"
          case 'tenpay_transfer'://"财付通转账"
          case 'wechat_transfer'://"微信转账"
          case 'qqpay_transfer'://QQ钱包转账
          case 'wechat_alipay_transfer'://微信支付宝转账
          case 'alihb_online'://支付宝红包支付
          case 'jdzz_transfer'://"京东钱包转账"
          case 'ddhb_transfer'://"钉钉红包"
          case 'dshb_transfer'://多闪红包
          case 'xlsm_transfer'://闲聊扫码
          case 'zfbzyhk_transfer'://支付宝转银行卡
          case 'wxzfbsm_transfer'://"微信支付宝扫码"
          case 'liaobei_transfer'://"聊呗转账"
            push(PageName.TransferPayPage, {
              payData: item,
              refreshTabPage: refreshTabPage,
            })
            break
          case 'xnb_transfer'://虚拟币充值
            push(PageName.BtcPayPage, {
              payData: item,
              refreshTabPage: refreshTabPage,
            })
            break
        }
      }}>
        <View style={_styles.item_container}>
          <FastImage source={{ uri: icon }}
                     resizeMode={'contain'}
                     style={_styles.pay_icon}/>
          <View style={_styles.text_item_container}>
            <View style={_styles.text_title_container}>
              <Text style={_styles.text_title_0}>{item.name}</Text>
              <View style={CommStyles.flex}/>
              {
                (item?.id == 'xnb_transfer' || item?.id == 'xnb_online') &&
                <TouchableOpacity onPress={() => gotoBtcTutorial(item)}>
                  <Text style={[_styles.text_title_1,
                    { borderColor: Skin1.themeColor, color: Skin1.themeColor }]}>充值教程</Text>
                </TouchableOpacity>
              }
            </View>
            <HTML
              source={{ html: item?.tip?.replace(/font/g, 'span').replace(/color="#/g, 'style=\"color:#') }}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (
    <View style={CommStyles.flex}>
      {
        anyEmpty(payData)
          ? <EmptyView style={{ flex: 1 }}/>
          : <FlatList refreshControl={refreshCT}
                      keyExtractor={(item, index) => `${item}-${index}`}
                      data={payData?.payment}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          renderItemContent(item)
                        )
                      }}/>
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  item_container: {
    flex: 1,
    padding: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.LineColor4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_item_container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: scale(16),
  },
  text_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(2),
  },
  text_title_0: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  text_title_1: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingHorizontal: scale(2),
  },
  text_content_0: {
    paddingTop: scale(4),
    color: UGColor.TextColor2,
    fontSize: scale(20),
  },
  pay_icon: {
    width: scale(66),
    aspectRatio: 1,
  },
})

/**
 * 本地支付通道图标，应该使用id类似 xnb_online 来判断
 * code 判断难阅读，原来这样用，将就使用
 */
const PayIcon = {
  '2': Res.bank_online,
  '3': Res.cft_icon,
  '4': Res.wechat_online,
  '5': Res.bank_online,
  '6': Res.zfb_icon,
  '7': Res.wechatpay_icon,
  '8': Res.quick_online,
  '12': Res.yunshanfu,
  '14': Res.qq_online,
  '16': Res.zfb_icon,
  '17': Res.baidu,
  '18': Res.jd,
  '19': Res.bank_online,
  '20': Res.yunshanfu,
  '21': Res.qq_online,
  '22': Res.wx_zfb,
  '23': Res.btc_deposit_icon,
  '24': Res.xnb_icon,
  '25': Res.zfb_icon,
  '26': Res.jd,
  '27': Res.dingding,
  '28': Res.wechat_online,
  '29': Res.duosan,
  '30': Res.xlsm,
  '31': Res.zfb_icon,
  '32': Res.zfb_icon,
  '33': Res.wx_zfb,
  '34': Res.wechat_online,
  '35': Res.yxsm_transfer,
  '36': Res.yunshanfu,
  '37': Res.aliyin,
  '38': Res.ht,
  '39': Res.btc_deposit_icon,
  '41': Res.aliyin2,
}

export default PayListComponent
