
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { setProps, UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import EmptyView from '../../../public/components/view/empty/EmptyView';
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { PromotionConst } from '../const/PromotionConst';
import { Badge, Button } from 'react-native-elements';



interface JDPromotionTabMemberPage {
  pageTitle?: string,//界面名称数据
  titleArray?: Array<string>,// 按钮名称数据
  levelArray?: Array<string>,// 下拉名称数据

  //===列表数据====================================
  pageSize?: number//每页多少条数据
  pageNumber?: number,//当前显示第几页
  levelindex?: number,//下拉选中的索引
  items?: Array<any>//界面数据
  state: {
    showFoot?: number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束 
    isLastPage?: boolean //是否是最后一页 
  }
}

const JDPromotionTabMemberPage = ({ pageTitle, titleArray }: { pageTitle?: string, titleArray?: Array<string>, }) => {


  let { current: v } = useRef<JDPromotionTabMemberPage>(
    {
      pageTitle: pageTitle,
      titleArray: titleArray,
      items:[],
      levelArray: ["全部下线", "1级下线", "2级下线", "3级下线", "4级下线", "5级下线", "6级下线", "7级下线", "8级下线", "9级下线", "10级下线"],
      pageSize: 20,
      pageNumber: 1,
      levelindex: 0,
      state: {
        showFoot: 0,
        isRefreshing: true,
        isLastPage: false,
      }
    }
  )

  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: pageTitle, back: true },
      didFocus: () => {
        v.pageTitle = pageTitle;
        v.titleArray = titleArray;
        v.items = [];
        v.pageNumber = 1;
        v.state.showFoot = 0;
        v.state.isRefreshing = true;
        v.state.isLastPage = false;
        console.log('useEffect');
        onHeaderRefresh()

      }
    })
  }, [])

   /**
  * 下拉刷新
  * 
  */
 const onHeaderRefresh = () => {
  v.state.isRefreshing = true
  v.pageNumber = 1
  console.log('下拉刷新');
  teamBetStatData()
}
  /**
   * 根据数据是数组还是字典返回数据
   * 
   */
  function returnData(data: any) {
    if (Array.isArray(data)) {
      return data;
    } else {
      return data['list']
    }
  }

/**
 * 得到投注报表列表数据
 * 
 */
function teamBetStatData() {
  console.log('投注报表列表页码===', v.pageNumber);
  api.team.betStat(v.levelindex, '', '', v.pageNumber, v.pageSize).setCompletionBlock(({ data }) => {
    let dicData = data;
    let arrayData = returnData(dicData);
    if (v.pageNumber == 1) {
      v.state.isRefreshing = false
      v.items.length = 0
      v.items = JSON.parse(JSON.stringify(arrayData))
      console.log('v.state.isRefreshing ====', v.state.isRefreshing);
    }
    else {
      v.items = v.items.concat(JSON.parse(JSON.stringify(arrayData)))
    }
    v.state.showFoot = 0
    if (arrayData.length < v.pageSize) {
      v.state.isLastPage = true;
      v.state.showFoot = 2
    }
    console.log('网络数据长度：', arrayData.length);
    console.log('网络数据：', arrayData);
    console.log('showFoot==', v.state.showFoot);

    setProps()

  }, (err) => {
    console.log('err = ', err);
    // setProps()
    // Toast(err.message)
  });
}

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: scale(66), backgroundColor: Skin1.textColor4 }}>
       <Text>你好</Text>
      </View>

    
    </View >
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },
  item: {
    flex: 1,
    borderColor: '#E4E7EA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(22)
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: scale(10)
  },
  foot: {
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footText: {
    fontSize: scale(22),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  viewItem: {
    flexDirection: 'row',
    height: scale(66),
  },
  listEmpty: {
    fontSize: scale(22),
    marginTop: scale(15),
  }
});

export default JDPromotionTabMemberPage
