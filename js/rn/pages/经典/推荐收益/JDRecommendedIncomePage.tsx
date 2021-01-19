import React, { useEffect, useRef, useState } from 'react';
import {Platform, StyleSheet, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import EmptyView from '../../../public/components/view/empty/EmptyView';
import { arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { PromotionConst } from '../const/PromotionConst';
import JDPromotionTabMemberCP from '../cp/JDPromotionTabMemberCP';
import JDPromotionTabBettingReportCP from '../cp/JDPromotionTabBettingReportCP';
import JDPromotionTabBettingRecordCP from '../cp/JDPromotionTabBettingRecordCP';
import JDPromotionTabInviteDomainCP from '../cp/JDPromotionTabInviteDomainCP';
import JDPromotionTabDepositStateCP from '../cp/JDPromotionTabDepositStateCP';
import JDPromotionTabDepostCP from '../cp/JDPromotionTabDepostCP';
import JDPromotionTabWithdrawalReportCP from '../cp/JDPromotionTabWithdrawalReportCP';
import JDPromotionTabDrawlRcordCP from '../cp/JDPromotionTabDrawlRcordCP';
import JDPromotionTabRealityReportCP from '../cp/JDPromotionTabRealityReportCP';
import JDPromotionTabRealityRcordCP from '../cp/JDPromotionTabRealityRcordCP';
import JDPromotionInfoCP from '../cp/JDPromotionInfoCP';
import { Button } from 'react-native-elements';
import { UGStore } from '../../../redux/store/UGStore';
import { PageName } from '../../../public/navigation/Navigation';
import { push } from '../../../public/navigation/RootNavigation';
import SafeAreaHeader from '../../../public/views/tars/SafeAreaHeader';
import { skinColors } from '../../../public/theme/const/UGSkinColor';
import { UGNavigationBar } from '../../../public/widget/UGNavigationBar';


interface JDRecommendedIncomePage {
  tabNames?: Array<string>//tab界面名称数据
}

const 
JDRecommendedIncomePage = ({ setProps }: UGBasePageProps) => {

  //调用sysConf
  const { inviteCode } = UGStore.globalProps.sysConf

  let { current: v } = useRef<JDRecommendedIncomePage>(
    {
      tabNames: [
        PromotionConst.推荐信息,
        PromotionConst.会员管理,
        PromotionConst.投注报表,
        PromotionConst.投注记录,
        PromotionConst.域名绑定,
        PromotionConst.存款报表,
        PromotionConst.存款记录,
        PromotionConst.提款报表,
        PromotionConst.提款记录,
        PromotionConst.真人报表,
        PromotionConst.真人记录
      ]
    })
  const [tabIndex] = useState<number>(0)
  /**
   * 初始化
   * @param item
   */
  useEffect(() => {
    setProps({
      navbarOpstions: {
        hidden: false, title: '推荐收益',
        rightComponent:ZLHeader(),
        
      },
      didFocus: () => {
        console.log('AppDefine.siteId ========',AppDefine.siteId );
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])

  const ZLHeader = () => {
    if (isHideBut()) {
      return(
        <View></View>
      )
    } else {
      return(
        <Button 
         title={inviteCode.displayWord}
         buttonStyle ={{backgroundColor:Skin1.themeColor,width:100,}}
         titleStyle={{ fontSize:16 }}
          onPress={() => rightClicked()}
        /> 
      )
    }

  }

  function isHideBut(){
    
    if (AppDefine.siteId ==='c084') {
      return true;
    }
    else{
      return false;
    }
  }

  /**
     * 跳到邀请码界面
     * 
     */
  function rightClicked() {
    push(PageName.JDPromotionCodeListPage, {})
  }
  /**
     * 绘制各列表
     * @param item
     */
  const renderRecordList = (item: string) => {
    switch (item) {
      case PromotionConst.推荐信息:
        return <JDPromotionInfoCP tabLabel={item} key={item} />
      case PromotionConst.会员管理:
        return <JDPromotionTabMemberCP tabLabel={item} key={item} />
      case PromotionConst.投注报表:
        return <JDPromotionTabBettingReportCP tabLabel={item} key={item} />
      case PromotionConst.投注记录:
        return <JDPromotionTabBettingRecordCP tabLabel={item} key={item} />
      case PromotionConst.域名绑定:
        return <JDPromotionTabInviteDomainCP tabLabel={item} key={item} />
      case PromotionConst.存款报表:
        return <JDPromotionTabDepositStateCP tabLabel={item} key={item} />
      case PromotionConst.存款记录:
        return <JDPromotionTabDepostCP tabLabel={item} key={item} />
      case PromotionConst.提款报表:
        return <JDPromotionTabWithdrawalReportCP tabLabel={item} key={item} />
      case PromotionConst.提款记录:
        return <JDPromotionTabDrawlRcordCP tabLabel={item} key={item} />
      case PromotionConst.真人报表:
        return <JDPromotionTabRealityReportCP tabLabel={item} key={item} />
      case PromotionConst.真人记录:
        return <JDPromotionTabRealityRcordCP tabLabel={item} key={item} />
    }
  }

  return (
    
    <View style={styles.container}>
      {
        [
          arrayEmpty(v.tabNames)
            ? <EmptyView style={{ flex: 1 }} />
            : <ScrollableTabView
              key={'ScrollableTabView'}
              initialPage={tabIndex}//初始化时被选中的Tab下标，默认是0（即第一页）
              onChangeTab={value => {
                ugLog('tab index=', value?.from, value?.i)
              }}
              // ref={instance => tabController = instance}
              tabBarUnderlineStyle=
              {[styles.tab_bar_underline,
              { backgroundColor: Skin1.themeColor }]}
              tabBarActiveTextColor={Skin1.themeColor }
              tabBarInactiveTextColor={Skin1.textColor2}
              tabBarTextStyle={{ fontSize: scale(20) }}
              style={[{ flex: 1 ,}]}
              renderTabBar={() => <ScrollableTabBar style={{ backgroundColor: Skin1.CLBgColor,}} />}>
              {
                v.tabNames?.map((tabItem) => {
                  return (
                    renderRecordList(tabItem)
                  )
                },
                )
              }
            </ScrollableTabView>,
        ]
      }

    </View >
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});


export default 
JDRecommendedIncomePage