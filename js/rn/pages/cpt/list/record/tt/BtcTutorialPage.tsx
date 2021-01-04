import { ScrollView, StyleSheet } from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import UseBtcTutorial from './UseBtcTutorial'
import { BaseScreen } from '../../../../乐橙/component/BaseScreen'
import AppDefine from '../../../../../public/define/AppDefine'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { Res } from '../../../../../Res/icon/Res'
import { scale } from '../../../../../public/tools/Scale'
import { ugLog } from '../../../../../public/tools/UgLog'
import { useState } from 'react'
import CommStyles from '../../../../base/CommStyles'

interface IRouteParams {
  btc_type?: string // xnb_transfer, xnb_online
}

/**
 * 虚拟币教程
 * @param navigation
 * @constructor
 */
const BtcTutorialPage = ({ navigation, route }) => {

  const { btc_type } = route?.params
  const [imgHeight, setImgHeight] = useState(0) //图片的高

  const {} = UseBtcTutorial()

  const renderWeb = () => {

    let url
    if (AppDefine.siteId == 'c084') {
      url = AppDefine.host + '/mobile/#/bank/showXnb_transferC084'
    } else if (AppDefine.siteId == 'c126') {
      url = 'http://266327.com/m.html'
    } else if (AppDefine.siteId == 'c134') {
      url = AppDefine.host + '/mobile/#/bank/huobiTutorialsC134'
    }

    ugLog('btc_type, url', btc_type, url)
    if (!anyEmpty(url)) {
      return <WebView
        style={CommStyles.flex}
        source={{ uri: url }}/>

    } else if (btc_type == 'xnb_transfer') {
      return renderImage(Res.hbjc_img)
    }

    return renderImage(Res.c012_virtualcoin_icon)
  }

  const renderImage = (url?: string) =>
    <ScrollView style={CommStyles.flex}
                showsVerticalScrollIndicator={false}>
      <FastImage source={{ uri: url }}
                 resizeMode={'contain'}
                 onLoad={(e) => {
                   setImgHeight(
                     (scale(540) / e.nativeEvent.width) * e.nativeEvent.height)
                 }}
                 style={[_styles.pay_icon, { height: imgHeight }]}/>
    </ScrollView>

  return (
    <BaseScreen screenName={'虚拟币教程'}>
      {
        renderWeb()
      }
    </BaseScreen>

  )
}

const _styles = StyleSheet.create({
  pay_icon: {
    width: scale(540),
  },

})

export default BtcTutorialPage
