import React, { useEffect } from 'react';
import AppDefine from '../../public/define/AppDefine';
import { UGBasePageProps } from '../base/UGPage';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';


interface JDVirtualCurrencyTutorialVars { }
export interface JDVirtualCurrencyTutorialProps extends UGBasePageProps<JDVirtualCurrencyTutorialProps, JDVirtualCurrencyTutorialVars> {
  itemArry?: { btnTitle: string, webName: string }[]; // 从原生iOS HelpDocViewController页取过来的字段
  imgH?: number;
}

// 虚拟币充值教程
export const JDVirtualCurrencyTutorialPage = (props: JDVirtualCurrencyTutorialProps) => {
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

  // 识别原生iOS页面类型（充值还是在线支付）
  const isRecharge = itemArry.map((ele) => {
    if (ele?.webName == '钱包付款') {
      return ele;
    }
  }).length > 0;

  const imgURL = isRecharge ? 'http://wdac012ivpemrufgq.lotgame789.com/static/images/czjc//huobi/huobic012.jpg' : 'http://wdac012ivpemrufgq.lotgame789.com/static/images/czjc//huobi/huobic012.jpg';

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
