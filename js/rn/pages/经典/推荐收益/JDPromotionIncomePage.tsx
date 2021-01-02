import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import EmptyView from '../../../public/components/view/empty/EmptyView';
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import JDPromotionTablePage from './JDPromotionTablePage';
import { PromotionConst } from '../const/PromotionConst';

interface JDPromotionIncomePage {
  tabNames?: Array<string>//tab界面名称数据
}

const JDPromotionIncomePage = ({ route, setProps }: UGBasePageProps) => {


  let { current: v } = useRef<JDPromotionIncomePage>(
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
  const [tabIndex, setTabIndex] = useState<number>(0)
  /**
   * 初始化
   * @param item
   */
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '推荐收益' },
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])


  /**
  * 按钮数组显示数据
  * @param  item
  */
  const titleList = (item: string) => {
    let array = [];
    if (PromotionConst.会员管理 == item) {
      array = ["分级", "用户名", "在线状态", "注册时间", "下线盈亏", "操作/状态"];
    }
    else if (PromotionConst.投注报表 == item) {
      array = ["分级", "日期", "投注金额", "佣金"];
    }
    else if (PromotionConst.投注记录 == item) {
      array = ["分级", "用户", "日期", "金额"];
    }
    else if (PromotionConst.域名绑定 == item) {
      array = ["首页推荐链接", "注册推荐链接"];
    }
    else if (PromotionConst.存款报表 == item) {
      array = ["分级", "日期", "存款金额", "存款人数"];
    }
    else if (PromotionConst.存款记录 == item) {
      array = ["分级", "用户", "日期", "存款金额"];
    }
    else if (PromotionConst.提款报表 == item) {
      array = ["分级", "日期", "提款金额", "提款人数"];
    }
    else if (PromotionConst.提款记录 == item) {
      array = ["分级", "用户名", "日期", "提款金额"];
    }
    else if (PromotionConst.真人报表 == item) {
      array = ["分级", "日期", "投注金额", "会员输赢", "返点"];
    }
    else if (PromotionConst.真人记录 == item) {
      array = ["分级", "用户", "游戏", "日期", "投注金额", "会员输赢"];
    }
    return array;
  }
  /**
     * 绘制各列表
     * @param item
     */
  const renderRecordList = (item: string) => {
    switch (item) {
      case "推荐信息":
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.会员管理:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.投注报表:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.投注记录:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.域名绑定:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.存款报表:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.存款记录:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.提款报表:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.提款记录:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.真人报表:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
      case PromotionConst.真人记录:
        return <JDPromotionTablePage tabLabel={item} key={item} pageTitle={item} titleArray={titleList(item)} />
    }
  }

  return (
    <View style={styles.container}>
      {
        [
          arrayEmpty(v.tabNames)
            ? <EmptyView style={{ flex: 1 }} />
            : <ScrollableTabView
              // key={'ScrollableTabView' + refreshCount}
              initialPage={tabIndex}//初始化时被选中的Tab下标，默认是0（即第一页）
              onChangeTab={value => {
                ugLog('tab index=', value?.from, value?.i)
              }}
              // ref={instance => tabController = instance}
              tabBarUnderlineStyle={[styles.tab_bar_underline,
              { backgroundColor: Skin1.themeColor }]}
              tabBarActiveTextColor={Skin1.themeColor}
              tabBarInactiveTextColor={Skin1.textColor1}
              tabBarTextStyle={{ fontSize: scale(20) }}
              style={[{ flex: 1 }]}
              renderTabBar={() => <ScrollableTabBar style={styles.tab_bar} />}>
              {
                v.tabNames?.map((tabItem, index) => {
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


export default JDPromotionIncomePage