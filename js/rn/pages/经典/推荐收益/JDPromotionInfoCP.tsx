

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View,Image } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { UGBasePageProps } from '../../base/UGPage';
import { JDAgentInput } from '../cp/JDAgentInput';
import { JDPromotionInfoCopyCP } from './JDPromotionInfoCopyCP';
import { JDPromotionInfoText1CP } from './JDPromotionInfoText1CP';
import { JDPromotionInfoText2CP } from './JDPromotionInfoText2CP';

interface JDPromotionInfoCP {

}
const JDPromotionInfoCP = ({ route, setProps }: UGBasePageProps) => {

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '推荐信息', back: true },
      didFocus: () => {

      }
    })

  }, [])

  return (
    <ScrollView style={{ backgroundColor: Skin1.textColor4 }}>
      {/* 输入界面 */}
      <Image style={[{ height: 200, width: 200, }]} source={{ uri: ''}} />

      <JDPromotionInfoText1CP title={'本月推荐会员:'} content={'一级下线:0，二级下线:0，三级下线:0'} />
      <JDPromotionInfoText2CP content={'您推荐的会员在下注结算后，佣金会自动按照比例加到您的资金账户上。例如：您所推荐的会员下注1000元，您的收益=1000元*(一级下线比例比如：0.15%）=1.5元。'} />
      <JDPromotionInfoCopyCP title={'注册推荐地址'} 
      content={'您推荐的会员在下注结算后，佣金会自动按照比例加到您的资金账户上。'}
      imgUrl ={'https://appstatic.guolaow.com/web/images/zxkf.png'}
        onValueChange={(value) => {
          console.log('onValueChange1 =' + value);
        }}
        />
      <JDPromotionInfoText1CP title={'我的用户名:'} content={'您推荐的会员在下注结算后，佣金会自动按照比例加到您的资金账户上。例如：您所推荐的会员下注1000元，您的收益=1000元*(一级下线比例比如：0.15%）=1.5元。'} />
      {<View style={{ backgroundColor: Skin1.textColor4, height: 600 }} />}
    </ScrollView>

  )
}

export default JDPromotionInfoCP