

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import UGinviteInfoModel from '../../../redux/model/全局/UGinviteInfoModel';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { UGStore } from '../../../redux/store/UGStore';
import { UGBasePageProps } from '../../base/UGPage';
import { JDAgentInput } from '../cp/JDAgentInput';
import { JDPromotionInfoCopyCP } from './JDPromotionInfoCopyCP';
import { JDPromotionInfoText1CP } from './JDPromotionInfoText1CP';
import { JDPromotionInfoText2CP } from './JDPromotionInfoText2CP';

interface JDPromotionInfoCP {
  inviteInfoModel?: UGinviteInfoModel;
}
const JDPromotionInfoCP = ({ route, setProps }: UGBasePageProps) => {

  const [inviteInfoModel, setInviteInfoModel] = useState<UGinviteInfoModel>()//数据（全部）
  const { myreco_img } = UGStore.globalProps.sysConf

  /**
 * 得到推荐信息数据
 * 
 */
  function teamBetListData() {
    api.team.inviteInfo().setCompletionBlock(({ data }) => {
      console.log('得到推荐信息==================', JSON.parse(JSON.stringify(data)));
      setInviteInfoModel(JSON.parse(JSON.stringify(data)))
    }, (err) => {
      console.log('err = ', err);
      // setProps()
      // Toast(err.message)
    });
  }

  /**
* 佣金计算数据
* 
*/
  function yjstring() {
    let returnStr: string;
    if ('c186' == AppDefine.siteId) {
      returnStr = '方案一：佣金比例图如上，有效投注达到100万以上，将可赚取0.1%的佣金【100万X0.001=1000】1000元佣金!有效投注越高，佣金就越高，亏损分红达到1万以上，另可再次得到1%佣金，【10000X0.1=1000】1000元亏损分红！'
    } else {
      let proportion: number = parseFloat(inviteInfoModel?.fandian)
      let jg: number = proportion * 1000 / 100;
      returnStr = '您推荐的会员在下注结算后，佣金会自动按照比例加到您的资金账户上。例如：您所推荐的会员下注1000元，您的收益=1000元*(一级下线比例比如：' + inviteInfoModel?.fandian + '%)=' + jg.toFixed(2) + '元。'
    }
    return returnStr;
  }

  /**
* 头部图片
* 
*/
  function headImg() {
    let returnStr: string;
    if ('c126b' == AppDefine.siteId) {
      returnStr = 'https://appstatic.guolaow.com/assets/c126bHeaderBgImg.jpg'
    }
    else if ('c126' == AppDefine.siteId) {
      returnStr = 'https://appstatic.guolaow.com/assets/c126HeaderBgImg.png'
    }
    else if ('c186' == AppDefine.siteId) {
      returnStr = 'https://appstatic.guolaow.com/assets/c186HeaderBgImg.png'
    }
    else {
      returnStr = 'https://appstatic.guolaow.com/assets/promotioninfo.png'
    }
    return returnStr;
  }

  /**
* 头部图片
* 
*/
  function headImgHeight() {
    let returnNumber: number;
    if ('c126b' == AppDefine.siteId) {
      returnNumber = AppDefine.width * 22.12 / 18.26;
    }
    else if ('c126' == AppDefine.siteId) {
      returnNumber = AppDefine.width * 45 / 69;
    }
    else if ('c186' == AppDefine.siteId) {
      returnNumber = AppDefine.width * 15.88 / 24.34;
    }
    else {
      returnNumber = AppDefine.width * 740 / 994;
    }
    console.log('returnNumber = ',returnNumber);
    
    return returnNumber;
  }

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '推荐信息', back: true },
      didFocus: () => {
        teamBetListData()
      }
    })

  }, [])

  return (
    <ScrollView style={{ backgroundColor: Skin1.textColor4 }}>
      {/* 输入界面 */}
      {myreco_img == '0' && <Image style={[{ height: headImgHeight(), width: '100%', }]} source={{ uri: headImg() }} />}
      <JDPromotionInfoText1CP title={'我的用户名:'} content={inviteInfoModel?.username} />
      <JDPromotionInfoText1CP title={'我的推荐ID:'} content={inviteInfoModel?.rid} />
      <JDPromotionInfoText2CP content={'如果想赚取丰厚的推荐佣金，请复制推荐链接发给您的好友注册。（推荐网址请用浏览器打开）'} />
      <JDPromotionInfoCopyCP title={'首页推荐地址'}
        content={inviteInfoModel?.link_i}
        imgUrl={inviteInfoModel?.link_i}
      />
      <JDPromotionInfoText2CP content={'如果想赚取丰厚的推荐佣金，请复制推荐链接发给您的好友注册。（推荐网址请用浏览器打开）'} />
      <JDPromotionInfoCopyCP title={'注册推荐地址'}
        content={inviteInfoModel?.link_i}
        imgUrl={inviteInfoModel?.link_i}
      />
      <JDPromotionInfoText1CP title={'本月推荐收益:'} content={inviteInfoModel?.month_earn} />
      <JDPromotionInfoText1CP title={'本月推荐会员:'} content={inviteInfoModel?.total_member} />
      <JDPromotionInfoText1CP title={'推荐会员总计:'} content={inviteInfoModel?.month_member} />
      <JDPromotionInfoText2CP content={yjstring()} />
      {<View style={{ backgroundColor: Skin1.textColor4, height: 100 }} />}
    </ScrollView>

  )
}

export default JDPromotionInfoCP