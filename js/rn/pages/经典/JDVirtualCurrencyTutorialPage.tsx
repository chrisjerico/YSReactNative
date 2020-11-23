import React, { useEffect } from 'react';
import AppDefine from '../../public/define/AppDefine';
import { UGBasePageProps } from '../base/UGPage';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { View } from 'react-native';


interface JDVirtualCurrencyTutorialVars { }
export interface JDVirtualCurrencyTutorialProps extends UGBasePageProps<JDVirtualCurrencyTutorialProps, JDVirtualCurrencyTutorialVars> {
  itemArry?: { btnTitle: string, webName: string }[]; // 从原生iOS HelpDocViewController页取过来的字段
  imgH?: number;
}

// 虚拟币充值教程
export const JDVirtualCurrencyTutorialPage = (props: JDVirtualCurrencyTutorialProps) => {
  // c084
  if (AppDefine.siteId == 'c084') {
    return <C084 />
  }

  // 其他站点
  const { setProps, itemArry = [], imgH } = props;

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '充值教程', back: true },
      backgroundColor: ['#aaa', '#aaa'],
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        });
      },
    });
  }, [])

  let imgURL = 'http://wdac012ivpemrufgq.lotgame789.com/static/images/czjc//huobi/huobic012.jpg';
  if (AppDefine.siteId == 'c116') {
    imgURL = AppDefine.host + "/static/images/czjc/mobile/CGpayc213.jpg";
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
      source={{
        uri: AppDefine.host + '/mobile/#/bank/huobiTutorialsC084'
      }}
    />
  </View>
}
