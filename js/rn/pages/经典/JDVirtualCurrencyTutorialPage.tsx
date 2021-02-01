import React, { useEffect } from 'react';
import AppDefine from '../../public/define/AppDefine';
import { UGBasePageProps } from '../base/UGPage';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { img_assets, img_fullPath, img_root } from '../../Res/icon';


interface JDVirtualCurrencyTutorialVars { }
export interface JDVirtualCurrencyTutorialProps extends UGBasePageProps<JDVirtualCurrencyTutorialProps, JDVirtualCurrencyTutorialVars> {
  itemArry?: { btnTitle: string, webName: string }[]; // 从原生iOS HelpDocViewController页取过来的字段
  imgH?: number;
}

// 虚拟币充值教程
export const JDVirtualCurrencyTutorialPage = (props: JDVirtualCurrencyTutorialProps) => {

  // 其他站点
  const { setProps, itemArry = [], imgH } = props;

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '充值教程', back: true },
      backgroundColor: '#aaa',
    });
  }, [])

  // c084
  if (AppDefine.siteId == 'c084') {
    return <C084 />
  }

  // c126
  if (AppDefine.siteId == 'c126') {
    return <C126 />
  }

  let imgURL = 'http://wdac012ivpemrufgq.lotgame789.com/static/images/czjc//huobi/huobic012.jpg';
  if (AppDefine.siteId == 'c116') {
    imgURL = AppDefine.host + "/static/images/czjc/mobile/CGpayc213.jpg";
  } else if (AppDefine.siteId == 'c134') {
    imgURL = img_root('c134/top-up_%20tutorial')
  }

  return (
    <ScrollView>
      <FastImage
        style={{ height: imgH ?? 1000 }}
        source={{ uri: imgURL }}
        onLoad={(e) => {
          if (!imgH) {
            const h = (AppDefine.width / e.nativeEvent.width) * e.nativeEvent.height ?? 100;
            setProps({ imgH: h });
          }
        }}
      />
    </ScrollView>);
}



function C084() {
  return <View style={{ flex: 1 }}>
    <WebView
      style={{ flex: 1, marginTop: -44 }}
      source={{ uri: AppDefine.host + '/mobile/#/bank/showXnb_transferC084' }}
    />
  </View>
}

function C126() {
  return <View style={{ flex: 1 }}>
    <WebView
      style={{ flex: 1 }}
      source={{ uri: 'http://266327.com/m.html' }}
    />
  </View>
}
