import { Alert, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { scale } from '../../../../../public/tools/Scale'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../public/components/view/empty/EmptyView'
import { DepositListData } from '../../../../../public/network/Model/wd/DepositRecordModel'
import CommStyles from '../../../../base/CommStyles'
import UsePayList from './UsePayList'
import { PayAisleListData } from '../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import { push } from '../../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../../public/navigation/Navigation'

/**
 * 支付通道记录
 * @param navigation
 * @constructor
 */
const PayListComponent = () => {
  const {
    refreshCT,
    payData,
    requestPayData,
  } = UsePayList()

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
          case 'alipay_online':
          case 'wechat_online':
          case 'tenpay_online':
          case 'aliyin_transfer':
          case 'bank_online':
          case 'yinlian_online':
          case 'huobi_online':
          case 'xnb_online':
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
            })
            break;
          case 'bank_transfer':
          case 'alipay_transfer':
          case 'yxsm_transfer':
          case 'yunshanfu_transfer':
          case 'wxzsm_transfer':
          case 'wxsm_transfer':
          case 'ysf_transfer':
            push(PageName.TransferPayPage, {
              payData: item,
            })
            break;
        }
      }}>
        <View style={_styles.item_container}>
          <FastImage source={{ uri: icon }}
                     style={_styles.pay_icon}/>
          <View style={_styles.text_item_container}>
            <Text style={_styles.text_title_0}>{item.name}</Text>
            <WebView
              textZoom={scale(380)}
              javaScriptEnabled
              showsVerticalScrollIndicator={false}
              source={{ html: item.tip }}
              // source={{ html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"></head><body>${item.tip}</body></html>` }}
            />
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
  text_title_0: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
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
 * code 判断难阅读
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
  '34': Res.wechat_online,
  '35': Res.yxsm_transfer,
  '36': Res.yunshanfu,
  '37': Res.aliyin,
  '38': Res.ht,
  '39': Res.btc_deposit_icon,
  '41': Res.aliyin2,
}

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default PayListComponent
